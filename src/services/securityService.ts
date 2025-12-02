import type { SecurityEvent, IntegrationConfig, DashboardStats, User } from '@/types/security';

const mockEvents: SecurityEvent[] = [
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

const mockIntegrations: IntegrationConfig[] = [
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

const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@soc.example.com',
    role: 'admin',
    lastLogin: new Date(Date.now() - 1000 * 60 * 30).toISOString()
  },
  {
    id: '2',
    username: 'analyst1',
    email: 'analyst1@soc.example.com',
    role: 'analyst',
    lastLogin: new Date(Date.now() - 1000 * 60 * 15).toISOString()
  },
  {
    id: '3',
    username: 'manager1',
    email: 'manager1@soc.example.com',
    role: 'manager',
    lastLogin: new Date(Date.now() - 1000 * 60 * 60).toISOString()
  }
];

export const securityService = {
  getEvents: async (severityFilter?: string[]): Promise<SecurityEvent[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (severityFilter && severityFilter.length > 0) {
      return mockEvents.filter(event => severityFilter.includes(event.severity));
    }
    
    return mockEvents;
  },

  getEventById: async (id: string): Promise<SecurityEvent | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockEvents.find(event => event.id === id);
  },

  getIntegrations: async (): Promise<IntegrationConfig[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockIntegrations;
  },

  updateIntegration: async (id: string, updates: Partial<IntegrationConfig>): Promise<IntegrationConfig> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const integration = mockIntegrations.find(i => i.id === id);
    if (!integration) {
      throw new Error('Integration not found');
    }
    return { ...integration, ...updates };
  },

  getDashboardStats: async (): Promise<DashboardStats> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const criticalEvents = mockEvents.filter(e => e.severity === 'critical').length;
    const highEvents = mockEvents.filter(e => e.severity === 'high').length;
    const mediumEvents = mockEvents.filter(e => e.severity === 'medium').length;
    const lowEvents = mockEvents.filter(e => e.severity === 'low').length;
    const resolvedToday = mockEvents.filter(e => e.status === 'resolved').length;

    return {
      totalEvents: mockEvents.length,
      criticalEvents,
      highEvents,
      mediumEvents,
      lowEvents,
      resolvedToday,
      averageResponseTime: '2.5h'
    };
  },

  getUsers: async (): Promise<User[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUsers;
  },

  updateEventStatus: async (id: string, status: SecurityEvent['status']): Promise<SecurityEvent> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const event = mockEvents.find(e => e.id === id);
    if (!event) {
      throw new Error('Event not found');
    }
    event.status = status;
    return event;
  }
};
