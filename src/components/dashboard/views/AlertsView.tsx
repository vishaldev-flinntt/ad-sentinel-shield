
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AlertTriangle, 
  Bell, 
  CheckCircle, 
  Clock,
  ExternalLink,
  Search,
  Eye
} from "lucide-react";

export const AlertsView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");

  // Mock data
  const alerts = [
    {
      id: "ALERT-001",
      type: "Trademark Infringement",
      severity: "high",
      keyword: "YourBrand Pro Software",
      domain: "fake-brand-software.com",
      adHeadline: "YourBrand Pro - Best Software Solutions",
      url: "https://fake-brand-software.com/ads",
      timestamp: "2024-01-10T10:30:00Z",
      status: "active",
      caseId: "CASE-001",
      screenshot: "/screenshots/alert-001.png"
    },
    {
      id: "ALERT-002",
      type: "Unauthorized Reseller",
      severity: "high",
      keyword: "YourBrand Premium",
      domain: "unauthorized-dealer.com",
      adHeadline: "Official YourBrand Premium Reseller",
      url: "https://unauthorized-dealer.com/premium",
      timestamp: "2024-01-10T09:15:00Z",
      status: "active",
      caseId: "CASE-003",
      screenshot: "/screenshots/alert-002.png"
    },
    {
      id: "ALERT-003",
      type: "Trademark Infringement",
      severity: "medium",
      keyword: "YourBrand Solutions",
      domain: "competitive-solutions.net",
      adHeadline: "YourBrand Solutions Alternative - Better Price",
      url: "https://competitive-solutions.net/ads",
      timestamp: "2024-01-10T08:45:00Z",
      status: "resolved",
      caseId: "CASE-002",
      screenshot: "/screenshots/alert-003.png"
    },
    {
      id: "ALERT-004",
      type: "Counterfeit Product",
      severity: "high",
      keyword: "YourBrand Enterprise",
      domain: "fake-enterprise.org",
      adHeadline: "Cheap YourBrand Enterprise License",
      url: "https://fake-enterprise.org/license",
      timestamp: "2024-01-10T07:20:00Z",
      status: "investigating",
      caseId: null,
      screenshot: "/screenshots/alert-004.png"
    }
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High Risk</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>;
      case "low":
        return <Badge className="bg-blue-100 text-blue-800">Low Risk</Badge>;
      default:
        return <Badge variant="secondary">{severity}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-red-100 text-red-800">Active</Badge>;
      case "investigating":
        return <Badge className="bg-yellow-100 text-yellow-800">Investigating</Badge>;
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case "low":
        return <Bell className="h-5 w-5 text-blue-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Alert Management</h2>
          <p className="text-gray-600">Monitor and respond to brand protection alerts</p>
        </div>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Alerts</p>
                <p className="text-2xl font-bold text-gray-900">{alerts.length}</p>
              </div>
              <Bell className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Risk</p>
                <p className="text-2xl font-bold text-red-600">
                  {alerts.filter(a => a.severity === 'high').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-orange-600">
                  {alerts.filter(a => a.status === 'active').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-green-600">
                  {alerts.filter(a => a.status === 'resolved').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>Latest brand protection alerts and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 max-w-sm"
                />
              </div>
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getSeverityIcon(alert.severity)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-gray-900">{alert.id}</h3>
                      {getSeverityBadge(alert.severity)}
                      {getStatusBadge(alert.status)}
                      <Badge variant="outline" className="text-xs">
                        {alert.type}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Keyword:</span> {alert.keyword}
                      </div>
                      <div>
                        <span className="font-medium">Domain:</span>{" "}
                        <a 
                          href={alert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline inline-flex items-center"
                        >
                          {alert.domain}
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </div>
                      <div>
                        <span className="font-medium">Ad Headline:</span> "{alert.adHeadline}"
                      </div>
                      <div>
                        <span className="font-medium">Detected:</span> {new Date(alert.timestamp).toLocaleString()}
                      </div>
                      {alert.caseId && (
                        <div>
                          <span className="font-medium">Case ID:</span>{" "}
                          <Badge variant="outline" className="text-xs">
                            {alert.caseId}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {alert.status === 'active' && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Create Case
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
