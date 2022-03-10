import React from 'react';
import Link from 'next/link';

export function getButtonStyles(variant: variant, size: size) {
  return `inline-flex
            items-center
            justify-center
            focus:outline-none
            focus:ring
            focus:ring-offset-2
            focus:ring-offset-white
            focus:ring-primary
            transition
            duration-150
            ease-in-out
            disabled:opacity-50
            disabled:cursor-not-allowed
            whitespace-no-wrap
            rounded-lg
            no-underline
            ${variant === 'primary' ? 'text-white bg-primary hover:bg-primary-light border-0' : ''}
            ${variant === 'secondary' ? 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 shadow-sm' : ''}
            ${size === 'normal' ? 'h-12 px-5 text-base font-bold' : ''}
            ${size === 'small' ? 'h-8 px-4 text-sm font-medium' : ''}
           `;
}

type variant = 'primary' | 'secondary'
type size = 'normal' | 'small'

type Props = {
  children: any,
  className?: string,
  href?: string,
  type?: 'button' | 'submit' | 'reset' | undefined,
  onClick?: () => void,
  disabled?: boolean,
  download?: boolean | string,
  variant?: variant,
  size?: size,
};

const Button = ({ children, className = '', href, type = 'button', variant = 'primary', size = 'normal', ...props }: Props) => {
  return (
    href ? (
      <Link
        href={href}
      >
        <a
          {...props}
          className={`${getButtonStyles(variant, size)} ${className}`}
        >
          {children}
        </a>
      </Link>
    ) : (
      <button
        {...props}
        type={type}
        className={`${getButtonStyles(variant, size)} ${className}`}
      >
        {children}
      </button>
    )
  );
};

export default Button;
