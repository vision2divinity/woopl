import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Product Search',
      description: 'Find and import new products',
      icon: 'Search',
      color: 'bg-primary',
      path: '/product-search-import'
    },
    {
      title: 'Approve Queue',
      description: 'Review pending imports',
      icon: 'Clock',
      color: 'bg-warning',
      path: '/import-queue-approval'
    },
    {
      title: 'Manage Products',
      description: 'Edit existing products',
      icon: 'Package',
      color: 'bg-success',
      path: '/product-management'
    },
    {
      title: 'Bulk Operations',
      description: 'Mass update products',
      icon: 'Layers',
      color: 'bg-secondary'
    }
  ];

  const handleActionClick = (action) => {
    if (action?.path) {
      navigate(action?.path);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions?.map((action, index) => (
          <button
            key={index}
            onClick={() => handleActionClick(action)}
            className="w-full p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200 text-left group"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-lg ${action?.color} flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
                <Icon name={action?.icon} size={20} color="white" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                  {action?.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {action?.description}
                </p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-primary transition-colors duration-200" />
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="outline" fullWidth iconName="Settings" iconPosition="left">
          System Settings
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;