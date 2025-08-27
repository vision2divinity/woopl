import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const WPListTable = ({ 
  products, 
  selectedItems, 
  onSelectionChange, 
  onProductAction, 
  onBulkAction,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems
}) => {
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [bulkAction, setBulkAction] = useState('');

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(products?.map(p => p?.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectItem = (productId, checked) => {
    if (checked) {
      onSelectionChange([...selectedItems, productId]);
    } else {
      onSelectionChange(selectedItems?.filter(id => id !== productId));
    }
  };

  const handleBulkActionSubmit = (e) => {
    e?.preventDefault();
    if (bulkAction && selectedItems?.length > 0) {
      onBulkAction(bulkAction);
      setBulkAction('');
    }
  };

  const toggleExpanded = (productId) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { 
        class: 'wp-status-badge wp-status-pending bg-yellow-100 text-yellow-800', 
        text: 'Pending Review',
        icon: '⏱️'
      },
      approved: { 
        class: 'wp-status-badge wp-status-approved bg-green-100 text-green-800', 
        text: 'Approved',
        icon: '✅'
      },
      rejected: { 
        class: 'wp-status-badge wp-status-rejected bg-red-100 text-red-800', 
        text: 'Rejected',
        icon: '❌'
      }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    
    return (
      <span className={`${config?.class} px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1`}>
        <span>{config?.icon}</span>
        {config?.text}
      </span>
    );
  };

  const getPlatformBadge = (platform) => {
    const platformConfig = {
      aliexpress: { class: 'bg-orange-100 text-orange-800', label: 'AliExpress' },
      alibaba: { class: 'bg-blue-100 text-blue-800', label: 'Alibaba' },
      '1688': { class: 'bg-yellow-100 text-yellow-800', label: '1688.com' }
    };

    const config = platformConfig?.[platform] || { class: 'bg-gray-100 text-gray-800', label: platform };
    
    return (
      <span className={`wp-platform-badge ${config?.class} px-2 py-1 rounded text-xs font-medium`}>
        {config?.label}
      </span>
    );
  };

  const isAllSelected = products?.length > 0 && selectedItems?.length === products?.length;
  const isPartiallySelected = selectedItems?.length > 0 && selectedItems?.length < products?.length;

  // Pagination component
  const PaginationControls = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const maxVisiblePages = 7;
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers?.push(i);
    }

    return (
      <div className="wp-pagination flex items-center justify-between p-3 bg-gray-50 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} products
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`wp-pagination-btn px-2 py-1 text-sm border rounded-sm ${
              currentPage === 1 
                ? 'border-gray-200 text-gray-400 cursor-not-allowed' :'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Icon name="ChevronLeft" size={14} />
          </button>
          
          {start > 1 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                className="wp-pagination-btn px-3 py-1 text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm"
              >
                1
              </button>
              {start > 2 && <span className="px-2 text-gray-500">...</span>}
            </>
          )}
          
          {pageNumbers?.map(pageNum => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`wp-pagination-btn px-3 py-1 text-sm border rounded-sm ${
                pageNum === currentPage
                  ? 'border-blue-500 bg-blue-500 text-white' :'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {pageNum}
            </button>
          ))}
          
          {end < totalPages && (
            <>
              {end < totalPages - 1 && <span className="px-2 text-gray-500">...</span>}
              <button
                onClick={() => onPageChange(totalPages)}
                className="wp-pagination-btn px-3 py-1 text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm"
              >
                {totalPages}
              </button>
            </>
          )}
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`wp-pagination-btn px-2 py-1 text-sm border rounded-sm ${
              currentPage === totalPages 
                ? 'border-gray-200 text-gray-400 cursor-not-allowed' :'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Icon name="ChevronRight" size={14} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="wp-list-table-wrapper bg-white border border-gray-300 rounded-sm">
      {/* Bulk Actions Bar */}
      {selectedItems?.length > 0 && (
        <div className="wp-bulk-actions bg-blue-50 border-b border-blue-200 p-3">
          <form onSubmit={handleBulkActionSubmit} className="flex items-center gap-3">
            <span className="text-sm text-blue-800 font-medium">
              {selectedItems?.length} item{selectedItems?.length > 1 ? 's' : ''} selected
            </span>
            
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e?.target?.value)}
              className="wp-select border border-gray-300 px-2 py-1 text-sm rounded-sm"
            >
              <option value="">Bulk Actions</option>
              <option value="approve">Approve Selected</option>
              <option value="reject">Reject Selected</option>
              <option value="delete">Delete Selected</option>
            </select>
            
            <button
              type="submit"
              disabled={!bulkAction}
              className="wp-button wp-button-secondary px-3 py-1 border border-gray-400 bg-white text-gray-800 rounded-sm hover:bg-gray-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply
            </button>
          </form>
        </div>
      )}
      {/* WordPress List Table */}
      <div className="wp-list-table overflow-x-auto">
        <table className="w-full">
          <thead className="wp-list-table-head bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="wp-list-table-th w-8 p-3 text-left">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isPartiallySelected;
                  }}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="wp-checkbox"
                />
              </th>
              <th className="wp-list-table-th p-3 text-left text-sm font-medium text-gray-700">
                Product
              </th>
              <th className="wp-list-table-th p-3 text-left text-sm font-medium text-gray-700">
                Platform
              </th>
              <th className="wp-list-table-th p-3 text-left text-sm font-medium text-gray-700">
                Price
              </th>
              <th className="wp-list-table-th p-3 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="wp-list-table-th p-3 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <React.Fragment key={product?.id}>
                <tr className={`wp-list-table-row border-b border-gray-200 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                  <td className="wp-list-table-cell p-3">
                    <input
                      type="checkbox"
                      checked={selectedItems?.includes(product?.id)}
                      onChange={(e) => handleSelectItem(product?.id, e?.target?.checked)}
                      className="wp-checkbox"
                    />
                  </td>
                  
                  <td className="wp-list-table-cell p-3">
                    <div className="flex items-center gap-3">
                      <div className="wp-thumbnail w-12 h-12 flex-shrink-0">
                        <Image
                          src={product?.thumbnail}
                          alt={product?.name}
                          className="w-full h-full object-cover rounded border border-gray-200"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="wp-product-title font-medium text-gray-900 truncate">
                            {product?.name}
                          </h3>
                          <button
                            onClick={() => toggleExpanded(product?.id)}
                            className="wp-expand-btn text-gray-400 hover:text-gray-600"
                          >
                            <Icon 
                              name={expandedProduct === product?.id ? 'ChevronUp' : 'ChevronDown'} 
                              size={14} 
                            />
                          </button>
                        </div>
                        <p className="wp-product-sku text-sm text-gray-500 truncate">
                          SKU: {product?.sku}
                        </p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="wp-list-table-cell p-3">
                    {getPlatformBadge(product?.platform)}
                  </td>
                  
                  <td className="wp-list-table-cell p-3">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        GHS {product?.price}
                      </div>
                      <div className="text-gray-500">
                        {product?.originalPrice} {product?.originalCurrency}
                      </div>
                    </div>
                  </td>
                  
                  <td className="wp-list-table-cell p-3">
                    {getStatusBadge(product?.status)}
                  </td>
                  
                  <td className="wp-list-table-cell p-3">
                    <div className="wp-row-actions flex gap-1">
                      {product?.status === 'pending' && (
                        <>
                          <button
                            onClick={() => onProductAction(product?.id, 'approve')}
                            className="wp-action-btn text-green-600 hover:text-green-800 p-1 rounded"
                            title="Approve"
                          >
                            <Icon name="Check" size={16} />
                          </button>
                          <button
                            onClick={() => onProductAction(product?.id, 'reject')}
                            className="wp-action-btn text-red-600 hover:text-red-800 p-1 rounded"
                            title="Reject"
                          >
                            <Icon name="X" size={16} />
                          </button>
                        </>
                      )}
                      <button
                        className="wp-action-btn text-gray-600 hover:text-gray-800 p-1 rounded"
                        title="Edit"
                      >
                        <Icon name="Edit" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                
                {/* Expanded Product Details - WordPress Accordion Style */}
                {expandedProduct === product?.id && (
                  <tr className="wp-expanded-row">
                    <td colSpan="6" className="wp-expanded-content p-0">
                      <div className="bg-gray-50 border-t border-gray-200 p-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Product Images */}
                          <div className="wp-metabox-section">
                            <h4 className="wp-metabox-title text-sm font-medium text-gray-700 mb-3">
                              Product Images
                            </h4>
                            <div className="grid grid-cols-4 gap-2">
                              {product?.images?.map((image, index) => (
                                <div key={index} className="wp-image-preview aspect-square">
                                  <Image
                                    src={image}
                                    alt={`${product?.name} image ${index + 1}`}
                                    className="w-full h-full object-cover rounded border border-gray-200"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Product Details */}
                          <div className="wp-metabox-section">
                            <h4 className="wp-metabox-title text-sm font-medium text-gray-700 mb-3">
                              Product Details
                            </h4>
                            <div className="space-y-3">
                              <div className="wp-field-group">
                                <label className="wp-field-label text-xs font-medium text-gray-600">
                                  SEO Title
                                </label>
                                <p className="wp-field-value text-sm text-gray-800 mt-1">
                                  {product?.seoTitle}
                                </p>
                              </div>
                              
                              <div className="wp-field-group">
                                <label className="wp-field-label text-xs font-medium text-gray-600">
                                  Description
                                </label>
                                <p className="wp-field-value text-sm text-gray-800 mt-1 line-clamp-3">
                                  {product?.description}
                                </p>
                              </div>
                              
                              <div className="wp-field-group">
                                <label className="wp-field-label text-xs font-medium text-gray-600">
                                  Variants
                                </label>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {product?.variants?.map((variant, index) => (
                                    <span 
                                      key={index} 
                                      className="wp-variant-tag bg-white border border-gray-200 px-2 py-1 text-xs rounded"
                                    >
                                      {variant}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              {product?.status === 'rejected' && (
                                <div className="wp-field-group">
                                  <label className="wp-field-label text-xs font-medium text-red-600">
                                    Rejection Reason
                                  </label>
                                  <p className="wp-field-value text-sm text-red-700 mt-1">
                                    {product?.rejectionReason}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {/* WordPress Pagination */}
      <PaginationControls />
      {/* Empty State */}
      {products?.length === 0 && (
        <div className="wp-empty-state text-center py-12">
          <div className="text-gray-400 mb-4">
            <Icon name="Package" size={48} />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No products in queue
          </h3>
          <p className="text-gray-500 mb-4">
            Products will appear here when they're added to the import queue.
          </p>
        </div>
      )}
    </div>
  );
};

export default WPListTable;