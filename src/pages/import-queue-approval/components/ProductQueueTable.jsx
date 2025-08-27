import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ProductQueueTable = ({ 
  products, 
  selectedItems, 
  onSelectionChange, 
  onProductAction, 
  onBulkAction,
  onProductExpand 
}) => {
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, productId: null });

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

  const handleContextMenu = (e, productId) => {
    e?.preventDefault();
    setContextMenu({
      show: true,
      x: e?.clientX,
      y: e?.clientY,
      productId
    });
  };

  const handleContextAction = (action) => {
    if (contextMenu?.productId) {
      onProductAction(contextMenu?.productId, action);
    }
    setContextMenu({ show: false, x: 0, y: 0, productId: null });
  };

  const toggleExpanded = (productId) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
    onProductExpand(productId);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-warning text-warning-foreground', icon: 'Clock', label: 'Pending Review' },
      approved: { color: 'bg-success text-success-foreground', icon: 'CheckCircle', label: 'Approved' },
      rejected: { color: 'bg-error text-error-foreground', icon: 'XCircle', label: 'Rejected' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        {config?.label}
      </span>
    );
  };

  const getPlatformBadge = (platform) => {
    const platformConfig = {
      aliexpress: { color: 'bg-orange-100 text-orange-800', label: 'AliExpress' },
      alibaba: { color: 'bg-blue-100 text-blue-800', label: 'Alibaba' },
      '1688': { color: 'bg-yellow-100 text-yellow-800', label: '1688.com' }
    };

    const config = platformConfig?.[platform] || { color: 'bg-gray-100 text-gray-800', label: platform };
    
    return (
      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const isAllSelected = products?.length > 0 && selectedItems?.length === products?.length;
  const isPartiallySelected = selectedItems?.length > 0 && selectedItems?.length < products?.length;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header with Bulk Actions */}
      {selectedItems?.length > 0 && (
        <div className="bg-muted px-4 py-3 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="CheckSquare" size={16} className="text-primary" />
              <span className="text-sm font-medium">
                {selectedItems?.length} item{selectedItems?.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="success"
                size="sm"
                onClick={() => onBulkAction('approve')}
                iconName="Check"
                iconPosition="left"
              >
                Approve Selected
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onBulkAction('reject')}
                iconName="X"
                iconPosition="left"
              >
                Reject Selected
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('delete')}
                iconName="Trash2"
                iconPosition="left"
              >
                Remove Selected
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="w-12 p-4">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isPartiallySelected}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left p-4 font-medium text-foreground">Product</th>
              <th className="text-left p-4 font-medium text-foreground">Platform</th>
              <th className="text-left p-4 font-medium text-foreground">Original Price</th>
              <th className="text-left p-4 font-medium text-foreground">GHS Price</th>
              <th className="text-left p-4 font-medium text-foreground">Category</th>
              <th className="text-left p-4 font-medium text-foreground">Status</th>
              <th className="text-left p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <React.Fragment key={product?.id}>
                <tr 
                  className="border-b border-border hover:bg-muted/50 cursor-pointer"
                  onContextMenu={(e) => handleContextMenu(e, product?.id)}
                  onClick={() => toggleExpanded(product?.id)}
                >
                  <td className="p-4" onClick={(e) => e?.stopPropagation()}>
                    <Checkbox
                      checked={selectedItems?.includes(product?.id)}
                      onChange={(e) => handleSelectItem(product?.id, e?.target?.checked)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={product?.thumbnail}
                          alt={product?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-foreground truncate">{product?.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">SKU: {product?.sku}</p>
                      </div>
                      <Icon 
                        name={expandedProduct === product?.id ? 'ChevronUp' : 'ChevronDown'} 
                        size={16} 
                        className="text-muted-foreground"
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    {getPlatformBadge(product?.platform)}
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <div className="font-medium">{product?.originalPrice}</div>
                      <div className="text-muted-foreground">{product?.originalCurrency}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-foreground">GHS {product?.ghsPrice}</div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{product?.category}</span>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(product?.status)}
                  </td>
                  <td className="p-4" onClick={(e) => e?.stopPropagation()}>
                    <div className="flex gap-1">
                      {product?.status === 'pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onProductAction(product?.id, 'approve')}
                            iconName="Check"
                            className="text-success hover:bg-success/10"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onProductAction(product?.id, 'reject')}
                            iconName="X"
                            className="text-error hover:bg-error/10"
                          />
                        </>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onProductAction(product?.id, 'edit')}
                        iconName="Edit"
                        className="text-muted-foreground hover:text-foreground"
                      />
                    </div>
                  </td>
                </tr>
                
                {/* Expanded Product Details */}
                {expandedProduct === product?.id && (
                  <tr>
                    <td colSpan="8" className="p-0">
                      <div className="bg-muted/30 p-6 border-b border-border">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Product Images */}
                          <div>
                            <h4 className="font-medium text-foreground mb-3">Product Images</h4>
                            <div className="grid grid-cols-4 gap-2">
                              {product?.images?.map((image, index) => (
                                <div key={index} className="aspect-square rounded-lg overflow-hidden bg-background">
                                  <Image
                                    src={image}
                                    alt={`${product?.name} image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Product Details */}
                          <div>
                            <h4 className="font-medium text-foreground mb-3">Product Details</h4>
                            <div className="space-y-3">
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">SEO Title</label>
                                <p className="text-sm text-foreground mt-1">{product?.seoTitle}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Description</label>
                                <p className="text-sm text-foreground mt-1 line-clamp-3">{product?.description}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Variants</label>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {product?.variants?.map((variant, index) => (
                                    <span key={index} className="px-2 py-1 bg-background rounded text-xs">
                                      {variant}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              {product?.status === 'rejected' && (
                                <div>
                                  <label className="text-sm font-medium text-error">Rejection Reason</label>
                                  <p className="text-sm text-error mt-1">{product?.rejectionReason}</p>
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
      {/* Mobile Card View */}
      <div className="lg:hidden">
        {products?.map((product) => (
          <div key={product?.id} className="border-b border-border last:border-b-0">
            <div className="p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={selectedItems?.includes(product?.id)}
                  onChange={(e) => handleSelectItem(product?.id, e?.target?.checked)}
                />
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={product?.thumbnail}
                    alt={product?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">{product?.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {getPlatformBadge(product?.platform)}
                    {getStatusBadge(product?.status)}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">{product?.originalPrice} → </span>
                      <span className="font-medium text-foreground">GHS {product?.ghsPrice}</span>
                    </div>
                    <div className="flex gap-1">
                      {product?.status === 'pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onProductAction(product?.id, 'approve')}
                            iconName="Check"
                            className="text-success"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onProductAction(product?.id, 'reject')}
                            iconName="X"
                            className="text-error"
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Context Menu */}
      {contextMenu?.show && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setContextMenu({ show: false, x: 0, y: 0, productId: null })}
          />
          <div 
            className="fixed bg-popover border border-border rounded-md shadow-lg z-50 py-1"
            style={{ left: contextMenu?.x, top: contextMenu?.y }}
          >
            <button
              onClick={() => handleContextAction('edit')}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted"
            >
              <Icon name="Edit" size={14} />
              Edit Product
            </button>
            <button
              onClick={() => handleContextAction('duplicate')}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted"
            >
              <Icon name="Copy" size={14} />
              Duplicate
            </button>
            <button
              onClick={() => handleContextAction('delete')}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-error hover:bg-muted"
            >
              <Icon name="Trash2" size={14} />
              Remove from Queue
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductQueueTable;