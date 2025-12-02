# Welcome to Your Miaoda Project
Miaoda Application Link URL
    URL:https://medo.dev/projects/app-7xqkk8c04h6p

# SOC Security Dashboard

A comprehensive Security Operations Center (SOC) dashboard that integrates multiple security tools to provide unified visibility and correlation of security events.

## Overview

The SOC Security Dashboard aggregates data from multiple security platforms including Elastic Search SIEM, Tenable.com, Microsoft Defender, and OpenCTI to display critical and highly critical security incidents in a centralized, easy-to-use interface.

## Features

### 🔒 Security Data Integration
- **Elastic Search SIEM** - Log analysis and security event monitoring
- **Tenable.com** - Vulnerability management data
- **Microsoft Defender** - Endpoint protection and threat detection
- **OpenCTI** - Threat intelligence information
- Real-time data synchronization from all integrated sources

### 📊 Correlation Dashboard
- Unified dashboard displaying correlated security information
- Priority-based filtering (Critical, High, Medium, Low)
- Visual representation with severity indicators
- Real-time status updates
- Interactive event cards with detailed information

### ⚙️ Administration Panel
- Configuration interface for data ingestion sources
- Integration settings management
- User access control with role-based permissions
- Read-only access for managers
- Full administrative controls for admins

### 📤 Export Functionality
- Export security reports to Excel format
- Export security reports to PDF format
- Customizable export templates
- Filtered exports based on severity and date range

### 🐳 Docker Deployment
- Docker-based deployment architecture
- Docker Compose configuration for easy installation
- Support for containerized updates
- Health checks and monitoring

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **UI Framework**: shadcn/ui + Tailwind CSS
- **Build Tool**: Vite
- **Export Libraries**: xlsx, jspdf
- **Deployment**: Docker + Docker Compose

## Quick Start

### Prerequisites

```bash
Node.js >= 20
npm >= 10
# Or
Docker >= 20.10
Docker Compose >= 2.0
```

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Access the application**
   ```
   http://localhost:5173
   ```

### Docker Deployment

1. **Build and start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Access the application**
   ```
   http://localhost
   ```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## Configuration

### Integration Setup

The dashboard supports four security tool integrations, each with specific credential requirements:

1. **Elasticsearch SIEM** - URL, Username, Password
2. **Tenable** - URL, Access Key, Secret Key  
3. **Microsoft Defender** - Tenant ID, Client ID, Client Secret
4. **OpenCTI** - URL, API Token

For detailed configuration instructions, see [CONFIGURATION.md](./CONFIGURATION.md)

### Quick Configuration

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and fill in your credentials

3. Configure integrations via the Admin Panel UI

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── security/          # Security-specific components
│   │   │   ├── SecurityEventCard.tsx
│   │   │   ├── IntegrationWidget.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   └── EventDetailsDialog.tsx
│   │   ├── ui/                # shadcn/ui components
│   │   └── common/            # Common components (Header, Footer)
│   ├── pages/
│   │   ├── Dashboard.tsx      # Main dashboard page
│   │   └── AdminPanel.tsx     # Administration panel
│   ├── services/
│   │   ├── securityService.ts # Security data service
│   │   └── exportService.ts   # Export functionality
│   ├── types/
│   │   └── security.ts        # TypeScript type definitions
│   ├── routes.tsx             # Route configuration
│   └── App.tsx                # Main application component
├── Dockerfile                 # Docker configuration
├── docker-compose.yml         # Docker Compose configuration
├── nginx.conf                 # Nginx configuration
└── DEPLOYMENT.md              # Deployment documentation
```

## User Roles

### Admin
- Full access to all features
- Configure integrations
- Manage users
- Export reports
- Update event statuses

### Analyst
- View and manage security events
- Update event statuses
- Export reports
- Limited configuration access

### Manager
- Read-only access to dashboard
- View security events
- View reports
- No configuration or status update permissions

## Design System

The dashboard uses a professional dark theme optimized for SOC operations:

- **Primary Color**: Blue (#1E3A8A) - Professional security operations appearance
- **Critical Alerts**: Red (#DC2626) - High-priority threats
- **High Priority**: Orange (#F59E0B) - Important warnings
- **Layout**: Grid-based modular design
- **Typography**: Monospaced fonts for technical data
- **Border Radius**: 4px for consistent rounded corners

## Security Considerations

- All sensitive data should be handled securely
- API endpoints should be properly authenticated
- Regular security audits recommended
- Follow principle of least privilege for user access
- Monitor logs for suspicious activity
- Keep dependencies updated

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

### Adding New Security Sources

1. Update `src/types/security.ts` with new source type
2. Add integration configuration in `src/services/securityService.ts`
3. Create widget component in `src/components/security/`
4. Update dashboard to display new source

## Mock Data

The application currently uses mock data services since it cannot connect to actual security tools. In a production environment, replace the mock services in `src/services/securityService.ts` with actual API integrations.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary software.

## Support

For issues, questions, or feature requests, please refer to the deployment documentation or contact your system administrator.

---

**Note**: This dashboard uses simulated data for demonstration purposes. In a production environment, configure actual integrations with your security tools through the Admin Panel.
