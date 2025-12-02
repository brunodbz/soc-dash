# SOC Security Dashboard - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Option 1: Docker (Recommended)

```bash
# Start the application
docker-compose up -d

# Access the dashboard
# Open browser: http://localhost
```

### Option 2: Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Access the dashboard
# Open browser: http://localhost:5173
```

## 📱 Application Overview

### Main Dashboard (/)
The main dashboard displays:
- **Statistics Cards** - Total events, critical events, high priority, resolved today
- **Integration Status** - Real-time status of all 4 security integrations
- **Security Events** - Filterable list of security incidents
- **Export Options** - Download reports in Excel or PDF format

### Admin Panel (/admin)
The administration panel provides:
- **Integration Management** - Configure API endpoints and enable/disable sources
- **User Management** - View and manage user accounts
- **Role Permissions** - Configure access control for different user roles

## 🎯 Key Features

### Filtering Events
Click on the tabs to filter events by severity:
- **All Events** - Show all security events
- **Critical** - Show only critical severity events
- **High** - Show only high severity events
- **Medium** - Show only medium severity events

### Viewing Event Details
1. Click "View Details" on any event card
2. Review complete event information
3. Update event status (Open, Investigating, Resolved, Closed)

### Exporting Reports
1. Filter events as needed
2. Click "Export Excel" or "Export PDF"
3. Report will download automatically

### Managing Integrations
1. Navigate to Admin Panel
2. Click on "Integrations" tab
3. Toggle integrations on/off
4. Update API endpoints
5. Click "Save Configuration"

## 🔐 User Roles

### Admin
- Full access to all features
- Can configure integrations
- Can manage users

### Analyst
- Can view and update events
- Can export reports
- Limited admin access

### Manager
- Read-only access
- Can view dashboard and reports
- Cannot modify settings

## 🎨 Interface Features

### Dark Theme
The dashboard uses a professional dark theme optimized for SOC operations. The theme is enabled by default.

### Severity Colors
- 🔴 **Red** - Critical events requiring immediate attention
- 🟠 **Orange** - High priority events
- 🟡 **Yellow** - Medium priority events
- 🟢 **Green** - Low priority events
- 🔵 **Blue** - Informational events

### Real-time Updates
- Integration status updates automatically
- Event counts refresh in real-time
- Active integrations show pulse indicator

## 📊 Understanding the Dashboard

### Statistics Cards
- **Total Events** - All security events across all sources
- **Critical Events** - Events requiring immediate action
- **High Priority** - Important events needing attention
- **Resolved Today** - Events resolved in the last 24 hours

### Integration Widgets
Each widget shows:
- Integration name and icon
- Connection status (Connected/Disconnected/Error)
- Total events from this source
- Last synchronization time
- Active/Inactive indicator

### Event Cards
Each event card displays:
- Event title and description
- Severity level with color coding
- Source system
- Current status
- Category and affected assets
- Timestamp
- Related tags

## 🛠️ Troubleshooting

### Dashboard not loading?
1. Check if the server is running
2. Verify network connection
3. Clear browser cache
4. Try refreshing the page

### Export not working?
1. Ensure you have events to export
2. Check browser popup blocker settings
3. Verify sufficient disk space

### Integration showing disconnected?
This is expected behavior with mock data. In production, configure actual API endpoints in the Admin Panel.

## 📚 Next Steps

1. **Explore the Dashboard** - Familiarize yourself with the interface
2. **Review Events** - Check critical and high priority events
3. **Test Exports** - Try exporting reports in both formats
4. **Visit Admin Panel** - Review integration and user settings
5. **Read Full Documentation** - See README.md for detailed information

## 🔗 Quick Links

- Main Dashboard: http://localhost (or http://localhost:5173 for dev)
- Admin Panel: http://localhost/admin (or http://localhost:5173/admin for dev)
- Full Documentation: [README.md](./README.md)
- Deployment Guide: [DEPLOYMENT.md](./DEPLOYMENT.md)

## 💡 Tips

- Use keyboard shortcuts to navigate quickly
- Bookmark frequently used filters
- Export reports regularly for compliance
- Monitor integration status daily
- Review critical events immediately
- Update event statuses to track progress

---

**Need Help?** Refer to the full README.md or contact your system administrator.
