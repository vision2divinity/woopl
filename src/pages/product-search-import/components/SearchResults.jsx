import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import ProductCard from './ProductCard';

const SearchResults = ({ 
  filters, 
  onPreview, 
  onAddToQueue, 
  queuedProducts, 
  isLoading,
  onBulkAdd 
}) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const productsPerPage = 24;

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      title: "Wireless Bluetooth Headphones with Noise Cancellation",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      priceGHS: 125.50,
      originalPrice: 180.00,
      discount: 30,
      rating: 4.5,
      reviewCount: 1247,
      orders: 5420,
      platform: "AliExpress",
      supplier: "TechStore Official",
      shippingFrom: "China",
      shippingTime: "7-15 days",
      freeShipping: true,
      fastShipping: false,
      hasVariants: true,
      variantCount: 8,
      isDuplicate: false
    },
    {
      id: 2,
      title: "Smart Fitness Watch with Heart Rate Monitor",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      priceGHS: 89.99,
      originalPrice: 120.00,
      discount: 25,
      rating: 4.2,
      reviewCount: 892,
      orders: 3210,
      platform: "Alibaba",
      supplier: "FitTech Solutions",
      shippingFrom: "China",
      shippingTime: "10-20 days",
      freeShipping: true,
      fastShipping: true,
      hasVariants: true,
      variantCount: 6,
      isDuplicate: false
    },
    {
      id: 3,
      title: "Premium Leather Wallet with RFID Protection",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      priceGHS: 45.75,
      originalPrice: null,
      discount: null,
      rating: 4.7,
      reviewCount: 654,
      orders: 2180,
      platform: "1688",
      supplier: "Leather Craft Co",
      shippingFrom: "China",
      shippingTime: "12-25 days",
      freeShipping: false,
      fastShipping: false,
      hasVariants: true,
      variantCount: 4,
      isDuplicate: true
    },
    {
      id: 4,
      title: "Portable Phone Stand Adjustable Desktop Holder",
      image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400",
      priceGHS: 15.99,
      originalPrice: 25.00,
      discount: 36,
      rating: 4.1,
      reviewCount: 2341,
      orders: 8750,
      platform: "AliExpress",
      supplier: "Mobile Accessories Hub",
      shippingFrom: "China",
      shippingTime: "5-12 days",
      freeShipping: true,
      fastShipping: true,
      hasVariants: false,
      variantCount: 0,
      isDuplicate: false
    },
    {
      id: 5,
      title: "LED Desk Lamp with USB Charging Port",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      priceGHS: 67.50,
      originalPrice: 85.00,
      discount: 21,
      rating: 4.4,
      reviewCount: 456,
      orders: 1890,
      platform: "Alibaba",
      supplier: "Lighting Solutions Pro",
      shippingFrom: "China",
      shippingTime: "8-18 days",
      freeShipping: true,
      fastShipping: false,
      hasVariants: true,
      variantCount: 3,
      isDuplicate: false
    },
    {
      id: 6,
      title: "Waterproof Bluetooth Speaker with Bass Boost",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
      priceGHS: 78.25,
      originalPrice: 95.00,
      discount: 18,
      rating: 4.3,
      reviewCount: 789,
      orders: 2650,
      platform: "AliExpress",
      supplier: "Audio Tech Store",
      shippingFrom: "China",
      shippingTime: "6-14 days",
      freeShipping: true,
      fastShipping: true,
      hasVariants: true,
      variantCount: 5,
      isDuplicate: false
    }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Best Match' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'orders', label: 'Most Orders' },
    { value: 'newest', label: 'Newest First' }
  ];

  useEffect(() => {
    // Simulate API call with filters
    setProducts(mockProducts);
    setTotalResults(mockProducts?.length);
    setCurrentPage(1);
  }, [filters]);

  const handleSelectProduct = (productId, isSelected) => {
    if (isSelected) {
      setSelectedProducts(prev => [...prev, productId]);
    } else {
      setSelectedProducts(prev => prev?.filter(id => id !== productId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedProducts(products?.map(p => p?.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleBulkAddToQueue = () => {
    const selectedProductData = products?.filter(p => selectedProducts?.includes(p?.id));
    onBulkAdd(selectedProductData);
    setSelectedProducts([]);
  };

  const isProductInQueue = (productId) => {
    return queuedProducts?.some(p => p?.id === productId);
  };

  const sortedProducts = [...products]?.sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return a?.priceGHS - b?.priceGHS;
      case 'price_high':
        return b?.priceGHS - a?.priceGHS;
      case 'rating':
        return b?.rating - a?.rating;
      case 'orders':
        return b?.orders - a?.orders;
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 })?.map((_, index) => (
            <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="aspect-square bg-muted animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted animate-pulse rounded" />
                <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                <div className="h-6 bg-muted animate-pulse rounded w-1/2" />
                <div className="flex justify-between">
                  <div className="h-4 bg-muted animate-pulse rounded w-1/4" />
                  <div className="h-4 bg-muted animate-pulse rounded w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Results Header */}
      <div className="p-6 border-b border-border bg-card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Results Info */}
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-foreground">
              Search Results
            </h2>
            <span className="text-muted-foreground">
              {totalResults} products found
            </span>
            {filters?.keyword && (
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                "{filters?.keyword}"
              </span>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Bulk Selection */}
            {selectedProducts?.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {selectedProducts?.length} selected
                </span>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleBulkAddToQueue}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add Selected
                </Button>
              </div>
            )}

            {/* Sort Options */}
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              className="w-48"
            />
          </div>
        </div>

        {/* Bulk Actions */}
        {products?.length > 0 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <Checkbox
              label={`Select all (${products?.length} products)`}
              checked={selectedProducts?.length === products?.length}
              onChange={(e) => handleSelectAll(e?.target?.checked)}
            />
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="TrendingUp" size={14} />
                <span>Exchange rate: 1 USD = 12.45 GHS</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Results Grid */}
      <div className="flex-1 p-6 overflow-y-auto">
        {sortedProducts?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Icon name="Search" size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button variant="outline" iconName="RotateCcw" iconPosition="left">
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts?.map((product) => (
                <div key={product?.id} className="relative">
                  {/* Selection Checkbox */}
                  <div className="absolute top-2 right-2 z-10">
                    <Checkbox
                      checked={selectedProducts?.includes(product?.id)}
                      onChange={(e) => handleSelectProduct(product?.id, e?.target?.checked)}
                      className="bg-white/90 backdrop-blur-sm rounded-full p-1"
                    />
                  </div>
                  
                  <ProductCard
                    product={product}
                    onPreview={onPreview}
                    onAddToQueue={onAddToQueue}
                    isInQueue={isProductInQueue(product?.id)}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalResults > productsPerPage && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  iconName="ChevronLeft"
                />
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.ceil(totalResults / productsPerPage) })?.map((_, index) => (
                    <Button
                      key={index}
                      variant={currentPage === index + 1 ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(Math.ceil(totalResults / productsPerPage), prev + 1))}
                  disabled={currentPage === Math.ceil(totalResults / productsPerPage)}
                  iconName="ChevronRight"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;