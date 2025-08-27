import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import QueueFilters from './components/QueueFilters';
import ProductQueueTable from './components/ProductQueueTable';
import SchedulerPanel from './components/SchedulerPanel';
import BulkActionDialog from './components/BulkActionDialog';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ImportQueueApproval = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filters, setFilters] = useState({
    platform: 'all',
    status: 'all',
    category: 'all',
    priceMin: '',
    priceMax: '',
    sortBy: 'newest'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [bulkActionDialog, setBulkActionDialog] = useState({ isOpen: false, action: null });
  const [isSchedulerActive, setIsSchedulerActive] = useState(true);
  const [nextImportTime, setNextImportTime] = useState(new Date(Date.now() + 6 * 60 * 60 * 1000)); // 6 hours from now

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones with Noise Cancellation",
      sku: "WBH-NC-001",
      platform: "aliexpress",
      originalPrice: "$29.99",
      originalCurrency: "USD",
      ghsPrice: "485.50",
      category: "Electronics",
      status: "pending",
      thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400"
      ],
      seoTitle: "Premium Wireless Bluetooth Headphones - Noise Cancelling Audio Experience",
      description: `Experience superior sound quality with these premium wireless Bluetooth headphones featuring advanced noise cancellation technology.\n\nKey Features:\n• Active noise cancellation for immersive listening\n• 30-hour battery life with quick charge\n• Premium comfort with adjustable headband\n• Crystal clear calls with built-in microphone\n• Compatible with all Bluetooth devices`,
      variants: ["Black", "White", "Blue", "Red"],
      addedDate: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 2,
      name: "Smart Fitness Tracker with Heart Rate Monitor",
      sku: "SFT-HRM-002",
      platform: "alibaba",
      originalPrice: "¥168.00",
      originalCurrency: "CNY",
      ghsPrice: "420.80",
      category: "Electronics",
      status: "approved",
      thumbnail: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400",
      images: [
        "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400",
        "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400",
        "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400"
      ],
      seoTitle: "Advanced Smart Fitness Tracker - Heart Rate & Activity Monitor",
      description: `Track your fitness journey with this advanced smart fitness tracker featuring comprehensive health monitoring.\n\nFeatures:\n• 24/7 heart rate monitoring\n• Sleep quality analysis\n• 50+ workout modes\n• 7-day battery life\n• Water resistant IP68`,
      variants: ["Black", "Pink", "Blue"],
      addedDate: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    {
      id: 3,
      name: "Portable LED Desk Lamp with USB Charging",
      sku: "PLD-USB-003",
      platform: "1688",
      originalPrice: "¥89.00",
      originalCurrency: "CNY",
      ghsPrice: "223.20",
      category: "Home & Garden",
      status: "rejected",
      rejectionReason: "Poor image quality and incomplete product specifications",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      images: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400"
      ],
      seoTitle: "Modern Portable LED Desk Lamp - USB Charging & Touch Control",
      description: `Illuminate your workspace with this sleek portable LED desk lamp featuring modern touch controls and USB charging capability.\n\nSpecifications:\n• Adjustable brightness levels\n• Touch-sensitive controls\n• USB charging port\n• Foldable design for portability\n• Eye-care LED technology`,
      variants: ["White", "Black", "Silver"],
      addedDate: new Date(Date.now() - 6 * 60 * 60 * 1000)
    },
    {
      id: 4,
      name: "Waterproof Bluetooth Speaker with RGB Lights",
      sku: "WBS-RGB-004",
      platform: "aliexpress",
      originalPrice: "$24.99",
      originalCurrency: "USD",
      ghsPrice: "404.50",
      category: "Electronics",
      status: "pending",
      thumbnail: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
      images: [
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
        "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400",
        "https://images.unsplash.com/photo-1563330232-57114bb0823c?w=400"
      ],
      seoTitle: "Waterproof Bluetooth Speaker - RGB Light Show & Premium Sound",
      description: `Enjoy music anywhere with this waterproof Bluetooth speaker featuring stunning RGB light effects and powerful sound.\n\nHighlights:\n• IPX7 waterproof rating\n• 360° RGB light show\n• 12-hour playtime\n• Deep bass technology\n• Hands-free calling`,
      variants: ["Black", "Blue", "Red"],
      addedDate: new Date(Date.now() - 8 * 60 * 60 * 1000)
    },
    {
      id: 5,
      name: "Ergonomic Office Chair with Lumbar Support",
      sku: "EOC-LS-005",
      platform: "alibaba",
      originalPrice: "¥580.00",
      originalCurrency: "CNY",
      ghsPrice: "1,454.00",
      category: "Home & Garden",
      status: "approved",
      thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
        "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400",
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400"
      ],
      seoTitle: "Premium Ergonomic Office Chair - Lumbar Support & Comfort Design",
      description: `Enhance your workspace comfort with this premium ergonomic office chair designed for long hours of productivity.\n\nErgonomic Features:\n• Adjustable lumbar support\n• Breathable mesh backrest\n• Height adjustable seat\n• 360° swivel with smooth casters\n• Weight capacity: 150kg`,
      variants: ["Black", "Gray", "White"],
      addedDate: new Date(Date.now() - 12 * 60 * 60 * 1000)
    },
    {
      id: 6,
      name: "Stainless Steel Water Bottle with Temperature Display",
      sku: "SSW-TD-006",
      platform: "1688",
      originalPrice: "¥45.00",
      originalCurrency: "CNY",
      ghsPrice: "112.80",
      category: "Sports & Outdoors",
      status: "pending",
      thumbnail: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
      images: [
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
        "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400"
      ],
      seoTitle: "Smart Stainless Steel Water Bottle - Digital Temperature Display",
      description: `Stay hydrated with this innovative stainless steel water bottle featuring real-time temperature display technology.\n\nSmart Features:\n• Digital temperature display\n• Double-wall insulation\n• 24-hour temperature retention\n• BPA-free materials\n• 500ml capacity`,
      variants: ["Silver", "Black", "Blue", "Pink"],
      addedDate: new Date(Date.now() - 16 * 60 * 60 * 1000)
    }
  ];

  useEffect(() => {
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        product?.sku?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        product?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Apply platform filter
    if (filters?.platform !== 'all') {
      filtered = filtered?.filter(product => product?.platform === filters?.platform);
    }

    // Apply status filter
    if (filters?.status !== 'all') {
      filtered = filtered?.filter(product => product?.status === filters?.status);
    }

    // Apply category filter
    if (filters?.category !== 'all') {
      filtered = filtered?.filter(product => 
        product?.category?.toLowerCase()?.replace(' & ', '-')?.replace(' ', '-') === filters?.category
      );
    }

    // Apply price range filter
    if (filters?.priceMin) {
      filtered = filtered?.filter(product => 
        parseFloat(product?.ghsPrice?.replace(',', '')) >= parseFloat(filters?.priceMin)
      );
    }
    if (filters?.priceMax) {
      filtered = filtered?.filter(product => 
        parseFloat(product?.ghsPrice?.replace(',', '')) <= parseFloat(filters?.priceMax)
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (filters?.sortBy) {
        case 'newest':
          return new Date(b.addedDate) - new Date(a.addedDate);
        case 'oldest':
          return new Date(a.addedDate) - new Date(b.addedDate);
        case 'price-low':
          return parseFloat(a?.ghsPrice?.replace(',', '')) - parseFloat(b?.ghsPrice?.replace(',', ''));
        case 'price-high':
          return parseFloat(b?.ghsPrice?.replace(',', '')) - parseFloat(a?.ghsPrice?.replace(',', ''));
        case 'name-az':
          return a?.name?.localeCompare(b?.name);
        case 'name-za':
          return b?.name?.localeCompare(a?.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, filters]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleProductAction = (productId, action) => {
    setProducts(prevProducts =>
      prevProducts?.map(product => {
        if (product?.id === productId) {
          switch (action) {
            case 'approve':
              return { ...product, status: 'approved' };
            case 'reject':
              return { 
                ...product, 
                status: 'rejected',
                rejectionReason: 'Manual rejection by admin'
              };
            case 'edit':
              // In a real app, this would open an edit modal
              console.log('Edit product:', productId);
              return product;
            case 'duplicate':
              // In a real app, this would create a duplicate
              console.log('Duplicate product:', productId);
              return product;
            case 'delete':
              // This would be handled by filtering out the product
              return product;
            default:
              return product;
          }
        }
        return product;
      })
    );

    // Clear selection if action was performed
    setSelectedItems(prev => prev?.filter(id => id !== productId));
  };

  const handleBulkAction = (action) => {
    setBulkActionDialog({ isOpen: true, action });
  };

  const handleBulkActionConfirm = (data) => {
    const { action, rejectionReason, categoryMapping, priceAdjustment } = data;

    setProducts(prevProducts =>
      prevProducts?.map(product => {
        if (selectedItems?.includes(product?.id)) {
          switch (action) {
            case 'approve':
              return { ...product, status: 'approved' };
            case 'reject':
              return { 
                ...product, 
                status: 'rejected',
                rejectionReason: rejectionReason || 'Bulk rejection'
              };
            case 'category':
              return { ...product, category: categoryMapping };
            case 'price':
              const currentPrice = parseFloat(product?.ghsPrice?.replace(',', ''));
              let newPrice = currentPrice;
              if (priceAdjustment?.type === 'percentage') {
                newPrice = currentPrice * (1 + parseFloat(priceAdjustment?.value) / 100);
              } else {
                newPrice = currentPrice + parseFloat(priceAdjustment?.value);
              }
              return { ...product, ghsPrice: newPrice?.toFixed(2) };
            default:
              return product;
          }
        }
        return product;
      })?.filter(product => action !== 'delete' || !selectedItems?.includes(product?.id))
    );

    setSelectedItems([]);
    setBulkActionDialog({ isOpen: false, action: null });
  };

  const handleExport = () => {
    // In a real app, this would generate and download a CSV/Excel file
    const exportData = filteredProducts?.map(product => ({
      Name: product?.name,
      SKU: product?.sku,
      Platform: product?.platform,
      'Original Price': product?.originalPrice,
      'GHS Price': product?.ghsPrice,
      Category: product?.category,
      Status: product?.status,
      'Added Date': product?.addedDate?.toISOString()
    }));

    console.log('Exporting data:', exportData);
    alert('Export functionality would download CSV file with queue data');
  };

  const handleProductExpand = (productId) => {
    // This could be used to track analytics or perform other actions
    console.log('Product expanded:', productId);
  };

  const handleToggleScheduler = () => {
    setIsSchedulerActive(!isSchedulerActive);
  };

  const approvedCount = products?.filter(p => p?.status === 'approved')?.length;
  const pendingCount = products?.filter(p => p?.status === 'pending')?.length;
  const rejectedCount = products?.filter(p => p?.status === 'rejected')?.length;

  return (
    <>
      <Helmet>
        <title>Import Queue & Approval - WooCommerce Product Importer</title>
        <meta name="description" content="Review and approve products before automated WooCommerce publishing. Manage import queue with bulk operations and scheduling controls." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Import Queue & Approval</h1>
                  <p className="text-muted-foreground mt-2">
                    Review and approve products before automated WooCommerce publishing
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-warning">{pendingCount}</div>
                      <div className="text-muted-foreground">Pending</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">{approvedCount}</div>
                      <div className="text-muted-foreground">Approved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-error">{rejectedCount}</div>
                      <div className="text-muted-foreground">Rejected</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="xl:col-span-3 space-y-6">
                {/* Filters */}
                <QueueFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onSearch={handleSearch}
                  onExport={handleExport}
                  totalItems={filteredProducts?.length}
                />

                {/* Products Table */}
                <ProductQueueTable
                  products={filteredProducts}
                  selectedItems={selectedItems}
                  onSelectionChange={setSelectedItems}
                  onProductAction={handleProductAction}
                  onBulkAction={handleBulkAction}
                  onProductExpand={handleProductExpand}
                />

                {/* Empty State */}
                {filteredProducts?.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                      <Icon name="Package" size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchTerm || filters?.platform !== 'all' || filters?.status !== 'all' ?'Try adjusting your search or filters to find products.' :'No products are currently in the import queue.'}
                    </p>
                    {(searchTerm || filters?.platform !== 'all' || filters?.status !== 'all') && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchTerm('');
                          setFilters({
                            platform: 'all',
                            status: 'all',
                            category: 'all',
                            priceMin: '',
                            priceMax: '',
                            sortBy: 'newest'
                          });
                        }}
                        iconName="X"
                        iconPosition="left"
                      >
                        Clear Filters
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="xl:col-span-1">
                <SchedulerPanel
                  approvedCount={approvedCount}
                  nextImportTime={nextImportTime}
                  isSchedulerActive={isSchedulerActive}
                  onToggleScheduler={handleToggleScheduler}
                />
              </div>
            </div>
          </div>
        </main>

        {/* Bulk Action Dialog */}
        <BulkActionDialog
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

export default ImportQueueApproval;