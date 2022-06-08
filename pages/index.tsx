import { NextPage } from 'next';
import React from 'react';
import { Button } from '@kilnfi/design-system';


const Playground: NextPage = () => {
  return (
    <>
      <div className="bg-gray-100 p-10 min-h-screen">
        <Button>Button</Button>

        <div>
          <p className="bg-red-300 mt-4 inline-block font-mono p-4">
            hello hello
          </p>
        </div>
      </div>
    </>
  );
};

export default Playground;
