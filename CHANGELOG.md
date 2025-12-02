# Changelog

All notable changes to the SOC Security Dashboard project.

## [1.2.0] - 2025-12-01

### Added - Affected Hosts and IPs Display

#### New Features
- **Hosts and IPs Visibility**: Security event cards now display affected hosts and IP addresses
  - Single host/IP: Displayed directly on the card
  - Multiple hosts/IPs: Shown as clickable count that opens detailed dialog

- **AffectedHostsDialog Component**: New popup dialog for viewing all affected systems
  - Separate sections for hosts and IP addresses
  - Numbered list with monospace font
  - Scrollable content for long lists
  - Summary count at bottom

- **Enhanced Event Details**: Event details dialog now includes:
  - Complete list of affected hosts
  - Complete list of affected IP addresses
  - Scrollable sections with visual styling

- **Export Enhancements**:
  - Excel exports include "Affected Hosts" and "Affected IPs" columns
  - PDF exports show host and IP counts
  - Optimized column widths for readability

#### Changed
- **Type System Updates**:
  - Added `affectedHosts: string[]` to SecurityEvent interface
  - Added `affectedIPs: string[]` to SecurityEvent interface

- **Mock Data Updates**:
  - All 8 mock events now include realistic hostnames
  - All 8 mock events now include realistic IP addresses
  - Variety of scenarios: single system, multiple systems, network-wide

- **UI Improvements**:
  - Added Server icon for hosts display
  - Added Network icon for IPs display
  - Clickable links with hover effects
  - Better visual hierarchy

#### Documentation
- Added HOSTS_IPS_FEATURE.md with complete feature documentation
- Updated CHANGELOG.md with version 1.2.0 details

### Technical Details

#### Files Added
- `src/components/security/AffectedHostsDialog.tsx` - New dialog component

#### Files Modified
- `src/types/security.ts` - Added affectedHosts and affectedIPs fields
- `src/services/securityService.ts` - Updated all mock events
- `src/components/security/SecurityEventCard.tsx` - Added hosts/IPs display
- `src/components/security/EventDetailsDialog.tsx` - Added hosts/IPs sections
- `src/services/exportService.ts` - Updated Excel and PDF exports

#### User Experience
- Progressive disclosure: summary on card, details on click
- Intuitive interaction: clickable counts for multiple systems
- Consistent styling across all components
- Responsive design for all screen sizes

---

## [1.1.0] - 2025-12-01

### Added - Integration Credential Management

#### New Features
- **Credential-Specific Configuration Forms**: Each security integration now has a dedicated configuration form with appropriate credential fields
  - Elasticsearch: URL, Username, Password
  - Tenable: URL, Access Key, Secret Key
  - Microsoft Defender: Tenant ID, Client ID, Client Secret
  - OpenCTI: URL, API Token

- **Enhanced Security Components**:
  - `IntegrationConfigForms.tsx`: New component with four specialized forms
  - Password field masking for sensitive credentials
  - Contextual help text for each credential field
  - Example values to guide configuration

- **Comprehensive Documentation**:
  - `CONFIGURATION.md`: Complete guide for configuring each integration
  - `INTEGRATION_TESTING.md`: Step-by-step testing procedures
  - `.env.example`: Environment variable template
  - Updated README with configuration section

#### Changed
- **Type System Updates**:
  - Added `ElasticsearchConfig`, `TenableConfig`, `DefenderConfig`, `OpenCTIConfig` interfaces
  - Updated `IntegrationConfig` to use `credentials` field instead of generic `apiEndpoint`
  - Added `IntegrationCredentials` union type

- **Admin Panel Enhancements**:
  - Replaced generic API endpoint input with integration-specific forms
  - Added security alert about credential encryption
  - Improved visual layout for credential fields
  - Enhanced user experience with better form organization

- **Mock Data Updates**:
  - Updated mock integrations with credential structure
  - Added masked credential values for demonstration
  - Improved realism of mock data

#### Documentation
- Added detailed configuration guide for all four integrations
- Created integration testing guide with checklists
- Added environment variable template
- Updated project summary and features list
- Enhanced README with configuration section

### Technical Details

#### Files Added
- `src/components/security/IntegrationConfigForms.tsx`
- `CONFIGURATION.md`
- `INTEGRATION_TESTING.md`
- `.env.example`
- `CHANGELOG.md`

#### Files Modified
- `src/types/security.ts` - Updated type definitions
- `src/services/securityService.ts` - Updated mock data structure
- `src/pages/AdminPanel.tsx` - Integrated new credential forms
- `README.md` - Added configuration section
- `PROJECT_SUMMARY.md` - Updated feature descriptions
- `FEATURES.md` - Added credential management features

#### Breaking Changes
- `IntegrationConfig.apiEndpoint` replaced with `IntegrationConfig.credentials`
- Existing integrations need to be reconfigured with new credential format

#### Migration Guide
If upgrading from version 1.0.0:

1. Update integration configurations in Admin Panel
2. Fill in credential-specific fields for each integration
3. Remove old `apiEndpoint` references if any custom code exists
4. Update environment variables to match new format

---

## [1.0.0] - 2025-12-01

### Initial Release

#### Core Features
- **Security Data Integration**: Support for Elasticsearch SIEM, Tenable, Microsoft Defender, and OpenCTI
- **Correlation Dashboard**: Unified view of security events from all sources
- **Administration Panel**: Integration and user management
- **Export Functionality**: Excel and PDF report generation
- **Docker Deployment**: Complete containerization with docker-compose

#### Components
- Dashboard page with filtering and statistics
- Admin panel with integration management
- Security event cards with severity indicators
- Integration status widgets
- Event details dialog
- Export service for reports

#### Documentation
- README.md with project overview
- DEPLOYMENT.md for Docker setup
- QUICK_START.md for getting started
- PROJECT_SUMMARY.md for technical details
- FEATURES.md with complete feature checklist

#### Design
- Professional dark theme optimized for SOC operations
- Color-coded severity levels (Critical: Red, High: Orange, Medium: Yellow)
- Responsive desktop-first design
- Modern UI with shadcn/ui components

#### Technical Stack
- React 18 + TypeScript
- Vite build tool
- Tailwind CSS + shadcn/ui
- React Router for navigation
- xlsx and jspdf for exports

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.1.0 | 2025-12-01 | Added credential-specific integration forms |
| 1.0.0 | 2025-12-01 | Initial release with core features |

---

## Upcoming Features

### Planned for v1.2.0
- Real API integration implementation
- WebSocket support for real-time updates
- Advanced filtering with date ranges
- Dashboard customization options
- Email/SMS alert notifications

### Planned for v2.0.0
- Historical analytics and trend analysis
- Multi-tenancy support
- Advanced RBAC with granular permissions
- Custom report templates
- Integration with additional security tools

---

## Support

For questions or issues:
- Review documentation in the repository
- Check CONFIGURATION.md for setup help
- See INTEGRATION_TESTING.md for testing procedures
- Contact your system administrator

---

**Maintained by**: SOC Dashboard Team  
**License**: Proprietary  
**Last Updated**: 2025-12-01
