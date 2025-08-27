import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import WelcomeHeader from './components/WelcomeHeader';
import LoginForm from './components/LoginForm';
import SecurityBadge from './components/SecurityBadge';
import Image from '../../components/AppImage';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Login - WooCommerce Product Importer</title>
        <meta name="description" content="Sign in to your WooCommerce Product Importer dashboard to manage automated product imports from AliExpress, Alibaba, and 1688." />
        <meta name="keywords" content="woocommerce, product import, login, dashboard, ecommerce" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        </div>

        {/* Desktop Background Image */}
        <div className="hidden lg:block absolute inset-0 opacity-5">
          <Image
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=2000&q=80"
            alt="E-commerce dashboard background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Login Container */}
        <div className="relative w-full max-w-md">
          {/* Main Login Card */}
          <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
            {/* Welcome Header Component */}
            <WelcomeHeader />

            {/* Login Form Component */}
            <LoginForm />

            {/* Security Badge Component */}
            <SecurityBadge />
          </div>

          {/* Mobile-Specific Trust Indicators */}
          <div className="lg:hidden mt-6 text-center">
            <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Trusted</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span>Fast</span>
              </div>
            </div>
          </div>

          {/* Demo Credentials Helper */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border/50">
            <h3 className="text-sm font-medium text-foreground mb-2">Demo Credentials:</h3>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div>Admin: admin@store.com / admin123</div>
              <div>Manager: manager@store.com / manager123</div>
              <div>Owner: owner@store.com / owner123</div>
            </div>
          </div>
        </div>

        {/* Mobile Optimization Notice */}
        <div className="fixed bottom-4 left-4 right-4 lg:hidden">
          <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">
              Optimized for African mobile networks with offline-first design
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;