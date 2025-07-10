
import { OverviewView } from "./views/OverviewView";
import { MonitoringView } from "./views/MonitoringView";
import { KeywordsView } from "./views/KeywordsView";
import { CasesView } from "./views/CasesView";
import { AlertsView } from "./views/AlertsView";
import { IntegrationsView } from "./views/IntegrationsView";
import { UsersView } from "./views/UsersView";
import { SettingsView } from "./views/SettingsView";

interface DashboardContentProps {
  activeView: string;
}

export const DashboardContent = ({ activeView }: DashboardContentProps) => {
  switch (activeView) {
    case "overview":
      return <OverviewView />;
    case "monitoring":
      return <MonitoringView />;
    case "keywords":
      return <KeywordsView />;
    case "cases":
      return <CasesView />;
    case "alerts":
      return <AlertsView />;
    case "integrations":
      return <IntegrationsView />;
    case "users":
      return <UsersView />;
    case "settings":
      return <SettingsView />;
    default:
      return <OverviewView />;
  }
};
