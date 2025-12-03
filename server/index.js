import http from 'node:http';
import { parse } from 'node:url';
import {
  ensureDb,
  generateToken,
  loadDb,
  sanitizeUser,
  saveDb,
  resetAdminPassword,
  verifyPassword,
  verifyToken,
  hashPassword
} from './storage.js';

const PORT = process.env.PORT || 4000;
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'];
const adminResetToken = process.env.ADMIN_RESET_TOKEN || 'admin-reset-123';

ensureDb();

function sendJson(res, status, data, origin) {
  const allowOrigin = origin && (allowedOrigins.includes('*') || allowedOrigins.includes(origin))
    ? origin
    : allowedOrigins[0];
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,OPTIONS'
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

function authenticate(req) {
  const auth = req.headers['authorization'];
  if (!auth) return null;
  const token = auth.replace('Bearer ', '');
  return verifyToken(token);
}

const server = http.createServer(async (req, res) => {
  const { pathname } = parse(req.url, true);
  const origin = req.headers.origin;

  if (req.method === 'OPTIONS') {
    return sendJson(res, 200, { ok: true }, origin);
  }

  try {
    if (pathname === '/api/auth/login' && req.method === 'POST') {
      const body = await parseBody(req);
      const { username, password } = body;
      const db = loadDb();
      const user = db.users.find(u => u.username === username);
      if (!user || !verifyPassword(password, user.password)) {
        return sendJson(res, 401, { message: 'Credenciais inválidas' }, origin);
      }
      user.lastLogin = new Date().toISOString();
      saveDb(db);
      const token = generateToken({ id: user.id, username: user.username, role: user.role, mustChangePassword: user.mustChangePassword });
      return sendJson(res, 200, { token, user: sanitizeUser(user), mustChangePassword: user.mustChangePassword }, origin);
    }

    if (pathname === '/api/auth/reset-admin' && req.method === 'POST') {
      const body = await parseBody(req);
      if (body.token !== adminResetToken) {
        return sendJson(res, 401, { message: 'Token inválido para redefinição' }, origin);
      }

      const user = resetAdminPassword('123456');
      const token = generateToken({ id: user.id, username: user.username, role: user.role, mustChangePassword: user.mustChangePassword });
      return sendJson(res, 200, { message: 'Senha do admin redefinida com sucesso', user, token }, origin);
    }

    if (pathname === '/api/auth/change-password' && req.method === 'POST') {
      const auth = authenticate(req);
      if (!auth) return sendJson(res, 401, { message: 'Não autorizado' }, origin);
      const body = await parseBody(req);
      const { currentPassword, newPassword } = body;
      const db = loadDb();
      const user = db.users.find(u => u.id === auth.id);
      if (!user || !verifyPassword(currentPassword, user.password)) {
        return sendJson(res, 400, { message: 'Senha atual incorreta' }, origin);
      }
      user.password = hashPassword(newPassword);
      user.mustChangePassword = false;
      saveDb(db);
      const token = generateToken({ id: user.id, username: user.username, role: user.role, mustChangePassword: user.mustChangePassword });
      return sendJson(res, 200, { token, user: sanitizeUser(user), mustChangePassword: user.mustChangePassword }, origin);
    }

    if (pathname === '/api/integrations' && req.method === 'GET') {
      const auth = authenticate(req);
      if (!auth) return sendJson(res, 401, { message: 'Não autorizado' }, origin);
      const db = loadDb();
      return sendJson(res, 200, db.integrations, origin);
    }

    if (pathname?.startsWith('/api/integrations/') && req.method === 'PUT') {
      const auth = authenticate(req);
      if (!auth) return sendJson(res, 401, { message: 'Não autorizado' }, origin);
      const id = pathname.split('/').pop();
      const updates = await parseBody(req);
      const db = loadDb();
      const index = db.integrations.findIndex(i => i.id === id);
      if (index === -1) return sendJson(res, 404, { message: 'Integração não encontrada' }, origin);
      db.integrations[index] = { ...db.integrations[index], ...updates, credentials: updates.credentials || db.integrations[index].credentials };
      saveDb(db);
      return sendJson(res, 200, db.integrations[index], origin);
    }

    if (pathname === '/api/users' && req.method === 'GET') {
      const auth = authenticate(req);
      if (!auth) return sendJson(res, 401, { message: 'Não autorizado' }, origin);
      const db = loadDb();
      return sendJson(res, 200, db.users.map(sanitizeUser), origin);
    }

    if (pathname?.startsWith('/api/users/') && req.method === 'PUT') {
      const auth = authenticate(req);
      if (!auth) return sendJson(res, 401, { message: 'Não autorizado' }, origin);
      const id = pathname.split('/').pop();
      const updates = await parseBody(req);
      const db = loadDb();
      const index = db.users.findIndex(u => u.id === id);
      if (index === -1) return sendJson(res, 404, { message: 'Usuário não encontrado' }, origin);
      db.users[index] = { ...db.users[index], ...updates };
      saveDb(db);
      return sendJson(res, 200, sanitizeUser(db.users[index]), origin);
    }

    if (pathname === '/api/events' && req.method === 'GET') {
      const auth = authenticate(req);
      if (!auth) return sendJson(res, 401, { message: 'Não autorizado' }, origin);
      const db = loadDb();
      return sendJson(res, 200, db.events, origin);
    }

    if (pathname?.startsWith('/api/events/') && req.method === 'PATCH') {
      const auth = authenticate(req);
      if (!auth) return sendJson(res, 401, { message: 'Não autorizado' }, origin);
      const id = pathname.split('/').pop();
      const { status } = await parseBody(req);
      const db = loadDb();
      const event = db.events.find(e => e.id === id);
      if (!event) return sendJson(res, 404, { message: 'Evento não encontrado' }, origin);
      event.status = status;
      saveDb(db);
      return sendJson(res, 200, event, origin);
    }

    if (pathname === '/api/dashboard' && req.method === 'GET') {
      const auth = authenticate(req);
      if (!auth) return sendJson(res, 401, { message: 'Não autorizado' }, origin);
      const db = loadDb();
      const criticalEvents = db.events.filter(e => e.severity === 'critical').length;
      const highEvents = db.events.filter(e => e.severity === 'high').length;
      const mediumEvents = db.events.filter(e => e.severity === 'medium').length;
      const lowEvents = db.events.filter(e => e.severity === 'low').length;
      const resolvedToday = db.events.filter(e => e.status === 'resolved').length;
      return sendJson(res, 200, {
        totalEvents: db.events.length,
        criticalEvents,
        highEvents,
        mediumEvents,
        lowEvents,
        resolvedToday,
        averageResponseTime: '2.5h'
      }, origin);
    }

    sendJson(res, 404, { message: 'Rota não encontrada' }, origin);
  } catch (error) {
    console.error('Server error', error);
    sendJson(res, 500, { message: 'Erro interno do servidor' }, origin);
  }
});

server.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
