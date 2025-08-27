import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductPreviewModal = ({ product, isOpen, onClose, onAddToQueue, isInQueue }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);

  if (!isOpen || !product) return null;

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
        <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="StarHalf" size={16} className="text-warning fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-muted-foreground" />
      );
    }

    return stars;
  };

  const mockImages = [
    product?.image,
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400"
  ];

  const mockVariants = [
    { id: 1, name: 'Color', options: ['Black', 'White', 'Red', 'Blue'] },
    { id: 2, name: 'Size', options: ['S', 'M', 'L', 'XL', 'XXL'] }
  ];

  const mockSpecs = [
    { label: 'Brand', value: product?.supplier },
    { label: 'Material', value: 'High-quality synthetic' },
    { label: 'Weight', value: '0.5 kg' },
    { label: 'Dimensions', value: '25 x 15 x 10 cm' },
    { label: 'Warranty', value: '1 Year' },
    { label: 'Origin', value: product?.shippingFrom }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Product Preview</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row max-h-[calc(90vh-80px)] overflow-hidden">
          {/* Left Side - Images */}
          <div className="lg:w-1/2 p-6">
            {/* Main Image */}
            <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
              <Image
                src={mockImages?.[selectedImageIndex]}
                alt={product?.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {mockImages?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index
                      ? 'border-primary' :'border-border hover:border-muted-foreground'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="lg:w-1/2 p-6 overflow-y-auto">
            {/* Title and Platform */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {product?.platform}
                </div>
                {product?.isDuplicate && (
                  <div className="px-2 py-1 bg-warning/10 text-warning text-xs rounded-full">
                    Duplicate Detected
                  </div>
                )}
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">{product?.title}</h1>
            </div>

            {/* Price and Rating */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product?.priceGHS)}
                </span>
                {product?.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product?.originalPrice)}
                  </span>
                )}
                {product?.discount && (
                  <div className="px-3 py-1 bg-success text-white text-sm rounded-full">
                    -{product?.discount}% OFF
                  </div>
                )}
              </div>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-1">
                {renderStars(product?.rating)}
                <span className="text-lg font-medium text-foreground ml-2">
                  {product?.rating}
                </span>
              </div>
              <span className="text-muted-foreground">
                {product?.reviewCount} reviews
              </span>
              <span className="text-muted-foreground">
                {product?.orders} orders
              </span>
            </div>

            {/* Variants */}
            {product?.hasVariants && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Variants</h3>
                {mockVariants?.map((variant) => (
                  <div key={variant?.id} className="mb-4">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {variant?.name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {variant?.options?.map((option) => (
                        <button
                          key={option}
                          className="px-3 py-2 border border-border rounded-md text-sm hover:border-primary hover:text-primary transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Shipping Info */}
            <div className="bg-muted rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Shipping Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} className="text-muted-foreground" />
                  <span>From: {product?.shippingFrom}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span>{product?.shippingTime}</span>
                </div>
                {product?.freeShipping && (
                  <div className="flex items-center space-x-2">
                    <Icon name="Truck" size={16} className="text-success" />
                    <span className="text-success">Free Shipping</span>
                  </div>
                )}
                {product?.fastShipping && (
                  <div className="flex items-center space-x-2">
                    <Icon name="Zap" size={16} className="text-primary" />
                    <span className="text-primary">Fast Delivery</span>
                  </div>
                )}
              </div>
            </div>

            {/* Specifications */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Specifications</h3>
              <div className="space-y-2">
                {mockSpecs?.map((spec, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-border last:border-b-0">
                    <span className="text-muted-foreground">{spec?.label}</span>
                    <span className="text-foreground font-medium">{spec?.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Description</h3>
              <div className="text-muted-foreground text-sm leading-relaxed">
                <p className="mb-3">
                  High-quality product with excellent craftsmanship and attention to detail. 
                  Perfect for everyday use with durable materials and modern design.
                </p>
                <p className="mb-3">
                  Features include premium construction, comfortable fit, and versatile styling 
                  that works for various occasions. Backed by manufacturer warranty and 
                  excellent customer support.
                </p>
                <p>
                  Suitable for all ages and comes with detailed instructions for optimal use. 
                  Easy to maintain and clean with standard care procedures.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4 border-t border-border">
              <Button
                variant={isInQueue ? "success" : "default"}
                size="lg"
                onClick={() => onAddToQueue(product)}
                iconName={isInQueue ? "Check" : "Plus"}
                iconPosition="left"
                disabled={isInQueue}
                className="flex-1"
              >
                {isInQueue ? 'Added to Queue' : 'Add to Import Queue'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreviewModal;