import React from 'react';
import { ExternalLink, Clock, CheckCircle, XCircle, AlertCircle, RefreshCw, Eye } from 'lucide-react';

const RecentImports = ({ imports }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'processing':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    switch (status) {
      case 'published':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'processing':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'AliExpress':
        return 'bg-orange-100 text-orange-800';
      case 'Alibaba':
        return 'bg-yellow-100 text-yellow-800';
      case '1688':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 60000); // difference in minutes
    
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff} min ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return date?.toLocaleDateString();
  };

  const viewInWooCommerce = (productId) => {
    // Simulate opening WooCommerce product edit page
    window.open(`/wp-admin/post.php?post=${productId}&action=edit`, '_blank');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {/* WordPress Metabox Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Import Activity</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View All Imports
          </button>
        </div>
      </div>
      <div className="p-6">
        {imports?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <RefreshCw className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No recent import activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Table Header */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 pb-2">
              <div className="col-span-5">Product</div>
              <div className="col-span-2">Platform</div>
              <div className="col-span-1">Price</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1">Time</div>
              <div className="col-span-1">Actions</div>
            </div>

            {/* Import Entries */}
            {imports?.map((importItem) => (
              <div key={importItem?.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-150">
                {/* Product Info */}
                <div className="col-span-12 md:col-span-5">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <img
                        src={importItem?.productImage}
                        alt={importItem?.productName}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {importItem?.productName}
                      </p>
                      <p className="text-xs text-gray-500">
                        WC ID: {importItem?.wooCommerceId}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Platform */}
                <div className="col-span-6 md:col-span-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlatformColor(importItem?.platform)}`}>
                    {importItem?.platform}
                  </span>
                </div>

                {/* Price */}
                <div className="col-span-3 md:col-span-1">
                  <span className="text-sm font-semibold text-gray-900">
                    ${importItem?.price}
                  </span>
                </div>

                {/* Status */}
                <div className="col-span-3 md:col-span-2">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(importItem?.status)}
                    <span className={getStatusBadge(importItem?.status)}>
                      {importItem?.status?.charAt(0)?.toUpperCase() + importItem?.status?.slice(1)}
                    </span>
                  </div>
                  {importItem?.error && (
                    <p className="text-xs text-red-600 mt-1">{importItem?.error}</p>
                  )}
                </div>

                {/* Time */}
                <div className="col-span-6 md:col-span-1">
                  <span className="text-xs text-gray-500">
                    {formatTime(importItem?.importTime)}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-6 md:col-span-1">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => viewInWooCommerce(importItem?.wooCommerceId?.split('-')?.[1])}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      title="View in WooCommerce"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => viewInWooCommerce(importItem?.wooCommerceId?.split('-')?.[1])}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      title="Open in WooCommerce"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {imports?.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <button className="inline-flex items-center px-4 py-2 text-sm text-blue-600 hover:text-blue-800 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors">
              Load More Imports
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentImports;