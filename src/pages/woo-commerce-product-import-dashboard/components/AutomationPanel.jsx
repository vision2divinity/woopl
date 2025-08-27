import React from 'react';
import { Play, Pause, Calendar, Package, RefreshCw, Settings, AlertCircle } from 'lucide-react';

const AutomationPanel = ({ automationStatus, onToggle }) => {
  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const progressPercentage = automationStatus?.currentProgress || 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {/* WordPress Metabox Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-blue-600" />
          Automation Control Panel
        </h3>
      </div>

      <div className="p-6">
        {/* Status Overview */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 flex items-center">
                {automationStatus?.isRunning ? (
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                ) : (
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                )}
                Import Automation {automationStatus?.isRunning ? 'Active' : 'Stopped'}
              </h4>
              <p className="text-gray-600 mt-1">
                {automationStatus?.isRunning 
                  ? `Currently: ${automationStatus?.currentTask || 'Processing scheduled imports'}`
                  : 'Automatic imports are currently disabled'
                }
              </p>
            </div>
            
            <button
              onClick={onToggle}
              className={`inline-flex items-center px-6 py-3 rounded-lg font-medium text-lg transition-all duration-200 ${
                automationStatus?.isRunning
                  ? 'bg-red-100 text-red-700 hover:bg-red-200 border border-red-300' :'bg-green-100 text-green-700 hover:bg-green-200 border border-green-300'
              }`}
            >
              {automationStatus?.isRunning ? (
                <Pause className="w-5 h-5 mr-2" />
              ) : (
                <Play className="w-5 h-5 mr-2" />
              )}
              {automationStatus?.isRunning ? 'Stop Automation' : 'Start Automation'}
            </button>
          </div>

          {/* Progress Bar (only show when running) */}
          {automationStatus?.isRunning && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Current Import Progress</span>
                <span className="text-sm text-gray-600">{progressPercentage}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Schedule Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Calendar className="w-5 h-5 text-blue-600 mr-2" />
              <h5 className="font-semibold text-gray-900">Next Import</h5>
            </div>
            <div className="text-sm text-gray-600">
              <p>{formatDate(automationStatus?.nextImportTime)}</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatTime(automationStatus?.nextImportTime)}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Package className="w-5 h-5 text-green-600 mr-2" />
              <h5 className="font-semibold text-gray-900">Scheduled Products</h5>
            </div>
            <div className="text-sm text-gray-600">
              <p className="text-2xl font-bold text-gray-900">
                {automationStatus?.scheduledProducts || 0}
              </p>
              <p>products queued</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <RefreshCw className="w-5 h-5 text-purple-600 mr-2" />
              <h5 className="font-semibold text-gray-900">Import Frequency</h5>
            </div>
            <div className="text-sm text-gray-600">
              <p className="text-lg font-semibold text-gray-900">Every Hour</p>
              <p>during business hours</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border-t border-gray-200 pt-6">
          <h5 className="font-semibold text-gray-900 mb-4">Quick Actions</h5>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button className="inline-flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 border border-blue-200">
              <RefreshCw className="w-4 h-4 mr-2" />
              Force Import Now
            </button>
            
            <button className="inline-flex items-center justify-center px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 border border-yellow-200">
              <Calendar className="w-4 h-4 mr-2" />
              Modify Schedule
            </button>
            
            <button className="inline-flex items-center justify-center px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 border border-gray-200">
              <Settings className="w-4 h-4 mr-2" />
              Import Rules
            </button>
          </div>
        </div>

        {/* Status Alerts */}
        {!automationStatus?.isRunning && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
              <div>
                <h6 className="font-medium text-yellow-800">Automation Paused</h6>
                <p className="text-sm text-yellow-700 mt-1">
                  Products in queue will not be imported until automation is resumed.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutomationPanel;