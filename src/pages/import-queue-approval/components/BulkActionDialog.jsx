import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BulkActionDialog = ({ isOpen, onClose, action, selectedCount, onConfirm }) => {
  const [rejectionReason, setRejectionReason] = useState('');
  const [categoryMapping, setCategoryMapping] = useState('');
  const [priceAdjustment, setPriceAdjustment] = useState('');
  const [adjustmentType, setAdjustmentType] = useState('percentage');

  if (!isOpen) return null;

  const getActionConfig = () => {
    switch (action) {
      case 'approve':
        return {
          title: 'Approve Products',
          icon: 'CheckCircle',
          iconColor: 'text-success',
          description: `Are you sure you want to approve ${selectedCount} product${selectedCount > 1 ? 's' : ''}? They will be queued for the next import cycle.`,
          confirmText: 'Approve Products',
          confirmVariant: 'success'
        };
      case 'reject':
        return {
          title: 'Reject Products',
          icon: 'XCircle',
          iconColor: 'text-error',
          description: `Please provide a reason for rejecting ${selectedCount} product${selectedCount > 1 ? 's' : ''}:`,
          confirmText: 'Reject Products',
          confirmVariant: 'destructive'
        };
      case 'delete':
        return {
          title: 'Remove Products',
          icon: 'Trash2',
          iconColor: 'text-error',
          description: `Are you sure you want to remove ${selectedCount} product${selectedCount > 1 ? 's' : ''} from the queue? This action cannot be undone.`,
          confirmText: 'Remove Products',
          confirmVariant: 'destructive'
        };
      case 'category':
        return {
          title: 'Update Categories',
          icon: 'Tag',
          iconColor: 'text-primary',
          description: `Update category mapping for ${selectedCount} product${selectedCount > 1 ? 's' : ''}:`,
          confirmText: 'Update Categories',
          confirmVariant: 'default'
        };
      case 'price':
        return {
          title: 'Adjust Prices',
          icon: 'DollarSign',
          iconColor: 'text-primary',
          description: `Apply price adjustment to ${selectedCount} product${selectedCount > 1 ? 's' : ''}:`,
          confirmText: 'Apply Price Changes',
          confirmVariant: 'default'
        };
      default:
        return {
          title: 'Bulk Action',
          icon: 'Settings',
          iconColor: 'text-primary',
          description: 'Perform bulk action on selected products.',
          confirmText: 'Confirm',
          confirmVariant: 'default'
        };
    }
  };

  const config = getActionConfig();

  const rejectionReasons = [
    { value: 'poor-quality', label: 'Poor Image Quality' },
    { value: 'incomplete-info', label: 'Incomplete Product Information' },
    { value: 'policy-violation', label: 'Policy Violation' },
    { value: 'duplicate', label: 'Duplicate Product' },
    { value: 'pricing-issue', label: 'Pricing Issue' },
    { value: 'shipping-restriction', label: 'Shipping Restrictions' },
    { value: 'other', label: 'Other (specify below)' }
  ];

  const categoryOptions = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing & Fashion' },
    { value: 'home-garden', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports & Outdoors' },
    { value: 'beauty', label: 'Beauty & Health' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'toys', label: 'Toys & Games' }
  ];

  const adjustmentTypeOptions = [
    { value: 'percentage', label: 'Percentage (%)' },
    { value: 'fixed', label: 'Fixed Amount (GHS)' }
  ];

  const handleConfirm = () => {
    const data = {
      action,
      selectedCount,
      rejectionReason: action === 'reject' ? rejectionReason : undefined,
      categoryMapping: action === 'category' ? categoryMapping : undefined,
      priceAdjustment: action === 'price' ? { type: adjustmentType, value: priceAdjustment } : undefined
    };
    onConfirm(data);
  };

  const isFormValid = () => {
    switch (action) {
      case 'reject':
        return rejectionReason?.trim() !== '';
      case 'category':
        return categoryMapping !== '';
      case 'price':
        return priceAdjustment !== '' && !isNaN(parseFloat(priceAdjustment));
      default:
        return true;
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center`}>
                <Icon name={config?.icon} size={20} className={config?.iconColor} />
              </div>
              <h2 className="text-lg font-semibold text-foreground">{config?.title}</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-sm text-muted-foreground mb-4">{config?.description}</p>

            {/* Rejection Reason Form */}
            {action === 'reject' && (
              <div className="space-y-4">
                <Select
                  label="Rejection Reason"
                  options={rejectionReasons}
                  value={rejectionReason}
                  onChange={setRejectionReason}
                  placeholder="Select a reason..."
                  required
                />
                {rejectionReason === 'other' && (
                  <Input
                    label="Custom Reason"
                    type="text"
                    placeholder="Please specify the reason..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e?.target?.value)}
                    required
                  />
                )}
              </div>
            )}

            {/* Category Mapping Form */}
            {action === 'category' && (
              <Select
                label="New Category"
                options={categoryOptions}
                value={categoryMapping}
                onChange={setCategoryMapping}
                placeholder="Select category..."
                required
              />
            )}

            {/* Price Adjustment Form */}
            {action === 'price' && (
              <div className="space-y-4">
                <Select
                  label="Adjustment Type"
                  options={adjustmentTypeOptions}
                  value={adjustmentType}
                  onChange={setAdjustmentType}
                />
                <Input
                  label={`Adjustment Value ${adjustmentType === 'percentage' ? '(%)' : '(GHS)'}`}
                  type="number"
                  placeholder={adjustmentType === 'percentage' ? '10' : '5.00'}
                  value={priceAdjustment}
                  onChange={(e) => setPriceAdjustment(e?.target?.value)}
                  required
                />
                {priceAdjustment && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Preview: {adjustmentType === 'percentage' ? `${priceAdjustment}%` : `GHS ${priceAdjustment}`} 
                      {adjustmentType === 'percentage' ? ' increase/decrease' : ' added/subtracted'}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Warning for destructive actions */}
            {(action === 'delete' || action === 'reject') && (
              <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Icon name="AlertTriangle" size={16} className="text-error" />
                  <p className="text-sm text-error font-medium">
                    {action === 'delete' ? 'This action cannot be undone.' : 'Rejected products will need manual review.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant={config?.confirmVariant}
              onClick={handleConfirm}
              disabled={!isFormValid()}
              iconName={config?.icon}
              iconPosition="left"
            >
              {config?.confirmText}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkActionDialog;