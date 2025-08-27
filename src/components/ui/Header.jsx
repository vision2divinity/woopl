import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [automationStatus, setAutomationStatus] = useState({
    isRunning: true,
    activeImports: 12,
    queueCount: 45,
    successRate: 94.2
  });
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Monitor automation performance and system overview'
    },
    {
      label: 'Product Search',
      path: '/product-search-import',
      icon: 'Search',
      tooltip: 'Discover and import products from multiple platforms'
    },
    {
      label: 'Import Queue',
      path: '/import-queue-approval',
      icon: 'Clock',
      tooltip: 'Review and approve products before publishing'
    },
    {
      label: 'Product Management',
      path: '/product-management',
      icon: 'Package',
      tooltip: 'Manage imported products and bulk operations'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleProfileAction = (action) => {
    setIsProfileDropdownOpen(false);
    switch (action) {
      case 'settings': navigate('/settings');
        break;
      case 'help': navigate('/help');
        break;
      case 'logout': navigate('/login');
        break;
      default:
        break;
    }
  };

  const toggleAutomation = () => {
    setAutomationStatus(prev => ({
      ...prev,
      isRunning: !prev?.isRunning
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileDropdownOpen && !event?.target?.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileDropdownOpen]);

  const isActiveRoute = (path) => location?.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-1000">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Package" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">WooCommerce</h1>
              <p className="text-xs text-muted-foreground -mt-1">Product Importer</p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActiveRoute(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={item?.tooltip}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </button>
          ))}
        </nav>

        {/* Status Bar & User Controls */}
        <div className="flex items-center space-x-4">
          {/* Automation Status */}
          <div className="hidden md:flex items-center space-x-3 px-3 py-1.5 bg-muted rounded-lg">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${automationStatus?.isRunning ? 'bg-success' : 'bg-warning'}`} />
              <span className="text-xs font-mono text-muted-foreground">
                {automationStatus?.isRunning ? 'Running' : 'Paused'}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              <span className="font-mono">{automationStatus?.activeImports}</span> active
            </div>
            <div className="text-xs text-muted-foreground">
              <span className="font-mono">{automationStatus?.queueCount}</span> queued
            </div>
            <Button
              variant="ghost"
              size="xs"
              onClick={toggleAutomation}
              iconName={automationStatus?.isRunning ? 'Pause' : 'Play'}
              iconSize={12}
            >
              {automationStatus?.isRunning ? 'Pause' : 'Start'}
            </Button>
          </div>

          {/* Profile Dropdown */}
          <div className="relative profile-dropdown">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-lg z-1200">
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-medium text-foreground">Store Owner</p>
                  <p className="text-xs text-muted-foreground">owner@store.com</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => handleProfileAction('settings')}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={() => handleProfileAction('help')}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </button>
                  <div className="border-t border-border my-1" />
                  <button
                    onClick={() => handleProfileAction('logout')}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-error hover:bg-muted"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors duration-200"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
          </button>
        </div>
      </div>
      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-1050 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-16 left-0 right-0 bg-card border-b border-border z-1100 lg:hidden animate-slide-in">
            <div className="p-4">
              {/* Mobile Automation Status */}
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg mb-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${automationStatus?.isRunning ? 'bg-success' : 'bg-warning'}`} />
                  <span className="text-sm font-medium">
                    Automation {automationStatus?.isRunning ? 'Running' : 'Paused'}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleAutomation}
                  iconName={automationStatus?.isRunning ? 'Pause' : 'Play'}
                  iconSize={14}
                >
                  {automationStatus?.isRunning ? 'Pause' : 'Start'}
                </Button>
              </div>

              {/* Mobile Navigation Items */}
              <nav className="space-y-2">
                {navigationItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`flex items-center space-x-3 w-full px-3 py-3 rounded-md text-left transition-colors duration-200 ${
                      isActiveRoute(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <div>
                      <div className="font-medium">{item?.label}</div>
                      <div className="text-xs opacity-75">{item?.tooltip}</div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;