import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle, XCircle, AlertTriangle, RefreshCw, Download, Trash2, Eye } from 'lucide-react';

const SystemStatusTab = () => {
  const [systemHealth, setSystemHealth] = useState([
    {
      service: 'WooCommerce API',
      description: 'Store connection and product management',
      status: 'healthy',
      lastChecked: new Date(Date.now() - 5 * 60 * 1000),
      responseTime: '127ms',
      details: 'API keys valid, store accessible'
    },
    {
      service: 'AliExpress API',
      description: 'Product sourcing and data fetching',
      status: 'healthy',
      lastChecked: new Date(Date.now() - 8 * 60 * 1000),
      responseTime: '234ms',
      details: 'Rate limits: 4,892/5,000 requests remaining'
    },
    {
      service: 'Alibaba API',
      description: 'Wholesale product information',
      status: 'warning',
      lastChecked: new Date(Date.now() - 12 * 60 * 1000),
      responseTime: '856ms',
      details: 'Slow response times detected'
    },
    {
      service: '1688 Scraper',
      description: 'Data extraction service',
      status: 'healthy',
      lastChecked: new Date(Date.now() - 3 * 60 * 1000),
      responseTime: '445ms',
      details: 'All scrapers operational'
    },
    {
      service: 'Image Processing',
      description: 'Media optimization and storage',
      status: 'healthy',
      lastChecked: new Date(Date.now() - 7 * 60 * 1000),
      responseTime: '89ms',
      details: 'Processing queue: 23 images pending'
    },
    {
      service: 'Database Connection',
      description: 'WordPress database connectivity',
      status: 'healthy',
      lastChecked: new Date(Date.now() - 1 * 60 * 1000),
      responseTime: '12ms',
      details: 'All tables accessible and optimized'
    }
  ]);

  const [importLogs, setImportLogs] = useState([
    {
      id: 1,
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      type: 'success',
      message: 'Successfully imported 15 products from AliExpress',
      details: 'Electronics category, 14 published, 1 pending approval'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 32 * 60 * 1000),
      type: 'warning',
      message: 'Import partially completed with 3 skipped items',
      details: 'Skipped items due to duplicate detection'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      type: 'error',
      message: 'Failed to import batch from Alibaba',
      details: 'Rate limit exceeded, retry scheduled for 14:30'
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      type: 'info',
      message: 'Scheduled import task started',
      details: 'Processing 45 products from import queue'
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'success',
      message: 'Product synchronization completed',
      details: 'Updated 128 existing products with latest pricing'
    }
  ]);

  const [refreshing, setRefreshing] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  const refreshSystemStatus = async () => {
    setRefreshing(true);
    
    try {
      // Simulate API call to refresh system status
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSystemHealth(prev => prev?.map(service => ({
        ...service,
        lastChecked: new Date(),
        responseTime: `${Math.floor(Math.random() * 800 + 50)}ms`,
        status: Math.random() > 0.8 ? 'warning' : Math.random() > 0.1 ? 'healthy' : 'error'
      })));
    } finally {
      setRefreshing(false);
    }
  };

  const clearLogs = () => {
    if (confirm('Are you sure you want to clear all import logs? This action cannot be undone.')) {
      setImportLogs([]);
    }
  };

  const exportLogs = () => {
    const logData = importLogs?.map(log => ({
      timestamp: log?.timestamp?.toISOString(),
      type: log?.type,
      message: log?.message,
      details: log?.details
    }));
    
    const blob = new Blob([JSON.stringify(logData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `import-logs-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    a?.click();
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLogIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* System Health Overview */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-600" />
            System Health Monitor
          </h3>
          <button
            onClick={refreshSystemStatus}
            disabled={refreshing}
            className="inline-flex items-center px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-1.5 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Status'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemHealth?.map((service, index) => (
            <div key={index} className={`p-4 rounded-lg border ${getStatusColor(service?.status)}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  {getStatusIcon(service?.status)}
                  <h4 className="font-medium ml-2">{service?.service}</h4>
                </div>
                <span className="text-xs font-mono bg-white bg-opacity-50 px-2 py-1 rounded">
                  {service?.responseTime}
                </span>
              </div>
              
              <p className="text-sm opacity-75 mb-2">{service?.description}</p>
              <p className="text-xs font-medium">{service?.details}</p>
              
              <div className="mt-3 text-xs opacity-60">
                Last checked: {formatTime(service?.lastChecked)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Import Activity Logs */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Import Activity Logs</h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={exportLogs}
              className="inline-flex items-center px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded hover:bg-green-100"
            >
              <Download className="w-4 h-4 mr-1.5" />
              Export Logs
            </button>
            <button
              onClick={clearLogs}
              className="inline-flex items-center px-3 py-1.5 text-sm bg-red-50 text-red-700 rounded hover:bg-red-100"
            >
              <Trash2 className="w-4 h-4 mr-1.5" />
              Clear Logs
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {importLogs?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No import logs available</p>
            </div>
          ) : (
            importLogs?.map((log) => (
              <div key={log?.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex-shrink-0 mt-0.5">
                  {getLogIcon(log?.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">{log?.message}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">
                        {formatDate(log?.timestamp)} at {formatTime(log?.timestamp)}
                      </span>
                      <button
                        onClick={() => setSelectedLog(selectedLog === log?.id ? null : log?.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {selectedLog === log?.id && log?.details && (
                    <div className="mt-2 p-3 bg-gray-100 rounded text-sm text-gray-700">
                      {log?.details}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Import Statistics</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Today's Imports:</span>
              <span className="font-medium">47 products</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Success Rate:</span>
              <span className="font-medium text-green-600">94.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Failed Imports:</span>
              <span className="font-medium text-red-600">3 products</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Queue Length:</span>
              <span className="font-medium">23 pending</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Performance Metrics</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg Import Time:</span>
              <span className="font-medium">2.3 seconds</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">API Calls/Hour:</span>
              <span className="font-medium">245 calls</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Memory Usage:</span>
              <span className="font-medium">67.4 MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Storage Used:</span>
              <span className="font-medium">1.2 GB</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Recent Activity</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Last Import:</span>
              <span className="font-medium">15 min ago</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Next Scheduled:</span>
              <span className="font-medium">1h 45m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Active Tasks:</span>
              <span className="font-medium">2 running</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">System Uptime:</span>
              <span className="font-medium">7d 4h 23m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusTab;