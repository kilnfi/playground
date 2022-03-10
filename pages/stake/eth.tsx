import { DAppProvider } from '@usedapp/core';
import React from 'react';
import ConnectEthereumWallet
  from '../../components/Protocols/Ethereum/ConnectEthereumWallet';
import { dAppConfig } from '../../config/utils';
import { NextPage } from '../../types/next';
import EthereumStakingWidget
  from "../../components/Protocols/Ethereum/EthereumStakingWidget";

const StakeEth: NextPage = () => {
  return (
    <>
      <DAppProvider config={dAppConfig}>
        <div className="mb-10">
          <ConnectEthereumWallet/>
        </div>
        <div className="">
          <EthereumStakingWidget/>
        </div>
      </DAppProvider>
    </>
  );
};

export default StakeEth;
