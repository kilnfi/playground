import React from 'react';
import { default as NextLink } from 'next/link';

type Props = {
  href?: string,
  className?: string,
  children: any,
  as?: 'link' | 'button',
  onClick?: () => void,
};

const Link = ({ href = '', children, className = '', as = 'link', ...props }: Props) => {
  return (
    as === 'link' ? (
      <NextLink
        href={href}
      >
        <a
          {...props}
          className={`text-sm text-gray-500 hover:underline ${className}`}
        >
          {children}
        </a>
      </NextLink>
    ) : (
      <button
        {...props}
        className={`text-gray-500 hover:underline font-medium ${className}`}
      >
        {children}
      </button>
    )
  );
};

export default Link;
