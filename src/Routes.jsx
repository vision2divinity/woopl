import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Login from './pages/login';
import ProductSearchImport from './pages/product-search-import';
import ProductManagement from './pages/product-management';
import Dashboard from './pages/dashboard';
import ImportQueueApproval from './pages/import-queue-approval';
import Register from './pages/register';
import WordPressPluginSettings from './pages/word-press-plugin-settings';
import WooCommerceProductImportDashboard from './pages/woo-commerce-product-import-dashboard';
import WooCommerceImportQueueManager from './pages/woo-commerce-import-queue-manager';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product-search-import" element={<ProductSearchImport />} />
        <Route path="/product-management" element={<ProductManagement />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/import-queue-approval" element={<ImportQueueApproval />} />
        <Route path="/register" element={<Register />} />
        <Route path="/word-press-plugin-settings" element={<WordPressPluginSettings />} />
        <Route path="/woo-commerce-product-import-dashboard" element={<WooCommerceProductImportDashboard />} />
        <Route path="/woo-commerce-import-queue-manager" element={<WooCommerceImportQueueManager />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;