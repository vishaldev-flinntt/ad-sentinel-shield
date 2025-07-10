
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Play,
  Pause,
  MoreHorizontal
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const KeywordsView = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddKeywordOpen, setIsAddKeywordOpen] = useState(false);
  const [newKeyword, setNewKeyword] = useState({
    keyword: "",
    priority: "medium",
    active: true,
    whitelist: ""
  });

  // Mock data
  const [keywords, setKeywords] = useState([
    {
      id: "1",
      keyword: "YourBrand Pro Software",
      priority: "high",
      active: true,
      lastScan: "2024-01-10T10:30:00Z",
      findings: 3,
      whitelistDomains: ["partner1.com", "authorized-reseller.com"],
      scanFrequency: "15min"
    },
    {
      id: "2", 
      keyword: "YourBrand Enterprise",
      priority: "high",
      active: true,
      lastScan: "2024-01-10T10:15:00Z",
      findings: 1,
      whitelistDomains: ["enterprise-partner.com"],
      scanFrequency: "15min"
    },
    {
      id: "3",
      keyword: "YourBrand Solutions",
      priority: "medium",
      active: false,
      lastScan: "2024-01-09T15:45:00Z",
      findings: 0,
      whitelistDomains: [],
      scanFrequency: "30min"
    },
    {
      id: "4",
      keyword: "YourBrand Premium",
      priority: "medium",
      active: true,
      lastScan: "2024-01-10T09:20:00Z",
      findings: 2,
      whitelistDomains: ["premium-partner.net"],
      scanFrequency: "30min"
    }
  ]);

  const handleAddKeyword = () => {
    const keyword = {
      id: Date.now().toString(),
      keyword: newKeyword.keyword,
      priority: newKeyword.priority,
      active: newKeyword.active,
      lastScan: null,
      findings: 0,
      whitelistDomains: newKeyword.whitelist.split('\n').filter(d => d.trim()),
      scanFrequency: newKeyword.priority === "high" ? "15min" : "30min"
    };

    setKeywords([...keywords, keyword]);
    setNewKeyword({ keyword: "", priority: "medium", active: true, whitelist: "" });
    setIsAddKeywordOpen(false);
    
    toast({
      title: "Keyword added",
      description: `"${keyword.keyword}" has been added to monitoring`
    });
  };

  const handleToggleKeyword = (id: string) => {
    setKeywords(keywords.map(k => 
      k.id === id ? { ...k, active: !k.active } : k
    ));
    
    toast({
      title: "Keyword updated",
      description: "Monitoring status has been changed"
    });
  };

  const handleDeleteKeyword = (id: string) => {
    setKeywords(keywords.filter(k => k.id !== id));
    toast({
      title: "Keyword deleted",
      description: "Keyword has been removed from monitoring"
    });
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "low":
        return <Badge className="bg-gray-100 text-gray-800">Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const filteredKeywords = keywords.filter(keyword =>
    keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Keywords Management</h2>
          <p className="text-gray-600">Manage your branded keywords and monitoring settings</p>
        </div>
        
        <Dialog open={isAddKeywordOpen} onOpenChange={setIsAddKeywordOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Keyword
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Keyword</DialogTitle>
              <DialogDescription>
                Add a new branded keyword to monitor for trademark infringement
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="keyword">Keyword</Label>
                <Input
                  id="keyword"
                  placeholder="e.g., YourBrand Pro"
                  value={newKeyword.keyword}
                  onChange={(e) => setNewKeyword({...newKeyword, keyword: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="priority">Priority Level</Label>
                <select 
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                  value={newKeyword.priority}
                  onChange={(e) => setNewKeyword({...newKeyword, priority: e.target.value})}
                >
                  <option value="high">High (15min scans)</option>
                  <option value="medium">Medium (30min scans)</option>
                  <option value="low">Low (1hr scans)</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={newKeyword.active}
                  onCheckedChange={(checked) => setNewKeyword({...newKeyword, active: checked})}
                />
                <Label htmlFor="active">Enable monitoring</Label>
              </div>
              
              <div>
                <Label htmlFor="whitelist">Whitelist Domains (one per line)</Label>
                <Textarea
                  id="whitelist"
                  placeholder="partner.com&#10;authorized-reseller.net"
                  value={newKeyword.whitelist}
                  onChange={(e) => setNewKeyword({...newKeyword, whitelist: e.target.value})}
                  rows={3}
                />
              </div>
              
              <Button onClick={handleAddKeyword} className="w-full">
                Add Keyword
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{keywords.length}</p>
              <p className="text-sm text-gray-600">Total Keywords</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {keywords.filter(k => k.active).length}
              </p>
              <p className="text-sm text-gray-600">Active Monitoring</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Keywords List */}
      <Card>
        <CardHeader>
          <CardTitle>Keyword List</CardTitle>
          <CardDescription>Manage your monitored branded keywords</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredKeywords.map((keyword) => (
              <div key={keyword.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900">{keyword.keyword}</h3>
                      {getPriorityBadge(keyword.priority)}
                      {keyword.active ? (
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                      {keyword.findings > 0 && (
                        <Badge variant="destructive">{keyword.findings} findings</Badge>
                      )}
                    </div>
                    
                    <div className="mt-2 text-sm text-gray-600">
                      <div className="flex space-x-6">
                        <span>Scan frequency: {keyword.scanFrequency}</span>
                        {keyword.lastScan && (
                          <span>Last scan: {new Date(keyword.lastScan).toLocaleString()}</span>
                        )}
                        <span>Whitelist: {keyword.whitelistDomains.length} domains</span>
                      </div>
                    </div>
                    
                    {keyword.whitelistDomains.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">Whitelisted domains:</p>
                        <div className="flex flex-wrap gap-1">
                          {keyword.whitelistDomains.map((domain, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {domain}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleKeyword(keyword.id)}
                    >
                      {keyword.active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteKeyword(keyword.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
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
