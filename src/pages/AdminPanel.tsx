import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { securityService } from '@/services/securityService';
import { 
  ElasticsearchForm, 
  TenableForm, 
  DefenderForm, 
  OpenCTIForm 
} from '@/components/security/IntegrationConfigForms';
import type { 
  IntegrationConfig, 
  User, 
  ElasticsearchConfig, 
  TenableConfig, 
  DefenderConfig, 
  OpenCTIConfig 
} from '@/types/security';
import { Settings, Users, Database, Shield, Activity, Brain, Save, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AdminPanel() {
  const [integrations, setIntegrations] = useState<IntegrationConfig[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [integrationsData, usersData] = await Promise.all([
        securityService.getIntegrations(),
        securityService.getUsers()
      ]);
      
      setIntegrations(integrationsData);
      setUsers(usersData);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load admin data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleIntegration = async (id: string, enabled: boolean) => {
    try {
      await securityService.updateIntegration(id, { enabled });
      setIntegrations(prev => prev.map(i => i.id === id ? { ...i, enabled } : i));
      toast({
        title: 'Success',
        description: `Integration ${enabled ? 'enabled' : 'disabled'} successfully`
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update integration',
        variant: 'destructive'
      });
    }
  };

  const handleSaveIntegration = async (integration: IntegrationConfig) => {
    try {
      await securityService.updateIntegration(integration.id, integration);
      toast({
        title: 'Success',
        description: 'Integration settings saved successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save integration settings',
        variant: 'destructive'
      });
    }
  };

  const sourceIcons = {
    elasticsearch: Database,
    tenable: Shield,
    defender: Activity,
    opencti: Brain
  };

  return (
    <div className="min-h-screen bg-background p-4 xl:p-8">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Settings className="h-8 w-8" />
            Administration Panel
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage integrations, users, and system configuration
          </p>
        </div>

        <Tabs defaultValue="integrations" className="space-y-6">
          <TabsList>
            <TabsTrigger value="integrations">
              <Database className="h-4 w-4 mr-2" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="integrations" className="space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Configure your security tool integrations. Credentials are encrypted and stored securely.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {integrations.map(integration => {
                const SourceIcon = sourceIcons[integration.source];
                
                return (
                  <Card key={integration.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <SourceIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle>{integration.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {integration.source.toUpperCase()} Integration
                            </CardDescription>
                          </div>
                        </div>
                        <Switch
                          checked={integration.enabled}
                          onCheckedChange={(checked) => handleToggleIntegration(integration.id, checked)}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {integration.source === 'elasticsearch' && (
                        <ElasticsearchForm
                          config={integration.credentials as ElasticsearchConfig}
                          onChange={(credentials) => {
                            setIntegrations(prev => prev.map(i => 
                              i.id === integration.id ? { ...i, credentials } : i
                            ));
                          }}
                        />
                      )}

                      {integration.source === 'tenable' && (
                        <TenableForm
                          config={integration.credentials as TenableConfig}
                          onChange={(credentials) => {
                            setIntegrations(prev => prev.map(i => 
                              i.id === integration.id ? { ...i, credentials } : i
                            ));
                          }}
                        />
                      )}

                      {integration.source === 'defender' && (
                        <DefenderForm
                          config={integration.credentials as DefenderConfig}
                          onChange={(credentials) => {
                            setIntegrations(prev => prev.map(i => 
                              i.id === integration.id ? { ...i, credentials } : i
                            ));
                          }}
                        />
                      )}

                      {integration.source === 'opencti' && (
                        <OpenCTIForm
                          config={integration.credentials as OpenCTIConfig}
                          onChange={(credentials) => {
                            setIntegrations(prev => prev.map(i => 
                              i.id === integration.id ? { ...i, credentials } : i
                            ));
                          }}
                        />
                      )}

                      <Separator />

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1">Status</p>
                          <Badge variant={integration.status === 'connected' ? 'default' : 'secondary'}>
                            {integration.status}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Events Count</p>
                          <p className="font-bold font-mono-data">{integration.eventsCount.toLocaleString()}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-muted-foreground mb-1">Last Sync</p>
                          <p className="font-mono-data text-xs">
                            {new Date(integration.lastSync).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <Button 
                        className="w-full" 
                        size="sm"
                        onClick={() => handleSaveIntegration(integration)}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Configuration
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage user accounts and access permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <p className="font-semibold">{user.username}</p>
                          <Badge variant={
                            user.role === 'admin' ? 'default' : 
                            user.role === 'analyst' ? 'secondary' : 
                            'outline'
                          }>
                            {user.role.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">
                          Last login: {new Date(user.lastLogin).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Role Permissions</CardTitle>
                <CardDescription>
                  Access control configuration for different user roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Admin</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Full access to all features including configuration and user management
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="default">Full Access</Badge>
                      <Badge variant="default">Configure Integrations</Badge>
                      <Badge variant="default">Manage Users</Badge>
                      <Badge variant="default">Export Reports</Badge>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Analyst</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Can view and manage security events, update statuses
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">View Events</Badge>
                      <Badge variant="secondary">Update Status</Badge>
                      <Badge variant="secondary">Export Reports</Badge>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Manager</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Read-only access to dashboard and reports
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">View Events</Badge>
                      <Badge variant="outline">View Reports</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
