import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const WordPressFilters = ({ 
  filters, 
  onFiltersChange, 
  onExport, 
  totalItems, 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key, value) => {
    onFiltersChange({ [key]: value });
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
  };

  const clearFilters = () => {
    onFiltersChange({
      platform: 'all',
      status: 'all',
      category: 'all',
      search: '',
      sortBy: 'date_added',
      order: 'desc'
    });
  };

  return (
    <div className="wp-list-table-filters bg-white border border-gray-300 rounded-sm mb-4">
      {/* WordPress Admin Toolbar */}
      <div className="wp-toolbar border-b border-gray-200 p-3">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search Box - WordPress Admin Style */}
          <form onSubmit={handleSearchSubmit} className="wp-search-box flex gap-2">
            <input
              type="search"
              placeholder="Search products..."
              value={filters?.search || ''}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="wp-input border border-gray-300 px-3 py-1 text-sm rounded-sm focus:border-blue-500 focus:outline-none w-64"
            />
            <button 
              type="submit"
              className="wp-button wp-button-secondary px-3 py-1 border border-gray-400 bg-white text-gray-800 rounded-sm hover:bg-gray-50 text-sm"
            >
              <Icon name="Search" size={14} />
            </button>
          </form>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="wp-button wp-button-secondary px-3 py-1 border border-gray-400 bg-white text-gray-800 rounded-sm hover:bg-gray-50 text-sm"
            >
              <Icon name="Filter" size={14} className="mr-1" />
              Filter
              <Icon name={showAdvanced ? "ChevronUp" : "ChevronDown"} size={14} className="ml-1" />
            </button>
            
            <button
              onClick={onExport}
              className="wp-button wp-button-secondary px-3 py-1 border border-gray-400 bg-white text-gray-800 rounded-sm hover:bg-gray-50 text-sm"
            >
              <Icon name="Download" size={14} className="mr-1" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Advanced Filters - WordPress Admin Style */}
        {showAdvanced && (
          <div className="wp-advanced-filters border-t border-gray-200 pt-3 mt-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
              <div>
                <label className="wp-label text-xs text-gray-600 block mb-1">Platform:</label>
                <select
                  value={filters?.platform || 'all'}
                  onChange={(e) => handleFilterChange('platform', e?.target?.value)}
                  className="wp-select w-full border border-gray-300 px-2 py-1 text-sm rounded-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="all">All Platforms</option>
                  <option value="aliexpress">AliExpress</option>
                  <option value="alibaba">Alibaba</option>
                  <option value="1688">1688.com</option>
                </select>
              </div>

              <div>
                <label className="wp-label text-xs text-gray-600 block mb-1">Status:</label>
                <select
                  value={filters?.status || 'all'}
                  onChange={(e) => handleFilterChange('status', e?.target?.value)}
                  className="wp-select w-full border border-gray-300 px-2 py-1 text-sm rounded-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="wp-label text-xs text-gray-600 block mb-1">Category:</label>
                <select
                  value={filters?.category || 'all'}
                  onChange={(e) => handleFilterChange('category', e?.target?.value)}
                  className="wp-select w-full border border-gray-300 px-2 py-1 text-sm rounded-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="electronics">Electronics</option>
                  <option value="home-garden">Home & Garden</option>
                  <option value="sports">Sports & Outdoors</option>
                  <option value="beauty">Beauty & Health</option>
                </select>
              </div>

              <div>
                <label className="wp-label text-xs text-gray-600 block mb-1">Sort By:</label>
                <select
                  value={`${filters?.sortBy || 'date_added'}-${filters?.order || 'desc'}`}
                  onChange={(e) => {
                    const [sortBy, order] = e?.target?.value?.split('-');
                    onFiltersChange({ sortBy, order });
                  }}
                  className="wp-select w-full border border-gray-300 px-2 py-1 text-sm rounded-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="date_added-desc">Date Added (Newest)</option>
                  <option value="date_added-asc">Date Added (Oldest)</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                  <option value="status-asc">Status</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Showing {totalItems} products
                {currentPage && totalPages > 1 && (
                  <span> (Page {currentPage} of {totalPages})</span>
                )}
              </div>
              
              <button
                onClick={clearFilters}
                className="wp-button wp-button-secondary px-3 py-1 border border-gray-400 bg-white text-gray-800 rounded-sm hover:bg-gray-50 text-sm"
              >
                <Icon name="X" size={14} className="mr-1" />
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordPressFilters;