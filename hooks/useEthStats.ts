import useSWR from 'swr';
import axios from "axios";

export type EthereumStats = {
  activeValidators: number,
  stakedEther: number,
  isLoading: boolean,
  isError: boolean,
};

const fetcher = (url: string) => {
  return axios
    .get(`${url}`,)
    .then(res => res.data);
};

const useEthStats = (): EthereumStats => {
  const {
    data,
    error
  } = useSWR('https://mainnet.beaconcha.in/api/v1/epoch/latest', fetcher);

  return {
    activeValidators: data?.data?.validatorscount,
    stakedEther: data?.data?.totalvalidatorbalance / 1000000000,
    isLoading: !error && !data,
    isError: Boolean(error),
  };
};

export default useEthStats;