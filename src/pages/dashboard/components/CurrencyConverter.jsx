import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CurrencyConverter = () => {
  const [exchangeRates] = useState({
    USD: 15.85,
    CNY: 2.18,
    EUR: 17.23,
    GBP: 19.45
  });

  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [amount, setAmount] = useState(100);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    const rate = exchangeRates?.[selectedCurrency];
    setConvertedAmount((amount * rate)?.toFixed(2));
  }, [amount, selectedCurrency, exchangeRates]);

  const currencies = [
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="DollarSign" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Currency Converter</h3>
      </div>
      {/* Currency Selection */}
      <div className="mb-4">
        <label className="text-sm font-medium text-foreground mb-2 block">From Currency</label>
        <div className="grid grid-cols-2 gap-2">
          {currencies?.map((currency) => (
            <button
              key={currency?.code}
              onClick={() => setSelectedCurrency(currency?.code)}
              className={`p-3 rounded-lg border text-left transition-colors duration-200 ${
                selectedCurrency === currency?.code
                  ? 'border-primary bg-primary/10 text-primary' :'border-border hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{currency?.flag}</span>
                <div>
                  <p className="text-sm font-medium">{currency?.code}</p>
                  <p className="text-xs text-muted-foreground">{currency?.name}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Amount Input */}
      <div className="mb-4">
        <label className="text-sm font-medium text-foreground mb-2 block">Amount</label>
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e?.target?.value) || 0)}
            className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Enter amount"
          />
          <span className="absolute right-3 top-3 text-sm text-muted-foreground">
            {selectedCurrency}
          </span>
        </div>
      </div>
      {/* Conversion Result */}
      <div className="p-4 bg-muted rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Converts to</p>
            <p className="text-2xl font-bold text-foreground">
              GHS {convertedAmount}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Exchange Rate</p>
            <p className="text-sm font-medium text-foreground">
              1 {selectedCurrency} = GHS {exchangeRates?.[selectedCurrency]}
            </p>
          </div>
        </div>
      </div>
      {/* Quick Conversion Buttons */}
      <div className="mt-4">
        <p className="text-sm font-medium text-foreground mb-2">Quick Convert</p>
        <div className="grid grid-cols-4 gap-2">
          {[10, 50, 100, 500]?.map((quickAmount) => (
            <button
              key={quickAmount}
              onClick={() => setAmount(quickAmount)}
              className="px-3 py-2 text-sm border border-border rounded hover:bg-muted/50 transition-colors duration-200"
            >
              {quickAmount}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;