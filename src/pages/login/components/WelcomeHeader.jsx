import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
          <Icon name="Package" size={32} color="white" />
        </div>
      </div>

      {/* Welcome Text */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">
          Welcome Back
        </h1>
        <p className="text-muted-foreground">
          Sign in to your WooCommerce Product Importer dashboard
        </p>
      </div>

      {/* Feature Highlight */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Zap" size={16} className="text-accent" />
          <span>Automated product importing from AliExpress, Alibaba & 1688</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;