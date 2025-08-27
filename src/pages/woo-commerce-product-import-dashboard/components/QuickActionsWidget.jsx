import React from 'react';
import { Plus, Upload, Download, Settings, FileText, Search, Zap, RefreshCw } from 'lucide-react';

const QuickActionsWidget = () => {
  const quickActions = [
    {
      icon: Plus,
      title: 'Manual Import',
      description: 'Add products manually',
      color: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
      action: () => window.location.href = '/wp-admin/admin.php?page=wc-product-importer&action=manual-import'
    },
    {
      icon: Search,
      title: 'Product Search',
      description: 'Find products to import',
      color: 'bg-green-50 text-green-700 hover:bg-green-100',
      action: () => window.location.href = '/wp-admin/admin.php?page=wc-product-importer&action=search'
    },
    {
      icon: FileText,
      title: 'Import Queue',
      description: 'Review pending products',
      color: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100',
      action: () => window.location.href = '/wp-admin/admin.php?page=wc-product-importer&action=queue'
    },
    {
      icon: Upload,
      title: 'Bulk Import',
      description: 'Import via CSV/Excel',
      color: 'bg-purple-50 text-purple-700 hover:bg-purple-100',
      action: () => window.location.href = '/wp-admin/admin.php?page=wc-product-importer&action=bulk-import'
    },
    {
      icon: Settings,
      title: 'Import Settings',
      description: 'Configure automation',
      color: 'bg-gray-50 text-gray-700 hover:bg-gray-100',
      action: () => window.location.href = '/wp-admin/admin.php?page=wc-product-importer-settings'
    },
    {
      icon: Download,
      title: 'Export Data',
      description: 'Download import logs',
      color: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
      action: () => {
        // Simulate export functionality
        const element = document.createElement('a');
        const file = new Blob([JSON.stringify({
          exportDate: new Date().toISOString(),
          totalImports: 247,
          successfulImports: 233,
          failedImports: 14
        }, null, 2)], { type: 'application/json' });
        element.href = URL.createObjectURL(file);
        element.download = `import-data-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
        document.body?.appendChild(element);
        element?.click();
        document.body?.removeChild(element);
      }
    }
  ];

  const recentTasks = [
    {
      icon: RefreshCw,
      title: 'Sync Prices',
      description: 'Update 45 product prices',
      time: '15 min ago',
      status: 'completed'
    },
    {
      icon: Zap,
      title: 'Auto Import',
      description: '12 new products added',
      time: '1 hour ago',
      status: 'completed'
    },
    {
      icon: FileText,
      title: 'Queue Review',
      description: '8 products approved',
      time: '2 hours ago',
      status: 'completed'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 gap-3">
            {quickActions?.map((action, index) => {
              const IconComponent = action?.icon;
              
              return (
                <button
                  key={index}
                  onClick={action?.action}
                  className={`w-full flex items-center p-3 rounded-lg border border-gray-200 transition-all duration-200 ${action?.color}`}
                >
                  <IconComponent className="w-5 h-5 mr-3 flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-sm">{action?.title}</p>
                    <p className="text-xs opacity-75">{action?.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
          <h3 className="text-lg font-semibold text-gray-900">Recent Tasks</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {recentTasks?.map((task, index) => {
              const IconComponent = task?.icon;
              
              return (
                <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-150">
                  <div className="flex-shrink-0 p-2 bg-green-100 rounded-lg">
                    <IconComponent className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{task?.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{task?.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{task?.time}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✓ Done
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
              View All Tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsWidget;