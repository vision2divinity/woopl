import React from 'react';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps?.map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                index < currentStep
                  ? 'bg-success text-success-foreground'
                  : index === currentStep
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {index < currentStep ? '✓' : index + 1}
            </div>
            {index < steps?.length - 1 && (
              <div
                className={`w-12 sm:w-16 h-0.5 mx-2 transition-colors duration-200 ${
                  index < currentStep ? 'bg-success' : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground">{steps?.[currentStep]}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Step {currentStep + 1} of {totalSteps}
        </p>
      </div>
    </div>
  );
};

export default ProgressIndicator;