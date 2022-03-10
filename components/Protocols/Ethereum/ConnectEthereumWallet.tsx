import { useEthers } from '@usedapp/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { env } from '../../../config/env';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';
import { useAlerts } from '../../../hooks/useAlerts';
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { MetaMaskIcon, WalletConnectIcon } from "../../Icons";

const ConnectEthereumWallet = () => {
  const WRONG_NETWORK_WARNING: string = `Please connect a wallet on the Ethereum ${env.ETH_NETWORK_NAME} network.`;
  const { account, activate, activateBrowserWallet, deactivate, chainId } =
    useEthers();
  const [isSelectWalletModalOpened, setIsSelectWalletModalOpened] = useState<boolean>(false);
  const [isAddressCopied, setIsAddressCopied] = useState<boolean>(false);
  const { addAlert } = useAlerts();

  const handleConnect = () => {
    setIsSelectWalletModalOpened(true);
  };

  // Use callback to prevent unnecessary rerender
  const resetWallet = useCallback(() => {
    localStorage.removeItem('walletconnect');
    deactivate();
    setIsSelectWalletModalOpened(false);
  }, [deactivate]);

  const handleMetamask = () => {
    setIsSelectWalletModalOpened(false);
    activateBrowserWallet((e: any) => {
      // Metamask error when metamask locked and password is required
      if (e.code === -32002) {
        resetWallet();
        addAlert({
          type: 'warning',
          message: `Please unlock your metamask wallet first.`,
        });
      } else {
        resetWallet();
        addAlert({
          type: 'warning',
          message: WRONG_NETWORK_WARNING,
        });
      }
    });
  };

  const handleWalletConnect = async () => {
    setIsSelectWalletModalOpened(false);
    const walletConnectConnector = new WalletConnectConnector({
      qrcode: true,
      chainId: env.IS_TESTNET ? 5 : 1,
      infuraId: env.INFURA_ID,
      clientMeta: {
        name: 'SkillZ',
        description: 'Stake Ethereum with SkillZ',
        url: env.DASHBOARD_URL,
        icons: [`${env.DASHBOARD_URL}/favicon.ico`],
      },
    });
    try {
      await activate(walletConnectConnector, () => {
        resetWallet();
      });
    } catch (err) {
      resetWallet();
      throw new Error('Error connecting WalletConnect wallet');
    }
  };

  const handleCopyAddress = async () => {
    if (!account) return;
    await navigator.clipboard.writeText(account);
    setIsAddressCopied(true);
    setTimeout(() => setIsAddressCopied(false), 1000);
  };

  const handleDisconnect = async () => {
    resetWallet();
  };


  // Reset wallet when network is changed within wallet
  useEffect(() => {
    const shouldBe = env.IS_TESTNET ? 5 : 1;
    if (chainId !== undefined && chainId !== shouldBe) {
      addAlert({
        type: 'warning',
        message: WRONG_NETWORK_WARNING,
      });
      resetWallet();
    }
  }, [chainId, addAlert, resetWallet, WRONG_NETWORK_WARNING]);

  return (
    <>
      <div className="flex items-center justify-center">
        {!account ? (
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
                    {env.ETH_NETWORK_NAME}
                  </span>
                  <span
                    className="text-gray-900 font-light text-base"
                    title={account}
                  >
                    {account?.substring(0, 16)}...
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
        <h2 className="mb-10 text-center">Connect a wallet on Ethereum to
          continue</h2>
        <div className="flex flex-col gap-y-8">
          <Button
            variant="secondary"
            onClick={handleMetamask}
            className="gap-x-2"
          >
            <MetaMaskIcon className="w-5 h-5"/>
            <span>Metamask</span>
          </Button>
          <Button
            variant="secondary"
            onClick={handleWalletConnect}
            className="gap-x-2"
          >
            <WalletConnectIcon className="w-5 h-5"/>
            <span>WalletConnect</span>
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ConnectEthereumWallet;
