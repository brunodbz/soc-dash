# SOC Security Dashboard - Quick Start Guide

## 🚀 5-Minute Quick Start

This is a condensed guide for experienced users. For detailed step-by-step instructions, see [README.md](./README.md).

---

## Option 1: Local Development (Node.js)

### Prerequisites
- Node.js 20+ and npm 10+

### Installation
```bash
# 1. Navigate to project directory
cd soc-security-dashboard

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# http://localhost:5173
```

### Stop Server
```bash
# Press Ctrl+C in terminal
```

---

## Option 2: Docker Deployment

### Prerequisites
- Docker 20.10+ and Docker Compose 2.0+

### Installation
```bash
# 1. Navigate to project directory
cd soc-security-dashboard

# 2. Build and start containers
docker-compose up -d

# 3. Open browser
# http://localhost
```

### Management Commands
```bash
# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Restart containers
docker-compose restart

# View container status
docker-compose ps
```

---

## 🔧 Quick Configuration

### Access Admin Panel
1. Open dashboard in browser
2. Click **"Admin"** in top navigation
3. Click **"Integrations"** tab

### Configure Each Integration

#### Elasticsearch SIEM
```
URL:      https://elastic.example.com:9200
Username: elastic
Password: [your-password]
```

#### Tenable
```
URL:        https://cloud.tenable.com
Access Key: [your-access-key]
Secret Key: [your-secret-key]
```

#### Microsoft Defender
```
Tenant ID:     [your-tenant-id]
Client ID:     [your-client-id]
Client Secret: [your-client-secret]
```

#### OpenCTI
```
URL:       https://opencti.example.com
API Token: [your-api-token]
```

### Save Configuration
- Click **"Save Configuration"** for each integration
- Verify status shows **"Connected"** with green badge

---

## 📊 Using the Dashboard

### Main Features

**View Events**
- Main dashboard shows all security events
- Filter by severity: All, Critical, High, Medium

**View Details**
- Click **"View Details"** on any event card
- See full event information
- View affected hosts and IPs

**Update Status**
- Open event details
- Click status button: Open, Investigating, Resolved, Closed

**Export Reports**
- Click **"Export to Excel"** or **"Export to PDF"**
- Find file in Downloads folder

---

## 🔍 Quick Troubleshooting

### Cannot access localhost:5173
```bash
# Check if server is running
# Restart server: Ctrl+C, then npm run dev
# Try different port: npm run dev -- --port 3000
```

### npm command not found
```bash
# Install Node.js from https://nodejs.org/
# Restart terminal after installation
```

### Docker daemon not running
```bash
# Windows/Mac: Open Docker Desktop
# Linux: sudo systemctl start docker
```

### Port 80 already in use
```bash
# Edit docker-compose.yml
# Change ports: "8080:80"
# Access at http://localhost:8080
```

### Integration shows Disconnected
- Verify credentials are correct
- Check network connectivity
- Ensure firewall allows connections
- Verify API is accessible

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `README.md` | Complete installation guide |
| `DEPLOYMENT.md` | Docker deployment details |
| `CONFIGURATION.md` | Integration configuration |
| `HOSTS_IPS_FEATURE.md` | Hosts/IPs feature documentation |
| `VISUAL_GUIDE.md` | UI visual reference |
| `package.json` | Dependencies and scripts |
| `docker-compose.yml` | Docker configuration |
| `.env.example` | Environment variables template |

---

## 🎯 Common Commands

### Development
```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run linter
npm run preview      # Preview production build
```

### Docker
```bash
docker-compose up -d              # Start containers
docker-compose down               # Stop containers
docker-compose logs -f            # View logs
docker-compose ps                 # Check status
docker-compose restart            # Restart containers
docker-compose down -v            # Stop and remove volumes
docker-compose up -d --build      # Rebuild and start
```

---

## 📞 Getting Help

1. **Detailed Guide**: See [README.md](./README.md)
2. **Troubleshooting**: Check README.md → Troubleshooting section
3. **Browser Console**: Press F12 → Console tab
4. **Server Logs**: Check terminal output
5. **Docker Logs**: Run `docker-compose logs -f`

---

## ✅ Quick Checklist

### Initial Setup
- [ ] Node.js or Docker installed
- [ ] Project downloaded/cloned
- [ ] Dependencies installed (npm) or containers built (Docker)
- [ ] Server started successfully
- [ ] Dashboard accessible in browser

### Configuration
- [ ] Admin panel accessed
- [ ] Elasticsearch configured
- [ ] Tenable configured
- [ ] Microsoft Defender configured
- [ ] OpenCTI configured
- [ ] All integrations show "Connected"

### Testing
- [ ] Events displayed on dashboard
- [ ] Filters working (Critical, High, Medium)
- [ ] Event details dialog opens
- [ ] Hosts and IPs displayed correctly
- [ ] Status updates working
- [ ] Excel export working
- [ ] PDF export working

---

## 🌐 Default URLs

| Environment | URL |
|-------------|-----|
| Local Development | http://localhost:5173 |
| Docker Deployment | http://localhost |
| Docker (Custom Port) | http://localhost:8080 |

---

## 🔐 Security Notes

- Never commit credentials to version control
- Use environment variables for sensitive data
- Keep dependencies updated
- Monitor logs for suspicious activity
- Follow principle of least privilege
- Regular security audits recommended

---

## 📈 Next Steps

After successful setup:

1. ✅ Explore the dashboard interface
2. ✅ Configure all integrations
3. ✅ Test filtering and searching
4. ✅ Try exporting reports
5. ✅ Review detailed documentation
6. ✅ Set up monitoring and alerts
7. ✅ Train team members on usage

---

**Version**: 1.2.0  
**Last Updated**: December 1, 2025  
**For Detailed Instructions**: See [README.md](./README.md)
