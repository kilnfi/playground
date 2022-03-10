import React from 'react';

type Props = {
  color: 'green' | 'red' | 'orange' | 'gray',
  children: any,
  className?: string,
  title?: string,
}

const Badge = ({ children, color, className = '', title = '' }: Props) => {
  const colorClasses = color === 'red' ? 'bg-red-100 text-red-800'
    : color === 'green' ? 'bg-green-100 text-green-800'
      : color === 'orange' ? 'bg-orange-100 text-orange-800'
        : color === 'gray' ? 'bg-gray-100 text-gray-800' : '';

  return (
    <span
      className={`px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses} ${className}`}
      title={title}
    >
      {children}
    </span>
  );
};

export default Badge;