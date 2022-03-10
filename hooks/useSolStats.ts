import useSWR from 'swr';

export type EthereumStats = {
  solana_nb_validators: number,
  solana_network_apy: number,
  solana_supply_staked_percent: number,
  isLoading: boolean,
  isError: boolean,
};

const useSolStats = (): EthereumStats => {
  const {
    data,
    error
  } = useSWR('/v0/sol/network-stats');

  return {
    solana_nb_validators: data?.data?.nb_validators ?? 0,
    solana_network_apy: data?.data?.apy ?? 0,
    solana_supply_staked_percent: data?.data?.supply_staked_percent ?? 0,
    isLoading: !error && !data,
    isError: Boolean(error),
  };
};

export default useSolStats;