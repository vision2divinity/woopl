import React, { useState, useEffect } from 'react';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchFilters = ({ onFiltersChange, isCollapsed, onToggleCollapse }) => {
  const [filters, setFilters] = useState({
    keyword: '',
    platforms: ['aliexpress'],
    priceRange: { min: 0, max: 1000 },
    categories: [],
    minRating: 0,
    shippingOrigins: [],
    hasVariants: false,
    freeShipping: false,
    fastShipping: false
  });

  const [savedSearches, setSavedSearches] = useState([
    { id: 1, name: 'Electronics Under GHS 500', keyword: 'electronics', filters: { priceRange: { max: 500 } } },
    { id: 2, name: 'Fashion Items', keyword: 'fashion clothing', filters: { categories: ['fashion'] } },
    { id: 3, name: 'Home & Garden', keyword: 'home garden', filters: { categories: ['home'] } }
  ]);

  const platformOptions = [
    { value: 'aliexpress', label: 'AliExpress' },
    { value: 'alibaba', label: 'Alibaba' },
    { value: '1688', label: '1688.com' }
  ];

  const categoryOptions = [
    { value: 'electronics', label: 'Electronics & Gadgets' },
    { value: 'fashion', label: 'Fashion & Clothing' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports & Outdoors' },
    { value: 'beauty', label: 'Beauty & Health' },
    { value: 'automotive', label: 'Automotive & Motorcycle' },
    { value: 'toys', label: 'Toys & Games' },
    { value: 'jewelry', label: 'Jewelry & Accessories' }
  ];

  const shippingOriginOptions = [
    { value: 'china', label: 'China' },
    { value: 'usa', label: 'United States' },
    { value: 'germany', label: 'Germany' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'turkey', label: 'Turkey' }
  ];

  const ratingOptions = [
    { value: 0, label: 'All Ratings' },
    { value: 3, label: '3+ Stars' },
    { value: 4, label: '4+ Stars' },
    { value: 4.5, label: '4.5+ Stars' }
  ];

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePriceRangeChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev?.priceRange,
        [type]: parseFloat(value) || 0
      }
    }));
  };

  const handleSaveSearch = () => {
    const searchName = prompt('Enter a name for this search:');
    if (searchName) {
      const newSearch = {
        id: Date.now(),
        name: searchName,
        keyword: filters?.keyword,
        filters: { ...filters }
      };
      setSavedSearches(prev => [...prev, newSearch]);
    }
  };

  const handleLoadSearch = (search) => {
    setFilters({
      ...search?.filters,
      keyword: search?.keyword
    });
  };

  const handleClearFilters = () => {
    setFilters({
      keyword: '',
      platforms: ['aliexpress'],
      priceRange: { min: 0, max: 1000 },
      categories: [],
      minRating: 0,
      shippingOrigins: [],
      hasVariants: false,
      freeShipping: false,
      fastShipping: false
    });
  };

  if (isCollapsed) {
    return (
      <div className="lg:hidden fixed top-20 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleCollapse}
          iconName="Filter"
          iconPosition="left"
          className="bg-card shadow-lg"
        >
          Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Search Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            iconName="X"
            className="lg:hidden"
          />
        </div>

        {/* Search Input */}
        <Input
          label="Search Keywords"
          type="text"
          placeholder="Enter product keywords..."
          value={filters?.keyword}
          onChange={(e) => handleFilterChange('keyword', e?.target?.value)}
          className="mb-4"
        />

        {/* Platform Selection */}
        <Select
          label="Platforms"
          multiple
          options={platformOptions}
          value={filters?.platforms}
          onChange={(value) => handleFilterChange('platforms', value)}
          className="mb-4"
        />
      </div>
      <div className="p-4 space-y-6">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Price Range (GHS)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Min"
              value={filters?.priceRange?.min}
              onChange={(e) => handlePriceRangeChange('min', e?.target?.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters?.priceRange?.max}
              onChange={(e) => handlePriceRangeChange('max', e?.target?.value)}
            />
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Exchange rate updated: {new Date()?.toLocaleString()}
          </div>
        </div>

        {/* Categories */}
        <Select
          label="Categories"
          multiple
          searchable
          options={categoryOptions}
          value={filters?.categories}
          onChange={(value) => handleFilterChange('categories', value)}
        />

        {/* Rating Filter */}
        <Select
          label="Minimum Rating"
          options={ratingOptions}
          value={filters?.minRating}
          onChange={(value) => handleFilterChange('minRating', value)}
        />

        {/* Shipping Origins */}
        <Select
          label="Shipping From"
          multiple
          searchable
          options={shippingOriginOptions}
          value={filters?.shippingOrigins}
          onChange={(value) => handleFilterChange('shippingOrigins', value)}
        />

        {/* Additional Filters */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Additional Options
          </label>
          <div className="space-y-3">
            <Checkbox
              label="Has Variants (Size/Color)"
              checked={filters?.hasVariants}
              onChange={(e) => handleFilterChange('hasVariants', e?.target?.checked)}
            />
            <Checkbox
              label="Free Shipping Available"
              checked={filters?.freeShipping}
              onChange={(e) => handleFilterChange('freeShipping', e?.target?.checked)}
            />
            <Checkbox
              label="Fast Shipping (≤7 days)"
              checked={filters?.fastShipping}
              onChange={(e) => handleFilterChange('fastShipping', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Saved Searches */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-foreground">
              Saved Searches
            </label>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleSaveSearch}
              iconName="Bookmark"
              iconSize={14}
            >
              Save
            </Button>
          </div>
          <div className="space-y-2">
            {savedSearches?.map((search) => (
              <button
                key={search?.id}
                onClick={() => handleLoadSearch(search)}
                className="w-full text-left p-2 text-xs bg-muted hover:bg-muted/80 rounded-md transition-colors"
              >
                <div className="font-medium text-foreground">{search?.name}</div>
                <div className="text-muted-foreground truncate">{search?.keyword}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-2 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearFilters}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;