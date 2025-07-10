
import { useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardContent } from "./DashboardContent";
import { SidebarProvider } from "@/components/ui/sidebar";

export const Dashboard = () => {
  const [activeView, setActiveView] = useState("overview");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <DashboardSidebar activeView={activeView} setActiveView={setActiveView} />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6">
            <DashboardContent activeView={activeView} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
