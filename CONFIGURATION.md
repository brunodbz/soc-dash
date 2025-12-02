# SOC Security Dashboard - Configuration Guide

## Integration Configuration

This guide explains how to configure each security tool integration in the SOC Security Dashboard.

## Table of Contents

1. [Elasticsearch SIEM](#elasticsearch-siem)
2. [Tenable Vulnerability Scanner](#tenable-vulnerability-scanner)
3. [Microsoft Defender](#microsoft-defender)
4. [OpenCTI Threat Intelligence](#opencti-threat-intelligence)
5. [Environment Variables](#environment-variables)
6. [Security Best Practices](#security-best-practices)

---

## Elasticsearch SIEM

### Required Credentials

| Field | Description | Example |
|-------|-------------|---------|
| **URL** | Elasticsearch instance URL with port | `https://elastic.example.com:9200` |
| **Username** | Elasticsearch username | `elastic` |
| **Password** | Elasticsearch password | `your_secure_password` |

### Configuration Steps

1. Navigate to **Admin Panel** → **Integrations**
2. Locate the **Elastic Search SIEM** card
3. Enable the integration using the toggle switch
4. Fill in the required fields:
   - **Elasticsearch URL**: Your Elasticsearch instance endpoint
   - **Username**: Authentication username (typically `elastic`)
   - **Password**: Your Elasticsearch password
5. Click **Save Configuration**

### Environment Variables

```bash
ELASTICSEARCH_URL=https://your-elastic-instance.com:9200
ELASTICSEARCH_USERNAME=elastic
ELASTICSEARCH_PASSWORD=your_elastic_password
```

### API Endpoints Used

- `GET /_cluster/health` - Check cluster status
- `GET /_search` - Query security events
- `GET /_cat/indices` - List available indices

### Troubleshooting

- **Connection Failed**: Verify the URL includes the correct port (usually 9200)
- **Authentication Error**: Ensure username and password are correct
- **SSL Certificate Error**: Use HTTPS and verify SSL certificates are valid

---

## Tenable Vulnerability Scanner

### Required Credentials

| Field | Description | Example |
|-------|-------------|---------|
| **URL** | Tenable instance URL | `https://cloud.tenable.com` |
| **Access Key** | Tenable API access key | `abc123...` |
| **Secret Key** | Tenable API secret key | `xyz789...` |

### Configuration Steps

1. Navigate to **Admin Panel** → **Integrations**
2. Locate the **Tenable Vulnerability Scanner** card
3. Enable the integration using the toggle switch
4. Fill in the required fields:
   - **Tenable URL**: Your Tenable instance URL
   - **Access Key**: Your API access key
   - **Secret Key**: Your API secret key
5. Click **Save Configuration**

### Obtaining API Keys

1. Log in to your Tenable.io account
2. Navigate to **Settings** → **My Account** → **API Keys**
3. Click **Generate** to create new API keys
4. Copy both the Access Key and Secret Key immediately (Secret Key is only shown once)

### Environment Variables

```bash
TENABLE_ACCESS_KEY=your_tenable_access_key
TENABLE_SECRET_KEY=your_tenable_secret_key
TENABLE_URL=https://cloud.tenable.com
```

### API Endpoints Used

- `GET /vulnerabilities` - Retrieve vulnerability data
- `GET /scans` - List scan results
- `GET /assets` - Get asset information

### Troubleshooting

- **Invalid API Keys**: Regenerate keys in Tenable.io settings
- **Rate Limiting**: Tenable has API rate limits; reduce polling frequency
- **Permission Denied**: Ensure API keys have appropriate permissions

---

## Microsoft Defender

### Required Credentials

| Field | Description | Example |
|-------|-------------|---------|
| **Tenant ID** | Azure AD tenant ID | `12345678-1234-1234-1234-123456789abc` |
| **Client ID** | Application (client) ID | `87654321-4321-4321-4321-cba987654321` |
| **Client Secret** | Application client secret | `your_client_secret` |

### Configuration Steps

1. Navigate to **Admin Panel** → **Integrations**
2. Locate the **Microsoft Defender** card
3. Enable the integration using the toggle switch
4. Fill in the required fields:
   - **Azure Tenant ID**: Your Azure AD tenant ID
   - **Client ID**: Your application client ID
   - **Client Secret**: Your application secret
5. Click **Save Configuration**

### Setting Up Azure AD Application

1. **Register Application**:
   - Go to Azure Portal → Azure Active Directory → App registrations
   - Click **New registration**
   - Name: "SOC Dashboard Integration"
   - Click **Register**

2. **Get Tenant ID and Client ID**:
   - After registration, copy the **Application (client) ID**
   - Copy the **Directory (tenant) ID**

3. **Create Client Secret**:
   - Go to **Certificates & secrets**
   - Click **New client secret**
   - Add description and set expiration
   - Copy the secret value immediately (shown only once)

4. **Configure API Permissions**:
   - Go to **API permissions**
   - Add permissions for Microsoft Graph and Microsoft Defender APIs:
     - `SecurityEvents.Read.All`
     - `SecurityAlert.Read.All`
     - `ThreatIndicators.Read.All`
   - Grant admin consent

### Environment Variables

```bash
DEFENDER_TENANT_ID=your_azure_tenant_id
DEFENDER_CLIENT_ID=your_client_id
DEFENDER_CLIENT_SECRET=your_client_secret
```

### API Endpoints Used

- `POST /oauth2/v2.0/token` - Authentication
- `GET /api/alerts` - Retrieve security alerts
- `GET /api/machines` - Get endpoint information
- `GET /api/incidents` - Fetch security incidents

### Troubleshooting

- **Authentication Failed**: Verify Tenant ID and Client ID are correct
- **Insufficient Privileges**: Ensure API permissions are granted and admin consent is provided
- **Secret Expired**: Client secrets expire; create a new one if expired

---

## OpenCTI Threat Intelligence

### Required Credentials

| Field | Description | Example |
|-------|-------------|---------|
| **URL** | OpenCTI instance URL | `https://opencti.example.com` |
| **API Token** | OpenCTI API authentication token | `your_api_token` |

### Configuration Steps

1. Navigate to **Admin Panel** → **Integrations**
2. Locate the **OpenCTI Threat Intelligence** card
3. Enable the integration using the toggle switch
4. Fill in the required fields:
   - **OpenCTI URL**: Your OpenCTI instance URL
   - **API Token**: Your authentication token
5. Click **Save Configuration**

### Generating API Token

1. Log in to your OpenCTI instance
2. Click on your profile icon (top right)
3. Go to **Profile** → **API Access**
4. Click **Create Token**
5. Set token name and permissions
6. Copy the generated token

### Environment Variables

```bash
OPENCTI_URL=https://your-opencti-instance.com
OPENCTI_TOKEN=your_opencti_api_token
```

### API Endpoints Used

- `POST /graphql` - GraphQL API for threat intelligence queries
- Query types:
  - Indicators of Compromise (IOCs)
  - Threat actors
  - Attack patterns
  - Vulnerabilities

### Troubleshooting

- **Invalid Token**: Regenerate token in OpenCTI profile settings
- **Connection Timeout**: Verify OpenCTI instance is accessible
- **GraphQL Errors**: Check query syntax and permissions

---

## Environment Variables

### Setup Instructions

1. **Create Environment File**:
   ```bash
   cp .env.example .env
   ```

2. **Edit Configuration**:
   ```bash
   nano .env  # or use your preferred editor
   ```

3. **Fill in Credentials**:
   Replace all placeholder values with your actual credentials

4. **Secure the File**:
   ```bash
   chmod 600 .env
   ```

### Docker Environment Variables

When using Docker, pass environment variables in `docker-compose.yml`:

```yaml
services:
  soc-dashboard:
    environment:
      - ELASTICSEARCH_URL=${ELASTICSEARCH_URL}
      - ELASTICSEARCH_USERNAME=${ELASTICSEARCH_USERNAME}
      - ELASTICSEARCH_PASSWORD=${ELASTICSEARCH_PASSWORD}
      - TENABLE_ACCESS_KEY=${TENABLE_ACCESS_KEY}
      - TENABLE_SECRET_KEY=${TENABLE_SECRET_KEY}
      - TENABLE_URL=${TENABLE_URL}
      - DEFENDER_TENANT_ID=${DEFENDER_TENANT_ID}
      - DEFENDER_CLIENT_ID=${DEFENDER_CLIENT_ID}
      - DEFENDER_CLIENT_SECRET=${DEFENDER_CLIENT_SECRET}
      - OPENCTI_URL=${OPENCTI_URL}
      - OPENCTI_TOKEN=${OPENCTI_TOKEN}
```

---

## Security Best Practices

### Credential Management

1. **Never Commit Secrets**:
   - Add `.env` to `.gitignore`
   - Never commit credentials to version control
   - Use `.env.example` for templates only

2. **Use Secret Management**:
   - Production: Use Azure Key Vault, AWS Secrets Manager, or HashiCorp Vault
   - Development: Use `.env` files with restricted permissions

3. **Rotate Credentials Regularly**:
   - Change passwords every 90 days
   - Rotate API keys quarterly
   - Update client secrets before expiration

4. **Principle of Least Privilege**:
   - Grant only necessary permissions
   - Use read-only access where possible
   - Create dedicated service accounts

### Network Security

1. **Use HTTPS Only**:
   - All API endpoints must use HTTPS
   - Verify SSL certificates
   - Disable insecure protocols

2. **Firewall Configuration**:
   - Whitelist SOC Dashboard IP addresses
   - Restrict access to security tool APIs
   - Use VPN for remote access

3. **API Rate Limiting**:
   - Implement rate limiting on API calls
   - Monitor for unusual activity
   - Set up alerts for failed authentication attempts

### Monitoring and Auditing

1. **Log All Configuration Changes**:
   - Track who modified integration settings
   - Log credential updates
   - Monitor access patterns

2. **Regular Security Audits**:
   - Review active integrations monthly
   - Audit user permissions quarterly
   - Test disaster recovery procedures

3. **Alert on Anomalies**:
   - Failed authentication attempts
   - Unusual API usage patterns
   - Configuration changes outside maintenance windows

---

## Testing Integrations

### Connection Testing

After configuring each integration, verify connectivity:

1. **Check Status Indicator**:
   - Green badge = Connected
   - Red badge = Disconnected
   - Yellow badge = Error

2. **Review Event Counts**:
   - Ensure events are being ingested
   - Compare with source system counts
   - Monitor for data gaps

3. **Test Data Synchronization**:
   - Verify last sync timestamp updates
   - Check for recent events in dashboard
   - Validate data accuracy

### Troubleshooting Checklist

- [ ] Credentials are correct and not expired
- [ ] URLs are accessible from the dashboard server
- [ ] Firewall rules allow outbound connections
- [ ] SSL certificates are valid
- [ ] API permissions are properly configured
- [ ] Rate limits are not exceeded
- [ ] Service accounts are active

---

## Support

For additional help:

1. Check the main [README.md](./README.md) for general information
2. Review [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment issues
3. Consult vendor documentation for specific API issues
4. Contact your system administrator for credential-related questions

---

**Last Updated**: 2025-12-01  
**Version**: 1.0.0
