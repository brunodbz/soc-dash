# Integration Testing Guide

This guide provides step-by-step instructions for testing each security tool integration in the SOC Security Dashboard.

## Prerequisites

Before testing integrations, ensure you have:

- [ ] Access to the Admin Panel
- [ ] Valid credentials for each security tool
- [ ] Network connectivity to all security tool APIs
- [ ] Appropriate permissions in each security platform

## Testing Checklist

### 1. Elasticsearch SIEM Integration

#### Test Steps

1. **Navigate to Admin Panel**
   - Go to `/admin`
   - Click on "Integrations" tab
   - Locate "Elastic Search SIEM" card

2. **Configure Credentials**
   ```
   URL: https://your-elastic-instance.com:9200
   Username: elastic
   Password: [your password]
   ```

3. **Enable Integration**
   - Toggle the switch to enable
   - Click "Save Configuration"

4. **Verify Connection**
   - [ ] Status badge shows "connected"
   - [ ] Events count is greater than 0
   - [ ] Last sync timestamp is recent
   - [ ] Integration widget on dashboard shows active

5. **Test Data Flow**
   - [ ] Dashboard displays Elasticsearch events
   - [ ] Events have correct source badge
   - [ ] Event details are complete
   - [ ] Filtering works correctly

#### Expected Results

- ✅ Green "connected" status badge
- ✅ Event count matches Elasticsearch data
- ✅ Recent last sync timestamp
- ✅ Events appear in main dashboard

#### Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection timeout | Verify URL and port (9200) |
| Authentication failed | Check username and password |
| SSL error | Ensure HTTPS is configured correctly |
| No events | Verify Elasticsearch has security event indices |

---

### 2. Tenable Vulnerability Scanner Integration

#### Test Steps

1. **Navigate to Admin Panel**
   - Go to `/admin`
   - Click on "Integrations" tab
   - Locate "Tenable Vulnerability Scanner" card

2. **Configure Credentials**
   ```
   URL: https://cloud.tenable.com
   Access Key: [your access key]
   Secret Key: [your secret key]
   ```

3. **Enable Integration**
   - Toggle the switch to enable
   - Click "Save Configuration"

4. **Verify Connection**
   - [ ] Status badge shows "connected"
   - [ ] Events count is greater than 0
   - [ ] Last sync timestamp is recent
   - [ ] Integration widget on dashboard shows active

5. **Test Data Flow**
   - [ ] Dashboard displays Tenable vulnerability events
   - [ ] Critical vulnerabilities are highlighted
   - [ ] Asset information is correct
   - [ ] Severity levels are accurate

#### Expected Results

- ✅ Green "connected" status badge
- ✅ Vulnerability count matches Tenable.io
- ✅ Recent last sync timestamp
- ✅ Vulnerabilities appear in main dashboard

#### Troubleshooting

| Issue | Solution |
|-------|----------|
| Invalid API keys | Regenerate keys in Tenable.io |
| Rate limit exceeded | Reduce polling frequency |
| Permission denied | Verify API key permissions |
| No vulnerabilities | Run a scan in Tenable.io first |

---

### 3. Microsoft Defender Integration

#### Test Steps

1. **Navigate to Admin Panel**
   - Go to `/admin`
   - Click on "Integrations" tab
   - Locate "Microsoft Defender" card

2. **Configure Credentials**
   ```
   Tenant ID: [your Azure tenant ID]
   Client ID: [your application client ID]
   Client Secret: [your client secret]
   ```

3. **Enable Integration**
   - Toggle the switch to enable
   - Click "Save Configuration"

4. **Verify Connection**
   - [ ] Status badge shows "connected"
   - [ ] Events count is greater than 0
   - [ ] Last sync timestamp is recent
   - [ ] Integration widget on dashboard shows active

5. **Test Data Flow**
   - [ ] Dashboard displays Defender alerts
   - [ ] Endpoint protection events are visible
   - [ ] Threat detection data is accurate
   - [ ] Incident correlation works

#### Expected Results

- ✅ Green "connected" status badge
- ✅ Alert count matches Microsoft Defender portal
- ✅ Recent last sync timestamp
- ✅ Alerts appear in main dashboard

#### Troubleshooting

| Issue | Solution |
|-------|----------|
| Authentication failed | Verify Tenant ID and Client ID |
| Insufficient privileges | Grant API permissions in Azure AD |
| Token expired | Create new client secret |
| No alerts | Check Defender portal for active alerts |

---

### 4. OpenCTI Threat Intelligence Integration

#### Test Steps

1. **Navigate to Admin Panel**
   - Go to `/admin`
   - Click on "Integrations" tab
   - Locate "OpenCTI Threat Intelligence" card

2. **Configure Credentials**
   ```
   URL: https://your-opencti-instance.com
   API Token: [your API token]
   ```

3. **Enable Integration**
   - Toggle the switch to enable
   - Click "Save Configuration"

4. **Verify Connection**
   - [ ] Status badge shows "connected"
   - [ ] Events count is greater than 0
   - [ ] Last sync timestamp is recent
   - [ ] Integration widget on dashboard shows active

5. **Test Data Flow**
   - [ ] Dashboard displays threat intelligence data
   - [ ] IOCs are properly formatted
   - [ ] Threat actor information is complete
   - [ ] Attack patterns are visible

#### Expected Results

- ✅ Green "connected" status badge
- ✅ Indicator count matches OpenCTI
- ✅ Recent last sync timestamp
- ✅ Threat intelligence appears in main dashboard

#### Troubleshooting

| Issue | Solution |
|-------|----------|
| Invalid token | Regenerate token in OpenCTI profile |
| Connection timeout | Verify OpenCTI instance is accessible |
| GraphQL errors | Check API token permissions |
| No indicators | Verify OpenCTI has threat data |

---

## Integration Testing Matrix

| Integration | Status | Events | Last Sync | Dashboard |
|-------------|--------|--------|-----------|-----------|
| Elasticsearch | ⬜ | ⬜ | ⬜ | ⬜ |
| Tenable | ⬜ | ⬜ | ⬜ | ⬜ |
| Microsoft Defender | ⬜ | ⬜ | ⬜ | ⬜ |
| OpenCTI | ⬜ | ⬜ | ⬜ | ⬜ |

**Legend**: ⬜ Not Tested | ✅ Passed | ❌ Failed

---

## End-to-End Testing

### Complete Workflow Test

1. **Configure All Integrations**
   - [ ] All four integrations configured
   - [ ] All integrations enabled
   - [ ] All showing "connected" status

2. **Verify Dashboard Display**
   - [ ] All integration widgets show active status
   - [ ] Total event count is sum of all sources
   - [ ] Events from all sources are visible
   - [ ] Filtering works across all sources

3. **Test Event Correlation**
   - [ ] Events are properly categorized
   - [ ] Severity levels are consistent
   - [ ] Timestamps are accurate
   - [ ] Source badges are correct

4. **Test Export Functionality**
   - [ ] Excel export includes all sources
   - [ ] PDF export shows all integrations
   - [ ] Filtered exports work correctly
   - [ ] Export files are properly formatted

5. **Test Admin Functions**
   - [ ] Can disable/enable integrations
   - [ ] Configuration changes persist
   - [ ] Status updates in real-time
   - [ ] User management works

---

## Performance Testing

### Load Testing

1. **High Event Volume**
   - [ ] Dashboard handles 1000+ events
   - [ ] Filtering remains responsive
   - [ ] Export completes successfully
   - [ ] No memory leaks

2. **Multiple Concurrent Users**
   - [ ] Multiple users can access dashboard
   - [ ] Configuration changes don't conflict
   - [ ] Export doesn't block other operations
   - [ ] Real-time updates work for all users

3. **Network Resilience**
   - [ ] Handles temporary network failures
   - [ ] Reconnects automatically
   - [ ] Shows appropriate error messages
   - [ ] Doesn't crash on connection loss

---

## Security Testing

### Credential Security

1. **Password Masking**
   - [ ] Passwords are masked in UI
   - [ ] Secrets are not visible in browser console
   - [ ] API keys are not logged
   - [ ] Credentials are encrypted in storage

2. **Access Control**
   - [ ] Only admins can modify integrations
   - [ ] Analysts have read-only access
   - [ ] Managers cannot change configuration
   - [ ] Unauthorized access is blocked

3. **API Security**
   - [ ] HTTPS is enforced
   - [ ] SSL certificates are validated
   - [ ] API tokens are not exposed
   - [ ] Rate limiting is respected

---

## Automated Testing Script

```bash
#!/bin/bash

echo "SOC Dashboard Integration Testing"
echo "=================================="
echo ""

# Test Elasticsearch
echo "Testing Elasticsearch..."
curl -s -o /dev/null -w "%{http_code}" https://your-elastic-instance.com:9200/_cluster/health
if [ $? -eq 0 ]; then
    echo "✅ Elasticsearch: Connected"
else
    echo "❌ Elasticsearch: Failed"
fi

# Test Tenable
echo "Testing Tenable..."
curl -s -o /dev/null -w "%{http_code}" -H "X-ApiKeys: accessKey=YOUR_KEY; secretKey=YOUR_SECRET" https://cloud.tenable.com/scans
if [ $? -eq 0 ]; then
    echo "✅ Tenable: Connected"
else
    echo "❌ Tenable: Failed"
fi

# Test Microsoft Defender
echo "Testing Microsoft Defender..."
# OAuth token test would go here
echo "⚠️  Defender: Manual verification required"

# Test OpenCTI
echo "Testing OpenCTI..."
curl -s -o /dev/null -w "%{http_code}" -H "Authorization: Bearer YOUR_TOKEN" https://your-opencti-instance.com/graphql
if [ $? -eq 0 ]; then
    echo "✅ OpenCTI: Connected"
else
    echo "❌ OpenCTI: Failed"
fi

echo ""
echo "Testing complete!"
```

---

## Test Report Template

```markdown
# Integration Test Report

**Date**: [Date]
**Tester**: [Name]
**Environment**: [Dev/Staging/Production]

## Test Results

### Elasticsearch SIEM
- Status: [Pass/Fail]
- Events Retrieved: [Count]
- Issues: [None/Description]

### Tenable
- Status: [Pass/Fail]
- Vulnerabilities Retrieved: [Count]
- Issues: [None/Description]

### Microsoft Defender
- Status: [Pass/Fail]
- Alerts Retrieved: [Count]
- Issues: [None/Description]

### OpenCTI
- Status: [Pass/Fail]
- Indicators Retrieved: [Count]
- Issues: [None/Description]

## Overall Assessment
[Summary of test results]

## Recommendations
[Any recommendations for improvements]
```

---

## Support

For issues during testing:

1. Check [CONFIGURATION.md](./CONFIGURATION.md) for setup details
2. Review [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues
3. Consult vendor documentation for API-specific problems
4. Contact your system administrator for credential issues

---

**Last Updated**: 2025-12-01  
**Version**: 1.0.0
