
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Bell, 
  Mail, 
  Shield, 
  Key,
  Database,
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SettingsView = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    // Notification Settings
    emailAlerts: true,
    smsAlerts: false,
    browserNotifications: true,
    alertFrequency: "immediate",
    
    // Monitoring Settings
    scanFrequency: 15,
    enableAutoScans: true,
    maxConcurrentScans: 5,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 60,
    
    // API Settings
    googleAdsApiKey: "",
    awsAccessKey: "",
    awsSecretKey: ""
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your configuration has been updated successfully"
    });
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
          <p className="text-gray-600">Configure your brand protection system</p>
        </div>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Configure how you receive alerts and notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Alerts</Label>
                <p className="text-sm text-gray-600">Receive alerts via email</p>
              </div>
              <Switch
                checked={settings.emailAlerts}
                onCheckedChange={(checked) => 
                  setSettings({...settings, emailAlerts: checked})
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Alerts</Label>
                <p className="text-sm text-gray-600">Receive alerts via SMS</p>
              </div>
              <Switch
                checked={settings.smsAlerts}
                onCheckedChange={(checked) => 
                  setSettings({...settings, smsAlerts: checked})
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Browser Notifications</Label>
                <p className="text-sm text-gray-600">Show desktop notifications</p>
              </div>
              <Switch
                checked={settings.browserNotifications}
                onCheckedChange={(checked) => 
                  setSettings({...settings, browserNotifications: checked})
                }
              />
            </div>
            
            <div className="space-y-2">
              <Label>Alert Frequency</Label>
              <select 
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                value={settings.alertFrequency}
                onChange={(e) => setSettings({...settings, alertFrequency: e.target.value})}
              >
                <option value="immediate">Immediate</option>
                <option value="hourly">Hourly Summary</option>
                <option value="daily">Daily Summary</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Monitoring Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2 h-5 w-5" />
              Monitoring Settings
            </CardTitle>
            <CardDescription>
              Configure scanning and monitoring behavior
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Default Scan Frequency (minutes)</Label>
              <Input
                type="number"
                value={settings.scanFrequency}
                onChange={(e) => setSettings({...settings, scanFrequency: parseInt(e.target.value)})}
                min="5"
                max="1440"
              />
              <p className="text-sm text-gray-600">Minimum 5 minutes, maximum 24 hours</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Auto Scans</Label>
                <p className="text-sm text-gray-600">Automatically run scheduled scans</p>
              </div>
              <Switch
                checked={settings.enableAutoScans}
                onCheckedChange={(checked) => 
                  setSettings({...settings, enableAutoScans: checked})
                }
              />
            </div>
            
            <div className="space-y-2">
              <Label>Max Concurrent Scans</Label>
              <Input
                type="number"
                value={settings.maxConcurrentScans}
                onChange={(e) => setSettings({...settings, maxConcurrentScans: parseInt(e.target.value)})}
                min="1"
                max="10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Security Settings
            </CardTitle>
            <CardDescription>
              Manage your account security preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600">Add extra security to your account</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, twoFactorAuth: checked})
                  }
                />
                {settings.twoFactorAuth && (
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Session Timeout (minutes)</Label>
              <Input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
                min="15"
                max="480"
              />
              <p className="text-sm text-gray-600">Auto-logout after inactivity</p>
            </div>
          </CardContent>
        </Card>

        {/* API Settings - Admin Only */}
        {isAdmin && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="mr-2 h-5 w-5" />
                API Configuration
                <Badge className="ml-2 bg-red-100 text-red-800">Admin Only</Badge>
              </CardTitle>
              <CardDescription>
                Configure external API connections and credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Google Ads API Key</Label>
                <Input
                  type="password"
                  value={settings.googleAdsApiKey}
                  onChange={(e) => setSettings({...settings, googleAdsApiKey: e.target.value})}
                  placeholder="Enter Google Ads API key"
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>AWS Access Key</Label>
                <Input
                  type="password"
                  value={settings.awsAccessKey}
                  onChange={(e) => setSettings({...settings, awsAccessKey: e.target.value})}
                  placeholder="Enter AWS access key"
                />
              </div>
              
              <div className="space-y-2">
                <Label>AWS Secret Key</Label>
                <Input
                  type="password"
                  value={settings.awsSecretKey}
                  onChange={(e) => setSettings({...settings, awsSecretKey: e.target.value})}
                  placeholder="Enter AWS secret key"
                />
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> API credentials are encrypted and stored securely. 
                  These settings affect the entire system.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="mr-2 h-5 w-5" />
            System Status
          </CardTitle>
          <CardDescription>
            Current system health and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">99.9%</p>
              <p className="text-sm text-gray-600">System Uptime</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">4.2s</p>
              <p className="text-sm text-gray-600">Avg Response Time</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">1,247</p>
              <p className="text-sm text-gray-600">Scans Today</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
