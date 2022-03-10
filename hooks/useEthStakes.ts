import useSWR from 'swr';
import { formatNumber, gweiToEth } from "../config/utils";

export type State =
  | 'UPLOADED'
  | 'ETH1_DEPOSITED'
  | 'DEPLOYMENT_REVIEW'
  | 'WAITING_FOR_DEPOSIT'
  | 'PENDING'
  | 'ACTIVE'
  | 'INACTIVE'
  | 'SLASHED'
  | 'TO_BE_DELETED'
  | 'DELETION_REVIEW'
  | 'DELETING'
  | 'DELETED';

type color = 'green' | 'red' | 'orange' | 'gray';

export type EnhancedState = {
  state: State,
  color: color,
  name: string,
  description: string,
}

export const EthValidatorStates: EnhancedState[] = [
  {
    state: 'UPLOADED',
    color: 'orange',
    name: 'Uploaded',
    description: '',
  },
  {
    state: 'ETH1_DEPOSITED',
    color: 'orange',
    name: 'ETH deposited',
    description: 'Your stake has been deposited into the Beacon chain deposit contract.',
  },
  {
    state: 'DEPLOYMENT_REVIEW',
    color: 'orange',
    name: 'Deployment review',
    description: 'Your validator is being reviewed by our team before being deployed to the Beacon chain.',
  },
  {
    state: 'WAITING_FOR_DEPOSIT',
    color: 'orange',
    name: 'Waiting for deposit',
    description: 'Your validator has been deployed. The Beacon chain is waiting for your deposit to be processed.',
  },
  {
    state: 'PENDING',
    color: 'orange',
    name: 'Pending',
    description: 'Your validator is in the Beacon chain activation queue. This process can take up to 48h.',
  },
  {
    state: 'ACTIVE',
    color: 'green',
    name: 'Active',
    description: 'Your validator is online and collecting rewards.',
  },
  {
    state: 'SLASHED',
    color: 'red',
    name: 'Slashed',
    description: 'Your validator has received penalties because it signed wrong attestations or proposed an incorrect block.',
  },
  {
    state: 'INACTIVE',
    color: 'gray',
    name: 'Inactive',
    description: 'Your validator is now inactive because it has missed 2+ attestations in a row.',
  },
  {
    state: 'TO_BE_DELETED',
    color: 'orange',
    name: 'To be deleted',
    description: '',
  },
  {
    state: 'DELETION_REVIEW',
    color: 'orange',
    name: 'Deletion review',
    description: '',
  },
  {
    state: 'DELETING',
    color: 'orange',
    name: 'Deleting',
    description: '',
  },
  {
    state: 'DELETED',
    color: 'gray',
    name: 'Deleted',
    description: '',
  },
];

type EthStake = {
  publicKey: string,
  state: State,
  balance: number | null,
  rewards: number | null,
  effectiveBalance: number | null,
  formattedBalance?: string,
  formattedEffectiveBalance?: string,
  formattedRewards?: string,
  formattedState?: string,
};

type Stakes = {
  ethStakes: EthStake[],
  totalEthRewards: number,
  totalEthBalance: number,
  totalPerformance: number,
  isLoading: boolean,
  isError: boolean,
};

const useEthStakes = (): Stakes => {
  const { data, error } = useSWR('/v0/eth/stakes');

  // Filter out UPLOADED stakes
  let ethStakes: EthStake[] = data ? data.filter((stake: EthStake) => stake.state !== 'UPLOADED') : [];

  let totalEthBalance: number = 0;
  let totalEthRewards: number = 0;

  // Calculate totals + add formatted values
  ethStakes.map((stake: EthStake) => {
    const balanceAmount = stake.balance ? gweiToEth(stake.balance) : 0;
    const rewardsAmount = stake.balance ? balanceAmount - 32 : 0;
    const state = EthValidatorStates.find(s => s.state === stake.state);

    // Update total balance and total rewards
    totalEthBalance += balanceAmount;
    totalEthRewards += rewardsAmount;

    // Formatted values
    stake.formattedState = state ? state.name : 'N/A';
    if (stake.balance === null) {
      stake.formattedBalance = 'N/A';
      stake.formattedRewards = 'N/A';
    } else {
      stake.formattedBalance = formatNumber(balanceAmount, 4);
      stake.formattedRewards = formatNumber(rewardsAmount, 4);
    }
  });

  // Sort stakes by balance (descending), with null values at the end
  ethStakes.sort((a, b): number => {
    if (a.balance === b.balance) {
      return 0;
    } else if (a.balance === null) {
      return 1;
    } else if (b.balance === null) {
      return -1;
    } else {
      return a.balance < b.balance ? 1 : -1;
    }
  });

  const totalPerformance: number = totalEthBalance > 0 ? (totalEthRewards / totalEthBalance) * 100 : 0;

  return {
    ethStakes,
    totalEthRewards,
    totalEthBalance,
    totalPerformance,
    isLoading: !error && !data,
    isError: Boolean(error),
  };
};

export default useEthStakes;