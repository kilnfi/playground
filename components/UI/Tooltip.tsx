import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

type Props = {
  children: any,
  className?: string,
};

const Trigger = ({ children }: Props) => (
  <TooltipPrimitive.TooltipTrigger asChild>
    {children}
  </TooltipPrimitive.TooltipTrigger>
);

const Content = ({ children, className = '' }: Props) => (
  <TooltipPrimitive.Content sideOffset={5}
    className={`animate-fade-in rounded-md p-4 text-sm bg-white shadow ${className}`}
  >
    {children}
    <TooltipPrimitive.Arrow className="fill-white"/>
  </TooltipPrimitive.Content>
);

const Tooltip = ({ children }: Props) => {
  return (
    <TooltipPrimitive.Root delayDuration={0}>
      {children}
    </TooltipPrimitive.Root>
  );
};

Tooltip.Trigger = Trigger;
Tooltip.Content = Content;

export default Tooltip;