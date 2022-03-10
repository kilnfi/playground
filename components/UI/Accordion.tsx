import React, { useState } from 'react';
import { ChevronDownIcon } from "@heroicons/react/outline";

type ItemProps = {
  title: string,
  children: any,
  opened?: boolean,
  className?: string,
}

const Item = ({ title, children, className = '', opened = false }: ItemProps) => {
  const [isOpen, setIsOpen] = useState(opened);

  return (
    <div className={`overflow-hidden relative ${className}`}>
      <button
        className="w-full focus:outline-none focus:ring-0 text-base leading-normal flex items-center relative z-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-left mr-4 w-full font-medium text-gray-900 text-lg`}>{title}</span>
        <div className="ml-auto transition ease-in-out duration-200 origin-center text-gray-400" style={{
          transform: `${isOpen ? 'rotate(180deg)' : 'rotate(0)'}`,
        }}>
          <ChevronDownIcon
            className={`h-6 w-6`}
            aria-hidden="true"
          />
        </div>
      </button>

      <div
        className={`w-full transition-all ease-in-out duration-200 h-auto ${isOpen ? 'opacity-100' : 'max-h-0 opacity-0'}`}>
        <br/>
        {children}
      </div>
    </div>
  );
};

type Props = {
  className?: string,
  children: any,
}

const Accordion = ({ className = '', children }: Props) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

Accordion.Item = Item;

export default Accordion;
