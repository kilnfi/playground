import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { XIcon } from "@heroicons/react/outline";

type Props = {
  children: any,
  className?: string,
  showCloseIcon?: boolean,
}

const SuccessCard = ({ children, className = '', showCloseIcon = false }: Props) => {
  return (
    <div className={`rounded-md bg-green-100 border border-green-300 p-4 relative ${className}`}>
      {showCloseIcon && (
        <XIcon className="absolute top-2 right-2 h-4 w-4 text-green-700"/>
      )}
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        <div className={`ml-3 ${showCloseIcon ? 'mr-3' : ''}`}>
          <div className="text-sm text-left font-medium text-green-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessCard;
