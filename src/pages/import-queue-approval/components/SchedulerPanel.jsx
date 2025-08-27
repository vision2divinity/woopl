import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SchedulerPanel = ({ approvedCount, nextImportTime, isSchedulerActive, onToggleScheduler }) => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateCountdown = () => {
      if (!nextImportTime) return;

      const now = new Date();
      const target = new Date(nextImportTime);
      const diff = target - now;

      if (diff <= 0) {
        setTimeRemaining('Import in progress...');
        setProgress(100);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(`${hours?.toString()?.padStart(2, '0')}:${minutes?.toString()?.padStart(2, '0')}:${seconds?.toString()?.padStart(2, '0')}`);
      
      // Calculate progress (24 hours = 100%)
      const totalMs = 24 * 60 * 60 * 1000;
      const elapsedMs = totalMs - diff;
      setProgress(Math.min((elapsedMs / totalMs) * 100, 100));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [nextImportTime]);

  const getSchedulerStatus = () => {
    if (!isSchedulerActive) {
      return {
        icon: 'Pause',
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        status: 'Paused',
        description: 'Automatic imports are currently paused'
      };
    }

    if (approvedCount === 0) {
      return {
        icon: 'Clock',
        color: 'text-muted-foreground',
        bgColor: 'bg-muted',
        status: 'Waiting',
        description: 'No approved products in queue'
      };
    }

    return {
      icon: 'Play',
      color: 'text-success',
      bgColor: 'bg-success/10',
      status: 'Active',
      description: 'Scheduler is running normally'
    };
  };

  const statusConfig = getSchedulerStatus();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${statusConfig?.bgColor} flex items-center justify-center`}>
            <Icon name={statusConfig?.icon} size={20} className={statusConfig?.color} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Import Scheduler</h3>
            <p className="text-sm text-muted-foreground">{statusConfig?.description}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig?.bgColor} ${statusConfig?.color}`}>
          {statusConfig?.status}
        </div>
      </div>
      {/* Queue Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{approvedCount}</div>
          <div className="text-xs text-muted-foreground">Approved Products</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">100</div>
          <div className="text-xs text-muted-foreground">Daily Limit</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">94.2%</div>
          <div className="text-xs text-muted-foreground">Success Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-warning">12</div>
          <div className="text-xs text-muted-foreground">In Progress</div>
        </div>
      </div>
      {/* Next Import Countdown */}
      {isSchedulerActive && approvedCount > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Next Import Cycle</span>
            <span className="text-sm text-muted-foreground font-mono">{timeRemaining}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Last import: 2 hours ago</span>
            <span>Next: {new Date(nextImportTime)?.toLocaleTimeString()}</span>
          </div>
        </div>
      )}
      {/* Import History */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Recent Import Activity</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between py-2 px-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="CheckCircle" size={14} className="text-success" />
              <span className="text-sm text-foreground">Batch #1247 completed</span>
            </div>
            <span className="text-xs text-muted-foreground">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-2 px-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="CheckCircle" size={14} className="text-success" />
              <span className="text-sm text-foreground">Batch #1246 completed</span>
            </div>
            <span className="text-xs text-muted-foreground">1 day ago</span>
          </div>
          <div className="flex items-center justify-between py-2 px-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="AlertCircle" size={14} className="text-warning" />
              <span className="text-sm text-foreground">Batch #1245 partial failure</span>
            </div>
            <span className="text-xs text-muted-foreground">2 days ago</span>
          </div>
        </div>
      </div>
      {/* Scheduler Controls */}
      <div className="flex gap-2">
        <Button
          variant={isSchedulerActive ? "destructive" : "success"}
          onClick={onToggleScheduler}
          iconName={isSchedulerActive ? "Pause" : "Play"}
          iconPosition="left"
          fullWidth
        >
          {isSchedulerActive ? 'Pause Scheduler' : 'Resume Scheduler'}
        </Button>
        <Button
          variant="outline"
          iconName="Settings"
          className="px-3"
        >
          <span className="sr-only">Scheduler Settings</span>
        </Button>
      </div>
      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-foreground">1,247</div>
            <div className="text-xs text-muted-foreground">Total Imported</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">GHS 45,230</div>
            <div className="text-xs text-muted-foreground">Total Value</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulerPanel;