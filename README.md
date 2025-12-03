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

The repository ships with a `pnpm-lock.yaml`, so the examples below use **pnpm** for deterministic installs. `npm` still works if you prefer it, but using pnpm avoids reinstalling dependencies unnecessarily.

### Prerequisites

Before you begin, ensure you have one of the following installed on your system:

**Option 1: Node.js (For Local Development)**
```bash
Node.js >= 20
pnpm >= 9 (recommended)
npm >= 10 (fallback)
```

**Option 2: Docker (For Production Deployment)**
```bash
Docker >= 20.10
Docker Compose >= 2.0
```

---

## 📋 Step-by-Step Installation Guide

This guide will walk you through the complete installation process, from downloading the code to accessing the dashboard.

### Method 1: Local Development Setup (Recommended for Testing)

This method is perfect for testing, development, or if you don't have Docker installed.

#### Step 1: Install Node.js

If you don't have Node.js installed:

**Windows:**
1. Visit https://nodejs.org/
2. Download the LTS version (20.x or higher)
3. Run the installer and follow the prompts
4. Verify installation by opening Command Prompt and typing:
   ```bash
   node --version
   npm --version
   ```

**macOS:**
1. Install Homebrew (if not installed): https://brew.sh/
2. Open Terminal and run:
   ```bash
   brew install node@20
   ```
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

**Linux (Ubuntu/Debian):**
```bash
# Update package list
sudo apt update

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

#### Step 2: Download the Project

**Option A: Using Git**
```bash
# Clone the repository (if using Git)
git clone <repository-url>
cd soc-dash
```

**Option B: Manual Download**
1. Download the project ZIP file
2. Extract it to a folder (e.g., `C:\soc-dashboard` or `~/soc-dashboard`)
3. Open Terminal/Command Prompt and navigate to the folder:
   ```bash
   cd path/to/soc-dashboard
   ```

#### Step 3: Install Dependencies

This step downloads all required packages for the application.

```bash
# Install all dependencies (this may take 2-5 minutes)
pnpm install

# If you prefer npm instead of pnpm
npm install
```

**What's happening?**
- npm reads the `package.json` file
- Downloads all required libraries
- Creates a `node_modules` folder with all dependencies

**Troubleshooting:**
- If you see permission errors on Linux/Mac, try: `sudo npm install`
- If installation fails, delete `node_modules` folder and try again
- Ensure you have a stable internet connection

#### Step 4: Start the Development Server

```bash
# Start the application
pnpm dev

# With npm
npm run dev
```

**Expected Output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

#### Step 5: Access the Dashboard

1. Open your web browser (Chrome, Firefox, Safari, or Edge)
2. Navigate to: **http://localhost:5173**
3. You should see the SOC Security Dashboard homepage

**First Time Access:**
- The dashboard will display with mock/demo data
- You can explore all features without configuring integrations
- To configure real integrations, proceed to the Configuration section below

#### Step 6: Stop the Server

When you're done:
- Press `Ctrl + C` in the terminal to stop the server
- Or simply close the terminal window

---

### Method 2: Docker Deployment (Recommended for Production)

This method is ideal for production environments or if you want a containerized deployment.

#### Step 1: Install Docker

**Windows:**
1. Download Docker Desktop from: https://www.docker.com/products/docker-desktop
2. Run the installer
3. Restart your computer if prompted
4. Open Docker Desktop and wait for it to start
5. Verify installation in Command Prompt:
   ```bash
   docker --version
   docker-compose --version
   ```

**macOS:**
1. Download Docker Desktop from: https://www.docker.com/products/docker-desktop
2. Drag Docker to Applications folder
3. Open Docker from Applications
4. Wait for Docker to start (whale icon in menu bar)
5. Verify installation in Terminal:
   ```bash
   docker --version
   docker-compose --version
   ```

**Linux (Ubuntu/Debian):**
```bash
# Update package list
sudo apt update

# Install prerequisites
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add your user to docker group (to run without sudo)
sudo usermod -aG docker $USER

# Log out and log back in, then verify
docker --version
docker compose version
```

#### Step 2: Download the Project

Same as Method 1, Step 2 (using Git or manual download)

#### Step 3: Navigate to Project Directory

```bash
cd path/to/soc-dashboard
```

#### Step 4: Build and Start with Docker Compose

```bash
# Build and start the containers (first time may take 5-10 minutes)
docker-compose up -d
```

**What's happening?**
- `-d` flag runs containers in the background (detached mode)
- Docker builds the application image
- Creates and starts the container
- Sets up networking and volumes

**Expected Output:**
```
[+] Building 120.5s (15/15) FINISHED
[+] Running 2/2
 ✔ Network soc-network    Created
 ✔ Container soc-dashboard Started
```

#### Step 5: Verify Container is Running

```bash
# Check container status
docker-compose ps
```

**Expected Output:**
```
NAME            IMAGE           STATUS          PORTS
soc-dashboard   soc-dashboard   Up 2 minutes    0.0.0.0:80->80/tcp
```

#### Step 6: Access the Dashboard

1. Open your web browser
2. Navigate to: **http://localhost**
3. The SOC Security Dashboard should load

**Note:** No port number needed (uses default HTTP port 80)

#### Step 7: View Logs (Optional)

To see application logs:
```bash
# View logs
docker-compose logs -f

# Press Ctrl+C to stop viewing logs (container keeps running)
```

#### Step 8: Stop the Application

When you need to stop the dashboard:
```bash
# Stop containers
docker-compose down
```

To stop and remove all data:
```bash
# Stop and remove volumes
docker-compose down -v
```

---

## 🔧 Configuration Guide

After installation, configure the security integrations to connect to your actual security tools.

### Step 1: Access Admin Panel

1. Open the dashboard in your browser
2. Click **"Admin"** in the top navigation menu
3. Click on the **"Integrations"** tab

### Step 2: Configure Elasticsearch SIEM

1. Locate the **"Elastic Search SIEM"** card
2. Toggle the switch to **ON** (if not already enabled)
3. Fill in the credentials:
   - **URL**: Your Elasticsearch endpoint (e.g., `https://elastic.example.com:9200`)
   - **Username**: Your Elasticsearch username (typically `elastic`)
   - **Password**: Your Elasticsearch password
4. Click **"Save Configuration"**
5. Verify the status shows **"Connected"** with a green badge

**Where to find credentials:**
- URL: From your Elasticsearch deployment/administrator
- Username/Password: From your Elasticsearch administrator or setup documentation

### Step 3: Configure Tenable

1. Locate the **"Tenable Vulnerability Scanner"** card
2. Toggle the switch to **ON**
3. Fill in the credentials:
   - **URL**: Usually `https://cloud.tenable.com`
   - **Access Key**: Your Tenable API access key
   - **Secret Key**: Your Tenable API secret key
4. Click **"Save Configuration"**

**How to get Tenable API keys:**
1. Log in to Tenable.io
2. Go to **Settings** → **My Account** → **API Keys**
3. Click **"Generate"** to create new keys
4. Copy both keys immediately (secret key shown only once)

### Step 4: Configure Microsoft Defender

1. Locate the **"Microsoft Defender"** card
2. Toggle the switch to **ON**
3. Fill in the credentials:
   - **Tenant ID**: Your Azure AD tenant ID
   - **Client ID**: Application client ID
   - **Client Secret**: Application secret value
4. Click **"Save Configuration"**

**How to get Microsoft Defender credentials:**
1. Go to **Azure Portal** → **Azure Active Directory**
2. Navigate to **App registrations**
3. Create or select your application
4. Copy **Directory (tenant) ID** and **Application (client) ID**
5. Go to **Certificates & secrets** → Create new client secret
6. Copy the secret value immediately

### Step 5: Configure OpenCTI

1. Locate the **"OpenCTI Threat Intelligence"** card
2. Toggle the switch to **ON**
3. Fill in the credentials:
   - **URL**: Your OpenCTI instance URL (e.g., `https://opencti.example.com`)
   - **API Token**: Your OpenCTI API token
4. Click **"Save Configuration"**

**How to get OpenCTI API token:**
1. Log in to your OpenCTI instance
2. Click your **profile icon** (top right)
3. Go to **Profile** → **API Access**
4. Click **"Create Token"**
5. Set name and permissions
6. Copy the generated token

### Step 6: Verify All Integrations

After configuring all integrations:

1. Check that all integration cards show **"Connected"** status
2. Verify event counts are greater than 0
3. Check that "Last Sync" timestamps are recent
4. Return to the main dashboard
5. Confirm events from all sources are displayed

---

## 🎯 Using the Dashboard

### Viewing Security Events

1. **Main Dashboard**: Shows all security events from all sources
2. **Filter by Severity**: Click buttons at the top (All, Critical, High, Medium)
3. **View Details**: Click **"View Details"** button on any event card
4. **Update Status**: In the details dialog, click status buttons (Open, Investigating, Resolved, Closed)

### Viewing Affected Hosts and IPs

Each event card displays affected systems:

- **Single Host/IP**: Shown directly on the card
- **Multiple Hosts/IPs**: Shown as clickable count (e.g., "3 hosts")
- **Click the count**: Opens a popup with complete list of all affected systems

### Exporting Reports

1. **Filter events** (optional): Select severity filter
2. **Click Export Button**:
   - **"Export to Excel"**: Downloads .xlsx file with all event details
   - **"Export to PDF"**: Downloads .pdf report with formatted data
3. **Open the file**: Find in your Downloads folder

---

## 🔍 Troubleshooting

### Common Issues and Solutions

#### Issue: "Cannot access http://localhost:5173"

**Solution:**
1. Check if the development server is running (look for the terminal with the running process)
2. Ensure no other application is using port 5173
3. Try restarting the server: Press `Ctrl+C`, then run `npm run dev` again
4. Try a different port: `npm run dev -- --port 3000`

#### Issue: "npm: command not found"

**Solution:**
- Node.js is not installed or not in PATH
- Reinstall Node.js following Step 1 of Method 1
- Restart your terminal/command prompt after installation

#### Issue: "Docker daemon is not running"

**Solution:**
1. **Windows/Mac**: Open Docker Desktop application
2. **Linux**: Start Docker service:
   ```bash
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

#### Issue: "Port 80 is already in use"

**Solution:**
1. Stop the application using port 80 (often Skype, IIS, or Apache)
2. Or modify `docker-compose.yml` to use a different port:
   ```yaml
   ports:
     - "8080:80"  # Change 80 to 8080
   ```
3. Access dashboard at: http://localhost:8080

#### Issue: "Integration shows 'Disconnected'"

**Solution:**
1. Verify credentials are correct
2. Check network connectivity to the security tool
3. Ensure firewall allows outbound connections
4. Verify the security tool's API is accessible
5. Check API key permissions in the security tool

#### Issue: "No events displayed"

**Solution:**
1. Check integration status (should be "Connected")
2. Verify the security tool has events/data
3. Check "Last Sync" timestamp
4. Try disabling and re-enabling the integration
5. Check browser console for errors (F12 → Console tab)

---

## 📚 Additional Resources

- **Detailed Configuration**: See [CONFIGURATION.md](./CONFIGURATION.md)
- **Docker Deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Integration Testing**: See [INTEGRATION_TESTING.md](./INTEGRATION_TESTING.md)
- **Feature Documentation**: See [HOSTS_IPS_FEATURE.md](./HOSTS_IPS_FEATURE.md)
- **Visual Guide**: See [VISUAL_GUIDE.md](./VISUAL_GUIDE.md)

---

## 💡 Tips for Beginners

### Understanding the File Structure

- **`src/`**: Contains all application source code
- **`node_modules/`**: Contains downloaded dependencies (don't modify)
- **`package.json`**: Lists all dependencies and scripts
- **`.env`**: Contains environment variables (create from `.env.example`)
- **`docker-compose.yml`**: Docker configuration file

### Making Changes

1. **Never edit files in `node_modules/`**
2. **Always stop the server before pulling updates**
3. **Run `npm install` after pulling updates**
4. **Clear browser cache if changes don't appear** (Ctrl+Shift+R or Cmd+Shift+R)

### Getting Help

1. Check the troubleshooting section above
2. Review the documentation files in the project
3. Check browser console for errors (F12 → Console)
4. Check terminal/command prompt for error messages
5. Contact your system administrator

---

## 🚀 Next Steps

After successful installation:

1. ✅ **Explore the Dashboard**: Familiarize yourself with the interface
2. ✅ **Configure Integrations**: Connect to your security tools
3. ✅ **Test Filtering**: Try different severity filters
4. ✅ **Test Exports**: Generate Excel and PDF reports
5. ✅ **Review Documentation**: Read additional guides for advanced features

---

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
