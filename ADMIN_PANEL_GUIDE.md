# Admin Panel User Guide

## Accessing the Admin Panel

Navigate to the Admin Panel by clicking "Admin" in the navigation menu or visiting `/admin`.

## Overview

The Admin Panel provides two main sections:
1. **Integrations** - Configure security tool connections
2. **Users** - Manage user accounts and permissions

---

## Integration Configuration

### Layout

Each integration is displayed as a card with:
- Integration name and icon
- Enable/disable toggle switch
- Credential configuration form
- Connection status
- Event count
- Last sync timestamp
- Save button

### Configuring Integrations

#### Step 1: Enable the Integration

Toggle the switch in the top-right corner of the integration card to enable it.

#### Step 2: Enter Credentials

Fill in the credential fields specific to each integration:

---

### Elasticsearch SIEM Configuration

```
┌─────────────────────────────────────────────────┐
│ 🗄️  Elastic Search SIEM              [ON] ●    │
│     ELASTICSEARCH Integration                   │
├─────────────────────────────────────────────────┤
│                                                 │
│ Elasticsearch URL                               │
│ ┌─────────────────────────────────────────────┐ │
│ │ https://elastic.example.com:9200            │ │
│ └─────────────────────────────────────────────┘ │
│ Example: https://your-elastic-instance.com:9200│
│                                                 │
│ Username                                        │
│ ┌─────────────────────────────────────────────┐ │
│ │ elastic                                     │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ Password                                        │
│ ┌─────────────────────────────────────────────┐ │
│ │ ••••••••••••                                │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ ─────────────────────────────────────────────── │
│                                                 │
│ Status: [Connected]    Events: 1,247           │
│ Last Sync: 12/1/2025, 10:30:00 AM              │
│                                                 │
│          [💾 Save Configuration]                │
└─────────────────────────────────────────────────┘
```

**Required Information:**
- **URL**: Your Elasticsearch instance endpoint (include port 9200)
- **Username**: Elasticsearch username (typically "elastic")
- **Password**: Your Elasticsearch password

**Where to Find:**
- URL: From your Elasticsearch deployment
- Credentials: From your Elasticsearch administrator

---

### Tenable Configuration

```
┌─────────────────────────────────────────────────┐
│ 🛡️  Tenable Vulnerability Scanner    [ON] ●    │
│     TENABLE Integration                         │
├─────────────────────────────────────────────────┤
│                                                 │
│ Tenable URL                                     │
│ ┌─────────────────────────────────────────────┐ │
│ │ https://cloud.tenable.com                   │ │
│ └─────────────────────────────────────────────┘ │
│ Example: https://cloud.tenable.com             │
│                                                 │
│ Access Key                                      │
│ ┌─────────────────────────────────────────────┐ │
│ │ ••••••••••••                                │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ Secret Key                                      │
│ ┌─────────────────────────────────────────────┐ │
│ │ ••••••••••••                                │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ ─────────────────────────────────────────────── │
│                                                 │
│ Status: [Connected]    Events: 523             │
│ Last Sync: 12/1/2025, 10:25:00 AM              │
│                                                 │
│          [💾 Save Configuration]                │
└─────────────────────────────────────────────────┘
```

**Required Information:**
- **URL**: Tenable instance URL (usually https://cloud.tenable.com)
- **Access Key**: Your Tenable API access key
- **Secret Key**: Your Tenable API secret key

**Where to Find:**
1. Log in to Tenable.io
2. Go to Settings → My Account → API Keys
3. Click "Generate" to create new keys
4. Copy both keys immediately (secret shown only once)

---

### Microsoft Defender Configuration

```
┌─────────────────────────────────────────────────┐
│ 📊  Microsoft Defender               [ON] ●    │
│     DEFENDER Integration                        │
├─────────────────────────────────────────────────┤
│                                                 │
│ Azure Tenant ID                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ 12345678-1234-1234-1234-123456789abc        │ │
│ └─────────────────────────────────────────────┘ │
│ Your Azure Active Directory tenant ID          │
│                                                 │
│ Client ID                                       │
│ ┌─────────────────────────────────────────────┐ │
│ │ 87654321-4321-4321-4321-cba987654321        │ │
│ └─────────────────────────────────────────────┘ │
│ Application (client) ID from Azure AD          │
│                                                 │
│ Client Secret                                   │
│ ┌─────────────────────────────────────────────┐ │
│ │ ••••••••••••                                │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ ─────────────────────────────────────────────── │
│                                                 │
│ Status: [Connected]    Events: 892             │
│ Last Sync: 12/1/2025, 10:32:00 AM              │
│                                                 │
│          [💾 Save Configuration]                │
└─────────────────────────────────────────────────┘
```

**Required Information:**
- **Tenant ID**: Your Azure AD tenant ID (UUID format)
- **Client ID**: Application client ID (UUID format)
- **Client Secret**: Application secret value

**Where to Find:**
1. Go to Azure Portal → Azure Active Directory
2. Navigate to App registrations
3. Create or select your application
4. Copy Directory (tenant) ID and Application (client) ID
5. Go to Certificates & secrets → Create new client secret
6. Copy the secret value immediately

---

### OpenCTI Configuration

```
┌─────────────────────────────────────────────────┐
│ 🧠  OpenCTI Threat Intelligence      [ON] ●    │
│     OPENCTI Integration                         │
├─────────────────────────────────────────────────┤
│                                                 │
│ OpenCTI URL                                     │
│ ┌─────────────────────────────────────────────┐ │
│ │ https://opencti.example.com                 │ │
│ └─────────────────────────────────────────────┘ │
│ Example: https://your-opencti-instance.com     │
│                                                 │
│ API Token                                       │
│ ┌─────────────────────────────────────────────┐ │
│ │ ••••••••••••                                │ │
│ └─────────────────────────────────────────────┘ │
│ Generate from OpenCTI user profile settings    │
│                                                 │
│ ─────────────────────────────────────────────── │
│                                                 │
│ Status: [Connected]    Events: 345             │
│ Last Sync: 12/1/2025, 10:20:00 AM              │
│                                                 │
│          [💾 Save Configuration]                │
└─────────────────────────────────────────────────┘
```

**Required Information:**
- **URL**: Your OpenCTI instance URL
- **API Token**: OpenCTI API authentication token

**Where to Find:**
1. Log in to your OpenCTI instance
2. Click your profile icon (top right)
3. Go to Profile → API Access
4. Click "Create Token"
5. Set name and permissions
6. Copy the generated token

---

## Understanding Status Indicators

### Connection Status Badges

- **🟢 Connected** - Integration is working properly
- **🔴 Disconnected** - Cannot connect to the service
- **🟡 Error** - Connection issue or authentication failure

### Event Count

Shows the total number of security events retrieved from this integration.

### Last Sync

Displays when the integration last successfully synchronized data.

---

## User Management

### User List

The Users tab displays all user accounts with:
- Username
- Email address
- Role (Admin, Analyst, Manager)
- Last login timestamp
- Edit button

### User Roles

#### Admin
- Full access to all features
- Can configure integrations
- Can manage users
- Can export reports
- Can update event statuses

#### Analyst
- Can view and manage security events
- Can update event statuses
- Can export reports
- Limited configuration access

#### Manager
- Read-only access to dashboard
- Can view security events
- Can view reports
- Cannot modify settings or statuses

---

## Best Practices

### Security

1. **Use Strong Credentials**
   - Generate unique API keys for the dashboard
   - Use dedicated service accounts
   - Rotate credentials regularly

2. **Principle of Least Privilege**
   - Grant only necessary permissions
   - Use read-only access where possible
   - Create separate accounts for different environments

3. **Monitor Access**
   - Review user activity regularly
   - Check integration status daily
   - Audit configuration changes

### Configuration

1. **Test Connections**
   - Verify each integration after configuration
   - Check event counts match source systems
   - Monitor last sync timestamps

2. **Document Settings**
   - Keep a record of configuration details
   - Document any custom settings
   - Note credential rotation dates

3. **Regular Maintenance**
   - Update credentials before expiration
   - Review and remove unused integrations
   - Keep user list current

---

## Troubleshooting

### Integration Shows "Disconnected"

1. Verify credentials are correct
2. Check network connectivity
3. Ensure firewall allows outbound connections
4. Verify SSL certificates are valid
5. Check service account permissions

### "Authentication Failed" Error

1. Regenerate API keys/tokens
2. Verify credentials haven't expired
3. Check for typos in credential fields
4. Ensure correct URL format
5. Verify service account is active

### No Events Appearing

1. Check if integration is enabled
2. Verify source system has events
3. Check last sync timestamp
4. Review integration status
5. Verify API permissions include read access

### Save Button Not Working

1. Ensure all required fields are filled
2. Check for validation errors
3. Verify network connection
4. Try refreshing the page
5. Check browser console for errors

---

## Quick Reference

### Elasticsearch
- Port: 9200
- Protocol: HTTPS
- Auth: Basic (username/password)

### Tenable
- URL: https://cloud.tenable.com
- Auth: API Keys (access + secret)

### Microsoft Defender
- Auth: OAuth 2.0 (tenant + client + secret)
- Requires: Azure AD app registration

### OpenCTI
- Protocol: HTTPS
- Auth: Bearer token
- API: GraphQL

---

## Support

For additional help:
- **Configuration Details**: See [CONFIGURATION.md](./CONFIGURATION.md)
- **Testing Guide**: See [INTEGRATION_TESTING.md](./INTEGRATION_TESTING.md)
- **Architecture**: See [ARCHITECTURE.md](./ARCHITECTURE.md)

---

**Last Updated**: 2025-12-01  
**Version**: 1.1.0
