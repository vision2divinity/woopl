import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const SecurityStep = ({ formData, errors, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    if (password?.length >= 8) score++;
    if (/[a-z]/?.test(password)) score++;
    if (/[A-Z]/?.test(password)) score++;
    if (/\d/?.test(password)) score++;
    if (/[^a-zA-Z0-9]/?.test(password)) score++;

    const levels = [
      { score: 0, label: '', color: '' },
      { score: 1, label: 'Very Weak', color: 'bg-error' },
      { score: 2, label: 'Weak', color: 'bg-warning' },
      { score: 3, label: 'Fair', color: 'bg-warning' },
      { score: 4, label: 'Good', color: 'bg-success' },
      { score: 5, label: 'Strong', color: 'bg-success' }
    ];

    return levels?.[score];
  };

  const passwordStrength = getPasswordStrength(formData?.password);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h4 className="text-xl font-semibold text-foreground mb-2">Account Security</h4>
        <p className="text-muted-foreground">Create a secure password for your account</p>
      </div>
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Create a strong password"
          description="Must be at least 8 characters with uppercase, lowercase, number, and special character"
          value={formData?.password}
          onChange={(e) => onChange('password', e?.target?.value)}
          error={errors?.password}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>
      {formData?.password && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Password Strength:</span>
            <span className={`text-sm font-medium ${
              passwordStrength?.score >= 4 ? 'text-success' : 
              passwordStrength?.score >= 3 ? 'text-warning' : 'text-error'
            }`}>
              {passwordStrength?.label}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${passwordStrength?.color}`}
              style={{ width: `${(passwordStrength?.score / 5) * 100}%` }}
            />
          </div>
        </div>
      )}
      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={(e) => onChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>
      <div className="space-y-4 pt-4 border-t border-border">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          description="By checking this box, you agree to our terms and conditions"
          checked={formData?.agreeToTerms}
          onChange={(e) => onChange('agreeToTerms', e?.target?.checked)}
          error={errors?.agreeToTerms}
          required
        />

        <Checkbox
          label="Subscribe to product updates and tips"
          description="Get the latest features and best practices for product importing"
          checked={formData?.subscribeToUpdates}
          onChange={(e) => onChange('subscribeToUpdates', e?.target?.checked)}
        />

        <Checkbox
          label="Enable email notifications for import status"
          description="Receive notifications when imports complete or encounter issues"
          checked={formData?.enableNotifications}
          onChange={(e) => onChange('enableNotifications', e?.target?.checked)}
        />
      </div>
    </div>
  );
};

export default SecurityStep;