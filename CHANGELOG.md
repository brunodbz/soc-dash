# Changelog

All notable changes to the SOC Security Dashboard project.

## [1.2.4] - 2025-12-01

### Fixed - Integration Status Display

#### Dashboard Integration Status
- **Fixed**: Disabled integrations now show correct status on Dashboard
  - Added "Disabled" status type to IntegrationWidget
  - Implemented effective status logic (enabled field takes priority over status field)
  - Dashboard now shows "Disabled" badge when integration is toggled off
  - Gray X icon displayed for disabled integrations
  - Status badge correctly reflects integration state

#### Status Priority Logic
- Disabled state (enabled=false) takes priority over connection status
- When enabled=true, shows actual connection status (connected/disconnected/error)
- Clear visual distinction between disabled and disconnected states

#### Admin Panel Improvements
- Updated toggle handler to reload integration data after changes
- Ensures UI stays synchronized with backend state
- Better data consistency across Dashboard and Admin Panel

#### User Experience
- **Before**: Disabled integrations still showed "Connected"
- **After**: Disabled integrations show "Disabled" with gray badge
- Clear visual feedback for integration state changes
- Consistent status display across all pages

#### Files Modified
- `src/components/security/IntegrationWidget.tsx` - Added disabled status and effective status logic
- `src/pages/AdminPanel.tsx` - Improved data refresh after toggle

---

## [1.2.3] - 2025-12-01

### Fixed - React Runtime Error

#### Critical Bug Fix
- **Fixed**: "Cannot read properties of null (reading 'useState')" error
  - Root cause: React types version mismatch (v19 types with v18 runtime)
  - Downgraded @types/react from ^19.2.2 to ^18.3.12
  - Downgraded @types/react-dom from ^19.2.2 to ^18.3.5
  - Cleared Vite dependency cache
  - Application now loads correctly

#### Impact
- **Before**: Application failed to load with critical runtime error
- **After**: All React hooks work correctly, application fully functional

#### Files Modified
- `package.json` - Updated React type definitions to match runtime version

#### Verification
- ✅ Lint check passed (82 files, 0 errors)
- ✅ TypeScript compilation successful
- ✅ All components with hooks now work correctly

---

## [1.2.2] - 2025-12-01

### Fixed - Admin Panel Functionality

#### Integration Configuration
- **Fixed**: Integration configuration now saves and persists correctly
  - Updated `updateIntegration` in securityService to actually update the mock data array
  - Added data reload after save to ensure UI stays in sync
  - Configuration changes now persist across page refreshes

#### User Management
- **Fixed**: User editing now fully functional
  - Added `updateUser` function to securityService
  - Created UserEditDialog component for editing user information
  - Edit button now opens functional dialog
  - Users can update username, email, and role
  - Changes persist and update UI immediately

#### New Component
- **UserEditDialog**: New dialog component for user editing
  - Edit username field
  - Edit email field
  - Change user role (Admin, Analyst, Manager)
  - Role description helper text
  - Form validation
  - Cancel and Save buttons

#### Files Modified
- `src/services/securityService.ts` - Fixed updateIntegration, added updateUser
- `src/pages/AdminPanel.tsx` - Added user editing functionality
- `src/components/security/UserEditDialog.tsx` - New component

#### User Experience
- Success/error toasts provide clear feedback
- Smooth dialog animations
- Proper state management
- Intuitive user interface

---

## [1.2.1] - 2025-12-01

### Added - Comprehensive Installation Documentation

#### New Documentation
- **Enhanced README.md**: Added detailed step-by-step installation guide
  - Complete Node.js installation instructions for Windows, macOS, and Linux
  - Comprehensive Docker installation guide for all platforms
  - Step-by-step configuration guide for all integrations
  - Detailed troubleshooting section with common issues and solutions
  - Usage guide for all dashboard features
  - Tips for beginners section
  - Next steps and best practices

- **QUICK_START_GUIDE.md**: New quick reference guide
  - 5-minute quick start for experienced users
  - Condensed installation steps
  - Quick configuration reference
  - Common commands cheat sheet
  - Quick troubleshooting tips
  - Setup checklist

#### Documentation Improvements
- **Beginner-Friendly**: Written for users with no prior experience
- **Platform-Specific**: Separate instructions for Windows, macOS, and Linux
- **Visual Clarity**: Uses emojis and formatting for easy scanning
- **Comprehensive**: Covers installation, configuration, usage, and troubleshooting
- **Practical Examples**: Real-world examples and expected outputs

#### Content Highlights
- Installation prerequisites with verification steps
- Expected output examples for each command
- "What's happening?" explanations for complex steps
- Detailed credential acquisition guides for each integration
- Browser console debugging instructions
- Docker log viewing and management
- File structure explanation for beginners

---

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
