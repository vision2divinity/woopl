import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BenefitsSidebar = () => {
  const benefits = [
    {
      icon: 'Zap',
      title: 'Automated Importing',
      description: 'Import 100 products daily with zero manual effort'
    },
    {
      icon: 'Globe',
      title: 'Multi-Platform Sourcing',
      description: 'Access AliExpress, Alibaba, and 1688.com in one dashboard'
    },
    {
      icon: 'DollarSign',
      title: 'Real-time Currency Conversion',
      description: 'Automatic conversion to GHS with live exchange rates'
    },
    {
      icon: 'Search',
      title: 'Smart Product Discovery',
      description: 'AI-powered search finds trending products in your niche'
    },
    {
      icon: 'Shield',
      title: 'Quality Assurance',
      description: 'Built-in filters for ratings, reviews, and seller verification'
    },
    {
      icon: 'BarChart3',
      title: 'Performance Analytics',
      description: 'Track import success rates and optimize your strategy'
    }
  ];

  const testimonials = [
    {
      name: 'Kwame Asante',
      business: 'Accra Electronics Store',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      quote: `This platform transformed my business. I went from manually adding 5 products per day to automatically importing 100+ quality products.`
    },
    {
      name: 'Ama Osei',
      business: 'Fashion Forward Ghana',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      quote: `The currency conversion to GHS and automated categorization saved me countless hours. My store now has over 5,000 products!`
    }
  ];

  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8 flex-col justify-between">
      <div>
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Icon name="Package" size={24} color="white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">WooCommerce Importer</h2>
              <p className="text-primary-foreground/80">Automate Your Product Sourcing</p>
            </div>
          </div>
          <p className="text-lg text-primary-foreground/90 leading-relaxed">
            Join thousands of Ghanaian entrepreneurs who have automated their product importing process and scaled their e-commerce businesses.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Why Choose Our Platform?</h3>
          {benefits?.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Icon name={benefit?.icon} size={20} color="white" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">{benefit?.title}</h4>
                <p className="text-primary-foreground/80 text-sm leading-relaxed">
                  {benefit?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Success Stories</h3>
        {testimonials?.map((testimonial, index) => (
          <div key={index} className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Image
                src={testimonial?.image}
                alt={testimonial?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">{testimonial?.name}</h4>
                <p className="text-primary-foreground/80 text-sm">{testimonial?.business}</p>
              </div>
            </div>
            <p className="text-primary-foreground/90 text-sm italic leading-relaxed">
              "{testimonial?.quote}"
            </p>
          </div>
        ))}

        <div className="flex items-center space-x-4 pt-4 border-t border-white/20">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={16} color="white" />
            <span className="text-sm">SSL Secured</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={16} color="white" />
            <span className="text-sm">5,000+ Users</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={16} color="white" />
            <span className="text-sm">4.9/5 Rating</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSidebar;