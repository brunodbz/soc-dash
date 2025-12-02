import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { SecurityEvent } from '@/types/security';
import { AlertTriangle, Shield, Activity, Calendar, Server, Tag, Network } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventDetailsDialogProps {
  event: SecurityEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange?: (eventId: string, status: SecurityEvent['status']) => void;
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
  elasticsearch: 'Elastic Search SIEM',
  tenable: 'Tenable Vulnerability Scanner',
  defender: 'Microsoft Defender',
  opencti: 'OpenCTI Threat Intelligence'
};

export function EventDetailsDialog({ event, open, onOpenChange, onStatusChange }: EventDetailsDialogProps) {
  if (!event) return null;

  const config = severityConfig[event.severity];
  const Icon = config.icon;

  const handleStatusChange = (status: SecurityEvent['status']) => {
    if (onStatusChange) {
      onStatusChange(event.id, status);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className={cn('p-2 rounded border', config.className)}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl">{event.title}</DialogTitle>
              <DialogDescription className="mt-2">
                Event ID: <span className="font-mono-data">{event.id}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={cn('font-bold', config.className)}>
              {config.label}
            </Badge>
            <Badge variant="secondary">
              {sourceLabels[event.source]}
            </Badge>
            <Badge variant="outline">
              {event.status.toUpperCase()}
            </Badge>
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">{event.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <h4 className="text-sm font-semibold">Timestamp</h4>
                </div>
                <p className="text-sm font-mono-data">
                  {new Date(event.timestamp).toLocaleString()}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <h4 className="text-sm font-semibold">Category</h4>
                </div>
                <p className="text-sm">{event.category}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Server className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-semibold">Affected Assets</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {event.affectedAssets.map(asset => (
                  <Badge key={asset} variant="outline" className="font-mono-data">
                    {asset}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Affected Hosts */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Server className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-semibold">Affected Hosts ({event.affectedHosts.length})</h4>
              </div>
              <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                {event.affectedHosts.map((host, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded bg-muted/50 text-sm"
                  >
                    <Badge variant="outline" className="font-mono-data text-xs">
                      {index + 1}
                    </Badge>
                    <span className="font-mono-data">{host}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Affected IPs */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Network className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-semibold">Affected IP Addresses ({event.affectedIPs.length})</h4>
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {event.affectedIPs.map((ip, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded bg-muted/50 text-sm"
                  >
                    <Badge variant="outline" className="font-mono-data text-xs">
                      {index + 1}
                    </Badge>
                    <span className="font-mono-data">{ip}</span>
                  </div>
                ))}
              </div>
            </div>

            {event.tags.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <h4 className="text-sm font-semibold">Tags</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-semibold mb-3">Update Status</h4>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={event.status === 'open' ? 'default' : 'outline'}
                onClick={() => handleStatusChange('open')}
              >
                Open
              </Button>
              <Button
                size="sm"
                variant={event.status === 'investigating' ? 'default' : 'outline'}
                onClick={() => handleStatusChange('investigating')}
              >
                Investigating
              </Button>
              <Button
                size="sm"
                variant={event.status === 'resolved' ? 'default' : 'outline'}
                onClick={() => handleStatusChange('resolved')}
              >
                Resolved
              </Button>
              <Button
                size="sm"
                variant={event.status === 'closed' ? 'default' : 'outline'}
                onClick={() => handleStatusChange('closed')}
              >
                Closed
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
