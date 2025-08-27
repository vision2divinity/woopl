import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductModal = ({ product, isOpen, onClose, onAction }) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!isOpen || !product) return null;

  const tabs = [
    { id: 'details', label: 'Product Details', icon: 'Info' },
    { id: 'history', label: 'Import History', icon: 'Clock' },
    { id: 'sync', label: 'Sync Status', icon: 'RefreshCw' },
    { id: 'errors', label: 'Error Logs', icon: 'AlertTriangle' }
  ];

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

  const mockImportHistory = [
    {
      id: 1,
      action: 'Initial Import',
      date: '2025-08-25T10:30:00Z',
      status: 'success',
      details: 'Product successfully imported from AliExpress'
    },
    {
      id: 2,
      action: 'Price Update',
      date: '2025-08-26T14:15:00Z',
      status: 'success',
      details: 'Price updated from GHS 45.50 to GHS 42.30'
    },
    {
      id: 3,
      action: 'Inventory Sync',
      date: '2025-08-27T09:20:00Z',
      status: 'success',
      details: 'Stock quantity synchronized: 150 units'
    }
  ];

  const mockSyncStatus = {
    lastSync: '2025-08-27T15:45:00Z',
    nextSync: '2025-08-28T15:45:00Z',
    syncFrequency: '24 hours',
    autoSync: true,
    conflicts: [],
    pendingChanges: 2
  };

  const mockErrors = [
    {
      id: 1,
      timestamp: '2025-08-26T08:30:00Z',
      type: 'API Error',
      message: 'WooCommerce API rate limit exceeded',
      severity: 'warning',
      resolved: true
    },
    {
      id: 2,
      timestamp: '2025-08-25T16:45:00Z',
      type: 'Image Error',
      message: 'Failed to download product image from source',
      severity: 'error',
      resolved: false
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Product Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Product Name</label>
                    <p className="text-sm text-foreground">{product?.name}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">SKU</label>
                    <p className="text-sm font-mono text-foreground">{product?.sku}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">WooCommerce ID</label>
                    <p className="text-sm font-mono text-foreground">#{product?.woocommerceId}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Category</label>
                    <p className="text-sm text-foreground">{product?.category}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Source Platform</label>
                    <p className="text-sm text-foreground capitalize">{product?.source}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Pricing & Sales</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Current Price</label>
                    <p className="text-sm font-medium text-foreground">{formatCurrency(product?.price)}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Original Price</label>
                    <p className="text-sm text-muted-foreground line-through">{formatCurrency(product?.originalPrice || product?.price * 1.2)}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Total Sales</label>
                    <p className="text-sm text-foreground">{product?.sales} units</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Revenue</label>
                    <p className="text-sm text-foreground">{formatCurrency(product?.sales * product?.price)}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Stock Status</label>
                    <p className="text-sm text-foreground">In Stock (150 units)</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Product Images</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[product?.thumbnail, ...Array(3)?.fill(product?.thumbnail)]?.map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={image}
                      alt={`${product?.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Description</h4>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-foreground leading-relaxed">
                  {`High-quality ${product?.name?.toLowerCase()} imported from trusted suppliers. Features premium materials and excellent craftsmanship. Perfect for everyday use with modern design elements that complement any style.`}
                </p>
              </div>
            </div>
          </div>
        );
        
      case 'history':
        return (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Import History</h4>
            <div className="space-y-3">
              {mockImportHistory?.map((entry) => (
                <div key={entry?.id} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    entry?.status === 'success' ? 'bg-success' : 'bg-error'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{entry?.action}</p>
                      <span className="text-xs text-muted-foreground">{formatDate(entry?.date)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{entry?.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'sync':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Synchronization Status</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Last Sync</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{formatDate(mockSyncStatus?.lastSync)}</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Calendar" size={16} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Next Sync</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{formatDate(mockSyncStatus?.nextSync)}</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Sync Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">Auto Sync</p>
                    <p className="text-xs text-muted-foreground">Automatically sync every {mockSyncStatus?.syncFrequency}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${mockSyncStatus?.autoSync ? 'bg-success' : 'bg-error'}`} />
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">Pending Changes</p>
                    <p className="text-xs text-muted-foreground">Changes waiting to be synced</p>
                  </div>
                  <span className="text-sm font-medium text-foreground">{mockSyncStatus?.pendingChanges}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="default"
                iconName="RefreshCw"
                onClick={() => onAction('force-sync')}
              >
                Force Sync Now
              </Button>
              <Button
                variant="outline"
                iconName="Settings"
                onClick={() => onAction('sync-settings')}
              >
                Sync Settings
              </Button>
            </div>
          </div>
        );
        
      case 'errors':
        return (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Error Logs</h4>
            {mockErrors?.length > 0 ? (
              <div className="space-y-3">
                {mockErrors?.map((error) => (
                  <div key={error?.id} className="p-3 bg-muted rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Icon 
                          name={error?.severity === 'error' ? 'XCircle' : 'AlertTriangle'} 
                          size={16} 
                          className={error?.severity === 'error' ? 'text-error' : 'text-warning'} 
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-foreground">{error?.type}</p>
                            {error?.resolved && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success text-success-foreground">
                                Resolved
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{error?.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{formatDate(error?.timestamp)}</p>
                        </div>
                      </div>
                      {!error?.resolved && (
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="RefreshCw"
                          onClick={() => onAction('retry-error', error?.id)}
                        >
                          Retry
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Errors Found</h3>
                <p className="text-muted-foreground">This product has no error logs.</p>
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1000 p-4">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={product?.thumbnail}
                alt={product?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{product?.name}</h2>
              <div className="flex items-center space-x-3 mt-1">
                {getStatusBadge(product?.status)}
                <span className="text-sm text-muted-foreground">SKU: {product?.sku}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 text-sm font-medium transition-colors ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/50">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Imported: {formatDate(product?.importDate)}</span>
            <span>•</span>
            <span>Last Sync: {formatDate(product?.lastSync)}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              iconName="ExternalLink"
              onClick={() => onAction('view-woocommerce')}
            >
              View in WooCommerce
            </Button>
            <Button
              variant="default"
              iconName="Edit"
              onClick={() => onAction('edit-product')}
            >
              Edit Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;