# SOC Security Dashboard - Architecture Documentation

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     SOC Security Dashboard                   │
│                      (React + TypeScript)                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ API Calls
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Integration Layer                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Elastic   │  │Tenable   │  │Defender  │  │OpenCTI   │   │
│  │Search    │  │          │  │          │  │          │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  External Security Tools                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Elastic   │  │Tenable   │  │Microsoft │  │OpenCTI   │   │
│  │SIEM      │  │.io       │  │Defender  │  │Platform  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Structure

```
src/
├── components/
│   ├── security/              # Security-specific components
│   │   ├── SecurityEventCard.tsx
│   │   ├── IntegrationWidget.tsx
│   │   ├── StatsCard.tsx
│   │   ├── EventDetailsDialog.tsx
│   │   └── IntegrationConfigForms.tsx  ← NEW
│   ├── ui/                    # shadcn/ui components
│   └── common/                # Shared components
│       └── Header.tsx
├── pages/
│   ├── Dashboard.tsx          # Main dashboard
│   └── AdminPanel.tsx         # Admin interface
├── services/
│   ├── securityService.ts     # Data service layer
│   └── exportService.ts       # Export functionality
├── types/
│   └── security.ts            # TypeScript definitions
├── routes.tsx                 # Route configuration
└── App.tsx                    # Main application
```

## Integration Credential Architecture

### Credential Type Hierarchy

```
IntegrationCredentials (Union Type)
├── ElasticsearchConfig
│   ├── url: string
│   ├── username: string
│   └── password: string
├── TenableConfig
│   ├── url: string
│   ├── accessKey: string
│   └── secretKey: string
├── DefenderConfig
│   ├── tenantId: string
│   ├── clientId: string
│   └── clientSecret: string
└── OpenCTIConfig
    ├── url: string
    └── token: string
```

### Integration Configuration Flow

```
┌─────────────────┐
│   Admin Panel   │
│   (User Input)  │
└────────┬────────┘
         │
         │ User enters credentials
         ▼
┌─────────────────────────┐
│ IntegrationConfigForms  │
│  - ElasticsearchForm    │
│  - TenableForm          │
│  - DefenderForm         │
│  - OpenCTIForm          │
└────────┬────────────────┘
         │
         │ onChange handler
         ▼
┌─────────────────────────┐
│   State Management      │
│   (React useState)      │
└────────┬────────────────┘
         │
         │ Save Configuration
         ▼
┌─────────────────────────┐
│   Security Service      │
│   updateIntegration()   │
└────────┬────────────────┘
         │
         │ API Call (Future)
         ▼
┌─────────────────────────┐
│   Backend Storage       │
│   (Encrypted)           │
└─────────────────────────┘
```

## Data Flow Architecture

### Event Retrieval Flow

```
External Tool → Integration Layer → Security Service → Dashboard
     │                  │                  │               │
     │                  │                  │               │
  [Events]         [Transform]         [Cache]        [Display]
     │                  │                  │               │
     │                  │                  │               │
     └──────────────────┴──────────────────┴───────────────┘
                    Real-time Updates
```

### Export Flow

```
Dashboard → Filter Events → Export Service → File Generation
    │            │               │                  │
    │            │               │                  │
[Select]    [Apply Filter]  [Format Data]      [Download]
    │            │               │                  │
    │            │               │                  │
    └────────────┴───────────────┴──────────────────┘
              Excel/PDF Export
```

## Security Architecture

### Credential Security Layers

```
┌─────────────────────────────────────────────────────────┐
│ Layer 1: UI Input Masking                               │
│ - Password fields use type="password"                   │
│ - Credentials displayed as ••••••••                     │
└─────────────────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────┐
│ Layer 2: State Management                               │
│ - Credentials stored in React state                     │
│ - Not logged to console                                 │
└─────────────────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────┐
│ Layer 3: API Transmission                               │
│ - HTTPS only                                            │
│ - Encrypted in transit                                  │
└─────────────────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────┐
│ Layer 4: Backend Storage (Future)                       │
│ - Encrypted at rest                                     │
│ - Access control via RBAC                               │
└─────────────────────────────────────────────────────────┘
```

## Integration Authentication Flows

### Elasticsearch Authentication

```
Dashboard → Elasticsearch API
    │            │
    │  Basic Auth (username:password)
    │            │
    └────────────┘
```

### Tenable Authentication

```
Dashboard → Tenable API
    │            │
    │  X-ApiKeys Header
    │  (accessKey + secretKey)
    │            │
    └────────────┘
```

### Microsoft Defender Authentication

```
Dashboard → Azure AD → Microsoft Defender API
    │            │              │
    │  OAuth 2.0 │              │
    │  (tenant + │              │
    │   client + │              │
    │   secret)  │              │
    │            │  Bearer Token│
    └────────────┴──────────────┘
```

### OpenCTI Authentication

```
Dashboard → OpenCTI GraphQL API
    │            │
    │  Authorization: Bearer {token}
    │            │
    └────────────┘
```

## Deployment Architecture

### Docker Container Structure

```
┌─────────────────────────────────────────────────────────┐
│                    Docker Host                           │
│  ┌───────────────────────────────────────────────────┐  │
│  │         soc-dashboard Container                   │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │         Nginx (Port 80)                     │  │  │
│  │  │  - Serves static React build                │  │  │
│  │  │  - Handles routing                          │  │  │
│  │  │  - Gzip compression                         │  │  │
│  │  │  - Security headers                         │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │         React Application                   │  │  │
│  │  │  - Built with Vite                          │  │  │
│  │  │  - Optimized bundle                         │  │  │
│  │  │  - Static assets                            │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│  Volumes:                                                │
│  - soc-data (persistent storage)                        │
│                                                          │
│  Networks:                                               │
│  - soc-network (internal)                               │
└─────────────────────────────────────────────────────────┘
```

### Multi-Stage Docker Build

```
Stage 1: Build
┌─────────────────────┐
│   Node.js 20        │
│   - npm install     │
│   - npm run build   │
│   - Optimize assets │
└──────────┬──────────┘
           │
           │ Copy build artifacts
           ▼
Stage 2: Production
┌─────────────────────┐
│   Nginx Alpine      │
│   - Serve static    │
│   - Minimal size    │
│   - Security config │
└─────────────────────┘
```

## State Management

### React State Architecture

```
App.tsx
  └── Router
      ├── Dashboard
      │   ├── useState(events)
      │   ├── useState(filter)
      │   ├── useState(stats)
      │   └── useEffect(loadData)
      │
      └── AdminPanel
          ├── useState(integrations)
          ├── useState(users)
          └── useEffect(loadConfig)
```

## API Service Layer

### Service Architecture

```
securityService.ts
├── getSecurityEvents()
│   └── Returns: SecurityEvent[]
├── getIntegrations()
│   └── Returns: IntegrationConfig[]
├── updateIntegration(id, config)
│   └── Updates integration settings
├── getUsers()
│   └── Returns: User[]
└── getDashboardStats()
    └── Returns: DashboardStats

exportService.ts
├── exportToExcel(events)
│   └── Generates .xlsx file
└── exportToPDF(events)
    └── Generates .pdf file
```

## Type System

### Core Type Definitions

```typescript
// Security Event
SecurityEvent {
  id: string
  title: string
  description: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  source: SecuritySource
  timestamp: string
  status: EventStatus
  affectedAssets: string[]
  category: string
  tags: string[]
}

// Integration Configuration
IntegrationConfig {
  id: string
  name: string
  source: SecuritySource
  enabled: boolean
  credentials: IntegrationCredentials
  lastSync: string
  status: 'connected' | 'disconnected' | 'error'
  eventsCount: number
}

// Credential Types (Union)
IntegrationCredentials =
  | ElasticsearchConfig
  | TenableConfig
  | DefenderConfig
  | OpenCTIConfig
```

## Performance Considerations

### Optimization Strategies

1. **Code Splitting**
   - Lazy loading of routes
   - Dynamic imports for heavy components
   - Vite automatic chunking

2. **Caching**
   - Browser caching for static assets
   - Service worker (future enhancement)
   - API response caching

3. **Bundle Optimization**
   - Tree shaking
   - Minification
   - Gzip compression

4. **Rendering Optimization**
   - React.memo for expensive components
   - useMemo for computed values
   - useCallback for event handlers

## Scalability

### Horizontal Scaling

```
Load Balancer
     │
     ├── Dashboard Instance 1
     ├── Dashboard Instance 2
     └── Dashboard Instance 3
          │
          └── Shared Backend API
               │
               └── Integration Services
```

### Future Enhancements

1. **Backend API Layer**
   - RESTful API for data operations
   - WebSocket for real-time updates
   - Redis for caching

2. **Database Layer**
   - PostgreSQL for persistent storage
   - Time-series database for events
   - Elasticsearch for search

3. **Message Queue**
   - RabbitMQ or Kafka for event processing
   - Async job processing
   - Event correlation engine

## Security Considerations

### OWASP Top 10 Mitigation

1. **Injection**: Parameterized queries, input validation
2. **Broken Authentication**: Secure credential storage, HTTPS
3. **Sensitive Data Exposure**: Encryption at rest and in transit
4. **XML External Entities**: Not applicable (JSON only)
5. **Broken Access Control**: RBAC implementation
6. **Security Misconfiguration**: Secure defaults, hardening
7. **XSS**: React automatic escaping, CSP headers
8. **Insecure Deserialization**: Input validation
9. **Using Components with Known Vulnerabilities**: Regular updates
10. **Insufficient Logging**: Comprehensive audit logs

## Monitoring and Observability

### Metrics to Track

- Integration connection status
- Event ingestion rate
- API response times
- Error rates
- User activity
- Export operations
- System resource usage

### Logging Strategy

```
Application Logs
├── Info: Normal operations
├── Warning: Degraded performance
├── Error: Failed operations
└── Debug: Detailed troubleshooting

Audit Logs
├── Configuration changes
├── User authentication
├── Permission changes
└── Data exports
```

---

**Document Version**: 1.1.0  
**Last Updated**: 2025-12-01  
**Maintained By**: SOC Dashboard Team
