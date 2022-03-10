import React from 'react';
import { XCircleIcon } from '@heroicons/react/solid';
import { XIcon } from "@heroicons/react/outline";

type Props = {
  children: any,
  className?: string,
  showCloseIcon?: boolean,
}

const ErrorCard = ({ children, className = '', showCloseIcon = false }: Props) => {
  return (
    <div className={`rounded-md bg-red-100 border border-red-300 p-4 relative ${className}`}>
      {showCloseIcon && (
        <XIcon className="absolute top-2 right-2 h-4 w-4 text-red-700"/>
      )}
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className={`ml-3 ${showCloseIcon ? 'mr-3' : ''}`}>
          <div className="text-sm text-left font-medium text-red-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorCard;
