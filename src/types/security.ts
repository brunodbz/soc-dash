export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low' | 'info';

export type SecuritySource = 'elasticsearch' | 'tenable' | 'defender' | 'opencti';

export interface SecurityEvent {
  id: string;
  title: string;
  description: string;
  severity: SeverityLevel;
  source: SecuritySource;
  timestamp: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  affectedAssets: string[];
  affectedHosts: string[];
  affectedIPs: string[];
  category: string;
  tags: string[];
}

export interface ElasticsearchConfig {
  url: string;
  username: string;
  password: string;
}

export interface TenableConfig {
  url: string;
  accessKey: string;
  secretKey: string;
}

export interface DefenderConfig {
  tenantId: string;
  clientId: string;
  clientSecret: string;
}

export interface OpenCTIConfig {
  url: string;
  token: string;
}

export type IntegrationCredentials = 
  | ElasticsearchConfig 
  | TenableConfig 
  | DefenderConfig 
  | OpenCTIConfig;

export interface IntegrationConfig {
  id: string;
  name: string;
  source: SecuritySource;
  enabled: boolean;
  credentials: IntegrationCredentials;
  lastSync: string;
  status: 'connected' | 'disconnected' | 'error';
  eventsCount: number;
}

export interface DashboardStats {
  totalEvents: number;
  criticalEvents: number;
  highEvents: number;
  mediumEvents: number;
  lowEvents: number;
  resolvedToday: number;
  averageResponseTime: string;
}

export interface UserRole {
  id: string;
  name: string;
  permissions: string[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'analyst' | 'manager';
  lastLogin: string;
}

export interface ExportOptions {
  format: 'excel' | 'pdf';
  dateRange: {
    start: string;
    end: string;
  };
  severityFilter: SeverityLevel[];
  sourceFilter: SecuritySource[];
}
