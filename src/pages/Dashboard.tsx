import { useState, useEffect } from 'react';
import { SecurityEventCard } from '@/components/security/SecurityEventCard';
import { IntegrationWidget } from '@/components/security/IntegrationWidget';
import { StatsCard } from '@/components/security/StatsCard';
import { EventDetailsDialog } from '@/components/security/EventDetailsDialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { securityService } from '@/services/securityService';
import { exportService } from '@/services/exportService';
import type { SecurityEvent, IntegrationConfig, DashboardStats } from '@/types/security';
import { AlertTriangle, Shield, Activity, CheckCircle2, Download, FileSpreadsheet, FileText, RefreshCw } from 'lucide-react';

export default function Dashboard() {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [integrations, setIntegrations] = useState<IntegrationConfig[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const { toast } = useToast();

  const loadData = async () => {
    setLoading(true);
    try {
      const [eventsData, integrationsData, statsData] = await Promise.all([
        securityService.getEvents(),
        securityService.getIntegrations(),
        securityService.getDashboardStats()
      ]);
      
      setEvents(eventsData);
      setIntegrations(integrationsData);
      setStats(statsData);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleViewDetails = (event: SecurityEvent) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  const handleStatusChange = async (eventId: string, status: SecurityEvent['status']) => {
    try {
      await securityService.updateEventStatus(eventId, status);
      setEvents(prev => prev.map(e => e.id === eventId ? { ...e, status } : e));
      setSelectedEvent(prev => prev ? { ...prev, status } : null);
      toast({
        title: 'Success',
        description: 'Event status updated successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update event status',
        variant: 'destructive'
      });
    }
  };

  const handleExportExcel = () => {
    const filteredEvents = activeFilter === 'all' 
      ? events 
      : events.filter(e => e.severity === activeFilter);
    
    exportService.exportToExcel(filteredEvents);
    toast({
      title: 'Success',
      description: 'Events exported to Excel successfully'
    });
  };

  const handleExportPDF = () => {
    const filteredEvents = activeFilter === 'all' 
      ? events 
      : events.filter(e => e.severity === activeFilter);
    
    exportService.exportToPDF(filteredEvents);
    toast({
      title: 'Success',
      description: 'Events exported to PDF successfully'
    });
  };

  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(e => e.severity === activeFilter);

  const criticalAndHighEvents = events.filter(e => e.severity === 'critical' || e.severity === 'high');

  return (
    <div className="min-h-screen bg-background p-4 xl:p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">SOC Security Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Unified security operations center monitoring
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={loadData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportExcel}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPDF}>
              <FileText className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="h-32 bg-muted" />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="h-48 bg-muted" />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <StatsCard
                title="Total Events"
                value={stats?.totalEvents || 0}
                icon={Activity}
              />
              <StatsCard
                title="Critical Events"
                value={stats?.criticalEvents || 0}
                icon={AlertTriangle}
                className="border-destructive/50"
              />
              <StatsCard
                title="High Priority"
                value={stats?.highEvents || 0}
                icon={Shield}
                className="border-warning/50"
              />
              <StatsCard
                title="Resolved Today"
                value={stats?.resolvedToday || 0}
                icon={CheckCircle2}
                className="border-chart-4/50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {integrations.map(integration => (
                <IntegrationWidget key={integration.id} integration={integration} />
              ))}
            </div>

            <div>
              <Tabs value={activeFilter} onValueChange={setActiveFilter}>
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-6">
                  <TabsList>
                    <TabsTrigger value="all">All Events</TabsTrigger>
                    <TabsTrigger value="critical">Critical</TabsTrigger>
                    <TabsTrigger value="high">High</TabsTrigger>
                    <TabsTrigger value="medium">Medium</TabsTrigger>
                  </TabsList>
                  
                  <div className="text-sm text-muted-foreground">
                    Showing {filteredEvents.length} of {events.length} events
                  </div>
                </div>

                <TabsContent value={activeFilter} className="mt-0">
                  {filteredEvents.length === 0 ? (
                    <div className="text-center py-12 border rounded-lg">
                      <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Events Found</h3>
                      <p className="text-muted-foreground">
                        No security events match the current filter
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {filteredEvents.map(event => (
                        <SecurityEventCard
                          key={event.id}
                          event={event}
                          onViewDetails={handleViewDetails}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </div>

      <EventDetailsDialog
        event={selectedEvent}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
