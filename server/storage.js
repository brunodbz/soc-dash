import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createHmac, randomUUID, scryptSync, timingSafeEqual } from 'node:crypto';

const DATA_DIR = join(process.cwd(), 'server', 'data');
const DB_PATH = join(DATA_DIR, 'db.json');
const SECRET = process.env.API_SECRET || 'socdash-secret';

const defaultIntegrations = [
  {
    id: '1',
    name: 'Elastic Search SIEM',
    source: 'elasticsearch',
    enabled: true,
    credentials: {
      url: 'https://elastic.example.com:9200',
      username: 'elastic',
      password: '••••••••••••'
    },
    lastSync: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    status: 'connected',
    eventsCount: 1247
  },
  {
    id: '2',
    name: 'Tenable Vulnerability Scanner',
    source: 'tenable',
    enabled: true,
    credentials: {
      url: 'https://cloud.tenable.com',
      accessKey: '••••••••••••',
      secretKey: '••••••••••••'
    },
    lastSync: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    status: 'connected',
    eventsCount: 523
  },
  {
    id: '3',
    name: 'Microsoft Defender',
    source: 'defender',
    enabled: true,
    credentials: {
      tenantId: '••••••••-••••-••••-••••-••••••••••••',
      clientId: '••••••••-••••-••••-••••-••••••••••••',
      clientSecret: '••••••••••••'
    },
    lastSync: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    status: 'connected',
    eventsCount: 892
  },
  {
    id: '4',
    name: 'OpenCTI Threat Intelligence',
    source: 'opencti',
    enabled: true,
    credentials: {
      url: 'https://opencti.example.com',
      token: '••••••••••••'
    },
    lastSync: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    status: 'connected',
    eventsCount: 345
  }
];

const defaultEvents = [
  {
    id: '1',
    title: 'Suspicious Login Attempt Detected',
    description: 'Multiple failed login attempts from unusual geographic location',
    severity: 'critical',
    source: 'defender',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    status: 'open',
    affectedAssets: ['WS-2024-001', 'WS-2024-002'],
    affectedHosts: ['workstation-001.corp.local', 'workstation-002.corp.local'],
    affectedIPs: ['192.168.1.101', '192.168.1.102'],
    category: 'Authentication',
    tags: ['brute-force', 'authentication', 'anomaly']
  },
  {
    id: '2',
    title: 'Critical Vulnerability Detected',
    description: 'CVE-2024-1234: Remote Code Execution vulnerability in Apache Struts',
    severity: 'critical',
    source: 'tenable',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    status: 'investigating',
    affectedAssets: ['SRV-WEB-01', 'SRV-WEB-02', 'SRV-WEB-03'],
    affectedHosts: ['web-server-01.corp.local', 'web-server-02.corp.local', 'web-server-03.corp.local'],
    affectedIPs: ['10.0.1.10', '10.0.1.11', '10.0.1.12'],
    category: 'Vulnerability',
    tags: ['rce', 'apache', 'critical-patch']
  },
  {
    id: '3',
    title: 'Malware Communication Detected',
    description: 'Outbound connection to known C2 server detected',
    severity: 'critical',
    source: 'elasticsearch',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    status: 'open',
    affectedAssets: ['WS-2024-045'],
    affectedHosts: ['workstation-045.corp.local'],
    affectedIPs: ['192.168.1.145'],
    category: 'Malware',
    tags: ['c2', 'malware', 'network']
  },
  {
    id: '4',
    title: 'New Threat Intelligence: APT Group Activity',
    description: 'APT29 indicators detected in network traffic patterns',
    severity: 'high',
    source: 'opencti',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    status: 'investigating',
    affectedAssets: ['Network-Segment-A'],
    affectedHosts: ['firewall-01.corp.local', 'router-01.corp.local', 'ids-01.corp.local', 'ids-02.corp.local'],
    affectedIPs: ['10.0.0.1', '10.0.0.2', '10.0.0.10', '10.0.0.11'],
    category: 'Threat Intelligence',
    tags: ['apt29', 'threat-actor', 'intelligence']
  },
  {
    id: '5',
    title: 'Privilege Escalation Attempt',
    description: 'Unauthorized attempt to gain administrative privileges detected',
    severity: 'high',
    source: 'defender',
    timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    status: 'open',
    affectedAssets: ['SRV-APP-05'],
    affectedHosts: ['app-server-05.corp.local'],
    affectedIPs: ['10.0.2.15'],
    category: 'Access Control',
    tags: ['privilege-escalation', 'unauthorized-access']
  },
  {
    id: '6',
    title: 'SQL Injection Attempt Blocked',
    description: 'Multiple SQL injection attempts detected and blocked by WAF',
    severity: 'high',
    source: 'elasticsearch',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    status: 'resolved',
    affectedAssets: ['WEB-APP-01'],
    affectedHosts: ['webapp-01.corp.local'],
    affectedIPs: ['10.0.1.20'],
    category: 'Web Application',
    tags: ['sql-injection', 'waf', 'blocked']
  },
  {
    id: '7',
    title: 'Outdated Software Version Detected',
    description: 'Multiple systems running end-of-life software versions',
    severity: 'medium',
    source: 'tenable',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    status: 'open',
    affectedAssets: ['WS-2024-010', 'WS-2024-011', 'WS-2024-012'],
    affectedHosts: ['workstation-010.corp.local', 'workstation-011.corp.local', 'workstation-012.corp.local'],
    affectedIPs: ['192.168.1.110', '192.168.1.111', '192.168.1.112'],
    category: 'Compliance',
    tags: ['eol', 'compliance', 'patch-management']
  },
  {
    id: '8',
    title: 'Unusual Data Transfer Volume',
    description: 'Abnormal outbound data transfer detected during off-hours',
    severity: 'medium',
    source: 'elasticsearch',
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    status: 'investigating',
    affectedAssets: ['SRV-FILE-01'],
    affectedHosts: ['file-server-01.corp.local'],
    affectedIPs: ['10.0.3.50'],
    category: 'Data Exfiltration',
    tags: ['data-transfer', 'anomaly', 'dlp']
  }
];

function hashPassword(password) {
  const salt = randomUUID().replace(/-/g, '');
  const derived = scryptSync(password, salt, 64);
  return `${salt}:${derived.toString('hex')}`;
}

function verifyPassword(password, stored) {
  const [salt, key] = stored.split(':');
  const derived = scryptSync(password, salt, 64);
  return timingSafeEqual(Buffer.from(key, 'hex'), derived);
}

function resetAdminPassword(newPassword = '123456') {
  const db = loadDb();
  let adminUser = db.users.find(u => u.username === 'admin');

  if (!adminUser) {
    adminUser = {
      id: '1',
      username: 'admin',
      email: 'admin@soc.example.com',
      role: 'admin',
      lastLogin: ''
    };
    db.users.push(adminUser);
  }

  adminUser.password = hashPassword(newPassword);
  adminUser.mustChangePassword = false;
  saveDb(db);

  return sanitizeUser(adminUser);
}

function ensureDb() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!existsSync(DB_PATH)) {
    const adminUser = {
      id: '1',
      username: 'admin',
      email: 'admin@soc.example.com',
      role: 'admin',
      password: hashPassword('123456'),
      mustChangePassword: true,
      lastLogin: ''
    };

    const seedData = {
      users: [adminUser],
      integrations: defaultIntegrations,
      events: defaultEvents
    };

    writeFileSync(DB_PATH, JSON.stringify(seedData, null, 2));
  }
}

function loadDb() {
  ensureDb();
  const raw = readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

function saveDb(data) {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

function createSignature(content) {
  return createHmac('sha256', SECRET).update(content).digest('base64url');
}

function generateToken(payload) {
  const data = { ...payload, exp: Date.now() + 1000 * 60 * 60 * 8 };
  const json = JSON.stringify(data);
  const base = Buffer.from(json).toString('base64url');
  const signature = createSignature(base);
  return `${base}.${signature}`;
}

function verifyToken(token) {
  if (!token) return null;
  const [base, signature] = token.split('.');
  if (!base || !signature) return null;
  const expected = createSignature(base);
  if (expected !== signature) return null;
  const payload = JSON.parse(Buffer.from(base, 'base64url').toString('utf-8'));
  if (payload.exp && payload.exp < Date.now()) return null;
  return payload;
}

function sanitizeUser(user) {
  const { password, ...rest } = user;
  return rest;
}

export {
  defaultEvents,
  defaultIntegrations,
  ensureDb,
  generateToken,
  hashPassword,
  loadDb,
  sanitizeUser,
  saveDb,
  resetAdminPassword,
  verifyPassword,
  verifyToken
};
