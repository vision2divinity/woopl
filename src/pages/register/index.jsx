import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ProgressIndicator from './components/ProgressIndicator';
import PersonalInfoStep from './components/PersonalInfoStep';
import BusinessDetailsStep from './components/BusinessDetailsStep';
import SecurityStep from './components/SecurityStep';
import BenefitsSidebar from './components/BenefitsSidebar';
import SuccessMessage from './components/SuccessMessage';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    storeName: '',
    storeUrl: '',
    businessType: '',
    country: '',
    monthlyGoal: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeToUpdates: true,
    enableNotifications: true
  });
  const [errors, setErrors] = useState({});

  const steps = [
    'Personal Information',
    'Business Details',
    'Account Security'
  ];

  const mockCredentials = {
    email: 'demo@store.com',
    password: 'Demo123!@#'
  };

  useEffect(() => {
    document.title = 'Register - WooCommerce Product Importer';
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0: // Personal Information
        if (!formData?.firstName?.trim()) {
          newErrors.firstName = 'First name is required';
        }
        if (!formData?.lastName?.trim()) {
          newErrors.lastName = 'Last name is required';
        }
        if (!formData?.email?.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (formData?.phone && !/^\+?[\d\s-()]+$/?.test(formData?.phone)) {
          newErrors.phone = 'Please enter a valid phone number';
        }
        break;

      case 1: // Business Details
        if (!formData?.storeName?.trim()) {
          newErrors.storeName = 'Store name is required';
        }
        if (!formData?.storeUrl?.trim()) {
          newErrors.storeUrl = 'Store URL is required';
        } else if (!/^https?:\/\/.+\..+/?.test(formData?.storeUrl)) {
          newErrors.storeUrl = 'Please enter a valid URL (e.g., https://yourstore.com)';
        }
        if (!formData?.businessType) {
          newErrors.businessType = 'Please select your business type';
        }
        if (!formData?.country) {
          newErrors.country = 'Please select your country';
        }
        if (formData?.monthlyGoal && (isNaN(formData?.monthlyGoal) || formData?.monthlyGoal < 1)) {
          newErrors.monthlyGoal = 'Please enter a valid number greater than 0';
        }
        break;

      case 2: // Security
        if (!formData?.password) {
          newErrors.password = 'Password is required';
        } else if (formData?.password?.length < 8) {
          newErrors.password = 'Password must be at least 8 characters long';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/?.test(formData?.password)) {
          newErrors.password = 'Password must contain uppercase, lowercase, number, and special character';
        }
        if (!formData?.confirmPassword) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData?.password !== formData?.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData?.agreeToTerms) {
          newErrors.agreeToTerms = 'You must agree to the Terms of Service';
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps?.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration success
      setShowSuccess(true);
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessContinue = () => {
    navigate('/dashboard');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoStep
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />
        );
      case 1:
        return (
          <BusinessDetailsStep
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />
        );
      case 2:
        return (
          <SecurityStep
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex">
        <BenefitsSidebar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <SuccessMessage
              email={formData?.email}
              onContinue={handleSuccessContinue}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <BenefitsSidebar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-lg shadow-lg p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Package" size={24} color="white" />
                </div>
                <div className="text-left">
                  <h1 className="text-xl font-bold text-foreground">WooCommerce Importer</h1>
                  <p className="text-xs text-muted-foreground">Product Automation Platform</p>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Create Your Account</h2>
              <p className="text-muted-foreground">
                Join thousands of store owners automating their product imports
              </p>
            </div>

            {/* Progress Indicator */}
            <ProgressIndicator
              currentStep={currentStep}
              totalSteps={steps?.length}
              steps={steps}
            />

            {/* Form Content */}
            <form onSubmit={(e) => e?.preventDefault()} className="space-y-6">
              {renderStepContent()}

              {/* Error Message */}
              {errors?.submit && (
                <div className="bg-error/10 border border-error/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertCircle" size={20} className="text-error" />
                    <p className="text-error text-sm">{errors?.submit}</p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                {currentStep > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    iconName="ArrowLeft"
                    iconPosition="left"
                    className="sm:w-auto"
                  >
                    Previous
                  </Button>
                )}
                
                <Button
                  type="button"
                  variant="default"
                  onClick={handleNext}
                  loading={isLoading}
                  iconName={currentStep === steps?.length - 1 ? 'UserPlus' : 'ArrowRight'}
                  iconPosition="right"
                  fullWidth={currentStep === 0}
                  className="sm:flex-1"
                >
                  {currentStep === steps?.length - 1 ? 'Create Account' : 'Continue'}
                </Button>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in here
                </Link>
              </p>
              
              <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-muted-foreground">
                <Link to="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
                <span>•</span>
                <Link to="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link to="#" className="hover:text-foreground transition-colors">
                  Support
                </Link>
              </div>
            </div>
          </div>

          {/* Demo Credentials Notice */}
          <div className="mt-6 bg-muted/50 border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-primary mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Demo Credentials</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  For testing purposes, you can use these credentials:
                </p>
                <div className="space-y-1 text-xs font-mono bg-background rounded p-2">
                  <div>Email: {mockCredentials?.email}</div>
                  <div>Password: {mockCredentials?.password}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;