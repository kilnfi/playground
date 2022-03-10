import React from 'react';

type Props = {
  children: any,
};

const EmptyCard = ({ children }: Props) => {
  return (
    <div
      className="relative block w-full border-2 border-gray-400 border-dashed rounded-lg p-12 text-center"
    >
      {children}
    </div>
  );
};

export default EmptyCard;