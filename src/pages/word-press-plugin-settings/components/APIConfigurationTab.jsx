import React, { useState } from 'react';
import { Eye, EyeOff, TestTube, CheckCircle, XCircle, Key } from 'lucide-react';

const APIConfigurationTab = () => {
  const [showKeys, setShowKeys] = useState({});
  const [testingConnection, setTestingConnection] = useState({});
  const [connectionStatus, setConnectionStatus] = useState({});

  const [apiCredentials, setApiCredentials] = useState({
    woocommerce: {
      consumer_key: 'ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      consumer_secret: 'cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      store_url: 'https://yourstore.com'
    },
    aliexpress: {
      app_key: 'xxxxxxxxxxxxxxxxx',
      app_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      access_token: ''
    },
    alibaba: {
      api_key: 'xxxxxxxxxxxxxxxxx',
      secret_key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    }
  });

  const toggleShowKey = (service, field) => {
    setShowKeys(prev => ({
      ...prev,
      [`${service}_${field}`]: !prev?.[`${service}_${field}`]
    }));
  };

  const testConnection = async (service) => {
    setTestingConnection(prev => ({ ...prev, [service]: true }));
    
    try {
      // Simulate API connection test
      await new Promise(resolve => setTimeout(resolve, 2000));
      const success = Math.random() > 0.3; // 70% success rate for demo
      
      setConnectionStatus(prev => ({
        ...prev,
        [service]: success ? 'success' : 'error'
      }));
    } catch (error) {
      setConnectionStatus(prev => ({ ...prev, [service]: 'error' }));
    } finally {
      setTestingConnection(prev => ({ ...prev, [service]: false }));
    }
  };

  const handleCredentialChange = (service, field, value) => {
    setApiCredentials(prev => ({
      ...prev,
      [service]: {
        ...prev?.[service],
        [field]: value
      }
    }));
  };

  const renderCredentialField = (service, field, label, type = 'text', placeholder = '') => {
    const isSecret = type === 'password' || field?.includes('secret') || field?.includes('key');
    const fieldKey = `${service}_${field}`;
    const shouldShow = showKeys?.[fieldKey];
    
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div className="relative">
          <input
            type={isSecret && !shouldShow ? 'password' : 'text'}
            value={apiCredentials?.[service]?.[field] || ''}
            onChange={(e) => handleCredentialChange(service, field, e?.target?.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {isSecret && (
            <button
              type="button"
              onClick={() => toggleShowKey(service, field)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {shouldShow ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderConnectionStatus = (service) => {
    const status = connectionStatus?.[service];
    const testing = testingConnection?.[service];
    
    if (testing) {
      return (
        <div className="flex items-center text-blue-600">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
          <span className="text-sm">Testing connection...</span>
        </div>
      );
    }
    
    if (status === 'success') {
      return (
        <div className="flex items-center text-green-600">
          <CheckCircle className="w-4 h-4 mr-2" />
          <span className="text-sm">Connection successful</span>
        </div>
      );
    }
    
    if (status === 'error') {
      return (
        <div className="flex items-center text-red-600">
          <XCircle className="w-4 h-4 mr-2" />
          <span className="text-sm">Connection failed</span>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="space-y-8">
      {/* WooCommerce API Configuration */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Key className="w-5 h-5 mr-2 text-blue-600" />
              WooCommerce REST API
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Configure your WooCommerce store connection for product management.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {renderConnectionStatus('woocommerce')}
            <button
              onClick={() => testConnection('woocommerce')}
              disabled={testingConnection?.woocommerce}
              className="inline-flex items-center px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 disabled:opacity-50"
            >
              <TestTube className="w-4 h-4 mr-1.5" />
              Test Connection
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {renderCredentialField('woocommerce', 'store_url', 'Store URL', 'url', 'https://yourstore.com')}
            {renderCredentialField('woocommerce', 'consumer_key', 'Consumer Key', 'password', 'ck_...')}
          </div>
          <div>
            {renderCredentialField('woocommerce', 'consumer_secret', 'Consumer Secret', 'password', 'cs_...')}
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Generate API keys in WooCommerce → Settings → Advanced → REST API
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AliExpress API Configuration */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Key className="w-5 h-5 mr-2 text-orange-600" />
              AliExpress Dropshipping API
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Connect to AliExpress for product sourcing and dropshipping automation.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {renderConnectionStatus('aliexpress')}
            <button
              onClick={() => testConnection('aliexpress')}
              disabled={testingConnection?.aliexpress}
              className="inline-flex items-center px-3 py-1.5 text-sm bg-orange-50 text-orange-700 rounded hover:bg-orange-100 disabled:opacity-50"
            >
              <TestTube className="w-4 h-4 mr-1.5" />
              Test Connection
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {renderCredentialField('aliexpress', 'app_key', 'App Key', 'password', 'Your AliExpress App Key')}
            {renderCredentialField('aliexpress', 'access_token', 'Access Token', 'password', 'Optional for enhanced features')}
          </div>
          <div>
            {renderCredentialField('aliexpress', 'app_secret', 'App Secret', 'password', 'Your AliExpress App Secret')}
            <div className="mt-4 p-3 bg-orange-50 rounded-md">
              <p className="text-sm text-orange-800">
                <strong>Setup:</strong> Register at AliExpress Open Platform to get API credentials
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alibaba API Configuration */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Key className="w-5 h-5 mr-2 text-yellow-600" />
              Alibaba.com API
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Access wholesale products and supplier information from Alibaba.com.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {renderConnectionStatus('alibaba')}
            <button
              onClick={() => testConnection('alibaba')}
              disabled={testingConnection?.alibaba}
              className="inline-flex items-center px-3 py-1.5 text-sm bg-yellow-50 text-yellow-700 rounded hover:bg-yellow-100 disabled:opacity-50"
            >
              <TestTube className="w-4 h-4 mr-1.5" />
              Test Connection
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {renderCredentialField('alibaba', 'api_key', 'API Key', 'password', 'Your Alibaba API Key')}
          </div>
          <div>
            {renderCredentialField('alibaba', 'secret_key', 'Secret Key', 'password', 'Your Alibaba Secret Key')}
            <div className="mt-4 p-3 bg-yellow-50 rounded-md">
              <p className="text-sm text-yellow-800">
                <strong>Info:</strong> Premium Alibaba membership required for full API access
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIConfigurationTab;