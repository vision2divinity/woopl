import React, { useState } from 'react';
import { Clock, DollarSign, Tag, Settings, Info } from 'lucide-react';

const ImportSettingsTab = () => {
  const [settings, setSettings] = useState({
    scheduling: {
      import_frequency: 'hourly',
      max_products_per_import: 50,
      auto_import_enabled: true,
      import_time_window: '09:00-18:00'
    },
    categories: {
      default_category: 'uncategorized',
      auto_categorization: true,
      category_mapping: 'smart'
    },
    pricing: {
      markup_type: 'percentage',
      markup_value: 25,
      price_rounding: 'nearest_99',
      currency_conversion: true,
      min_profit_margin: 20
    },
    automation: {
      auto_publish: false,
      require_approval: true,
      update_existing: true,
      manage_inventory: true,
      sync_descriptions: true
    }
  });

  const [categories] = useState([
    { value: 'uncategorized', label: 'Uncategorized' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing & Accessories' },
    { value: 'home-garden', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports & Recreation' },
    { value: 'health-beauty', label: 'Health & Beauty' },
    { value: 'automotive', label: 'Automotive' }
  ]);

  const handleSettingChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        [field]: value
      }
    }));
  };

  const renderSelectField = (section, field, label, options, description = '') => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        value={settings?.[section]?.[field] || ''}
        onChange={(e) => handleSettingChange(section, field, e?.target?.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {options?.map(option => (
          <option key={option?.value} value={option?.value}>
            {option?.label}
          </option>
        ))}
      </select>
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );

  const renderNumberField = (section, field, label, min = 0, max = null, description = '') => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="number"
        min={min}
        max={max}
        value={settings?.[section]?.[field] || ''}
        onChange={(e) => handleSettingChange(section, field, parseInt(e?.target?.value))}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );

  const renderCheckboxField = (section, field, label, description = '') => (
    <div className="mb-6">
      <div className="flex items-start">
        <input
          type="checkbox"
          checked={settings?.[section]?.[field] || false}
          onChange={(e) => handleSettingChange(section, field, e?.target?.checked)}
          className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <div className="ml-3">
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Scheduling Settings */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
          <Clock className="w-5 h-5 mr-2 text-blue-600" />
          Import Scheduling
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {renderSelectField('scheduling', 'import_frequency', 'Import Frequency', [
              { value: 'manual', label: 'Manual Only' },
              { value: 'hourly', label: 'Every Hour' },
              { value: 'every_6_hours', label: 'Every 6 Hours' },
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' }
            ], 'How often to automatically check for new products')}

            {renderNumberField('scheduling', 'max_products_per_import', 'Max Products Per Import', 1, 200, 'Limit products imported in each batch')}
          </div>
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Import Time Window
              </label>
              <input
                type="text"
                value={settings?.scheduling?.import_time_window || ''}
                onChange={(e) => handleSettingChange('scheduling', 'import_time_window', e?.target?.value)}
                placeholder="09:00-18:00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">Time range for automatic imports (24h format)</p>
            </div>

            {renderCheckboxField('scheduling', 'auto_import_enabled', 'Enable Automatic Import', 'Allow the system to import products automatically based on schedule')}
          </div>
        </div>
      </div>
      {/* Category Settings */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
          <Tag className="w-5 h-5 mr-2 text-green-600" />
          Category Management
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {renderSelectField('categories', 'default_category', 'Default Category', categories, 'Fallback category for uncategorized products')}

            {renderSelectField('categories', 'category_mapping', 'Category Mapping Method', [
              { value: 'manual', label: 'Manual Assignment' },
              { value: 'smart', label: 'Smart Mapping' },
              { value: 'keyword', label: 'Keyword Based' },
              { value: 'supplier', label: 'By Supplier Category' }
            ], 'How to assign categories to imported products')}
          </div>
          <div>
            {renderCheckboxField('categories', 'auto_categorization', 'Enable Auto-Categorization', 'Automatically categorize products based on titles and descriptions')}

            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800 font-medium">Smart Mapping</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Uses AI to analyze product titles, descriptions, and images to suggest the most appropriate categories.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Pricing Settings */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
          <DollarSign className="w-5 h-5 mr-2 text-yellow-600" />
          Pricing Rules
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {renderSelectField('pricing', 'markup_type', 'Markup Type', [
              { value: 'percentage', label: 'Percentage (%)' },
              { value: 'fixed', label: 'Fixed Amount' },
              { value: 'multiplier', label: 'Price Multiplier' }
            ], 'How to calculate selling price from supplier price')}

            {renderNumberField('pricing', 'markup_value', 'Markup Value', 0, 1000, 'Markup amount (% or fixed value depending on type)')}

            {renderNumberField('pricing', 'min_profit_margin', 'Minimum Profit Margin (%)', 0, 100, 'Minimum profit margin to maintain')}
          </div>
          <div>
            {renderSelectField('pricing', 'price_rounding', 'Price Rounding', [
              { value: 'none', label: 'No Rounding' },
              { value: 'nearest_99', label: 'Nearest .99' },
              { value: 'nearest_95', label: 'Nearest .95' },
              { value: 'round_up', label: 'Round Up' },
              { value: 'round_down', label: 'Round Down' }
            ], 'How to round calculated prices')}

            {renderCheckboxField('pricing', 'currency_conversion', 'Auto Currency Conversion', 'Convert prices to your store currency automatically')}

            <div className="mt-4 p-4 bg-yellow-50 rounded-md">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-yellow-800 font-medium">Pricing Example</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Supplier price: $10.00 + 25% markup = $12.50 → Rounded to $12.99
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Automation Settings */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
          <Settings className="w-5 h-5 mr-2 text-purple-600" />
          Automation Preferences
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {renderCheckboxField('automation', 'auto_publish', 'Auto-Publish Products', 'Publish products immediately after import (skips approval queue)')}

            {renderCheckboxField('automation', 'require_approval', 'Require Manual Approval', 'Send imported products to approval queue before publishing')}

            {renderCheckboxField('automation', 'update_existing', 'Update Existing Products', 'Update price and inventory for products that already exist in your store')}
          </div>
          <div>
            {renderCheckboxField('automation', 'manage_inventory', 'Sync Inventory Levels', 'Automatically update stock quantities based on supplier availability')}

            {renderCheckboxField('automation', 'sync_descriptions', 'Sync Product Descriptions', 'Update product descriptions when supplier makes changes')}

            <div className="mt-4 p-4 bg-purple-50 rounded-md">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-purple-800 font-medium">Recommendation</p>
                  <p className="text-sm text-purple-700 mt-1">
                    Enable "Require Manual Approval" for quality control, especially when starting out.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportSettingsTab;