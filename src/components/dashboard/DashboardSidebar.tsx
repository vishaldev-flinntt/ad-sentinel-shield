
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { 
  Shield, 
  Eye, 
  Search, 
  FileText, 
  AlertTriangle, 
  Settings,
  Users,
  BarChart3
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface DashboardSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export const DashboardSidebar = ({ activeView, setActiveView }: DashboardSidebarProps) => {
  const { user } = useAuth();
  const { collapsed } = useSidebar();

  const menuItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "monitoring", label: "Monitoring", icon: Eye },
    { id: "keywords", label: "Keywords", icon: Search },
    { id: "cases", label: "Cases", icon: FileText },
    { id: "alerts", label: "Alerts", icon: AlertTriangle },
  ];

  const adminItems = [
    { id: "users", label: "Users", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <Sidebar className={cn("border-r", collapsed ? "w-16" : "w-64")}>
      <SidebarContent>
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-600" />
            {!collapsed && (
              <div>
                <h2 className="text-lg font-semibold">Brand Protect</h2>
                <p className="text-sm text-gray-500">Monitoring System</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveView(item.id)}
                    className={cn(
                      "w-full justify-start",
                      activeView === item.id && "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {!collapsed && <span>{item.label}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user?.role === 'admin' && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveView(item.id)}
                      className={cn(
                        "w-full justify-start",
                        activeView === item.id && "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.label}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
};
