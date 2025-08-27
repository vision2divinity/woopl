import React from 'react';
import Input from '../../../components/ui/Input';

const PersonalInfoStep = ({ formData, errors, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h4 className="text-xl font-semibold text-foreground mb-2">Personal Information</h4>
        <p className="text-muted-foreground">Let's start with your basic details</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          placeholder="Enter your first name"
          value={formData?.firstName}
          onChange={(e) => onChange('firstName', e?.target?.value)}
          error={errors?.firstName}
          required
        />
        <Input
          label="Last Name"
          type="text"
          placeholder="Enter your last name"
          value={formData?.lastName}
          onChange={(e) => onChange('lastName', e?.target?.value)}
          error={errors?.lastName}
          required
        />
      </div>
      <Input
        label="Email Address"
        type="email"
        placeholder="your.email@example.com"
        description="We'll use this for account verification and important updates"
        value={formData?.email}
        onChange={(e) => onChange('email', e?.target?.value)}
        error={errors?.email}
        required
      />
      <Input
        label="Phone Number"
        type="tel"
        placeholder="+233 XX XXX XXXX"
        description="Optional - for account recovery and support"
        value={formData?.phone}
        onChange={(e) => onChange('phone', e?.target?.value)}
        error={errors?.phone}
      />
    </div>
  );
};

export default PersonalInfoStep;