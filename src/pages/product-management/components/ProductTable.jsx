import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductTable = ({ 
  products, 
  selectedProducts, 
  onSelectProduct, 
  onSelectAll, 
  onProductAction,
  onViewProduct 
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedProducts = () => {
    if (!sortConfig?.key) return products;
    
    return [...products]?.sort((a, b) => {
      if (sortConfig?.key === 'importDate' || sortConfig?.key === 'lastSync') {
        const aDate = new Date(a[sortConfig.key]);
        const bDate = new Date(b[sortConfig.key]);
        return sortConfig?.direction === 'asc' ? aDate - bDate : bDate - aDate;
      }
      
      if (sortConfig?.key === 'sales' || sortConfig?.key === 'price') {
        return sortConfig?.direction === 'asc' 
          ? a?.[sortConfig?.key] - b?.[sortConfig?.key]
          : b?.[sortConfig?.key] - a?.[sortConfig?.key];
      }
      
      const aValue = a?.[sortConfig?.key]?.toString()?.toLowerCase() || '';
      const bValue = b?.[sortConfig?.key]?.toString()?.toLowerCase() || '';
      
      if (sortConfig?.direction === 'asc') {
        return aValue?.localeCompare(bValue);
      }
      return bValue?.localeCompare(aValue);
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      published: { color: 'bg-success text-success-foreground', icon: 'CheckCircle' },
      draft: { color: 'bg-warning text-warning-foreground', icon: 'Clock' },
      failed: { color: 'bg-error text-error-foreground', icon: 'XCircle' },
      syncing: { color: 'bg-primary text-primary-foreground', icon: 'RefreshCw' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.draft;
    
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const sortedProducts = getSortedProducts();
  const allSelected = products?.length > 0 && selectedProducts?.length === products?.length;
  const someSelected = selectedProducts?.length > 0 && selectedProducts?.length < products?.length;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Product</th>
              <th 
                className="text-left p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('woocommerceId')}
              >
                <div className="flex items-center space-x-1">
                  <span>WooCommerce ID</span>
                  <Icon 
                    name={sortConfig?.key === 'woocommerceId' ? 
                      (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </div>
              </th>
              <th 
                className="text-left p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('importDate')}
              >
                <div className="flex items-center space-x-1">
                  <span>Import Date</span>
                  <Icon 
                    name={sortConfig?.key === 'importDate' ? 
                      (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </div>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th 
                className="text-left p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('sales')}
              >
                <div className="flex items-center space-x-1">
                  <span>Sales</span>
                  <Icon 
                    name={sortConfig?.key === 'sales' ? 
                      (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </div>
              </th>
              <th 
                className="text-left p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('lastSync')}
              >
                <div className="flex items-center space-x-1">
                  <span>Last Sync</span>
                  <Icon 
                    name={sortConfig?.key === 'lastSync' ? 
                      (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </div>
              </th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedProducts?.map((product) => (
              <tr key={product?.id} className="hover:bg-muted/50 transition-colors">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts?.includes(product?.id)}
                    onChange={(e) => onSelectProduct(product?.id, e?.target?.checked)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={product?.thumbnail}
                        alt={product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{product?.name}</p>
                      <p className="text-xs text-muted-foreground">SKU: {product?.sku}</p>
                      <p className="text-xs text-muted-foreground">{formatCurrency(product?.price)}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm font-mono text-foreground">#{product?.woocommerceId}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">{formatDate(product?.importDate)}</span>
                </td>
                <td className="p-4">
                  {getStatusBadge(product?.status)}
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">{product?.sales}</span>
                    <span className="text-xs text-muted-foreground">units</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">{formatDate(product?.lastSync)}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onViewProduct(product)}
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MoreHorizontal"
                      onClick={() => onProductAction(product, 'menu')}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {sortedProducts?.map((product) => (
          <div key={product?.id} className="p-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={selectedProducts?.includes(product?.id)}
                onChange={(e) => onSelectProduct(product?.id, e?.target?.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2 mt-1"
              />
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={product?.thumbnail}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground truncate">{product?.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">SKU: {product?.sku}</p>
                    <p className="text-sm font-medium text-foreground mt-1">{formatCurrency(product?.price)}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MoreHorizontal"
                    onClick={() => onProductAction(product, 'menu')}
                  />
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(product?.status)}
                    <span className="text-xs text-muted-foreground">#{product?.woocommerceId}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {product?.sales} sales
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>Imported: {formatDate(product?.importDate)}</span>
                  <span>Synced: {formatDate(product?.lastSync)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {sortedProducts?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProductTable;