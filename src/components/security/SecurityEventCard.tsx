import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { SecurityEvent } from '@/types/security';
import { AlertTriangle, Shield, Activity, Eye, Server, Network } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AffectedHostsDialog } from './AffectedHostsDialog';

interface SecurityEventCardProps {
  event: SecurityEvent;
  onViewDetails?: (event: SecurityEvent) => void;
}

const severityConfig = {
  critical: {
    icon: AlertTriangle,
    className: 'status-critical',
    label: 'CRITICAL'
  },
  high: {
    icon: AlertTriangle,
    className: 'status-high',
    label: 'HIGH'
  },
  medium: {
    icon: Shield,
    className: 'status-medium',
    label: 'MEDIUM'
  },
  low: {
    icon: Activity,
    className: 'status-low',
    label: 'LOW'
  },
  info: {
    icon: Activity,
    className: 'status-info',
    label: 'INFO'
  }
};

const sourceLabels = {
  elasticsearch: 'Elastic SIEM',
  tenable: 'Tenable',
  defender: 'MS Defender',
  opencti: 'OpenCTI'
};

export function SecurityEventCard({ event, onViewDetails }: SecurityEventCardProps) {
  const [showHostsDialog, setShowHostsDialog] = useState(false);
  const config = severityConfig[event.severity];
  const Icon = config.icon;
  
  const timeAgo = (timestamp: string) => {
    const now = new Date();
    const eventTime = new Date(timestamp);
    const diffMs = now.getTime() - eventTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const hasMultipleHosts = event.affectedHosts.length > 1;
  const hasMultipleIPs = event.affectedIPs.length > 1;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3 flex-1">
            <div className={cn('p-2 rounded border', config.className)}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base leading-tight mb-1">{event.title}</CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className={cn('text-xs font-bold', config.className)}>
                  {config.label}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {sourceLabels[event.source]}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {event.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
        
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Category:</span>
            <span className="font-medium">{event.category}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Affected Assets:</span>
            <span className="font-medium font-mono-data">{event.affectedAssets.length}</span>
          </div>
          
          {/* Affected Hosts */}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center gap-1">
              <Server className="h-3 w-3" />
              Hosts:
            </span>
            {hasMultipleHosts ? (
              <button
                onClick={() => setShowHostsDialog(true)}
                className="font-medium font-mono-data text-primary hover:underline cursor-pointer"
              >
                {event.affectedHosts.length} hosts
              </button>
            ) : (
              <span className="font-medium font-mono-data">
                {event.affectedHosts[0] || 'N/A'}
              </span>
            )}
          </div>

          {/* Affected IPs */}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center gap-1">
              <Network className="h-3 w-3" />
              IPs:
            </span>
            {hasMultipleIPs ? (
              <button
                onClick={() => setShowHostsDialog(true)}
                className="font-medium font-mono-data text-primary hover:underline cursor-pointer"
              >
                {event.affectedIPs.length} IPs
              </button>
            ) : (
              <span className="font-medium font-mono-data">
                {event.affectedIPs[0] || 'N/A'}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Time:</span>
            <span className="font-medium">{timeAgo(event.timestamp)}</span>
          </div>
        </div>

        {event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {event.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {onViewDetails && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-2"
            onClick={() => onViewDetails(event)}
          >
            <Eye className="h-3 w-3 mr-2" />
            View Details
          </Button>
        )}
      </CardContent>

      {/* Affected Hosts Dialog */}
      <AffectedHostsDialog
        open={showHostsDialog}
        onOpenChange={setShowHostsDialog}
        hosts={event.affectedHosts}
        ips={event.affectedIPs}
        eventTitle={event.title}
      />
    </Card>
  );
}
