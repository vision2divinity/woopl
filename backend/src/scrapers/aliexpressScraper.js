const puppeteer = require('puppeteer');
const logger = require('../utils/logger');

class AliExpressScraper {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async initialize() {
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
    await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
  }

  async searchProducts(keyword, options = {}) {
    const {
      minPrice = 0,
      maxPrice = 10000,
      minRating = 4.0,
      minOrders = 100,
      limit = 100
    } = options;

    try {
      const searchUrl = `https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(keyword)}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
      await this.page.goto(searchUrl, { waitUntil: 'networkidle2' });

      // Wait for products to load
      await this.page.waitForSelector('[class*="product-card"]', { timeout: 10000 });

      // Extract product data
      const products = await this.page.evaluate(() => {
        const items = [];
        const productElements = document.querySelectorAll('[class*="product-card"]');

        productElements.forEach((element) => {
          try {
            const title = element.querySelector('[class*="title"]')?.textContent?.trim();
            const price = element.querySelector('[class*="price-current"]')?.textContent?.replace(/[^0-9.]/g, '');
            const image = element.querySelector('img')?.src;
            const rating = element.querySelector('[class*="rating-value"]')?.textContent;
            const orders = element.querySelector('[class*="trade-order"]')?.textContent?.match(/\d+/)?.[0];
            const link = element.querySelector('a')?.href;

            if (title && price && image) {
              items.push({
                title,
                price: parseFloat(price),
                image,
                rating: parseFloat(rating) || 0,
                orders: parseInt(orders) || 0,
                link,
                platform: 'aliexpress'
              });
            }
          } catch (err) {
            console.error('Error parsing product:', err);
          }
        });

        return items;
      });

      // Filter products based on criteria
      const filteredProducts = products.filter(product => 
        product.rating >= minRating && 
        product.orders >= minOrders
      ).slice(0, limit);

      // Get detailed information for each product
      const detailedProducts = [];
      for (const product of filteredProducts.slice(0, 10)) { // Limit to avoid rate limiting
        const details = await this.getProductDetails(product.link);
        detailedProducts.push({ ...product, ...details });
      }

      return detailedProducts;
    } catch (error) {
      logger.error('AliExpress scraping error:', error);
      throw error;
    }
  }

  async getProductDetails(productUrl) {
    try {
      const detailPage = await this.browser.newPage();
      await detailPage.goto(productUrl, { waitUntil: 'networkidle2' });

      const details = await detailPage.evaluate(() => {
        const description = document.querySelector('[class*="product-description"]')?.innerHTML;
        const images = Array.from(document.querySelectorAll('[class*="image-thumb"] img')).map(img => img.src);
        
        // Extract variants
        const variants = [];
        const variantElements = document.querySelectorAll('[class*="sku-property"]');
        variantElements.forEach(variant => {
          const type = variant.querySelector('[class*="property-title"]')?.textContent;
          const options = Array.from(variant.querySelectorAll('[class*="property-item"]')).map(opt => ({
            value: opt.textContent?.trim(),
            image: opt.querySelector('img')?.src
          }));
          variants.push({ type, options });
        });

        // Extract specifications
        const specs = {};
        const specElements = document.querySelectorAll('[class*="product-prop"] li');
        specElements.forEach(spec => {
          const [key, value] = spec.textContent.split(':').map(s => s.trim());
          if (key && value) specs[key] = value;
        });

        return {
          description,
          images,
          variants,
          specifications: specs,
          shipping: document.querySelector('[class*="shipping-info"]')?.textContent
        };
      });

      await detailPage.close();
      return details;
    } catch (error) {
      logger.error('Error getting product details:', error);
      return {};
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

module.exports = AliExpressScraper;