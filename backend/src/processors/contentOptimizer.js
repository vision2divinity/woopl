const { Configuration, OpenAIApi } = require('openai');
const translate = require('translate-google');
const logger = require('../utils/logger');

class ContentOptimizer {
  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async optimizeProduct(productData) {
    try {
      // Translate if needed
      if (productData.platform === '1688') {
        productData.title = await this.translateText(productData.title, 'zh-cn', 'en');
        productData.description = await this.translateText(productData.description, 'zh-cn', 'en');
      }

      // Optimize title for SEO
      productData.optimizedTitle = await this.optimizeTitle(productData.title);

      // Optimize description for mobile and SEO
      productData.optimizedDescription = await this.optimizeDescription(productData.description);

      // Add Ghana-specific information
      productData.optimizedDescription += this.addLocalInformation();

      return productData;
    } catch (error) {
      logger.error('Content optimization error:', error);
      return productData;
    }
  }

  async optimizeTitle(title) {
    try {
      const prompt = `
        Optimize this product title for SEO and conversions. 
        Make it clear, concise, and keyword-rich.
        Maximum 60 characters.
        Original: ${title}
        
        Optimized title:
      `;

      const response = await this.openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 50,
        temperature: 0.7
      });

      return response.data.choices[0].text.trim();
    } catch (error) {
      logger.error('Title optimization error:', error);
      return this.cleanTitle(title);
    }
  }

  cleanTitle(title) {
    // Basic cleaning if AI optimization fails
    return title
      .replace(/[^\w\s-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 60);
  }

  async optimizeDescription(description) {
    try {
      const prompt = `
        Rewrite this product description for mobile users and SEO.
        Use short paragraphs, bullet points for features, and clear language.
        Make it compelling and conversion-focused.
        
        Original description: ${description.substring(0, 500)}
        
        Optimized description:
      `;

      const response = await this.openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 300,
        temperature: 0.7
      });

      return response.data.choices[0].text.trim();
    } catch (error) {
      logger.error('Description optimization error:', error);
      return this.formatDescription(description);
    }
  }

  formatDescription(description) {
    // Basic formatting if AI optimization fails
    const sentences = description.match(/[^.!?]+[.!?]+/g) || [description];
    const features = sentences.slice(0, 5).map(s => `• ${s.trim()}`).join('\n');
    
    return `
      ${sentences[0]?.trim() || description.substring(0, 100)}
      
      Key Features:
      ${features}
      
      ${sentences.slice(5).join(' ').substring(0, 200)}
    `.trim();
  }

  addLocalInformation() {
    return `

    📍 **Delivery Information for Ghana:**
    • Fast delivery to all regions in Ghana
    • Estimated delivery: 7-14 business days
    • Cash on delivery available in Accra
    • Free shipping on orders above GHS 200
    • All prices include import duties
    
    💯 **Why Buy From Us:**
    • Authentic products guaranteed
    • Local customer support
    • Easy returns within 7 days
    • Secure payment options
    `;
  }

  async translateText(text, from, to) {
    try {
      const result = await translate(text, { from, to });
      return result;
    } catch (error) {
      logger.error('Translation error:', error);
      return text;
    }
  }
}

module.exports = ContentOptimizer;