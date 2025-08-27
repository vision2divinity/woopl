const WooCommerceAPI = require('woocommerce-api');
const logger = require('../utils/logger');
const { optimizeImage } = require('../utils/imageOptimizer');
const { convertCurrency } = require('../utils/currencyConverter');

class WooCommerceIntegration {
  constructor() {
    this.api = new WooCommerceAPI({
      url: process.env.WOO_SITE_URL,
      consumerKey: process.env.WOO_CONSUMER_KEY,
      consumerSecret: process.env.WOO_CONSUMER_SECRET,
      wpAPI: true,
      version: 'wc/v3'
    });
  }

  async createProduct(productData) {
    try {
      // Convert price to GHS
      const priceInGHS = await convertCurrency(productData.price, 'USD', 'GHS');
      
      // Optimize images
      const optimizedImages = await this.processImages(productData.images);

      // Prepare WooCommerce product data
      const wooProduct = {
        name: productData.optimizedTitle || productData.title,
        type: productData.variants?.length > 0 ? 'variable' : 'simple',
        regular_price: String(Math.ceil(priceInGHS * 1.3)), // Add 30% markup
        sale_price: String(Math.ceil(priceInGHS * 1.15)), // 15% markup for sale
        description: productData.optimizedDescription || productData.description,
        short_description: this.generateShortDescription(productData),
        categories: await this.mapCategories(productData.category),
        images: optimizedImages,
        attributes: this.prepareAttributes(productData.variants),
        status: 'publish',
        catalog_visibility: 'visible',
        stock_management: true,
        stock_quantity: 100,
        stock_status: 'instock',
        meta_data: [
          {
            key: '_source_platform',
            value: productData.platform
          },
          {
            key: '_source_url',
            value: productData.link
          },
          {
            key: '_import_date',
            value: new Date().toISOString()
          }
        ]
      };

      // Create product in WooCommerce
      const response = await this.api.postAsync('products', wooProduct);
      logger.info(`Product created: ${response.body.id}`);

      // If variable product, create variations
      if (productData.variants?.length > 0) {
        await this.createVariations(response.body.id, productData.variants, priceInGHS);
      }

      return response.body;
    } catch (error) {
      logger.error('WooCommerce product creation error:', error);
      throw error;
    }
  }

  async processImages(images) {
    const processedImages = [];
    
    for (const [index, imageUrl] of images.entries()) {
      try {
        // Download and optimize image
        const optimizedImageUrl = await optimizeImage(imageUrl);
        
        processedImages.push({
          src: optimizedImageUrl,
          name: `product-image-${index}`,
          alt: '',
          position: index
        });
      } catch (error) {
        logger.error(`Error processing image: ${imageUrl}`, error);
      }
    }

    return processedImages;
  }

  generateShortDescription(productData) {
    const features = [];
    
    if (productData.rating > 0) {
      features.push(`⭐ ${productData.rating}/5 rating`);
    }
    
    if (productData.orders > 0) {
      features.push(`📦 ${productData.orders}+ orders`);
    }
    
    features.push('🚚 Fast delivery to Ghana');
    features.push('✅ Quality guaranteed');
    features.push('💰 Best price guarantee');
    
    return features.join('\n');
  }

  async mapCategories(categoryString) {
    // Map source categories to WooCommerce categories
    const categoryMap = {
      'electronics': 'Electronics',
      'fashion': 'Fashion',
      'home': 'Home & Garden',
      'toys': 'Toys & Games',
      'sports': 'Sports & Outdoors',
      'beauty': 'Beauty & Health'
    };

    const categories = [];
    const lowerCategory = categoryString?.toLowerCase() || '';
    
    for (const [key, value] of Object.entries(categoryMap)) {
      if (lowerCategory.includes(key)) {
        const category = await this.ensureCategoryExists(value);
        categories.push({ id: category.id });
        break;
      }
    }

    // Default category if no match
    if (categories.length === 0) {
      const defaultCategory = await this.ensureCategoryExists('Uncategorized');
      categories.push({ id: defaultCategory.id });
    }

    return categories;
  }

  async ensureCategoryExists(categoryName) {
    try {
      // Check if category exists
      const response = await this.api.getAsync(`products/categories?search=${categoryName}`);
      
      if (response.body.length > 0) {
        return response.body[0];
      }

      // Create category if it doesn't exist
      const newCategory = await this.api.postAsync('products/categories', {
        name: categoryName
      });

      return newCategory.body;
    } catch (error) {
      logger.error('Category creation error:', error);
      throw error;
    }
  }

  prepareAttributes(variants) {
    if (!variants || variants.length === 0) return [];

    const attributes = [];
    
    variants.forEach((variant, index) => {
      attributes.push({
        id: index + 1,
        name: variant.type,
        position: index,
        visible: true,
        variation: true,
        options: variant.options.map(opt => opt.value)
      });
    });

    return attributes;
  }

  async createVariations(productId, variants, basePrice) {
    // Implementation for creating product variations
    // This would create all combinations of variants with appropriate pricing
  }

  async checkDuplicate(productTitle) {
    try {
      const response = await this.api.getAsync(`products?search=${encodeURIComponent(productTitle)}&per_page=1`);
      return response.body.length > 0;
    } catch (error) {
      logger.error('Duplicate check error:', error);
      return false;
    }
  }
}

module.exports = WooCommerceIntegration;