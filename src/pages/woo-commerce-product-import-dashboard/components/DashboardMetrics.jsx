import React from 'react';
import { Package, TrendingUp, Clock, DollarSign, ShoppingCart, Activity } from 'lucide-react';

const DashboardMetrics = ({ metrics }) => {
  const metricCards = [
    {
      title: "Products Imported Today",
      value: metrics?.productsImportedToday || 0,
      subtitle: "of 100 daily target",
      icon: Package,
      trend: "up",
      trendValue: "+12%",
      color: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      title: "Success Rate",
      value: `${metrics?.successRate?.toFixed(1) || 0}%`,
      subtitle: "last 24 hours",
      icon: TrendingUp,
      trend: "up",
      trendValue: "+2.1%",
      color: "bg-green-50 text-green-700 border-green-200"
    },
    {
      title: "Pending Approvals",
      value: metrics?.pendingApprovals || 0,
      subtitle: "awaiting review",
      icon: Clock,
      trend: "neutral",
      trendValue: "±0%",
      color: "bg-yellow-50 text-yellow-700 border-yellow-200"
    },
    {
      title: "Revenue Impact",
      value: `$${metrics?.revenueImpact?.toFixed(2) || 0}`,
      subtitle: "estimated monthly",
      icon: DollarSign,
      trend: "up",
      trendValue: "+8.5%",
      color: "bg-purple-50 text-purple-700 border-purple-200"
    },
    {
      title: "Total Products",
      value: metrics?.totalProducts || 0,
      subtitle: "in WooCommerce",
      icon: ShoppingCart,
      trend: "up",
      trendValue: "+45",
      color: "bg-indigo-50 text-indigo-700 border-indigo-200"
    },
    {
      title: "Active Imports",
      value: metrics?.activeImports || 0,
      subtitle: "currently processing",
      icon: Activity,
      trend: "neutral",
      trendValue: "Real-time",
      color: "bg-orange-50 text-orange-700 border-orange-200"
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return '↗';
      case 'down':
        return '↘';
      default:
        return '→';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div>
      {/* WordPress-style metabox header */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Import Metrics Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metricCards?.map((card, index) => {
          const IconComponent = card?.icon;
          
          return (
            <div key={index} className={`bg-white border rounded-lg p-4 ${card?.color}`}>
              <div className="flex items-center justify-between mb-3">
                <IconComponent className="w-6 h-6" />
                <span className={`text-xs font-medium ${getTrendColor(card?.trend)}`}>
                  {getTrendIcon(card?.trend)} {card?.trendValue}
                </span>
              </div>
              
              <div className="mb-1">
                <h3 className="text-2xl font-bold">
                  {card?.value}
                </h3>
              </div>
              
              <div>
                <p className="text-sm font-medium opacity-90">{card?.title}</p>
                <p className="text-xs opacity-70 mt-0.5">{card?.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardMetrics;