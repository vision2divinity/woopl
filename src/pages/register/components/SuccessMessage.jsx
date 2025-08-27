import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessMessage = ({ email, onContinue }) => {
  return (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto">
        <Icon name="CheckCircle" size={40} className="text-success" />
      </div>

      <div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Welcome to WooCommerce Importer!</h3>
        <p className="text-muted-foreground">
          Your account has been created successfully. We've sent a verification email to{' '}
          <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      <div className="bg-muted rounded-lg p-6 text-left">
        <h4 className="font-semibold text-foreground mb-3 flex items-center">
          <Icon name="Mail" size={20} className="mr-2" />
          Next Steps
        </h4>
        <ol className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start">
            <span className="font-medium text-primary mr-2">1.</span>
            Check your email and click the verification link
          </li>
          <li className="flex items-start">
            <span className="font-medium text-primary mr-2">2.</span>
            Complete your WooCommerce API configuration
          </li>
          <li className="flex items-start">
            <span className="font-medium text-primary mr-2">3.</span>
            Set up your first automated import schedule
          </li>
          <li className="flex items-start">
            <span className="font-medium text-primary mr-2">4.</span>
            Start importing products from multiple platforms
          </li>
        </ol>
      </div>

      <div className="space-y-3">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={onContinue}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Dashboard
        </Button>
        
        <p className="text-xs text-muted-foreground">
          Didn't receive the email?{' '}
          <button className="text-primary hover:underline font-medium">
            Resend verification email
          </button>
        </p>
      </div>

      <div className="flex items-center justify-center space-x-6 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">100+</div>
          <div className="text-xs text-muted-foreground">Products/Day</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">3</div>
          <div className="text-xs text-muted-foreground">Platforms</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">24/7</div>
          <div className="text-xs text-muted-foreground">Automation</div>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;