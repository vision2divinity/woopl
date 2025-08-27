import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BulkActionsDialog = ({ isOpen, action, selectedCount, onClose, onConfirm }) => {
  const [rejectionReason, setRejectionReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const actionConfig = {
    approve: {
      title: 'Approve Products',
      message: `Are you sure you want to approve ${selectedCount} product${selectedCount > 1 ? 's' : ''}?`,
      confirmText: 'Approve Products',
      confirmClass: 'wp-button wp-button-primary bg-green-600 hover:bg-green-700',
      icon: 'Check'
    },
    reject: {
      title: 'Reject Products',
      message: `Are you sure you want to reject ${selectedCount} product${selectedCount > 1 ? 's' : ''}?`,
      confirmText: 'Reject Products',
      confirmClass: 'wp-button wp-button-primary bg-red-600 hover:bg-red-700',
      icon: 'X'
    },
    delete: {
      title: 'Delete Products',
      message: `Are you sure you want to permanently delete ${selectedCount} product${selectedCount > 1 ? 's' : ''} from the queue?`,
      confirmText: 'Delete Products',
      confirmClass: 'wp-button wp-button-primary bg-red-600 hover:bg-red-700',
      icon: 'Trash2'
    }
  };

  const config = actionConfig?.[action] || actionConfig?.approve;

  const handleConfirm = async () => {
    setIsLoading(true);
    
    try {
      await onConfirm({
        action,
        rejectionReason: action === 'reject' ? rejectionReason : null
      });
    } finally {
      setIsLoading(false);
      setRejectionReason('');
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      setRejectionReason('');
    }
  };

  return (
    <>
      {/* WordPress Modal Backdrop */}
      <div 
        className="wp-modal-backdrop fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={handleClose}
      />
      
      {/* WordPress Modal Dialog */}
      <div className="wp-modal fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="wp-modal-content bg-white border border-gray-300 rounded-sm shadow-lg max-w-md w-full">
          {/* Modal Header */}
          <div className="wp-modal-header bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-between">
            <h3 className="wp-modal-title text-lg font-medium text-gray-800 m-0">
              <Icon name={config?.icon} size={18} className="mr-2" />
              {config?.title}
            </h3>
            
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="wp-modal-close text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
          
          {/* Modal Body */}
          <div className="wp-modal-body p-4">
            <div className="mb-4">
              <p className="text-gray-700 mb-2">
                {config?.message}
              </p>
              
              {action === 'delete' && (
                <div className="wp-warning bg-yellow-50 border-l-4 border-yellow-400 p-3 mt-3">
                  <div className="flex">
                    <span className="text-yellow-600 mr-2">⚠️</span>
                    <div className="text-sm text-yellow-700">
                      <strong>Warning:</strong> This action cannot be undone. 
                      Products will be permanently removed from the import queue.
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Rejection Reason Input */}
            {action === 'reject' && (
              <div className="wp-field-group mb-4">
                <label className="wp-field-label block text-sm font-medium text-gray-700 mb-2">
                  Rejection Reason
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e?.target?.value)}
                  placeholder="Enter reason for rejection (optional)..."
                  rows={3}
                  className="wp-textarea w-full border border-gray-300 px-3 py-2 text-sm rounded-sm focus:border-blue-500 focus:outline-none resize-vertical"
                />
                <p className="wp-field-help text-xs text-gray-500 mt-1">
                  This reason will be visible to users and can help with future decisions.
                </p>
              </div>
            )}
            
            {/* Product Count Summary */}
            <div className="wp-summary bg-blue-50 border border-blue-200 rounded-sm p-3 mb-4">
              <div className="flex items-center gap-2">
                <Icon name="Info" size={16} className="text-blue-600" />
                <span className="text-sm text-blue-800">
                  This action will affect <strong>{selectedCount}</strong> product{selectedCount > 1 ? 's' : ''}.
                </span>
              </div>
            </div>
          </div>
          
          {/* Modal Footer */}
          <div className="wp-modal-footer bg-gray-50 border-t border-gray-200 p-4 flex justify-end gap-2">
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="wp-button wp-button-secondary px-4 py-2 border border-gray-400 bg-white text-gray-800 rounded-sm hover:bg-gray-50 text-sm disabled:opacity-50"
            >
              Cancel
            </button>
            
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className={`${config?.confirmClass} px-4 py-2 text-white rounded-sm text-sm disabled:opacity-50 flex items-center gap-2`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Icon name={config?.icon} size={14} />
                  {config?.confirmText}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkActionsDialog;