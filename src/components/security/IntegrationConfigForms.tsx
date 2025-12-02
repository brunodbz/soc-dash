import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ElasticsearchConfig, TenableConfig, DefenderConfig, OpenCTIConfig } from '@/types/security';

interface ElasticsearchFormProps {
  config: ElasticsearchConfig;
  onChange: (config: ElasticsearchConfig) => void;
}

export function ElasticsearchForm({ config, onChange }: ElasticsearchFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="es-url">Elasticsearch URL</Label>
        <Input
          id="es-url"
          type="text"
          placeholder="https://elastic.example.com:9200"
          value={config.url}
          onChange={(e) => onChange({ ...config, url: e.target.value })}
          className="font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground">
          Example: https://your-elastic-instance.com:9200
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="es-username">Username</Label>
        <Input
          id="es-username"
          type="text"
          placeholder="elastic"
          value={config.username}
          onChange={(e) => onChange({ ...config, username: e.target.value })}
          className="font-mono text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="es-password">Password</Label>
        <Input
          id="es-password"
          type="password"
          placeholder="Enter password"
          value={config.password}
          onChange={(e) => onChange({ ...config, password: e.target.value })}
          className="font-mono text-sm"
        />
      </div>
    </div>
  );
}

interface TenableFormProps {
  config: TenableConfig;
  onChange: (config: TenableConfig) => void;
}

export function TenableForm({ config, onChange }: TenableFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="tenable-url">Tenable URL</Label>
        <Input
          id="tenable-url"
          type="text"
          placeholder="https://cloud.tenable.com"
          value={config.url}
          onChange={(e) => onChange({ ...config, url: e.target.value })}
          className="font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground">
          Example: https://cloud.tenable.com
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tenable-access-key">Access Key</Label>
        <Input
          id="tenable-access-key"
          type="password"
          placeholder="Enter access key"
          value={config.accessKey}
          onChange={(e) => onChange({ ...config, accessKey: e.target.value })}
          className="font-mono text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tenable-secret-key">Secret Key</Label>
        <Input
          id="tenable-secret-key"
          type="password"
          placeholder="Enter secret key"
          value={config.secretKey}
          onChange={(e) => onChange({ ...config, secretKey: e.target.value })}
          className="font-mono text-sm"
        />
      </div>
    </div>
  );
}

interface DefenderFormProps {
  config: DefenderConfig;
  onChange: (config: DefenderConfig) => void;
}

export function DefenderForm({ config, onChange }: DefenderFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="defender-tenant-id">Azure Tenant ID</Label>
        <Input
          id="defender-tenant-id"
          type="text"
          placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
          value={config.tenantId}
          onChange={(e) => onChange({ ...config, tenantId: e.target.value })}
          className="font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground">
          Your Azure Active Directory tenant ID
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="defender-client-id">Client ID</Label>
        <Input
          id="defender-client-id"
          type="text"
          placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
          value={config.clientId}
          onChange={(e) => onChange({ ...config, clientId: e.target.value })}
          className="font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground">
          Application (client) ID from Azure AD
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="defender-client-secret">Client Secret</Label>
        <Input
          id="defender-client-secret"
          type="password"
          placeholder="Enter client secret"
          value={config.clientSecret}
          onChange={(e) => onChange({ ...config, clientSecret: e.target.value })}
          className="font-mono text-sm"
        />
      </div>
    </div>
  );
}

interface OpenCTIFormProps {
  config: OpenCTIConfig;
  onChange: (config: OpenCTIConfig) => void;
}

export function OpenCTIForm({ config, onChange }: OpenCTIFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="opencti-url">OpenCTI URL</Label>
        <Input
          id="opencti-url"
          type="text"
          placeholder="https://opencti.example.com"
          value={config.url}
          onChange={(e) => onChange({ ...config, url: e.target.value })}
          className="font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground">
          Example: https://your-opencti-instance.com
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="opencti-token">API Token</Label>
        <Input
          id="opencti-token"
          type="password"
          placeholder="Enter API token"
          value={config.token}
          onChange={(e) => onChange({ ...config, token: e.target.value })}
          className="font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground">
          Generate from OpenCTI user profile settings
        </p>
      </div>
    </div>
  );
}
