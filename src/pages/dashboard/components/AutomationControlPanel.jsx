import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AutomationControlPanel = ({ 
  isRunning, 
  onToggle, 
  nextImportTime, 
  scheduledProducts,
  currentProgress 
}) => {
  const [timeUntilNext, setTimeUntilNext] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      if (!nextImportTime) return;
      
      const now = new Date();
      const next = new Date(nextImportTime);
      const diff = next - now;
      
      if (diff <= 0) {
        setTimeUntilNext('Starting soon...');
        return;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeUntilNext(`${hours?.toString()?.padStart(2, '0')}:${minutes?.toString()?.padStart(2, '0')}:${seconds?.toString()?.padStart(2, '0')}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, [nextImportTime]);

  return (
    <div className="bg-card border border-border rounded-lg p-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground mb-6">Automation Control</h2>
        
        {/* Main Control Button */}
        <div className="mb-8">
          <button
            onClick={onToggle}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 ${
              isRunning 
                ? 'bg-success hover:bg-success/90 text-success-foreground shadow-lg' 
                : 'bg-muted hover:bg-muted/80 text-muted-foreground border-2 border-border'
            }`}
          >
            <Icon 
              name={isRunning ? 'Pause' : 'Play'} 
              size={32} 
              className={isRunning ? 'ml-1' : 'ml-2'}
            />
          </button>
          <p className="text-lg font-medium text-foreground mt-4">
            {isRunning ? 'Automation Running' : 'Automation Paused'}
          </p>
        </div>

        {/* Status Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Icon name="Clock" size={20} className="text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Next Import</p>
            <p className="text-lg font-mono font-semibold text-foreground">
              {timeUntilNext || '--:--:--'}
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Icon name="Package" size={20} className="text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Scheduled Products</p>
            <p className="text-lg font-semibold text-foreground">{scheduledProducts}</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Icon name="Activity" size={20} className="text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Current Progress</p>
            <p className="text-lg font-semibold text-foreground">{currentProgress}%</p>
          </div>
        </div>

        {/* Progress Bar */}
        {isRunning && currentProgress > 0 && (
          <div className="mt-6">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${currentProgress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Importing products... {currentProgress}% complete
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Button 
            variant="outline" 
            iconName="Search" 
            iconPosition="left"
            className="flex-1"
          >
            Manual Search
          </Button>
          <Button 
            variant="outline" 
            iconName="Settings" 
            iconPosition="left"
            className="flex-1"
          >
            Schedule Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AutomationControlPanel;