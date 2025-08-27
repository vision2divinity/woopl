import React from 'react';
import { Activity, CheckCircle, AlertTriangle, XCircle, RefreshCw } from 'lucide-react';

const SystemHealthWidget = ({ healthData }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'error':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getOverallHealth = () => {
    const healthyCount = healthData?.filter(item => item?.status === 'healthy')?.length || 0;
    const totalCount = healthData?.length || 0;
    const percentage = Math.round((healthyCount / totalCount) * 100);
    
    if (percentage >= 90) return { status: 'healthy', color: 'text-green-600' };
    if (percentage >= 70) return { status: 'warning', color: 'text-yellow-600' };
    return { status: 'error', color: 'text-red-600' };
  };

  const overallHealth = getOverallHealth();
  const healthyServices = healthData?.filter(item => item?.status === 'healthy')?.length || 0;
  const totalServices = healthData?.length || 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {/* WordPress Metabox Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-600" />
            System Health
          </h3>
          <button className="text-xs text-blue-600 hover:text-blue-800">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-6">
        {/* Overall Health Status */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">Overall Health</h4>
            <div className="flex items-center space-x-1">
              {getStatusIcon(overallHealth?.status)}
              <span className={`text-sm font-medium ${overallHealth?.color}`}>
                {healthyServices}/{totalServices} Services
              </span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                overallHealth?.status === 'healthy' ? 'bg-green-500' :
                overallHealth?.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.round((healthyServices / totalServices) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Individual Service Status */}
        <div className="space-y-3">
          <h5 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Service Status</h5>
          
          {healthData?.map((service, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-between p-3 rounded-lg border ${getStatusColor(service?.status)}`}
            >
              <div className="flex items-center space-x-3">
                {getStatusIcon(service?.status)}
                <div>
                  <p className="font-medium text-sm">{service?.service}</p>
                  <p className="text-xs opacity-75">Response: {service?.responseTime}</p>
                </div>
              </div>
              
              <div className="text-right">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  service?.status === 'healthy' ? 'bg-green-100 text-green-800' :
                  service?.status === 'warning'? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                }`}>
                  {service?.status?.charAt(0)?.toUpperCase() + service?.status?.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* System Metrics */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h5 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Quick Metrics</h5>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">99.2%</p>
              <p className="text-xs text-blue-700">Uptime</p>
            </div>
            
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">245ms</p>
              <p className="text-xs text-green-700">Avg Response</p>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Last updated: {new Date()?.toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthWidget;