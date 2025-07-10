
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Play, 
  Pause, 
  RefreshCw, 
  Search, 
  Filter,
  Download,
  Eye,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const MonitoringView = () => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data
  const monitoringSessions = [
    {
      id: "scan-001",
      keyword: "YourBrand Pro Software",
      status: "running", 
      startTime: "2024-01-10T10:30:00Z",
      findings: 0,
      progress: 45,
      estimatedCompletion: "2 min"
    },
    {
      id: "scan-002",
      keyword: "YourBrand Enterprise",
      status: "completed",
      startTime: "2024-01-10T10:15:00Z",
      findings: 3,
      progress: 100,
      completionTime: "4 min 32s"
    },
    {
      id: "scan-003", 
      keyword: "YourBrand Solutions",
      status: "completed",
      startTime: "2024-01-10T10:00:00Z",
      findings: 1,
      progress: 100,
      completionTime: "3 min 15s"
    },
    {
      id: "scan-004",
      keyword: "YourBrand Premium",
      status: "scheduled",
      startTime: "2024-01-10T11:00:00Z",
      findings: 0,
      progress: 0,
      estimatedStart: "5 min"
    }
  ];

  const handleStartScan = async () => {
    setIsScanning(true);
    toast({
      title: "Scan initiated",
      description: "Full monitoring scan has been started"
    });
    
    // Simulate scan duration
    setTimeout(() => {
      setIsScanning(false);
      toast({
        title: "Scan completed",
        description: "Monitoring scan finished successfully"
      });
    }, 3000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return <Badge className="bg-blue-100 text-blue-800">Running</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "scheduled":
        return <Badge className="bg-gray-100 text-gray-800">Scheduled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredSessions = monitoringSessions.filter(session => {
    const matchesSearch = session.keyword.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || session.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Monitoring Dashboard</h2>
          <p className="text-gray-600">Real-time Google Ads monitoring and scanning</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button 
            onClick={handleStartScan}
            disabled={isScanning}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isScanning ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Scanning...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start Full Scan
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Scans</p>
                <p className="text-2xl font-bold text-blue-600">1</p>
              </div>
              <Play className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed Today</p>
                <p className="text-2xl font-bold text-green-600">12</p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Violations Found</p>
                <p className="text-2xl font-bold text-red-600">4</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Scan Time</p>
                <p className="text-2xl font-bold text-gray-900">3.2s</p>
              </div>
              <RefreshCw className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Monitoring Sessions</CardTitle>
          <CardDescription>Track and manage your scanning activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>

          {/* Monitoring Sessions Table */}
          <div className="space-y-4">
            {filteredSessions.map((session) => (
              <div key={session.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900">{session.keyword}</h3>
                      {getStatusBadge(session.status)}
                      {session.findings > 0 && (
                        <Badge variant="destructive">{session.findings} violations</Badge>
                      )}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <span>Started: {new Date(session.startTime).toLocaleString()}</span>
                      {session.status === "running" && (
                        <span className="ml-4">ETA: {session.estimatedCompletion}</span>
                      )}
                      {session.status === "completed" && (
                        <span className="ml-4">Duration: {session.completionTime}</span>
                      )}
                      {session.status === "scheduled" && (
                        <span className="ml-4">Starts in: {session.estimatedStart}</span>
                      )}
                    </div>
                    
                    {session.status === "running" && (
                      <div className="mt-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{session.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${session.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {session.status === "completed" && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
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
