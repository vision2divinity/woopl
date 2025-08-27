import React from 'react';
import Icon from '../../../components/AppIcon';

const WordPressAdminHeader = ({ title, subtitle, notices, onDismissNotice }) => {
  const getNoticeClass = (type) => {
    const baseClass = "wp-notice border-l-4 p-3 mb-4 bg-white";
    const typeClasses = {
      success: "border-green-500 text-green-800 bg-green-50",
      error: "border-red-500 text-red-800 bg-red-50",
      warning: "border-yellow-500 text-yellow-800 bg-yellow-50",
      info: "border-blue-500 text-blue-800 bg-blue-50"
    };
    return `${baseClass} ${typeClasses?.[type] || typeClasses?.info}`;
  };

  return (
    <div className="wp-header bg-white border-b border-gray-300">
      <div className="max-w-full mx-auto p-4">
        {/* WordPress Admin Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>WooCommerce</span>
          <Icon name="ChevronRight" size={14} />
          <span>Import Queue</span>
        </div>
        
        {/* Page Title */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="wp-heading text-2xl font-normal text-gray-800 m-0">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1 mb-0">{subtitle}</p>
            )}
          </div>
          
          {/* WordPress Admin Actions */}
          <div className="flex gap-2">
            <button className="wp-button wp-button-secondary px-4 py-2 border border-gray-400 bg-white text-gray-800 rounded-sm hover:bg-gray-50 text-sm">
              <Icon name="Settings" size={16} className="mr-2" />
              Settings
            </button>
            <button className="wp-button wp-button-primary px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 text-sm">
              <Icon name="Plus" size={16} className="mr-2" />
              Add Product
            </button>
          </div>
        </div>

        {/* WordPress Admin Notices */}
        {notices?.length > 0 && (
          <div className="wp-notices space-y-2">
            {notices?.map((notice) => (
              <div key={notice?.id} className={getNoticeClass(notice?.type)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {notice?.type === 'success' && '✅'}
                      {notice?.type === 'error' && '❌'}
                      {notice?.type === 'warning' && '⚠️'}
                      {notice?.type === 'info' && 'ℹ️'}
                    </span>
                    <span>{notice?.message}</span>
                  </div>
                  <button
                    onClick={() => onDismissNotice(notice?.id)}
                    className="text-gray-500 hover:text-gray-700 ml-4"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WordPressAdminHeader;