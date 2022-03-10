import React, { useCallback, useEffect, useState, useContext, createContext } from "react";
import { NextPage } from 'next';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import ConnectEthereumWallet
  from "../components/Protocols/Ethereum/ConnectEthereumWallet";
import { useAppContext } from "../hooks/useAppContext";
import { useAlerts } from "../hooks/useAlerts";
import useEthPrice from "../hooks/useEthPrice";
import {
  ChainId,
  DAppProvider,
  Goerli,
  useContractFunction,
  useEtherBalance,
  useEthers,
} from "@usedapp/core";
import { Contract, utils } from "ethers";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import CheckboxInput from "../components/UI/Form/CheckboxInput";
import Card from "../components/UI/Card";
import { formatNumber, formatPrice } from "../config/utils";
import { EthIcon } from "../components/Icons";
import { Slider, Root as SliderRoot, Track as SliderTrack, Thumb as SliderThumb, Range as SliderRange } from "@radix-ui/react-slider";
import RewardForecast from "../components/UI/RewardForecast";
import InfoCard from "../components/UI/InfoCard";
import WarningCard from "../components/UI/WarningCard";

const Playground: NextPage = () => {

  const scope = {
    ConnectEthereumWallet,
    useState,
    useEffect,
    useCallback,
    useAppContext,
    useAlerts,
    useEthPrice,
    useEthers,
    useEtherBalance,
    Contract,
    utils,
    DAppProvider,
    ExternalLinkIcon,
    CheckboxInput,
    Card,
    formatNumber,
    formatPrice,
    useContractFunction,
    ChainId,
    Goerli,
    EthIcon,
    SliderRoot,
    SliderThumb,
    SliderTrack,
    SliderRange,
    RewardForecast,
    InfoCard,
    WarningCard,
    useContext,
    createContext,
  };

  const code = `
  () => {
	  const APY_PERCENT = 5.0;
    const INITIAL_STAKE_AMOUNT = 32;
    const MAXIMUM_STAKE_AMOUNT = 320;
		const dAppConfig = {
      readOnlyChainId: ChainId.Goerli,
      networks: [Goerli],
      readOnlyUrls: {
        [Goerli.chainId]: 'https://goerli.infura.io/v3/b6f4387f4c1a404dabd6b13256981e3b',
      },
      autoConnect: false
    };
		
		const ETH_DEPOSIT_CONTRACT_ABI = '[{"inputs":[{"internalType":"address","name":"deposit_contract_address","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LogDepositLeftover","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes","name":"pubkey","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"withdrawal","type":"bytes"}],"name":"LogDepositSent","type":"event"},{"inputs":[],"name":"kDepositAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"bytes[]","name":"pubkeys","type":"bytes[]"},{"internalType":"bytes[]","name":"withdrawal_credentials","type":"bytes[]"},{"internalType":"bytes[]","name":"signatures","type":"bytes[]"},{"internalType":"bytes32[]","name":"deposit_data_roots","type":"bytes32[]"}],"name":"batchDeposit","outputs":[],"stateMutability":"payable","type":"function","payable":true}]';
    const ETH_DEPOSIT_CONTRACT_ADDRESS = '0x5FaDfdb7eFffd3B4AA03f0F29d9200Cf5F191F31';

    const [stakeAmount, setStakeAmount] = useState(INITIAL_STAKE_AMOUNT);
    const [stakingState, setStakingState] = useState('initial');
    const { context } = useAppContext();
    const { ethValue } = useEthPrice();
    const [isAddressConfirmed, setIsAddressConfirmed] = useState(false);
    const { addAlert } = useAlerts();

    // Wallet interactions
    const { account } = useEthers();
    const etherBalance = useEtherBalance(account);

    const depositInterface = new utils.Interface(ETH_DEPOSIT_CONTRACT_ABI);
    const contract = new Contract(ETH_DEPOSIT_CONTRACT_ADDRESS, depositInterface);
    const { state, send, resetState } = useContractFunction(contract, 'batchDeposit', {
      transactionName: 'Deposit'
    });

    const resetStates = useCallback(() => {
      // Reset staking state
      setStakingState('initial');
      // Reset tx state
      resetState();
    }, [resetState, setStakingState]);

    useEffect(() => {
      // Transaction has been rejected
      if (state.status === 'Exception') {
        resetStates();
      }

      // Transaction has failed
      if (state.status === 'Fail') {
        addAlert({
          type: 'error',
          message: 'The transaction could not be processed by the network, please try again later.'
        });
        resetStates();
      }

      // Transaction is pending signature
      if (state.status === 'PendingSignature') {
        setStakingState('pending_tx_signature');
      }

      // Transaction is mining
      if (state.status === 'Mining') {
        setStakingState('mining_deposit_tx');
      }

      // Transaction is successful
      if (state.status === 'Success') {
        setStakingState('stake_deposited');
      }
    }, [state, addAlert, resetStates]);

    useEffect(() => {
      if (!account) {
        setStakingState('initial');
        return;
      }

      const generateKeys = async (account) => {
        const nbKeys = stakeAmount / 32;
        const generated = [];

        for (let i = 0; i < nbKeys; i += 1) {
          try {
            const key = await generateEthKey(account);
            generated.push(key);
          } catch (e) {
            setStakingState('initial');
            addAlert({
              type: 'error',
              message: 'An error happened while preparing validators. Please try again later.'
            });
            throw new Error('Error generating ETH key');
          }
        }
        return generated;
      }

      const deposit = async (generatedKeys) => {
        try {
          await send(
            generatedKeys
              .map((k) => k.pubkey)
              .reduce((prev, current) => prev.concat(current))
              .map((v) => '0x' + v),
            generatedKeys
              .map((k) => k.withdrawal_credentials)
              .reduce((prev, current) => prev.concat(current))
              .map((v) => '0x' + v),
            generatedKeys
              .map((k) => k.signatures)
              .reduce((prev, current) => prev.concat(current))
              .map((v) => '0x' + v),
            generatedKeys
              .map((k) => k.deposit_data_roots)
              .reduce((prev, current) => prev.concat(current))
              .map((v) => '0x' + v),
            { value: utils.parseEther(stakeAmount.toString()) },
          );
        } catch (e) {
          setStakingState('initial');
          addAlert({
            type: 'error',
            message: 'An error happened while depositing your funds. Please contact us.',
          });
          throw new Error('Error on Ethereum staking transaction');
        }
      };

      if (stakingState === 'generating_keys') {
        generateKeys(account)
          .then((generatedKeys) => {
            setStakingState('pending_tx_signature');
            deposit(generatedKeys);
          })
          .catch((e) => {
            setStakingState('initial');
            addAlert({
              type: 'error',
              message: 'An error happened while preparing validators. Please try again later.'
            });
            throw new Error('Error generating ETH keys');
          });
      }
    }, [stakingState, account, addAlert, stakeAmount, send]);

    // Either connect wallet or start generating keys
    const handleStake = () => {
      if (!account) return;
      setStakingState('generating_keys');
    };

    const handleStakeMore = () => {
      setStakingState('initial');
    };

    // Insufficient balance warning
    const showInsufficientBalanceWarning =
      stakingState === 'initial' &&
      account &&
      etherBalance &&
      stakeAmount > etherBalance.div(10 ** 9).toNumber() / 10 ** 9;

    // Stake button disabled state
    const isStakeDisabled = Boolean(
      stakingState === 'initial' &&
      (stakeAmount === 0 || showInsufficientBalanceWarning || !isAddressConfirmed),
    );

    // Update stake amount handler
    const handleStakeAmountChange = (value) => {
      setStakeAmount(value[0]);
    };

    // Rewards calculation
    const getRewards = () => {
      // Rewards amount
      let token_yearly_rewards_amount = stakeAmount * (APY_PERCENT / 100);
      let token_monthly_rewards_amount = token_yearly_rewards_amount / 12;
      let token_daily_rewards_amount = token_yearly_rewards_amount / 365;

      let fiat_yearly_rewards_amount =
        token_yearly_rewards_amount * ethValue[context.currency.toLowerCase()];
      let fiat_monthly_rewards_amount = fiat_yearly_rewards_amount / 12;
      let fiat_daily_rewards_amount = fiat_yearly_rewards_amount / 365;

      // Rewards formatted
      const token_yearly_rewards = formatNumber(
        token_yearly_rewards_amount,
        4,
      );
      const token_monthly_rewards = formatNumber(
        token_monthly_rewards_amount,
        4,
      );
      const token_daily_rewards = formatNumber(
        token_daily_rewards_amount,
        4,
      );

      const fiat_yearly_rewards = formatPrice(
        fiat_yearly_rewards_amount,
        context.currency,
      );
      const fiat_monthly_rewards = formatPrice(
        fiat_monthly_rewards_amount,
        context.currency,
      );
      const fiat_daily_rewards = formatPrice(
        fiat_daily_rewards_amount,
        context.currency,
      );

      return {
        token_yearly_rewards,
        token_monthly_rewards,
        token_daily_rewards,
        fiat_yearly_rewards,
        fiat_monthly_rewards,
        fiat_daily_rewards
      };
    };

    // APY
    const formatted_apy = APY_PERCENT + '%';

    // Rewards
    const {
      token_daily_rewards,
      token_monthly_rewards,
      token_yearly_rewards,
      fiat_daily_rewards,
      fiat_monthly_rewards,
      fiat_yearly_rewards,
    } = getRewards();
  
    return (
      <DAppProvider config={dAppConfig}>
        <div className="mb-10">
          <ConnectEthereumWallet/>
        </div>
        
        <Card className="flex flex-col">
            <div className="mb-5">
              <EthIcon className="w-[70px] h-[70px] mx-auto"/>
            </div>
            
            <div className="flex justify-between gap-x-4 mb-5">
              <div className="flex flex-col items-start">
                            <span
                              className="inline-block font-light text-gray-500 text-sm leading-snug mb-3">
                                  How many ETH do you want to stake?
                            </span>
                <span className="font-bold text-2xl">{stakeAmount}</span>
              </div>
            
              <div className="flex flex-col items-end flex-shrink-0">
                            <span
                              className="inline-block font-light text-gray-500 text-sm leading-snug mb-3 text-right">
                                  Network APY
                            </span>
                <span className="font-bold text-2xl text-green-500">
                              {formatted_apy}
                            </span>
              </div>
            </div>
            
            <SliderRoot
              className="relative flex items-center select-none touch-none w-full h-[20px] mb-5"
              step={32}
              value={[stakeAmount]}
              onValueChange={handleStakeAmountChange}
              min={0}
              max={MAXIMUM_STAKE_AMOUNT}
            >
              <SliderTrack
                className="h-[14px] relative flex-grow rounded-full bg-gray-300">
                <SliderRange
                  className="absolute bg-primary-light rounded-l-full h-full"/>
              </SliderTrack>
              <SliderThumb
                className="block w-[24px] h-[24px] bg-white rounded-full border-2 border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white"/>
            </SliderRoot>

            
          <div className="mb-5">
            <RewardForecast
              token_name="ETH"
              token_daily_rewards={token_daily_rewards}
              token_monthly_rewards={token_monthly_rewards}
              token_yearly_rewards={token_yearly_rewards}
              fiat_daily_rewards={fiat_daily_rewards}
              fiat_monthly_rewards={fiat_monthly_rewards}
              fiat_yearly_rewards={fiat_yearly_rewards}
            />
          </div>
          
          {stakingState === 'initial' && account && (
            <>
              {showInsufficientBalanceWarning ? (
                <WarningCard className="mb-4">
                  Insufficient funds to stake {stakeAmount} ETH
                </WarningCard>
              ) : (
                <div className="mb-4">
                  <WarningCard className="mb-4 text-center">
                    Please verify your wallet address<br/>
                    <a
                      href={'https://goerli.etherscan.io/address/' + account}
                      className="col-span-2 inline-block hover:underline mt-2"
                      target="_blank"
                      rel="noreferrer"
                    >
                                  <span className="font-bold break-all">
                                    {account}
                                    <ExternalLinkIcon
                                      className={'inline ml-1 relative bottom-[1px] h-4 w-4 text-orange-700'}
                                      aria-hidden="true"
                                    />
                                  </span>
                    </a>
                  </WarningCard>
                  <CheckboxInput
                    name="address_confirmation"
                    label="I understand that this address will be the only one able to withdraw my staking rewards, I should not lose access to it."
                    checked={isAddressConfirmed}
                    onChange={() => setIsAddressConfirmed(!isAddressConfirmed)}
                  />
                </div>
              )}
          
              <Button
                className="w-full"
                onClick={handleStake}
                disabled={isStakeDisabled}
              >
                Stake now
              </Button>
            </>
          )}
          
          {stakingState === 'generating_keys' && (
            <div className="flex item-center gap-x-3 mt-5 justify-center">
              <LoadingIcon/>
              <span className="font-light text-gray-500 text-sm">
                                Preparing validators...
                          </span>
            </div>
          )}
          
          {stakingState === 'pending_tx_signature' && (
            <Modal
              className="!max-w-[700px]"
              isStatic={true}
            >
              <h2 className="text-center font-medium mb-4">
                Verify staking information
              </h2>
              <p className="text-sm text-center font-light mb-6">
                Is this information is correct, you can approve the transaction
                of {stakeAmount} ETH on your wallet.
              </p>
              <WarningCard showIcon={false} className="mb-6">
                <div className="grid grid-cols-3 gap-4">
                              <span
                                className="col-span-1">Contract address<br/>(receiver):</span>
                  <a
                    href={'https://goerli.etherscan.io/address/' + ETH_DEPOSIT_CONTRACT_ADDRESS}
                    className="col-span-2 flex items-center gap-x-1 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                                <span className="font-bold break-all">
                                  {ETH_DEPOSIT_CONTRACT_ADDRESS}
                                </span>
                    <ExternalLinkIcon
                      className={'flex-shrink-0 h-4 w-4 text-orange-700'}
                      aria-hidden="true"
                    />
                  </a>
          
                  <span className="col-span-1">Amount:</span>
                  <span
                    className="col-span-2 font-bold break-all">{stakeAmount} ETH</span>
          
                  <span className="col-span-1">Withdrawal address:</span>
                  <a
                    href={'https://goerli.etherscan.io/address/' + account}
                    className="col-span-2 flex items-center gap-x-1 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                                <span className="font-bold break-all">
                                  {account}
                                </span>
                    <ExternalLinkIcon
                      className="flex-shrink-0 h-4 w-4 text-orange-700"
                      aria-hidden="true"
                    />
                  </a>
          
                  <span className="col-span-1">Network:</span>
                  <span className="col-span-2 font-bold break-all">
                                Goerli
                              </span>
                </div>
              </WarningCard>
          
              <div className="flex items-center justify-center gap-x-6">
                <Link as="button"
                      onClick={() => setStakingState('initial')}>Cancel</Link>
                <div className="flex item-center gap-x-3 justify-center">
                  <LoadingIcon/>
                  <span className="font-light text-gray-500 text-sm">
                                    Waiting for deposit transaction signature...
                              </span>
                </div>
              </div>
            </Modal>
          )}
          
          {stakingState === 'mining_deposit_tx' && (
            <div className="flex item-center gap-x-3 justify-center">
              <LoadingIcon/>
              <span className="font-light text-gray-500 text-sm">
                                    Waiting for your transaction to be processed...
                          </span>
            </div>
          )}
          
          {stakingState === 'stake_deposited' && (
            <>
              <div className="mb-6 w-[100px] mx-auto">
                <SuccessIcon className="w-full text-green-500"/>
              </div>
          
              <SuccessCard className="mb-6">
                Congrats! You have successfully
                staked {stakeAmount} ETH!
              </SuccessCard>
          
              <div className="grid grid-cols-2 desktop:grid-cols-1 gap-4">
                <Button
                  variant="secondary"
                  onClick={handleStakeMore}
                >
                  Stake more
                </Button>
          
                <Button className="" href="/rewards">
                  Check my rewards
                </Button>
              </div>
            </>
          )}
          
          {!account && (
            <InfoCard>
              Please connect an Ethereum Goerli wallet
            </InfoCard>
          )}
        </Card>
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
