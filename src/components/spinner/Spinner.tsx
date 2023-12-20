import React from 'react';

export const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 border-solid h-8 w-8"></div>
    </div>
  );
};

