import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BusinessDetailsStep = ({ formData, errors, onChange }) => {
  const businessTypeOptions = [
    { value: 'dropshipping', label: 'Dropshipping Store' },
    { value: 'retail', label: 'Retail Business' },
    { value: 'wholesale', label: 'Wholesale Business' },
    { value: 'marketplace', label: 'Marketplace Seller' },
    { value: 'other', label: 'Other' }
  ];

  const countriesOptions = [
    { value: 'gh', label: 'Ghana' },
    { value: 'ng', label: 'Nigeria' },
    { value: 'ke', label: 'Kenya' },
    { value: 'za', label: 'South Africa' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h4 className="text-xl font-semibold text-foreground mb-2">Business Details</h4>
        <p className="text-muted-foreground">Tell us about your WooCommerce store</p>
      </div>
      <Input
        label="Store Name"
        type="text"
        placeholder="Your Store Name"
        description="The name of your WooCommerce store"
        value={formData?.storeName}
        onChange={(e) => onChange('storeName', e?.target?.value)}
        error={errors?.storeName}
        required
      />
      <Input
        label="WooCommerce Store URL"
        type="url"
        placeholder="https://yourstore.com"
        description="Your WooCommerce website URL (we'll verify this)"
        value={formData?.storeUrl}
        onChange={(e) => onChange('storeUrl', e?.target?.value)}
        error={errors?.storeUrl}
        required
      />
      <Select
        label="Business Type"
        placeholder="Select your business type"
        description="This helps us customize your experience"
        options={businessTypeOptions}
        value={formData?.businessType}
        onChange={(value) => onChange('businessType', value)}
        error={errors?.businessType}
        required
      />
      <Select
        label="Country"
        placeholder="Select your country"
        options={countriesOptions}
        value={formData?.country}
        onChange={(value) => onChange('country', value)}
        error={errors?.country}
        required
      />
      <Input
        label="Monthly Product Import Goal"
        type="number"
        placeholder="100"
        description="How many products do you plan to import monthly?"
        value={formData?.monthlyGoal}
        onChange={(e) => onChange('monthlyGoal', e?.target?.value)}
        error={errors?.monthlyGoal}
        min="1"
        max="10000"
      />
    </div>
  );
};

export default BusinessDetailsStep;