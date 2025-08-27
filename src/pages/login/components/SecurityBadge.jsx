import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadge = () => {
  return (
    <div className="flex items-center justify-center space-x-4 mt-8 pt-6 border-t border-border">
      {/* SSL Security Badge */}
      <div className="flex items-center space-x-2 text-muted-foreground">
        <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
          <Icon name="Shield" size={16} className="text-success" />
        </div>
        <div className="text-xs">
          <div className="font-medium text-foreground">SSL Secured</div>
          <div className="text-muted-foreground">256-bit encryption</div>
        </div>
      </div>

      {/* Secure Login Badge */}
      <div className="flex items-center space-x-2 text-muted-foreground">
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="Lock" size={16} className="text-primary" />
        </div>
        <div className="text-xs">
          <div className="font-medium text-foreground">Secure Login</div>
          <div className="text-muted-foreground">Protected access</div>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadge;