import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import StatsCards from './components/StatsCards';
import FilterPanel from './components/FilterPanel';
import ProductTable from './components/ProductTable';
import BulkActionsBar from './components/BulkActionsBar';
import ProductModal from './components/ProductModal';

import Button from '../../components/ui/Button';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    source: 'all',
    dateRange: 'all',
    search: ''
  });
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones with Noise Cancellation",
      sku: "WBH-NC-001",
      woocommerceId: "10234",
      thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      price: 125.50,
      originalPrice: 150.00,
      category: "Electronics",
      source: "aliexpress",
      status: "published",
      sales: 87,
      importDate: "2025-08-20T10:30:00Z",
      lastSync: "2025-08-27T14:20:00Z"
    },
    {
      id: 2,
      name: "Premium Cotton T-Shirt - Multiple Colors Available",
      sku: "PCT-MC-002",
      woocommerceId: "10235",
      thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      price: 28.75,
      originalPrice: 35.00,
      category: "Clothing",
      source: "alibaba",
      status: "published",
      sales: 156,
      importDate: "2025-08-19T15:45:00Z",
      lastSync: "2025-08-27T13:15:00Z"
    },
    {
      id: 3,
      name: "Smart Home LED Light Bulb with WiFi Control",
      sku: "SHL-WC-003",
      woocommerceId: "10236",
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      price: 42.30,
      originalPrice: 55.00,
      category: "Home & Garden",
      source: "1688",
      status: "draft",
      sales: 23,
      importDate: "2025-08-25T09:20:00Z",
      lastSync: "2025-08-27T12:30:00Z"
    },
    {
      id: 4,
      name: "Stainless Steel Water Bottle - 750ml",
      sku: "SSW-750-004",
      woocommerceId: "10237",
      thumbnail: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
      price: 18.90,
      originalPrice: 25.00,
      category: "Sports",
      source: "aliexpress",
      status: "published",
      sales: 234,
      importDate: "2025-08-18T11:15:00Z",
      lastSync: "2025-08-27T15:45:00Z"
    },
    {
      id: 5,
      name: "Portable Phone Charger Power Bank 10000mAh",
      sku: "PPC-10K-005",
      woocommerceId: "10238",
      thumbnail: "https://images.unsplash.com/photo-1609592806596-b43bada2e8e4?w=400&h=400&fit=crop",
      price: 35.60,
      originalPrice: 45.00,
      category: "Electronics",
      source: "alibaba",
      status: "failed",
      sales: 0,
      importDate: "2025-08-26T16:30:00Z",
      lastSync: "2025-08-27T08:20:00Z"
    },
    {
      id: 6,
      name: "Organic Face Moisturizer with SPF 30",
      sku: "OFM-SPF-006",
      woocommerceId: "10239",
      thumbnail: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
      price: 67.80,
      originalPrice: 85.00,
      category: "Beauty",
      source: "1688",
      status: "syncing",
      sales: 45,
      importDate: "2025-08-24T13:45:00Z",
      lastSync: "2025-08-27T15:30:00Z"
    },
    {
      id: 7,
      name: "Yoga Mat - Non-Slip Exercise Mat 6mm Thick",
      sku: "YM-NS-007",
      woocommerceId: "10240",
      thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
      price: 32.45,
      originalPrice: 40.00,
      category: "Sports",
      source: "aliexpress",
      status: "published",
      sales: 78,
      importDate: "2025-08-22T10:20:00Z",
      lastSync: "2025-08-27T14:10:00Z"
    },
    {
      id: 8,
      name: "Kitchen Knife Set - Professional Chef Knives",
      sku: "KKS-PC-008",
      woocommerceId: "10241",
      thumbnail: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=400&fit=crop",
      price: 89.25,
      originalPrice: 120.00,
      category: "Home & Garden",
      source: "alibaba",
      status: "published",
      sales: 34,
      importDate: "2025-08-21T14:30:00Z",
      lastSync: "2025-08-27T11:45:00Z"
    }
  ];

  // Mock statistics
  const mockStats = {
    totalProducts: 1247,
    productsChange: 8.2,
    publishedProducts: 892,
    publishedChange: 12.5,
    totalSales: 15678,
    salesChange: 15.3,
    totalRevenue: 234567,
    revenueChange: 18.7,
    failedImports: 89,
    failedChange: -5.2,
    syncSuccessRate: 94.2,
    syncRateChange: 2.1
  };

  useEffect(() => {
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  const applyFilters = () => {
    let filtered = [...products];

    // Status filter
    if (filters?.status !== 'all') {
      filtered = filtered?.filter(product => product?.status === filters?.status);
    }

    // Category filter
    if (filters?.category !== 'all') {
      filtered = filtered?.filter(product => 
        product?.category?.toLowerCase()?.includes(filters?.category?.toLowerCase())
      );
    }

    // Source filter
    if (filters?.source !== 'all') {
      filtered = filtered?.filter(product => product?.source === filters?.source);
    }

    // Search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(searchTerm) ||
        product?.sku?.toLowerCase()?.includes(searchTerm) ||
        product?.woocommerceId?.includes(searchTerm)
      );
    }

    // Date range filter
    if (filters?.dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters?.dateRange) {
        case 'today':
          filterDate?.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate?.setDate(now?.getDate() - 7);
          break;
        case 'month':
          filterDate?.setMonth(now?.getMonth() - 1);
          break;
        case 'quarter':
          filterDate?.setMonth(now?.getMonth() - 3);
          break;
        default:
          break;
      }
      
      if (filters?.dateRange !== 'all') {
        filtered = filtered?.filter(product => 
          new Date(product.importDate) >= filterDate
        );
      }
    }

    // Price range filter
    if (filters?.minPrice) {
      filtered = filtered?.filter(product => product?.price >= parseFloat(filters?.minPrice));
    }
    if (filters?.maxPrice) {
      filtered = filtered?.filter(product => product?.price <= parseFloat(filters?.maxPrice));
    }

    // Sales performance filters
    if (filters?.topSellers) {
      filtered = filtered?.filter(product => product?.sales >= 50);
    }
    if (filters?.noSales) {
      filtered = filtered?.filter(product => product?.sales === 0);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'all',
      category: 'all',
      source: 'all',
      dateRange: 'all',
      search: ''
    });
  };

  const handleSelectProduct = (productId, isSelected) => {
    if (isSelected) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts?.filter(id => id !== productId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      const currentPageProducts = getCurrentPageProducts()?.map(p => p?.id);
      const newSelected = [...new Set([...selectedProducts, ...currentPageProducts])];
      setSelectedProducts(newSelected);
    } else {
      const currentPageProducts = getCurrentPageProducts()?.map(p => p?.id);
      setSelectedProducts(selectedProducts?.filter(id => !currentPageProducts?.includes(id)));
    }
  };

  const handleClearSelection = () => {
    setSelectedProducts([]);
  };

  const handleBulkAction = async (actionId) => {
    setIsBulkProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log(`Performing bulk action: ${actionId} on products:`, selectedProducts);
    
    // Handle different bulk actions
    switch (actionId) {
      case 'republish':
        // Update status to syncing, then to published
        break;
      case 'update-prices':
        // Fetch latest prices from source
        break;
      case 'force-sync':
        // Force synchronization with WooCommerce
        break;
      case 'export':
        // Export selected products to CSV
        break;
      case 'delete':
        // Remove products from system
        break;
      default:
        break;
    }
    
    setIsBulkProcessing(false);
    setSelectedProducts([]);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleProductAction = (product, action) => {
    switch (action) {
      case 'menu':
        // Show context menu
        break;
      case 'edit':
        // Navigate to edit page
        break;
      case 'view-woocommerce':
        // Open WooCommerce product page
        window.open(`https://your-store.com/wp-admin/post.php?post=${product?.woocommerceId}&action=edit`, '_blank');
        break;
      default:
        break;
    }
  };

  const handleProductModalAction = (action, data) => {
    switch (action) {
      case 'force-sync':
        console.log('Force sync product:', selectedProduct?.id);
        break;
      case 'edit-product': console.log('Edit product:', selectedProduct?.id);
        break;
      case 'view-woocommerce':
        window.open(`https://your-store.com/wp-admin/post.php?post=${selectedProduct?.woocommerceId}&action=edit`, '_blank');
        break;
      case 'retry-error': console.log('Retry error:', data);
        break;
      default:
        break;
    }
  };

  const handleExportData = () => {
    const csvContent = [
      ['Name', 'SKU', 'WooCommerce ID', 'Price', 'Status', 'Sales', 'Import Date']?.join(','),
      ...filteredProducts?.map(product => [
        `"${product?.name}"`,
        product?.sku,
        product?.woocommerceId,
        product?.price,
        product?.status,
        product?.sales,
        new Date(product.importDate)?.toLocaleDateString('en-GB')
      ]?.join(','))
    ]?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `product-management-${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts?.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Product Management</h1>
              <p className="text-muted-foreground mt-1">
                Manage your imported products and monitor synchronization status
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Button
                variant="outline"
                iconName="Download"
                onClick={handleExportData}
              >
                Export Data
              </Button>
              <Button
                variant="default"
                iconName="RefreshCw"
                onClick={() => window.location?.reload()}
              >
                Refresh All
              </Button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="mb-8">
            <StatsCards stats={mockStats} />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filter Panel */}
            <div className="lg:col-span-1">
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                isExpanded={isFilterExpanded}
                onToggleExpanded={() => setIsFilterExpanded(!isFilterExpanded)}
              />
            </div>

            {/* Product Table */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-lg">
                {/* Table Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border-b border-border">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Products ({filteredProducts?.length})
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Showing {getCurrentPageProducts()?.length} of {filteredProducts?.length} products
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Filter"
                      onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                      className="lg:hidden"
                    >
                      Filters
                    </Button>
                    <select
                      value={itemsPerPage}
                      className="px-3 py-1 text-sm border border-border rounded-md bg-input text-foreground"
                    >
                      <option value={20}>20 per page</option>
                      <option value={50}>50 per page</option>
                      <option value={100}>100 per page</option>
                    </select>
                  </div>
                </div>

                {/* Product Table */}
                <ProductTable
                  products={getCurrentPageProducts()}
                  selectedProducts={selectedProducts}
                  onSelectProduct={handleSelectProduct}
                  onSelectAll={handleSelectAll}
                  onProductAction={handleProductAction}
                  onViewProduct={handleViewProduct}
                />

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between p-4 border-t border-border">
                    <div className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="ChevronLeft"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="ChevronRight"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Bulk Actions Bar */}
      <BulkActionsBar
        selectedCount={selectedProducts?.length}
        onBulkAction={handleBulkAction}
        onClearSelection={handleClearSelection}
        isProcessing={isBulkProcessing}
      />
      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAction={handleProductModalAction}
      />
    </div>
  );
};

export default ProductManagement;