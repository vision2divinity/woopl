import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Play, Pause, Settings, Plus, Activity } from 'lucide-react';
import DashboardMetrics from './components/DashboardMetrics';
import AutomationPanel from './components/AutomationPanel';
import RecentImports from './components/RecentImports';
import QuickActionsWidget from './components/QuickActionsWidget';
import SystemHealthWidget from './components/SystemHealthWidget';

const WooCommerceProductImportDashboard = () => {
  const [automationStatus, setAutomationStatus] = useState({
    isRunning: true,
    nextImportTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    scheduledProducts: 100,
    currentProgress: 67,
    currentTask: 'Processing product images from AliExpress'
  });

  const [dashboardMetrics, setDashboardMetrics] = useState({
    productsImportedToday: 47,
    successRate: 94.2,
    pendingApprovals: 23,
    revenueImpact: 2847.50,
    totalProducts: 1248,
    activeImports: 3
  });

  const [recentImports] = useState([
    {
      id: 1,
      productName: "Wireless Bluetooth Headphones with Noise Cancellation",
      productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop",
      platform: "AliExpress",
      price: "89.50",
      status: "published",
      importTime: new Date(Date.now() - 15 * 60 * 1000),
      wooCommerceId: "WC-12847"
    },
    {
      id: 2,
      productName: "Smart Fitness Tracker with Heart Rate Monitor",
      productImage: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=80&h=80&fit=crop",
      platform: "Alibaba",
      price: "125.00",
      status: "pending",
      importTime: new Date(Date.now() - 32 * 60 * 1000),
      wooCommerceId: "WC-12848"
    },
    {
      id: 3,
      productName: "Portable Solar Power Bank 20000mAh",
      productImage: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=80&h=80&fit=crop",
      platform: "1688",
      price: "67.25",
      status: "processing",
      importTime: new Date(Date.now() - 45 * 60 * 1000),
      wooCommerceId: "WC-12849"
    },
    {
      id: 4,
      productName: "LED Gaming Keyboard RGB Backlit",
      productImage: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=80&h=80&fit=crop",
      platform: "AliExpress",
      price: "78.90",
      status: "failed",
      importTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
      error: "Rate limit exceeded",
      wooCommerceId: "WC-12850"
    }
  ]);

  const [systemHealth] = useState([
    { service: "WooCommerce API", status: "healthy", responseTime: "127ms" },
    { service: "AliExpress API", status: "healthy", responseTime: "234ms" },
    { service: "Alibaba API", status: "warning", responseTime: "856ms" },
    { service: "Image Processing", status: "healthy", responseTime: "89ms" }
  ]);

  // Auto-refresh dashboard data
  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardMetrics(prev => ({
        ...prev,
        productsImportedToday: prev?.productsImportedToday + Math.floor(Math.random() * 2),
        successRate: Math.max(90, Math.min(99, prev?.successRate + (Math.random() - 0.5) * 2)),
        pendingApprovals: Math.max(0, prev?.pendingApprovals + Math.floor(Math.random() * 3) - 1),
        revenueImpact: prev?.revenueImpact + Math.random() * 50
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleAutomationToggle = () => {
    setAutomationStatus(prev => ({
      ...prev,
      isRunning: !prev?.isRunning,
      currentProgress: !prev?.isRunning ? 0 : prev?.currentProgress
    }));
  };

  return (
    <>
      <Helmet>
        <title>Product Importer - WooCommerce</title>
        <meta name="description" content="WooCommerce Product Importer dashboard for automated product management and import monitoring." />
      </Helmet>
      
      {/* WordPress Admin Page Wrapper */}
      <div className="wrap bg-gray-50 min-h-screen">
        {/* WordPress Admin Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 mb-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2 flex items-center">
                <Activity className="w-6 h-6 mr-3 text-blue-600" />
                Product Importer Dashboard
              </h1>
              <p className="text-gray-600">
                Monitor automated imports, manage product queue, and control system operations.
              </p>
            </div>
            
            {/* Main Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleAutomationToggle}
                className={`inline-flex items-center px-4 py-2 rounded font-medium ${
                  automationStatus?.isRunning
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' :'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {automationStatus?.isRunning ? (
                  <Pause className="w-4 h-4 mr-2" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                {automationStatus?.isRunning ? 'Stop Automation' : 'Start Automation'}
              </button>
              
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Manual Import
              </button>
              
              <button className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="px-6 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Metrics Cards Row */}
            <div className="mb-8">
              <DashboardMetrics metrics={dashboardMetrics} />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Automation Control Panel */}
              <div className="lg:col-span-2">
                <AutomationPanel
                  automationStatus={automationStatus}
                  onToggle={handleAutomationToggle}
                />
              </div>

              {/* Quick Actions Widget */}
              <div>
                <QuickActionsWidget />
              </div>
            </div>

            {/* Bottom Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Imports Table */}
              <div className="lg:col-span-2">
                <RecentImports imports={recentImports} />
              </div>

              {/* System Health Widget */}
              <div>
                <SystemHealthWidget healthData={systemHealth} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WooCommerceProductImportDashboard;