import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCards = ({ stats }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-GH')?.format(num);
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  const statsData = [
    {
      title: 'Total Products',
      value: formatNumber(stats?.totalProducts),
      change: stats?.productsChange,
      icon: 'Package',
      color: 'bg-primary',
      description: 'Imported products'
    },
    {
      title: 'Published',
      value: formatNumber(stats?.publishedProducts),
      change: stats?.publishedChange,
      icon: 'CheckCircle',
      color: 'bg-success',
      description: 'Live on store'
    },
    {
      title: 'Total Sales',
      value: formatNumber(stats?.totalSales),
      change: stats?.salesChange,
      icon: 'ShoppingCart',
      color: 'bg-accent',
      description: 'Units sold'
    },
    {
      title: 'Revenue',
      value: formatCurrency(stats?.totalRevenue),
      change: stats?.revenueChange,
      icon: 'DollarSign',
      color: 'bg-secondary',
      description: 'From imported products'
    },
    {
      title: 'Failed Imports',
      value: formatNumber(stats?.failedImports),
      change: stats?.failedChange,
      icon: 'XCircle',
      color: 'bg-error',
      description: 'Need attention'
    },
    {
      title: 'Sync Success Rate',
      value: `${stats?.syncSuccessRate}%`,
      change: stats?.syncRateChange,
      icon: 'RefreshCw',
      color: 'bg-primary',
      description: 'Last 30 days'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {statsData?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-10 h-10 ${stat?.color} rounded-lg flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} color="white" />
            </div>
            <div className={`flex items-center space-x-1 text-xs ${getChangeColor(stat?.change)}`}>
              <Icon name={getChangeIcon(stat?.change)} size={12} />
              <span>{Math.abs(stat?.change)}%</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{stat?.value}</h3>
            <p className="text-sm font-medium text-foreground mb-1">{stat?.title}</p>
            <p className="text-xs text-muted-foreground">{stat?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;