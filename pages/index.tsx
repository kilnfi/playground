import React from "react";
import { NextPage } from 'next';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import ConnectEthereumWallet
  from "../components/Protocols/Ethereum/ConnectEthereumWallet";
import { ChainId, DAppProvider, Goerli } from "@usedapp/core";
import EthereumStakingWidget
  from "../components/Protocols/Ethereum/EthereumStakingWidget";

const Playground: NextPage = () => {

  const scope = {
    ConnectEthereumWallet,
    DAppProvider,
    EthereumStakingWidget,
    ChainId,
    Goerli,
  };

  const code = `
  () => {
    const dAppConfig = {
      readOnlyChainId: ChainId.Goerli,
      networks: [Goerli],
      readOnlyUrls: {
        [Goerli.chainId]: 'https://goerli.infura.io/v3/b6f4387f4c1a404dabd6b13256981e3b'
      },
      autoConnect: false
    };
		
    return (
      <DAppProvider config={dAppConfig}>
        <div className="flex items-center justify-between flex-wrap gap-x-4 mb-10">
          <h1>Stake ETH</h1>
          <ConnectEthereumWallet/>
        </div>
        
        <div className="mb-10">
          <EthereumStakingWidget/>
        </div>
      </DAppProvider>
    )
  }
`;

  return (
    <>
      <div className="bg-gray-100 p-10 min-h-screen">
        <h1 className="mb-4">SkillZ playground</h1>
        <p className="mb-10">Here you can play with our staking widget
          components.</p>

        <LiveProvider code={code} scope={scope} language="typescript">
          <div className="grid grid-cols-2">
            <div className="border border-gray-800 p-4 bg-white">
              <LiveEditor/>
              <LiveError/>
            </div>
            <div className="border border-gray-800 p-4">
              <LivePreview/>
            </div>
          </div>
        </LiveProvider>
      </div>
    </>
  );
};

export default Playground;
