
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { LoginForm } from "@/components/auth/LoginForm";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Eye, AlertTriangle, FileSearch } from "lucide-react";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Shield className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Brand Protection Module</h1>
            <p className="text-xl text-gray-600 mb-8">
              Automated trademark monitoring and protection for your brand
            </p>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center text-center space-y-4">
                  <Eye className="h-12 w-12 text-blue-600" />
                  <h3 className="text-lg font-semibold">Real-time Monitoring</h3>
                  <p className="text-gray-600">Monitor Google Ads for trademark infringement every 15 minutes</p>
                </CardContent>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center text-center space-y-4">
                  <FileSearch className="h-12 w-12 text-green-600" />
                  <h3 className="text-lg font-semibold">Evidence Collection</h3>
                  <p className="text-gray-600">Automatically capture and store evidence with screenshots</p>
                </CardContent>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center text-center space-y-4">
                  <AlertTriangle className="h-12 w-12 text-orange-600" />
                  <h3 className="text-lg font-semibold">Instant Alerts</h3>
                  <p className="text-gray-600">Get notified within 1 minute of potential infringement</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="max-w-md mx-auto">
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }

  return <Dashboard />;
};

export default Index;
