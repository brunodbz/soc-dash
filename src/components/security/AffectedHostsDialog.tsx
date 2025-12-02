import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Server, Network } from 'lucide-react';

interface AffectedHostsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hosts: string[];
  ips: string[];
  eventTitle: string;
}

export function AffectedHostsDialog({
  open,
  onOpenChange,
  hosts,
  ips,
  eventTitle
}: AffectedHostsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Affected Hosts and IPs
          </DialogTitle>
          <DialogDescription>
            {eventTitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Hosts Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-sm">
                Affected Hosts ({hosts.length})
              </h3>
            </div>
            <Separator />
            <div className="grid grid-cols-1 gap-2">
              {hosts.map((host, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Badge variant="outline" className="font-mono-data text-xs">
                    {index + 1}
                  </Badge>
                  <span className="font-mono-data text-sm flex-1">{host}</span>
                </div>
              ))}
            </div>
          </div>

          {/* IPs Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Network className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-sm">
                Affected IP Addresses ({ips.length})
              </h3>
            </div>
            <Separator />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
              {ips.map((ip, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Badge variant="outline" className="font-mono-data text-xs">
                    {index + 1}
                  </Badge>
                  <span className="font-mono-data text-sm flex-1">{ip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Affected Systems:</span>
              <span className="font-bold">{hosts.length} hosts, {ips.length} IPs</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
