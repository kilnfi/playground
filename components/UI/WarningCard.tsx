import React from 'react';
import { ExclamationIcon } from '@heroicons/react/solid';
import { XIcon } from "@heroicons/react/outline";

type Props = {
  children: any,
  className?: string,
  showCloseIcon?: boolean,
  showIcon?: boolean,
}

const WarningCard = ({ children, className = '', showCloseIcon = false, showIcon = true, }: Props) => {
  return (
    <div className={`rounded-md bg-yellow-100 border border-yellow-300 p-4 relative ${className}`}>
      {showCloseIcon && (
        <XIcon className="absolute top-2 right-2 h-4 w-4 text-yellow-700"/>
      )}
      <div className="flex">
        {showIcon && (
          <div className="flex-shrink-0">
            <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          </div>
        )}
        <div className={`${showIcon ? 'ml-3' : ''} ${showCloseIcon ? 'mr-3' : ''}`}>
          <div className="text-sm text-left font-medium text-yellow-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningCard;
