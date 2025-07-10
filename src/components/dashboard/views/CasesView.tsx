
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  FileText, 
  Download, 
  Eye, 
  ExternalLink,
  Search,
  Filter
} from "lucide-react";

export const CasesView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCase, setSelectedCase] = useState(null);

  // Mock data
  const cases = [
    {
      id: "CASE-001",
      keyword: "YourBrand Pro Software",
      infringingUrl: "https://fake-brand-software.com/ads",
      adHeadline: "YourBrand Pro - Best Software Solutions",
      domain: "fake-brand-software.com",
      status: "open",
      priority: "high",
      dateCreated: "2024-01-10T08:30:00Z",
      lastUpdated: "2024-01-10T10:15:00Z",
      evidenceFiles: [
        { type: "screenshot", name: "serp_screenshot.png", size: "1.2MB" },
        { type: "json", name: "ad_details.json", size: "15KB" },
        { type: "zip", name: "evidence_package.zip", size: "1.8MB" }
      ],
      takedownRequests: [
        { platform: "Google", status: "pending", submittedAt: "2024-01-10T09:00:00Z" }
      ]
    },
    {
      id: "CASE-002",
      keyword: "YourBrand Enterprise",
      infringingUrl: "https://competitive-ads.net/enterprise",
      adHeadline: "YourBrand Enterprise Alternative - Better Price",
      domain: "competitive-ads.net",
      status: "resolved",
      priority: "medium",
      dateCreated: "2024-01-09T14:20:00Z",
      lastUpdated: "2024-01-10T11:30:00Z",
      evidenceFiles: [
        { type: "screenshot", name: "serp_screenshot.png", size: "980KB" },
        { type: "json", name: "ad_details.json", size: "12KB" }
      ],
      takedownRequests: [
        { platform: "Google", status: "approved", submittedAt: "2024-01-09T15:00:00Z" }
      ]
    },
    {
      id: "CASE-003",
      keyword: "YourBrand Premium",
      infringingUrl: "https://unauthorized-dealer.com/premium",
      adHeadline: "Official YourBrand Premium Reseller",
      domain: "unauthorized-dealer.com",
      status: "pending",
      priority: "high",
      dateCreated: "2024-01-10T07:45:00Z",
      lastUpdated: "2024-01-10T07:45:00Z",
      evidenceFiles: [
        { type: "screenshot", name: "serp_screenshot.png", size: "1.5MB" },
        { type: "json", name: "ad_details.json", size: "18KB" },
        { type: "zip", name: "evidence_package.zip", size: "2.1MB" }
      ],
      takedownRequests: []
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-red-100 text-red-800">Open</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800">Medium</Badge>;
      case "low":
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Case Management</h2>
          <p className="text-gray-600">Track and manage trademark infringement cases</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Cases</p>
                <p className="text-2xl font-bold text-gray-900">{cases.length}</p>
              </div>
              <FileText className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Open Cases</p>
                <p className="text-2xl font-bold text-red-600">
                  {cases.filter(c => c.status === 'open').length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {cases.filter(c => c.status === 'pending').length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-green-600">
                  {cases.filter(c => c.status === 'resolved').length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Infringement Cases</CardTitle>
          <CardDescription>View and manage all trademark infringement cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search cases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 max-w-sm"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cases List */}
          <div className="space-y-4">
            {filteredCases.map((case_) => (
              <div key={case_.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-gray-900">{case_.id}</h3>
                      {getStatusBadge(case_.status)}
                      {getPriorityBadge(case_.priority)}
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Keyword:</span> {case_.keyword}
                      </div>
                      <div>
                        <span className="font-medium">Infringing URL:</span>{" "}
                        <a 
                          href={case_.infringingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline inline-flex items-center"
                        >
                          {case_.domain}
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </div>
                      <div>
                        <span className="font-medium">Ad Headline:</span> "{case_.adHeadline}"
                      </div>
                      <div>
                        <span className="font-medium">Created:</span> {new Date(case_.dateCreated).toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-2">Evidence Files:</p>
                      <div className="flex flex-wrap gap-2">
                        {case_.evidenceFiles.map((file, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {file.name} ({file.size})
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {case_.takedownRequests.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 mb-2">Takedown Requests:</p>
                        <div className="flex space-x-2">
                          {case_.takedownRequests.map((request, index) => (
                            <Badge 
                              key={index} 
                              variant={request.status === 'approved' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {request.platform}: {request.status}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Case Details - {case_.id}</DialogTitle>
                          <DialogDescription>
                            Complete information about this infringement case
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium">Status</h4>
                              {getStatusBadge(case_.status)}
                            </div>
                            <div>
                              <h4 className="font-medium">Priority</h4>
                              {getPriorityBadge(case_.priority)}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Evidence Files</h4>
                            <div className="space-y-2">
                              {case_.evidenceFiles.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                  <span className="text-sm">{file.name}</span>
                                  <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
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
