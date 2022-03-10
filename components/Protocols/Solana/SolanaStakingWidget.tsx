import { ExternalLinkIcon } from '@heroicons/react/outline';
import { WalletSignTransactionError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  Keypair,
  PublicKey,
  StakeProgram,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import React, { useCallback, useEffect, useState } from 'react';
import { env } from '../../../config/env';
import { formatNumber, formatPrice } from '../../../config/utils';
import { useAlerts } from '../../../hooks/useAlerts';
import { useAppContext } from '../../../hooks/useAppContext';
import useSolPrice from '../../../hooks/useSolPrice';
import { LoadingIcon, SolIcon, SuccessIcon } from '../../Icons';
import Button from '../../UI/Button';
import Card from '../../UI/Card';
import InfoCard from '../../UI/InfoCard';
import RewardForecast from '../../UI/RewardForecast';
import SuccessCard from '../../UI/SuccessCard';
import WarningCard from '../../UI/WarningCard';
import InputWithButton from "../../UI/Form/InputWithButton";
import useSolStats from "../../../hooks/useSolStats";

const INITIAL_STAKE_AMOUNT: string = '100';

const SolanaStakingWidget = () => {
  const [stakeAmount, setStakeAmount] = useState<string>(INITIAL_STAKE_AMOUNT);
  const [stakingState, setStakingState] = useState<| 'initial'
    | 'pending_tx_signature'
    | 'processing_deposit_tx'
    | 'stake_deposited'>('initial');
  const [txSignature, setTxSignature] = useState<string>('');
  const [stakedAmount, setStakedAmount] = useState<number>(0);
  const [solBalance, setSolBalance] = useState<number | undefined>(undefined);
  const { addAlert } = useAlerts();
  const { connection } = useConnection();
  const { publicKey, sendTransaction, wallet } = useWallet();
  const { solValue } = useSolPrice();
  const { solana_network_apy } = useSolStats();
  const { context } = useAppContext();

  const formattedApy = solana_network_apy ? formatNumber(solana_network_apy, 2) : 0;

  // Parse stake amount to handle empty string
  const parsedStakeAmount: number = stakeAmount === '' ? 0 : parseFloat(stakeAmount);
  const parsedSolBalance: number = solBalance === undefined ? 0 : solBalance;
  const showSolBalance: boolean = parsedSolBalance > 0;

  // Update stake amount handler
  const handleStakeAmountChange = (value: string) => {
    setStakeAmount(value);
  };

  // Set stake amount to sol balance - 0.05 sol for gas fees
  const handleStakeMax = () => {
    const maxAmount = Math.max(0, parsedSolBalance - 0.05);
    setStakeAmount(maxAmount.toString());
  };

  const fetchBalance = useCallback(async () => {
    if (!connection || !publicKey || !wallet) {
      setSolBalance(0);
    } else {
      const balance = await connection.getBalance(publicKey);
      setSolBalance(balance / 1000000000);
    }
  }, [connection, publicKey, wallet]);

  // Get wallet balance
  useEffect(() => {
    fetchBalance();
  }, [connection, publicKey, wallet, fetchBalance]);

  // Handle stake transaction
  const handleStake = async () => {
    if (!publicKey) {
      return;
    }

    setStakingState('pending_tx_signature');

    try {
      const programId = new PublicKey(
        'Stake11111111111111111111111111111111111111',
      );

      const stakeKey = Keypair.generate();

      const instructions = [
        SystemProgram.createAccount({
          /** The account that will transfer lamports to the created account */
          fromPubkey: publicKey,
          /** Public key of the created account. Must be pre-calculated with PublicKey.createWithSeed() */
          newAccountPubkey: stakeKey.publicKey,
          /** Amount of lamports to transfer to the created account */
          lamports: parsedStakeAmount * 1000000000,
          /** Amount of space in bytes to allocate to the created account */
          space: 200,
          /** Public key of the program to assign as the owner of the created account */
          programId,
        }),
        StakeProgram.initialize({
          stakePubkey: stakeKey.publicKey,
          authorized: {
            /** stake authority */
            staker: publicKey,
            /** withdraw authority */
            withdrawer: publicKey,
          },
          lockup: {
            /** Unix timestamp of lockup expiration */
            unixTimestamp: 0,
            /** Epoch of lockup expiration */
            epoch: 0,
            /** Lockup custodian authority */
            custodian: new PublicKey('11111111111111111111111111111111'),
          },
        }),
        StakeProgram.delegate({
          stakePubkey: stakeKey.publicKey,
          authorizedPubkey: publicKey,
          votePubkey: new PublicKey(env.SOL_VOTE_ACCOUNT_ADDRESS),
        }),
      ];
      try {
        const signature = await sendTransaction(
          new Transaction()
            .add(instructions[0])
            .add(instructions[1])
            .add(instructions[2]),
          connection,
          {
            signers: [stakeKey],
          },
        );
        setStakingState('processing_deposit_tx');
        setTxSignature(signature);

        try {
          await connection.confirmTransaction(signature, 'processed');
          setStakedAmount(parsedStakeAmount);
          setStakingState('stake_deposited');
        } catch (e) {
          setStakingState('initial');
          addAlert({
            type: 'error',
            message:
              'An network error happened while confirming your transaction. Please try again later.',
          });
        }
      } catch (e) {
        if (e instanceof WalletSignTransactionError) {
          // Transaction rejected
          if (e.error.code === 4001) {
            addAlert({
              type: 'warning',
              message: 'The transaction has been rejected.',
            });
          } else {
            // Other errors, eg "blockhash not found" that can happen
            addAlert({
              type: 'warning',
              message:
                'The transaction could not be processed at this time. Please try again later.',
            });
          }
        } else {
          addAlert({
            type: 'warning',
            message: 'The transaction could not be processed at this time. Please try again later.',
          });
        }
        setStakingState('initial');
      }
    } catch (e) {
      setStakingState('initial');
      addAlert({
        type: 'error',
        message:
          "An error happened while generating the staking account's public key. Please try again.",
      });
      throw new Error('Error on Solana staking transaction');
    }
  };

  // Reset state
  const handleStakeMore = async () => {
    await fetchBalance();
    setStakingState('initial');
  };

  // Insufficient balance warning
  const showInsufficientBalanceWarning: boolean =
    stakingState === 'initial' &&
    Boolean(publicKey) &&
    parsedStakeAmount > parsedSolBalance;

  // Stake button disabled state
  const isStakeDisabled: boolean = Boolean(
    stakingState === 'initial' &&
    (parsedStakeAmount === 0 || showInsufficientBalanceWarning),
  );

  // Rewards calculation
  const getRewards = () => {
    // Rewards amount
    let token_yearly_rewards_amount: number =
      parsedStakeAmount * (solana_network_apy / 100);
    let token_monthly_rewards_amount: number = token_yearly_rewards_amount / 12;
    let token_daily_rewards_amount: number = token_yearly_rewards_amount / 365;

    let fiat_yearly_rewards_amount: number =
      token_yearly_rewards_amount * solValue[context.currency.toLowerCase()];
    let fiat_monthly_rewards_amount: number = fiat_yearly_rewards_amount / 12;
    let fiat_daily_rewards_amount: number = fiat_yearly_rewards_amount / 365;

    // Rewards formatted
    const token_yearly_rewards: string = formatNumber(
      token_yearly_rewards_amount,
      4,
    );
    const token_monthly_rewards: string = formatNumber(
      token_monthly_rewards_amount,
      4,
    );
    const token_daily_rewards: string = formatNumber(
      token_daily_rewards_amount,
      4,
    );

    const fiat_yearly_rewards: string = formatPrice(
      fiat_yearly_rewards_amount,
      context.currency,
    );
    const fiat_monthly_rewards: string = formatPrice(
      fiat_monthly_rewards_amount,
      context.currency,
    );
    const fiat_daily_rewards: string = formatPrice(
      fiat_daily_rewards_amount,
      context.currency,
    );

    return {
      token_yearly_rewards,
      token_monthly_rewards,
      token_daily_rewards,
      fiat_yearly_rewards,
      fiat_monthly_rewards,
      fiat_daily_rewards,
    };
  };

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
    <Card className="flex flex-col">
      <div className="mb-5">
        <SolIcon className="w-[70px] h-[70px] mx-auto"/>
      </div>

      <div className="flex justify-between gap-x-4 mb-5">
        <div className="flex flex-col items-start">
          <span
            className="inline-block font-light text-gray-500 text-sm leading-snug mb-3">
            How many SOL do you want to stake?
            {showSolBalance && (
              <>
                <br/> ({parsedSolBalance} SOL available)
              </>
            )}
          </span>
          <InputWithButton
            name="stakeAmount"
            onChange={(e) => handleStakeAmountChange(e.target.value)}
            handleButtonClick={handleStakeMax}
            buttonContent="MAX"
            buttonDisabled={!showSolBalance}
            value={stakeAmount}
          />
        </div>

        <div className="flex flex-col items-end flex-shrink-0">
          <span
            className="inline-block font-light text-gray-500 text-sm leading-snug mb-3 text-right">
            Network APY
          </span>
          <span className="font-bold text-2xl text-green-500">
            {formattedApy}%
          </span>
        </div>
      </div>

      <div className="mb-5">
        <RewardForecast
          token_name="SOL"
          token_daily_rewards={token_daily_rewards}
          token_monthly_rewards={token_monthly_rewards}
          token_yearly_rewards={token_yearly_rewards}
          fiat_daily_rewards={fiat_daily_rewards}
          fiat_monthly_rewards={fiat_monthly_rewards}
          fiat_yearly_rewards={fiat_yearly_rewards}
        />
      </div>

      {stakingState === 'initial' && publicKey && (
        <>
          {showInsufficientBalanceWarning && (
            <WarningCard className="mb-4">
              Insufficient funds to stake {stakeAmount} SOL
            </WarningCard>
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

      {stakingState === 'pending_tx_signature' && (
        <div className="flex item-center gap-x-3 mt-5 justify-center">
          <LoadingIcon/>
          <span className="font-light text-gray-500 text-sm">
            Waiting for transaction signature...
          </span>
        </div>
      )}

      {stakingState === 'processing_deposit_tx' && (
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
            Congrats! You have successfully staked {stakedAmount} SOL!
            <br/>
            <a
              href={`https://solscan.io/tx/${txSignature}${
                env.IS_TESTNET ? '?cluster=testnet' : ''
              }`}
              className="col-span-2 inline-block hover:underline mt-2"
              target="_blank"
              rel="noreferrer"
            >
              <span className="font-bold break-all">
                View transaction
                <ExternalLinkIcon
                  className={`inline ml-1 relative bottom-[1px] h-4 w-4 text-green-700`}
                  aria-hidden="true"
                />
              </span>
            </a>
          </SuccessCard>

          <div className="grid grid-cols-1 gap-4">
            <Button variant="secondary" onClick={handleStakeMore}>
              Stake more
            </Button>
          </div>
        </>
      )}

      {!wallet && (
        <InfoCard>
          Please connect a Solana {env.SOL_NETWORK_NAME} wallet
        </InfoCard>
      )}
    </Card>
  );
};

export default SolanaStakingWidget;
