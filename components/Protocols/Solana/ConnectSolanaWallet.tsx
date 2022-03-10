import React, { Fragment, useMemo, useState } from 'react';
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { useWallet } from "@solana/wallet-adapter-react";
import { env } from "../../../config/env";
import {
  WalletAdapter,
  WalletAdapterNetwork,
  WalletReadyState,
} from "@solana/wallet-adapter-base";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal";
import Image from "next/image";
import '@solana/wallet-adapter-react-ui/styles.css';
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { LedgerIcon } from "../../Icons";

const ConnectSolanaWallet = () => {
  const network = env.IS_TESTNET ? WalletAdapterNetwork.Testnet : WalletAdapterNetwork.Mainnet;
  const { select, publicKey, disconnect } = useWallet();
  const [isAddressCopied, setIsAddressCopied] = useState<boolean>(false);
  const [isSelectWalletModalOpened, setIsSelectWalletModalOpened] = useState<boolean>(false);

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);

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

  const handleConnect = () => {
    setIsSelectWalletModalOpened(true);
  };


  const handleConnectWallet = async (wallet: WalletAdapter) => {
    try {
      // Redirect to wallet install page if not detected
      if (wallet.readyState === WalletReadyState.NotDetected) {
        window.open(wallet.url);
      } else { // Select wallet
        select(wallet.name);
        setIsSelectWalletModalOpened(false);
      }
    } catch (e) {
      throw new Error('Error connecting Solana wallet');
    }

  };

  const handleCopyAddress = async () => {
    if (!base58) return;
    await navigator.clipboard.writeText(base58);
    setIsAddressCopied(true);
    setTimeout(() => setIsAddressCopied(false), 1000);
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (e) {
      throw new Error('Error disconnecting solana wallet');
    }
  };

  return (
    <>
      <div className="flex items-center ml-auto mr-0">
        {!base58 ? (
          <div className="m-auto">
            <Button onClick={handleConnect}>Connect Wallet</Button>
          </div>
        ) : (
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={`inline-flex justify-center items-center gap-4 bg-white p-4 text-sm text-gray-900 font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primary focus:ring-offset-white transition ease-in duration-150 border border-gray-200 ${open ? 'text-opacity-50' : ''}`}>
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                    {env.SOL_NETWORK_NAME}
                  </span>
                  <span
                    className="text-gray-900 font-light text-base"
                    title={base58}
                  >
                    {base58?.substring(0, 16)}...
                  </span>
                  <ChevronDownIcon
                    className="w-5 h-5 ml-2 -mr-1 text-gray-900"
                    aria-hidden="true"
                  />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Popover.Panel
                    className="absolute z-10 right-0 w-56 mt-3 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <button
                        onClick={handleCopyAddress}
                        className={`text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm bg-white hover:bg-gray-100`}
                      >
                        {isAddressCopied ? 'Copied' : 'Copy address'}
                      </button>
                    </div>
                    <div className="px-1 py-1 ">
                      <button
                        onClick={handleConnect}
                        className={`text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm bg-white hover:bg-gray-100`}
                      >
                        Connect a different wallet
                      </button>
                    </div>
                    <div className="px-1 py-1 ">
                      <button
                        onClick={handleDisconnect}
                        className={`text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm bg-white hover:bg-gray-100`}
                      >
                        Disconnect
                      </button>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        )}
      </div>
      <Modal
        isOpen={isSelectWalletModalOpened}
        onClose={() => setIsSelectWalletModalOpened(false)}
        className=""
      >
        <h2 className="mb-10 text-center">Connect a wallet on Solana to
          continue</h2>
        <div className="flex flex-col gap-y-8">
          {wallets.map((wallet, index) => (
            <Button
              key={`solana-wallet-${index}`}
              variant="secondary"
              onClick={() => handleConnectWallet(wallet)}
              className="gap-x-2"
            >
              {wallet.name === 'Ledger' ? (
                <LedgerIcon className="w-5 h-5"/>
              ) : (
                <Image
                  src={wallet.icon}
                  quality={100}
                  alt={`metamask logo`}
                  layout="fixed"
                  width={20}
                  height={20}
                />
              )}
              <span>{wallet.name}</span>
            </Button>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default ConnectSolanaWallet;
