import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SchedulerMetabox = ({ 
  approvedCount, 
  nextImportTime, 
  isSchedulerActive, 
  onToggleScheduler, 
  onAddNotice 
}) => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateTimer = () => {
      if (!nextImportTime) return;
      
      const now = new Date();
      const diff = nextImportTime - now;
      
      if (diff <= 0) {
        setTimeRemaining('Running import...');
        setProgress(100);
        return;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      
      // Calculate progress (assuming 6 hour cycle)
      const totalCycle = 6 * 60 * 60 * 1000; // 6 hours in ms
      const elapsed = totalCycle - diff;
      setProgress((elapsed / totalCycle) * 100);
    };
    
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, [nextImportTime]);

  const handleToggleScheduler = () => {
    onToggleScheduler(!isSchedulerActive);
    onAddNotice(
      `Scheduler ${!isSchedulerActive ? 'activated' : 'deactivated'}`,
      'info'
    );
  };

  const handleRunNow = () => {
    onAddNotice('Manual import started. This may take a few minutes.', 'info');
    // In a real app, this would trigger the import process
  };

  return (
    <div className="wp-metabox bg-white border border-gray-300 rounded-sm">
      {/* Metabox Header */}
      <div className="wp-metabox-header bg-gray-50 border-b border-gray-200 p-3">
        <h3 className="wp-metabox-title text-sm font-medium text-gray-800 m-0">
          <Icon name="Clock" size={16} className="mr-2" />
          Scheduler Settings
        </h3>
      </div>
      
      {/* Metabox Content */}
      <div className="wp-metabox-content p-4">
        {/* Scheduler Status */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Auto Import Status
            </span>
            <div className={`wp-status-indicator w-3 h-3 rounded-full ${
              isSchedulerActive ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleScheduler}
              className={`wp-toggle-btn px-3 py-1 text-sm rounded-sm border ${
                isSchedulerActive
                  ? 'bg-green-50 border-green-300 text-green-700' :'bg-red-50 border-red-300 text-red-700'
              }`}
            >
              {isSchedulerActive ? 'Active' : 'Inactive'}
            </button>
            
            <button
              onClick={handleToggleScheduler}
              className="wp-button wp-button-secondary px-2 py-1 border border-gray-400 bg-white text-gray-800 rounded-sm hover:bg-gray-50 text-xs"
            >
              {isSchedulerActive ? 'Disable' : 'Enable'}
            </button>
          </div>
        </div>

        {/* Next Import Timer */}
        {isSchedulerActive && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Next Import
            </h4>
            
            <div className="wp-progress-container mb-2">
              <div className="wp-progress-bar bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="wp-progress-fill bg-blue-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
              </div>
              
              <div className="text-center">
                <div className="text-sm font-medium text-gray-800">
                  {timeRemaining}
                </div>
                <div className="text-xs text-gray-500">
                  {nextImportTime?.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Queue Statistics */}
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-sm">
          <h4 className="text-sm font-medium text-blue-800 mb-2">
            Ready for Import
          </h4>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {approvedCount}
            </div>
            <div className="text-xs text-blue-700">
              Approved Products
            </div>
          </div>
          
          {approvedCount > 0 && (
            <div className="mt-3">
              <button
                onClick={handleRunNow}
                className="wp-button wp-button-primary w-full px-3 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 text-sm"
              >
                <Icon name="Play" size={14} className="mr-2" />
                Run Import Now
              </button>
            </div>
          )}
        </div>

        {/* Import Settings */}
        <div className="wp-settings-section">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Import Settings
          </h4>
          
          <div className="space-y-3">
            <div className="wp-setting-row flex items-center justify-between">
              <label className="text-xs text-gray-600">
                Auto-publish
              </label>
              <select className="wp-select text-xs border border-gray-300 px-2 py-1 rounded-sm">
                <option>Draft</option>
                <option>Published</option>
              </select>
            </div>
            
            <div className="wp-setting-row flex items-center justify-between">
              <label className="text-xs text-gray-600">
                Batch size
              </label>
              <select className="wp-select text-xs border border-gray-300 px-2 py-1 rounded-sm">
                <option>10 products</option>
                <option>25 products</option>
                <option>50 products</option>
              </select>
            </div>
            
            <div className="wp-setting-row flex items-center justify-between">
              <label className="text-xs text-gray-600">
                Frequency
              </label>
              <select className="wp-select text-xs border border-gray-300 px-2 py-1 rounded-sm">
                <option>Every 6 hours</option>
                <option>Every 12 hours</option>
                <option>Daily</option>
              </select>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="wp-activity-section mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Recent Activity
          </h4>
          
          <div className="wp-activity-feed space-y-2">
            <div className="wp-activity-item flex items-start gap-2 text-xs">
              <span className="wp-activity-time text-gray-500 font-mono">
                2h ago
              </span>
              <span className="text-gray-700">
                Imported 15 products successfully
              </span>
            </div>
            
            <div className="wp-activity-item flex items-start gap-2 text-xs">
              <span className="wp-activity-time text-gray-500 font-mono">
                8h ago
              </span>
              <span className="text-gray-700">
                Scheduler activated
              </span>
            </div>
            
            <div className="wp-activity-item flex items-start gap-2 text-xs">
              <span className="wp-activity-time text-gray-500 font-mono">
                1d ago
              </span>
              <span className="text-gray-700">
                23 products approved for import
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulerMetabox;