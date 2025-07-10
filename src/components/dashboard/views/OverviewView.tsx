
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Eye, 
  AlertTriangle, 
  FileText, 
  TrendingUp, 
  Play, 
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

export const OverviewView = () => {
  // Mock data
  const stats = [
    {
      title: "Active Keywords",
      value: "47",
      change: "+3",
      icon: Eye,
      color: "text-blue-600"
    },
    {
      title: "Active Alerts",
      value: "12",
      change: "+5",
      icon: AlertTriangle,
      color: "text-red-600"
    },
    {
      title: "Open Cases",
      value: "8",
      change: "-2",
      icon: FileText,
      color: "text-orange-600"
    },
    {
      title: "Success Rate",
      value: "94%",
      change: "+2%",
      icon: TrendingUp,
      color: "text-green-600"
    }
  ];

  const recentScans = [
    {
      id: "1",
      keyword: "YourBrand Pro",
      status: "completed",
      findings: 3,
      timestamp: "2 minutes ago"
    },
    {
      id: "2", 
      keyword: "YourBrand Software",
      status: "running",
      findings: 0,
      timestamp: "5 minutes ago"
    },
    {
      id: "3",
      keyword: "YourBrand Enterprise",
      status: "completed",
      findings: 1,
      timestamp: "12 minutes ago"
    }
  ];

  const recentAlerts = [
    {
      id: "1",
      type: "High Priority",
      keyword: "YourBrand Pro",
      domain: "fake-brand-ads.com",
      timestamp: "3 minutes ago",
      severity: "high"
    },
    {
      id: "2",
      type: "Medium Priority", 
      keyword: "YourBrand Software",
      domain: "competitive-ads.net",
      timestamp: "18 minutes ago",
      severity: "medium"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "running":
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-600">Monitor your brand protection activities</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Play className="mr-2 h-4 w-4" />
          Run Full Scan
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-600">
                <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>
                {" "}from last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Scans */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Scans</CardTitle>
            <CardDescription>Latest monitoring activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentScans.map((scan) => (
                <div key={scan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(scan.status)}
                    <div>
                      <p className="font-medium">{scan.keyword}</p>
                      <p className="text-sm text-gray-600">{scan.timestamp}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={scan.findings > 0 ? "destructive" : "secondary"}>
                      {scan.findings} findings
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Latest infringement detections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className={`h-4 w-4 ${
                      alert.severity === 'high' ? 'text-red-600' : 'text-orange-600'
                    }`} />
                    <div>
                      <p className="font-medium">{alert.keyword}</p>
                      <p className="text-sm text-gray-600">{alert.domain}</p>
                      <p className="text-xs text-gray-500">{alert.timestamp}</p>
                    </div>
                  </div>
                  <Badge variant={alert.severity === 'high' ? "destructive" : "secondary"}>
                    {alert.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current monitoring performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">API Health</span>
                <span className="text-sm text-green-600">99.9%</span>
              </div>
              <Progress value={99.9} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Scan Accuracy</span>
                <span className="text-sm text-green-600">94.2%</span>
              </div>
              <Progress value={94.2} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Response Time</span>
                <span className="text-sm text-blue-600">&lt; 5s</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
