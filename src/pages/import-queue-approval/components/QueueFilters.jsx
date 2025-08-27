import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const QueueFilters = ({ filters, onFiltersChange, onSearch, onExport, totalItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const platformOptions = [
    { value: 'all', label: 'All Platforms' },
    { value: 'aliexpress', label: 'AliExpress' },
    { value: 'alibaba', label: 'Alibaba' },
    { value: '1688', label: '1688.com' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing & Fashion' },
    { value: 'home-garden', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports & Outdoors' },
    { value: 'beauty', label: 'Beauty & Health' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'toys', label: 'Toys & Games' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name-az', label: 'Name: A to Z' },
    { value: 'name-za', label: 'Name: Z to A' }
  ];

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setSearchTerm('');
    onFiltersChange({
      platform: 'all',
      status: 'all',
      category: 'all',
      priceMin: '',
      priceMax: '',
      sortBy: 'newest'
    });
    onSearch('');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Search and Quick Actions */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="flex-1 flex gap-2">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search products by name, SKU, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <Button
            variant="outline"
            onClick={handleSearch}
            iconName="Search"
            iconPosition="left"
          >
            Search
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            iconName={isAdvancedOpen ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
          >
            Advanced Filters
          </Button>
          <Button
            variant="outline"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
      {/* Advanced Filters */}
      {isAdvancedOpen && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <Select
              label="Platform"
              options={platformOptions}
              value={filters?.platform}
              onChange={(value) => handleFilterChange('platform', value)}
            />
            
            <Select
              label="Status"
              options={statusOptions}
              value={filters?.status}
              onChange={(value) => handleFilterChange('status', value)}
            />
            
            <Select
              label="Category"
              options={categoryOptions}
              value={filters?.category}
              onChange={(value) => handleFilterChange('category', value)}
            />
            
            <Select
              label="Sort By"
              options={sortOptions}
              value={filters?.sortBy}
              onChange={(value) => handleFilterChange('sortBy', value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Min Price (GHS)"
              type="number"
              placeholder="0.00"
              value={filters?.priceMin}
              onChange={(e) => handleFilterChange('priceMin', e?.target?.value)}
            />
            
            <Input
              label="Max Price (GHS)"
              type="number"
              placeholder="1000.00"
              value={filters?.priceMax}
              onChange={(e) => handleFilterChange('priceMax', e?.target?.value)}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Showing {totalItems} products in queue
            </div>
            <Button
              variant="ghost"
              onClick={clearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear All Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueueFilters;