import React, { useMemo } from 'react';
import { NextPage } from '../../types/next';
import Card from "../../components/UI/Card";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { env } from "../../config/env";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import SolanaStakingWidget
  from "../../components/Protocols/Solana/SolanaStakingWidget";
import SolanaFaqs from "../../components/Protocols/Solana/SolanaFaqs";
import '@solana/wallet-adapter-react-ui/styles.css';
import ConnectSolanaWallet
  from "../../components/Protocols/Solana/ConnectSolanaWallet";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import SolanaNetworkStats
  from "../../components/Protocols/Solana/SolanaNetworkStats";

const StakeSol: NextPage = () => {
  const network = env.IS_TESTNET ? WalletAdapterNetwork.Testnet : WalletAdapterNetwork.Mainnet;

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new LedgerWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
    ],
    [network],
  );

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <div className="flex items-center justify-between flex-wrap gap-x-4">
          <h1>Stake SOL</h1>
          <ConnectSolanaWallet/>
        </div>

        <div
          className="grid grid-cols-1 desktop:grid-cols-3 gap-y-8 desktop:gap-x-8 mt-20 relative">
          <div className="col-span-2">
            <Card>
              <div className="py-12 px-8">
                <SolanaNetworkStats/>
              </div>
              <div className="py-12 px-8">
                <SolanaFaqs/>
              </div>
            </Card>
          </div>

          <div
            className="col-span-1 order-first desktop:order-last w-full">
            <div className="sticky top-10">
              <SolanaStakingWidget/>
              <p className="mt-4 text-sm font-light text-center">
                Get in touch to integrate this widget into your application!
              </p>
            </div>
          </div>
        </div>
      </WalletProvider>
    </ConnectionProvider>
  );
};

StakeSol.title = 'Stake SOL';
StakeSol.auth = true;
StakeSol.authLayout = true;

export default StakeSol;
