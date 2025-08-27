import React from 'react';

import Button from '../../../components/ui/Button';

const QueueCounter = ({ queueCount, onViewQueue, isVisible }) => {
  if (!isVisible || queueCount === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button
        variant="default"
        size="lg"
        onClick={onViewQueue}
        iconName="ShoppingCart"
        iconPosition="left"
        className="shadow-lg hover:shadow-xl transition-shadow duration-200"
      >
        <span className="flex items-center space-x-2">
          <span>Import Queue</span>
          <div className="bg-white text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
            {queueCount}
          </div>
        </span>
      </Button>
    </div>
  );
};

export default QueueCounter;