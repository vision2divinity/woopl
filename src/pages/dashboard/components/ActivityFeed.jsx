import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = ({ activities }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'pending':
        return { name: 'Clock', color: 'text-warning' };
      case 'failed':
        return { name: 'XCircle', color: 'text-error' };
      case 'processing':
        return { name: 'Loader', color: 'text-primary' };
      default:
        return { name: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'aliexpress':
        return 'ShoppingBag';
      case 'alibaba':
        return 'Building2';
      case '1688':
        return 'Store';
      default:
        return 'Globe';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <button className="text-sm text-primary hover:text-primary/80 font-medium">
            View All
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {activities?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {activities?.map((activity) => {
              const statusIcon = getStatusIcon(activity?.status);
              
              return (
                <div key={activity?.id} className="p-4 hover:bg-muted/50 transition-colors duration-200">
                  <div className="flex items-start space-x-4">
                    {/* Product Image */}
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={activity?.productImage}
                        alt={activity?.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Activity Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground truncate">
                            {activity?.productName}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Icon 
                              name={getPlatformIcon(activity?.platform)} 
                              size={14} 
                              className="text-muted-foreground" 
                            />
                            <span className="text-xs text-muted-foreground">
                              {activity?.platform}
                            </span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">
                              GHS {activity?.price}
                            </span>
                          </div>
                        </div>
                        
                        {/* Status and Time */}
                        <div className="flex items-center space-x-2 ml-4">
                          <Icon 
                            name={statusIcon?.name} 
                            size={16} 
                            className={statusIcon?.color}
                          />
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatTime(activity?.timestamp)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Action Description */}
                      <p className="text-xs text-muted-foreground mt-2">
                        {activity?.action}
                      </p>
                      
                      {/* Error Message (if any) */}
                      {activity?.status === 'failed' && activity?.error && (
                        <div className="mt-2 p-2 bg-error/10 border border-error/20 rounded text-xs text-error">
                          {activity?.error}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;