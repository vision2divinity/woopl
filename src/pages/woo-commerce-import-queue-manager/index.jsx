import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import WordPressAdminHeader from './components/WordPressAdminHeader';
import WPListTable from './components/WPListTable';
import WordPressFilters from './components/WordPressFilters';
import SchedulerMetabox from './components/SchedulerMetabox';
import BulkActionsDialog from './components/BulkActionsDialog';

const WooCommerceImportQueueManager = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [filters, setFilters] = useState({
    platform: 'all',
    status: 'all',
    category: 'all',
    search: '',
    sortBy: 'date_added',
    order: 'desc'
  });
  const [bulkActionDialog, setBulkActionDialog] = useState({ isOpen: false, action: null });
  const [isSchedulerActive, setIsSchedulerActive] = useState(true);
  const [nextImportTime, setNextImportTime] = useState(new Date(Date.now() + 6 * 60 * 60 * 1000));
  const [notices, setNotices] = useState([]);

  // Mock product data with WordPress admin styling in mind
  const mockProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones with Noise Cancellation",
      sku: "WBH-NC-001",
      platform: "aliexpress",
      originalPrice: "$29.99",
      originalCurrency: "USD",
      price: "485.50",
      category: "Electronics",
      status: "pending",
      thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400"
      ],
      seoTitle: "Premium Wireless Bluetooth Headphones - Noise Cancelling Audio Experience",
      description: "Experience superior sound quality with these premium wireless Bluetooth headphones featuring advanced noise cancellation technology.",
      variants: ["Black", "White", "Blue", "Red"],
      dateAdded: new Date(Date.now() - 2 * 60 * 60 * 1000),
      approvalStatus: "pending"
    },
    {
      id: 2,
      name: "Smart Fitness Tracker with Heart Rate Monitor",
      sku: "SFT-HRM-002",
      platform: "alibaba",
      originalPrice: "¥168.00",
      originalCurrency: "CNY",
      price: "420.80",
      category: "Electronics",
      status: "approved",
      thumbnail: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400",
      images: [
        "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400",
        "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400"
      ],
      seoTitle: "Advanced Smart Fitness Tracker - Heart Rate & Activity Monitor",
      description: "Track your fitness journey with this advanced smart fitness tracker featuring comprehensive health monitoring.",
      variants: ["Black", "Pink", "Blue"],
      dateAdded: new Date(Date.now() - 4 * 60 * 60 * 1000),
      approvalStatus: "approved"
    },
    {
      id: 3,
      name: "Portable LED Desk Lamp with USB Charging",
      sku: "PLD-USB-003",
      platform: "1688",
      originalPrice: "¥89.00",
      originalCurrency: "CNY",
      price: "223.20",
      category: "Home & Garden",
      status: "rejected",
      rejectionReason: "Poor image quality and incomplete product specifications",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      images: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
      ],
      seoTitle: "Modern Portable LED Desk Lamp - USB Charging & Touch Control",
      description: "Illuminate your workspace with this sleek portable LED desk lamp featuring modern touch controls.",
      variants: ["White", "Black", "Silver"],
      dateAdded: new Date(Date.now() - 6 * 60 * 60 * 1000),
      approvalStatus: "rejected"
    }
  ];

  useEffect(() => {
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...products];

    if (filters?.search) {
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        product?.sku?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    if (filters?.platform !== 'all') {
      filtered = filtered?.filter(product => product?.platform === filters?.platform);
    }

    if (filters?.status !== 'all') {
      filtered = filtered?.filter(product => product?.status === filters?.status);
    }

    if (filters?.category !== 'all') {
      filtered = filtered?.filter(product => 
        product?.category?.toLowerCase()?.replace(' & ', '-')?.replace(' ', '-') === filters?.category
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue, bValue;
      
      switch (filters?.sortBy) {
        case 'name':
          aValue = a?.name?.toLowerCase();
          bValue = b?.name?.toLowerCase();
          break;
        case 'price':
          aValue = parseFloat(a?.price?.replace(',', ''));
          bValue = parseFloat(b?.price?.replace(',', ''));
          break;
        case 'status':
          aValue = a?.status;
          bValue = b?.status;
          break;
        case 'date_added':
        default:
          aValue = new Date(a?.dateAdded);
          bValue = new Date(b?.dateAdded);
          break;
      }

      if (filters?.order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleBulkAction = (action) => {
    if (selectedItems?.length === 0) {
      addNotice('Please select items to perform bulk actions.', 'error');
      return;
    }
    setBulkActionDialog({ isOpen: true, action });
  };

  const handleBulkActionConfirm = (actionData) => {
    const { action, rejectionReason } = actionData;
    let updatedCount = 0;

    setProducts(prevProducts =>
      prevProducts?.map(product => {
        if (selectedItems?.includes(product?.id)) {
          updatedCount++;
          switch (action) {
            case 'approve':
              return { ...product, status: 'approved', approvalStatus: 'approved' };
            case 'reject':
              return { 
                ...product, 
                status: 'rejected',
                approvalStatus: 'rejected',
                rejectionReason: rejectionReason || 'Bulk rejection'
              };
            default:
              return product;
          }
        }
        return product;
      })?.filter(product => action !== 'delete' || !selectedItems?.includes(product?.id))
    );

    setSelectedItems([]);
    setBulkActionDialog({ isOpen: false, action: null });
    
    const actionLabels = {
      approve: 'approved',
      reject: 'rejected',
      delete: 'deleted'
    };
    
    addNotice(
      `${updatedCount} product${updatedCount > 1 ? 's' : ''} ${actionLabels?.[action] || 'updated'} successfully.`,
      'success'
    );
  };

  const handleProductAction = (productId, action) => {
    setProducts(prevProducts =>
      prevProducts?.map(product => {
        if (product?.id === productId) {
          switch (action) {
            case 'approve':
              addNotice(`Product "${product?.name}" has been approved.`, 'success');
              return { ...product, status: 'approved', approvalStatus: 'approved' };
            case 'reject':
              addNotice(`Product "${product?.name}" has been rejected.`, 'info');
              return { 
                ...product, 
                status: 'rejected',
                approvalStatus: 'rejected',
                rejectionReason: 'Manual rejection by admin'
              };
            default:
              return product;
          }
        }
        return product;
      })
    );
    
    setSelectedItems(prev => prev?.filter(id => id !== productId));
  };

  const addNotice = (message, type = 'info') => {
    const notice = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    
    setNotices(prev => [notice, ...prev?.slice(0, 4)]);
    
    setTimeout(() => {
      setNotices(prev => prev?.filter(n => n?.id !== notice?.id));
    }, 5000);
  };

  const handleExport = () => {
    const exportData = filteredProducts?.map(product => ({
      Name: product?.name,
      SKU: product?.sku,
      Platform: product?.platform,
      'Original Price': product?.originalPrice,
      'Price': product?.price,
      Category: product?.category,
      Status: product?.status,
      'Date Added': product?.dateAdded?.toISOString()
    }));

    // Create CSV content
    const csvContent = [
      Object.keys(exportData?.[0] || {})?.join(','),
      ...exportData?.map(row => Object.values(row)?.join(','))
    ]?.join('\n');

    // Trigger download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `import-queue-${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    window.URL?.revokeObjectURL(url);

    addNotice('Import queue data exported successfully.', 'success');
  };

  // Pagination
  const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);
  const paginatedProducts = filteredProducts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const approvedCount = products?.filter(p => p?.status === 'approved')?.length;
  const pendingCount = products?.filter(p => p?.status === 'pending')?.length;
  const rejectedCount = products?.filter(p => p?.status === 'rejected')?.length;

  return (
    <>
      <Helmet>
        <title>Import Queue Manager - WooCommerce</title>
        <meta name="description" content="WordPress admin interface for managing WooCommerce product import queue with bulk operations and approval workflow." />
      </Helmet>
      
      <div className="wp-admin-wrapper min-h-screen bg-gray-50">
        <WordPressAdminHeader 
          title="Import Queue Manager"
          subtitle="WooCommerce > Import Queue"
          notices={notices}
          onDismissNotice={(noticeId) => 
            setNotices(prev => prev?.filter(n => n?.id !== noticeId))
          }
        />
        
        <div className="wp-content max-w-full mx-auto p-4">
          {/* WordPress Admin Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="wp-metabox bg-white border border-gray-300 rounded-sm p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-amber-600">{pendingCount}</div>
                  <div className="text-sm text-gray-600">Pending Review</div>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-amber-600 text-xl">⏱️</span>
                </div>
              </div>
            </div>
            
            <div className="wp-metabox bg-white border border-gray-300 rounded-sm p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
                  <div className="text-sm text-gray-600">Approved</div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xl">✅</span>
                </div>
              </div>
            </div>
            
            <div className="wp-metabox bg-white border border-gray-300 rounded-sm p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
                  <div className="text-sm text-gray-600">Rejected</div>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-xl">❌</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-3">
              {/* WordPress Admin Filters */}
              <WordPressFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onExport={handleExport}
                totalItems={filteredProducts?.length}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />

              {/* WordPress List Table */}
              <WPListTable
                products={paginatedProducts}
                selectedItems={selectedItems}
                onSelectionChange={setSelectedItems}
                onProductAction={handleProductAction}
                onBulkAction={handleBulkAction}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                totalItems={filteredProducts?.length}
              />
            </div>

            {/* Scheduler Sidebar */}
            <div className="xl:col-span-1">
              <SchedulerMetabox
                approvedCount={approvedCount}
                nextImportTime={nextImportTime}
                isSchedulerActive={isSchedulerActive}
                onToggleScheduler={setIsSchedulerActive}
                onAddNotice={addNotice}
              />
            </div>
          </div>
        </div>

        {/* Bulk Actions Dialog */}
        <BulkActionsDialog
          isOpen={bulkActionDialog?.isOpen}
          action={bulkActionDialog?.action}
          selectedCount={selectedItems?.length}
          onClose={() => setBulkActionDialog({ isOpen: false, action: null })}
          onConfirm={handleBulkActionConfirm}
        />
      </div>
    </>
  );
};

export default WooCommerceImportQueueManager;