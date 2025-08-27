import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onPreview, onAddToQueue, isInQueue }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const formatPrice = (price, currency = 'GHS') => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    })?.format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={12} className="text-warning fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="StarHalf" size={12} className="text-warning fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-muted-foreground" />
      );
    }

    return stars;
  };

  const getPlatformIcon = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'aliexpress':
        return 'ShoppingBag';
      case 'alibaba':
        return 'Building2';
      case '1688':
        return 'Store';
      default:
        return 'Globe';
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'aliexpress':
        return 'text-orange-600';
      case 'alibaba':
        return 'text-blue-600';
      case '1688':
        return 'text-purple-600';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product?.image}
          alt={product?.title}
          className="w-full h-full object-cover"
          onLoad={() => setIsImageLoading(false)}
        />
        
        {isImageLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <Icon name="Image" size={32} className="text-muted-foreground" />
          </div>
        )}

        {/* Platform Badge */}
        <div className="absolute top-2 left-2">
          <div className={`flex items-center space-x-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium ${getPlatformColor(product?.platform)}`}>
            <Icon name={getPlatformIcon(product?.platform)} size={12} />
            <span>{product?.platform}</span>
          </div>
        </div>

        {/* Duplicate Warning */}
        {product?.isDuplicate && (
          <div className="absolute top-2 right-2">
            <div className="flex items-center space-x-1 px-2 py-1 bg-warning/90 backdrop-blur-sm rounded-full text-xs font-medium text-white">
              <Icon name="AlertTriangle" size={12} />
              <span>Duplicate</span>
            </div>
          </div>
        )}

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onPreview(product)}
            iconName="Eye"
            iconPosition="left"
          >
            Preview
          </Button>
          <Button
            variant={isInQueue ? "success" : "default"}
            size="sm"
            onClick={() => onAddToQueue(product)}
            iconName={isInQueue ? "Check" : "Plus"}
            iconPosition="left"
            disabled={isInQueue}
          >
            {isInQueue ? 'In Queue' : 'Add'}
          </Button>
        </div>
      </div>
      {/* Product Info */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-medium text-foreground text-sm line-clamp-2 mb-2 leading-tight">
          {product?.title}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary">
              {formatPrice(product?.priceGHS)}
            </span>
            {product?.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product?.originalPrice)}
              </span>
            )}
          </div>
          {product?.discount && (
            <div className="px-2 py-1 bg-success text-white text-xs rounded-full">
              -{product?.discount}%
            </div>
          )}
        </div>

        {/* Rating and Orders */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            {renderStars(product?.rating)}
            <span className="text-xs text-muted-foreground ml-1">
              ({product?.reviewCount})
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {product?.orders} orders
          </span>
        </div>

        {/* Supplier Info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <div className="flex items-center space-x-1">
            <Icon name="Store" size={12} />
            <span className="truncate">{product?.supplier}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={12} />
            <span>{product?.shippingFrom}</span>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            {product?.freeShipping && (
              <span className="px-2 py-1 bg-success/10 text-success rounded-full">
                Free Shipping
              </span>
            )}
            {product?.fastShipping && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
                Fast
              </span>
            )}
          </div>
          <span className="text-muted-foreground">
            {product?.shippingTime}
          </span>
        </div>

        {/* Variants Indicator */}
        {product?.hasVariants && (
          <div className="mt-2 pt-2 border-t border-border">
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Icon name="Palette" size={12} />
              <span>{product?.variantCount} variants available</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;