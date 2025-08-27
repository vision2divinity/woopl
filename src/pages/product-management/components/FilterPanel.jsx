import React from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isExpanded, 
  onToggleExpanded 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status', count: 1247 },
    { value: 'published', label: 'Published', count: 892 },
    { value: 'draft', label: 'Draft', count: 234 },
    { value: 'failed', label: 'Failed', count: 89 },
    { value: 'syncing', label: 'Syncing', count: 32 }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing & Fashion' },
    { value: 'home-garden', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports & Outdoors' },
    { value: 'beauty', label: 'Beauty & Personal Care' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'books', label: 'Books & Media' }
  ];

  const sourceOptions = [
    { value: 'all', label: 'All Sources' },
    { value: 'aliexpress', label: 'AliExpress' },
    { value: 'alibaba', label: 'Alibaba' },
    { value: '1688', label: '1688.com' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.status !== 'all') count++;
    if (filters?.category !== 'all') count++;
    if (filters?.source !== 'all') count++;
    if (filters?.dateRange !== 'all') count++;
    if (filters?.search) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
              {activeFiltersCount} active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClearFilters}
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            onClick={onToggleExpanded}
            className="lg:hidden"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </div>
      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <div className="p-4 space-y-6">
          {/* Search */}
          <div>
            <Input
              type="search"
              placeholder="Search products, SKUs, or WooCommerce IDs..."
              value={filters?.search || ''}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="w-full"
            />
          </div>

          {/* Status Filter */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Status</h4>
            <div className="space-y-2">
              {statusOptions?.map((option) => (
                <label key={option?.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={option?.value}
                    checked={filters?.status === option?.value}
                    onChange={(e) => handleFilterChange('status', e?.target?.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                  />
                  <div className="flex items-center justify-between flex-1">
                    <span className="text-sm text-foreground">{option?.label}</span>
                    <span className="text-xs text-muted-foreground">{option?.count}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Category</h4>
            <select
              value={filters?.category || 'all'}
              onChange={(e) => handleFilterChange('category', e?.target?.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {categoryOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Source Platform Filter */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Source Platform</h4>
            <div className="space-y-2">
              {sourceOptions?.map((option) => (
                <label key={option?.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="source"
                    value={option?.value}
                    checked={filters?.source === option?.value}
                    onChange={(e) => handleFilterChange('source', e?.target?.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-foreground">{option?.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Import Date</h4>
            <select
              value={filters?.dateRange || 'all'}
              onChange={(e) => handleFilterChange('dateRange', e?.target?.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {dateRangeOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Date Range */}
          {filters?.dateRange === 'custom' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="date"
                label="From Date"
                value={filters?.startDate || ''}
                onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
              />
              <Input
                type="date"
                label="To Date"
                value={filters?.endDate || ''}
                onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
              />
            </div>
          )}

          {/* Price Range */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Price Range (GHS)</h4>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="Min price"
                value={filters?.minPrice || ''}
                onChange={(e) => handleFilterChange('minPrice', e?.target?.value)}
              />
              <Input
                type="number"
                placeholder="Max price"
                value={filters?.maxPrice || ''}
                onChange={(e) => handleFilterChange('maxPrice', e?.target?.value)}
              />
            </div>
          </div>

          {/* Sales Range */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Sales Performance</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters?.topSellers || false}
                  onChange={(e) => handleFilterChange('topSellers', e?.target?.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
                <span className="text-sm text-foreground">Top Sellers (50+ sales)</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters?.noSales || false}
                  onChange={(e) => handleFilterChange('noSales', e?.target?.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
                <span className="text-sm text-foreground">No Sales Yet</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;