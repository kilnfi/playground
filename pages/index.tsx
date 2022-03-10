import React, {
  useState,
  useMemo,
  FormEvent,
  SyntheticEvent,
  ChangeEvent,
} from "react";
import { NextPage } from 'next';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import ConnectEthereumWallet
  from "../components/Protocols/Ethereum/ConnectEthereumWallet";
import { ChainId, DAppProvider, Goerli } from "@usedapp/core";
import EthereumStakingWidget
  from "../components/Protocols/Ethereum/EthereumStakingWidget";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import ConnectSolanaWallet
  from "../components/Protocols/Solana/ConnectSolanaWallet";
import SolanaStakingWidget
  from "../components/Protocols/Solana/SolanaStakingWidget";

const Playground: NextPage = () => {
  const [selectedProtocol, setSelectedProtocol] = useState<'ethereum' | 'solana'>('ethereum');

  const handleChangeProtocol = (e: any) => {
    setSelectedProtocol(e.target.value);
  };

  const ethScope = {
    ConnectEthereumWallet,
    DAppProvider,
    EthereumStakingWidget,
    ChainId,
    Goerli,
  };
  const ethCode = `
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
        <EthereumStakingWidget/>
      </DAppProvider>
    )
  }
`;

  const solScope = {
    PhantomWalletAdapter,
    LedgerWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletWalletAdapter,
    SolletExtensionWalletAdapter,
    useMemo,
    ConnectionProvider,
    WalletProvider,
    WalletAdapterNetwork,
    clusterApiUrl,
    ConnectSolanaWallet,
    SolanaStakingWidget,
  };
  const solCode = `
  () => {
	  const network = WalletAdapterNetwork.Testnet;

    const wallets = useMemo(
      () => [
        new PhantomWalletAdapter(),
        new LedgerWalletAdapter(),
        new SlopeWalletAdapter(),
        new SolflareWalletAdapter(),
        new SolletWalletAdapter({ network }),
        new SolletExtensionWalletAdapter({ network })
      ],
      [network],
    );
  
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
	
    return (
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <div className="flex items-center justify-between flex-wrap gap-x-4 mb-10">
            <h1>Stake SOL</h1>
            <ConnectSolanaWallet/>
          </div>
          <SolanaStakingWidget/>
        </WalletProvider>
      </ConnectionProvider>
    )
  }
`;

  const scope = selectedProtocol === 'ethereum' ? ethScope : solScope;
  const code = selectedProtocol === 'ethereum' ? ethCode : solCode;

  return (
    <>
      <div className="bg-gray-100 p-10 min-h-screen">
        <h1 className="mb-4">SkillZ playground</h1>
        <p className="mb-10">Here you can play with our staking widget
          components on different protocols.</p>

        <div className="mb-10">
          <label htmlFor="protocol" className="block text-sm font-medium text-gray-700">
            Select protocol
          </label>
          <select
            id="protocol"
            name="protocol"
            className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            defaultValue="ethereum"
            onChange={handleChangeProtocol}
          >
            <option value="ethereum">Ethereum</option>
            <option value="solana">Solana</option>
          </select>
        </div>

        <LiveProvider code={code} scope={scope}>
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
