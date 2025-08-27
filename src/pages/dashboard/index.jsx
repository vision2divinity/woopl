import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import MetricsCard from './components/MetricsCard';
import AutomationControlPanel from './components/AutomationControlPanel';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import SystemHealth from './components/SystemHealth';
import CurrencyConverter from './components/CurrencyConverter';

const Dashboard = () => {
  const [automationStatus, setAutomationStatus] = useState({
    isRunning: true,
    nextImportTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    scheduledProducts: 100,
    currentProgress: 67
  });

  const [dashboardData, setDashboardData] = useState({
    productsImportedToday: 47,
    successRate: 94.2,
    pendingApprovals: 23,
    revenueImpact: 2847.50
  });

  const [recentActivities] = useState([
    {
      id: 1,
      productName: "Wireless Bluetooth Headphones with Noise Cancellation",
      productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      platform: "AliExpress",
      price: "89.50",
      status: "success",
      action: "Successfully imported and published to WooCommerce",
      timestamp: new Date(Date.now() - 15 * 60 * 1000)
    },
    {
      id: 2,
      productName: "Smart Fitness Tracker with Heart Rate Monitor",
      productImage: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop",
      platform: "Alibaba",
      price: "125.00",
      status: "pending",
      action: "Awaiting approval in import queue",
      timestamp: new Date(Date.now() - 32 * 60 * 1000)
    },
    {
      id: 3,
      productName: "Portable Solar Power Bank 20000mAh",
      productImage: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
      platform: "1688",
      price: "67.25",
      status: "processing",
      action: "Processing product images and descriptions",
      timestamp: new Date(Date.now() - 45 * 60 * 1000)
    },
    {
      id: 4,
      productName: "LED Gaming Keyboard RGB Backlit",
      productImage: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
      platform: "AliExpress",
      price: "78.90",
      status: "failed",
      action: "Import failed due to API rate limit",
      error: "Rate limit exceeded. Retry scheduled in 30 minutes.",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000)
    },
    {
      id: 5,
      productName: "Waterproof Bluetooth Speaker",
      productImage: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      platform: "Alibaba",
      price: "45.75",
      status: "success",
      action: "Successfully imported with 5 variants",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ]);

  const [systemHealthStatus] = useState([
    {
      name: "WooCommerce API",
      description: "Store connection",
      icon: "Store",
      status: "healthy"
    },
    {
      name: "AliExpress API",
      description: "Product sourcing",
      icon: "ShoppingBag",
      status: "healthy"
    },
    {
      name: "Alibaba API",
      description: "Wholesale sourcing",
      icon: "Building2",
      status: "warning"
    },
    {
      name: "1688 Scraper",
      description: "Data extraction",
      icon: "Globe",
      status: "healthy"
    },
    {
      name: "Image Processing",
      description: "Media optimization",
      icon: "Image",
      status: "healthy"
    }
  ]);

  // Auto-refresh dashboard data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setDashboardData(prev => ({
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

  const metricsData = [
    {
      title: "Products Imported Today",
      value: dashboardData?.productsImportedToday,
      subtitle: "of 100 daily target",
      icon: "Package",
      trend: "up",
      trendValue: "+12%",
      color: "primary"
    },
    {
      title: "Success Rate",
      value: `${dashboardData?.successRate?.toFixed(1)}%`,
      subtitle: "last 24 hours",
      icon: "TrendingUp",
      trend: "up",
      trendValue: "+2.1%",
      color: "success"
    },
    {
      title: "Pending Approvals",
      value: dashboardData?.pendingApprovals,
      subtitle: "awaiting review",
      icon: "Clock",
      trend: "neutral",
      trendValue: "±0%",
      color: "warning"
    },
    {
      title: "Revenue Impact",
      value: `GHS ${dashboardData?.revenueImpact?.toFixed(2)}`,
      subtitle: "estimated monthly",
      icon: "DollarSign",
      trend: "up",
      trendValue: "+8.5%",
      color: "success"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - WooCommerce Product Importer</title>
        <meta name="description" content="Monitor automated product import performance and control system operations for your WooCommerce store." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Monitor your automated product import performance and system status
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metricsData?.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric?.title}
                  value={metric?.value}
                  subtitle={metric?.subtitle}
                  icon={metric?.icon}
                  trend={metric?.trend}
                  trendValue={metric?.trendValue}
                  color={metric?.color}
                />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Automation Control Panel */}
              <div className="lg:col-span-2">
                <AutomationControlPanel
                  isRunning={automationStatus?.isRunning}
                  onToggle={handleAutomationToggle}
                  nextImportTime={automationStatus?.nextImportTime}
                  scheduledProducts={automationStatus?.scheduledProducts}
                  currentProgress={automationStatus?.currentProgress}
                />
              </div>

              {/* Quick Actions */}
              <div>
                <QuickActions />
              </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Activity Feed */}
              <div className="lg:col-span-2">
                <ActivityFeed activities={recentActivities} />
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* System Health */}
                <SystemHealth healthStatus={systemHealthStatus} />
                
                {/* Currency Converter */}
                <CurrencyConverter />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;