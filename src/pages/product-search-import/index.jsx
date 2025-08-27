import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SearchFilters from './components/SearchFilters';
import SearchResults from './components/SearchResults';
import ProductPreviewModal from './components/ProductPreviewModal';
import QueueCounter from './components/QueueCounter';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ProductSearchImport = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [queuedProducts, setQueuedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInitiated, setSearchInitiated] = useState(false);

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
    
    // Trigger search when filters change and keyword exists
    if (newFilters?.keyword && newFilters?.keyword?.trim()) {
      setIsLoading(true);
      setSearchInitiated(true);
      
      // Simulate API delay
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } else {
      setSearchInitiated(false);
    }
  }, []);

  const handleToggleFilters = () => {
    setIsFiltersCollapsed(!isFiltersCollapsed);
  };

  const handlePreviewProduct = (product) => {
    setSelectedProduct(product);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToQueue = (product) => {
    if (!queuedProducts?.find(p => p?.id === product?.id)) {
      setQueuedProducts(prev => [...prev, product]);
      
      // Show success notification (you can implement a toast system)
      console.log(`Added "${product?.title}" to import queue`);
    }
  };

  const handleBulkAddToQueue = (products) => {
    const newProducts = products?.filter(
      product => !queuedProducts?.find(p => p?.id === product?.id)
    );
    
    if (newProducts?.length > 0) {
      setQueuedProducts(prev => [...prev, ...newProducts]);
      console.log(`Added ${newProducts?.length} products to import queue`);
    }
  };

  const handleViewQueue = () => {
    navigate('/import-queue-approval');
  };

  const handleStartSearch = () => {
    if (filters?.keyword && filters?.keyword?.trim()) {
      setIsLoading(true);
      setSearchInitiated(true);
      
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 h-screen flex">
        {/* Mobile Filter Overlay */}
        {!isFiltersCollapsed && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
            onClick={handleToggleFilters}
          />
        )}

        {/* Filters Sidebar */}
        <div className={`
          ${isFiltersCollapsed ? 'w-0 lg:w-0' : 'w-full lg:w-1/4'}
          ${isFiltersCollapsed ? 'lg:hidden' : 'lg:block'}
          fixed lg:relative top-16 lg:top-0 left-0 h-full z-40 lg:z-0
          transition-all duration-300 ease-in-out
        `}>
          <SearchFilters
            onFiltersChange={handleFiltersChange}
            isCollapsed={isFiltersCollapsed}
            onToggleCollapse={handleToggleFilters}
          />
        </div>

        {/* Main Content */}
        <div className={`
          flex-1 flex flex-col
          ${isFiltersCollapsed ? 'lg:ml-0' : 'lg:ml-0'}
        `}>
          {/* Search Action Bar - Mobile */}
          <div className="lg:hidden p-4 bg-card border-b border-border">
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleToggleFilters}
                iconName="Filter"
                iconPosition="left"
              >
                Filters
              </Button>
              
              {filters?.keyword && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleStartSearch}
                  iconName="Search"
                  iconPosition="left"
                  loading={isLoading}
                >
                  Search
                </Button>
              )}
              
              <div className="flex-1" />
              
              {queuedProducts?.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleViewQueue}
                  iconName="ShoppingCart"
                  iconPosition="left"
                >
                  {queuedProducts?.length}
                </Button>
              )}
            </div>
          </div>

          {/* Welcome State */}
          {!searchInitiated && !isLoading && (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center max-w-2xl">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Search" size={48} className="text-primary" />
                </div>
                
                <h1 className="text-3xl font-bold text-foreground mb-4">
                  Discover Products to Import
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Search across multiple e-commerce platforms to find the perfect products for your WooCommerce store. 
                  Use our advanced filters to narrow down results and add products to your import queue.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-6 bg-card border border-border rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="Globe" size={24} className="text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Multi-Platform Search</h3>
                    <p className="text-sm text-muted-foreground">
                      Search AliExpress, Alibaba, and 1688.com simultaneously
                    </p>
                  </div>

                  <div className="p-6 bg-card border border-border rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="DollarSign" size={24} className="text-green-600" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Real-time Conversion</h3>
                    <p className="text-sm text-muted-foreground">
                      Prices automatically converted to GHS with live rates
                    </p>
                  </div>

                  <div className="p-6 bg-card border border-border rounded-lg">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="Filter" size={24} className="text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Advanced Filters</h3>
                    <p className="text-sm text-muted-foreground">
                      Filter by price, rating, shipping, and more criteria
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={handleToggleFilters}
                    iconName="Search"
                    iconPosition="left"
                  >
                    Start Searching Products
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate('/dashboard')}
                    iconName="BarChart3"
                    iconPosition="left"
                  >
                    View Dashboard
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="mt-12 pt-8 border-t border-border">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary mb-1">1M+</div>
                      <div className="text-sm text-muted-foreground">Products Available</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-success mb-1">98.5%</div>
                      <div className="text-sm text-muted-foreground">Success Rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-warning mb-1">24/7</div>
                      <div className="text-sm text-muted-foreground">Auto Import</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600 mb-1">3</div>
                      <div className="text-sm text-muted-foreground">Platforms</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search Results */}
          {(searchInitiated || isLoading) && (
            <SearchResults
              filters={filters}
              onPreview={handlePreviewProduct}
              onAddToQueue={handleAddToQueue}
              onBulkAdd={handleBulkAddToQueue}
              queuedProducts={queuedProducts}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
      {/* Product Preview Modal */}
      <ProductPreviewModal
        product={selectedProduct}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        onAddToQueue={handleAddToQueue}
        isInQueue={selectedProduct ? queuedProducts?.some(p => p?.id === selectedProduct?.id) : false}
      />
      {/* Queue Counter */}
      <QueueCounter
        queueCount={queuedProducts?.length}
        onViewQueue={handleViewQueue}
        isVisible={queuedProducts?.length > 0}
      />
    </div>
  );
};

export default ProductSearchImport;