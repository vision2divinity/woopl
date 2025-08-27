import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsBar = ({ 
  selectedCount, 
  onBulkAction, 
  onClearSelection,
  isProcessing 
}) => {
  const [showActionMenu, setShowActionMenu] = useState(false);

  const bulkActions = [
    {
      id: 'republish',
      label: 'Republish to WooCommerce',
      icon: 'RefreshCw',
      description: 'Update product data in WooCommerce',
      variant: 'default'
    },
    {
      id: 'update-prices',
      label: 'Update Prices',
      icon: 'DollarSign',
      description: 'Sync latest prices from source',
      variant: 'default'
    },
    {
      id: 'force-sync',
      label: 'Force Sync',
      icon: 'Zap',
      description: 'Force synchronization with WooCommerce',
      variant: 'default'
    },
    {
      id: 'change-status',
      label: 'Change Status',
      icon: 'Edit',
      description: 'Bulk update product status',
      variant: 'secondary'
    },
    {
      id: 'export',
      label: 'Export Selected',
      icon: 'Download',
      description: 'Export product data to CSV',
      variant: 'outline'
    },
    {
      id: 'duplicate-check',
      label: 'Check Duplicates',
      icon: 'Copy',
      description: 'Scan for duplicate products',
      variant: 'outline'
    },
    {
      id: 'delete',
      label: 'Remove Products',
      icon: 'Trash2',
      description: 'Remove from import system',
      variant: 'destructive'
    }
  ];

  const handleBulkAction = (actionId) => {
    setShowActionMenu(false);
    onBulkAction(actionId);
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 min-w-96">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="CheckSquare" size={16} color="white" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {selectedCount} product{selectedCount !== 1 ? 's' : ''} selected
              </p>
              <p className="text-xs text-muted-foreground">
                Choose an action to perform on selected items
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClearSelection}
              disabled={isProcessing}
            >
              Clear
            </Button>
            
            <div className="relative">
              <Button
                variant="default"
                size="sm"
                iconName="ChevronDown"
                iconPosition="right"
                onClick={() => setShowActionMenu(!showActionMenu)}
                disabled={isProcessing}
                loading={isProcessing}
              >
                Actions
              </Button>
              
              {showActionMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setShowActionMenu(false)}
                  />
                  <div className="absolute bottom-full right-0 mb-2 w-72 bg-popover border border-border rounded-lg shadow-lg z-50">
                    <div className="p-2">
                      <div className="text-xs font-medium text-muted-foreground px-2 py-1 mb-1">
                        Bulk Actions
                      </div>
                      {bulkActions?.map((action) => (
                        <button
                          key={action?.id}
                          onClick={() => handleBulkAction(action?.id)}
                          className={`w-full flex items-start space-x-3 px-2 py-2 rounded-md text-left hover:bg-muted transition-colors ${
                            action?.variant === 'destructive' ? 'hover:bg-error/10' : ''
                          }`}
                        >
                          <Icon 
                            name={action?.icon} 
                            size={16} 
                            className={action?.variant === 'destructive' ? 'text-error' : 'text-muted-foreground'} 
                          />
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${
                              action?.variant === 'destructive' ? 'text-error' : 'text-foreground'
                            }`}>
                              {action?.label}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {action?.description}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Progress Bar (shown when processing) */}
        {isProcessing && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Processing products...</span>
              <span>45%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: '45%' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkActionsBar;