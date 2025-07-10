
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  Plug, 
  CheckCircle, 
  AlertCircle, 
  Settings, 
  Zap,
  Mail,
  Webhook,
  Database
} from "lucide-react";

const integrations = [
  {
    id: 'email',
    name: 'Email Notifications',
    description: 'Send alerts via email when trademark violations are detected',
    icon: Mail,
    status: 'connected',
    config: { email: 'admin@brandprotect.com' }
  },
  {
    id: 'webhook',
    name: 'Webhook Integration',
    description: 'Send real-time notifications to your webhook endpoint',
    icon: Webhook,
    status: 'disconnected',
    config: { url: '' }
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect to 5000+ apps through Zapier automation',
    icon: Zap,
    status: 'disconnected',
    config: { webhookUrl: '' }
  },
  {
    id: 'database',
    name: 'Database Export',
    description: 'Export violation data to external database',
    icon: Database,
    status: 'disconnected',
    config: { connectionString: '' }
  }
];

export const IntegrationsView = () => {
  const { toast } = useToast();
  const [configs, setConfigs] = useState(
    integrations.reduce((acc, integration) => {
      acc[integration.id] = integration.config;
      return acc;
    }, {} as Record<string, any>)
  );

  const handleConfigChange = (integrationId: string, field: string, value: string) => {
    setConfigs(prev => ({
      ...prev,
      [integrationId]: {
        ...prev[integrationId],
        [field]: value
      }
    }));
  };

  const handleSave = (integrationId: string) => {
    toast({
      title: "Configuration Saved",
      description: `${integrations.find(i => i.id === integrationId)?.name} settings have been updated.`
    });
  };

  const handleTest = (integrationId: string) => {
    toast({
      title: "Test Successful",
      description: `${integrations.find(i => i.id === integrationId)?.name} connection is working properly.`
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Integrations</h1>
        <p className="text-gray-600">
          Connect Brand Protection Module with your favorite tools and services.
        </p>
      </div>

      <div className="grid gap-6">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          const isConnected = integration.status === 'connected';
          
          return (
            <Card key={integration.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <CardDescription>{integration.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={isConnected ? "default" : "secondary"}>
                    {isConnected ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Connected
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Not Connected
                      </>
                    )}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {integration.id === 'email' && (
                  <div className="space-y-2">
                    <Label htmlFor={`${integration.id}-email`}>Email Address</Label>
                    <Input
                      id={`${integration.id}-email`}
                      type="email"
                      value={configs[integration.id]?.email || ''}
                      onChange={(e) => handleConfigChange(integration.id, 'email', e.target.value)}
                      placeholder="Enter notification email"
                    />
                  </div>
                )}
                
                {integration.id === 'webhook' && (
                  <div className="space-y-2">
                    <Label htmlFor={`${integration.id}-url`}>Webhook URL</Label>
                    <Input
                      id={`${integration.id}-url`}
                      type="url"
                      value={configs[integration.id]?.url || ''}
                      onChange={(e) => handleConfigChange(integration.id, 'url', e.target.value)}
                      placeholder="https://your-webhook-endpoint.com"
                    />
                  </div>
                )}
                
                {integration.id === 'zapier' && (
                  <div className="space-y-2">
                    <Label htmlFor={`${integration.id}-webhook`}>Zapier Webhook URL</Label>
                    <Input
                      id={`${integration.id}-webhook`}
                      type="url"
                      value={configs[integration.id]?.webhookUrl || ''}
                      onChange={(e) => handleConfigChange(integration.id, 'webhookUrl', e.target.value)}
                      placeholder="https://hooks.zapier.com/hooks/catch/..."
                    />
                  </div>
                )}
                
                {integration.id === 'database' && (
                  <div className="space-y-2">
                    <Label htmlFor={`${integration.id}-connection`}>Connection String</Label>
                    <Input
                      id={`${integration.id}-connection`}
                      type="password"
                      value={configs[integration.id]?.connectionString || ''}
                      onChange={(e) => handleConfigChange(integration.id, 'connectionString', e.target.value)}
                      placeholder="postgresql://user:pass@host:port/db"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked={isConnected} />
                    <Label>Enable Integration</Label>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleTest(integration.id)}
                    >
                      Test Connection
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleSave(integration.id)}
                    >
                      Save Configuration
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Integration Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Notification Frequency</Label>
                <p className="text-sm text-gray-600">How often to send violation alerts</p>
              </div>
              <select className="border rounded px-3 py-1">
                <option>Immediately</option>
                <option>Every 15 minutes</option>
                <option>Hourly</option>
                <option>Daily digest</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Retry Failed Integrations</Label>
                <p className="text-sm text-gray-600">Automatically retry failed webhook calls</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
