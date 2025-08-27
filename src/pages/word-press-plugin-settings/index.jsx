import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Save, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import APIConfigurationTab from './components/APIConfigurationTab';
import ImportSettingsTab from './components/ImportSettingsTab';
import SystemStatusTab from './components/SystemStatusTab';

const WordPressPluginSettings = () => {
  const [activeTab, setActiveTab] = useState('api-config');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    
    try {
      // Simulate API call to save settings
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSaveStatus('success');
    } catch (error) {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus(null), 5000);
    }
  };

  const tabs = [
    { id: 'api-config', label: 'API Configuration', icon: 'Settings' },
    { id: 'import-settings', label: 'Import Settings', icon: 'Download' },
    { id: 'system-status', label: 'System Status', icon: 'Activity' }
  ];

  return (
    <>
      <Helmet>
        <title>Product Importer Settings - WooCommerce</title>
        <meta name="description" content="Configure API settings, import preferences, and monitor system status for WooCommerce Product Importer." />
      </Helmet>
      
      {/* WordPress Admin Wrapper */}
      <div className="wrap bg-white min-h-screen">
        {/* WordPress Admin Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Product Importer Settings
              </h1>
              <p className="text-gray-600">
                Configure API connections, import rules, and monitor system health for your WooCommerce store.
              </p>
            </div>
            
            {/* WordPress Admin Save Button */}
            <div className="flex items-center space-x-4">
              {saveStatus && (
                <div className={`flex items-center space-x-2 px-3 py-1 rounded ${
                  saveStatus === 'success' ?'bg-green-100 text-green-800' :'bg-red-100 text-red-800'
                }`}>
                  {saveStatus === 'success' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                  <span className="text-sm">
                    {saveStatus === 'success' ? 'Settings saved successfully' : 'Failed to save settings'}
                  </span>
                </div>
              )}
              
              <button
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>

        {/* WordPress Admin Navigation Tabs */}
        <div className="bg-gray-50 px-6 py-0">
          <nav className="flex space-x-8">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab?.id
                    ? 'border-blue-500 text-blue-600' :'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab?.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Tab Content */}
            {activeTab === 'api-config' && <APIConfigurationTab />}
            {activeTab === 'import-settings' && <ImportSettingsTab />}
            {activeTab === 'system-status' && <SystemStatusTab />}
          </div>
        </div>
      </div>
    </>
  );
};

export default WordPressPluginSettings;