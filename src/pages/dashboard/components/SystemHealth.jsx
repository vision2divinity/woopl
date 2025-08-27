import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemHealth = ({ healthStatus }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'healthy':
        return 'Connected';
      case 'warning':
        return 'Limited';
      case 'error':
        return 'Disconnected';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">System Health</h3>
      <div className="space-y-4">
        {healthStatus?.map((service) => (
          <div key={service?.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Icon name={service?.icon} size={16} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{service?.name}</p>
                <p className="text-xs text-muted-foreground">{service?.description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon 
                name={getStatusIcon(service?.status)} 
                size={16} 
                className={getStatusColor(service?.status)}
              />
              <span className={`text-xs font-medium ${getStatusColor(service?.status)}`}>
                {getStatusText(service?.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Overall System Status */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Overall Status</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-medium text-success">All Systems Operational</span>
          </div>
        </div>
      </div>
      {/* Last Updated */}
      <div className="mt-3 text-center">
        <p className="text-xs text-muted-foreground">
          Last updated: {new Date()?.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default SystemHealth;