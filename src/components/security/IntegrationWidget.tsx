import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { IntegrationConfig } from '@/types/security';
import { Database, Activity, Shield, Brain, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IntegrationWidgetProps {
  integration: IntegrationConfig;
}

const sourceIcons = {
  elasticsearch: Database,
  tenable: Shield,
  defender: Activity,
  opencti: Brain
};

const statusConfig = {
  connected: {
    icon: CheckCircle2,
    className: 'text-chart-4',
    label: 'Connected'
  },
  disconnected: {
    icon: XCircle,
    className: 'text-muted-foreground',
    label: 'Disconnected'
  },
  error: {
    icon: AlertCircle,
    className: 'text-destructive',
    label: 'Error'
  }
};

export function IntegrationWidget({ integration }: IntegrationWidgetProps) {
  const SourceIcon = sourceIcons[integration.source];
  const statusInfo = statusConfig[integration.status];
  const StatusIcon = statusInfo.icon;

  const timeAgo = (timestamp: string) => {
    const now = new Date();
    const syncTime = new Date(timestamp);
    const diffMs = now.getTime() - syncTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <SourceIcon className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-sm font-medium">{integration.name}</CardTitle>
          </div>
          <StatusIcon className={cn('h-4 w-4', statusInfo.className)} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Status:</span>
          <Badge 
            variant={integration.status === 'connected' ? 'default' : 'secondary'}
            className="text-xs"
          >
            {statusInfo.label}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Events:</span>
          <span className="font-bold font-mono-data">{integration.eventsCount.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Last Sync:</span>
          <span className="font-medium">{timeAgo(integration.lastSync)}</span>
        </div>

        {integration.enabled && (
          <div className="pt-2 border-t">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-chart-4 animate-pulse" />
              <span className="text-xs text-muted-foreground">Active</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
