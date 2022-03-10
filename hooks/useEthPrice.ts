import useSWR from 'swr';
import axios from "axios";

type EthereumValue = {
  [key: string]: number
};

type Price = {
  ethValue: EthereumValue,
  isLoading: boolean,
  isError: boolean,
};

const fetcher = (url: string) => {
  return axios
    .get(`${url}`,)
    .then(res => res.data);
};

const useEthPrice = (): Price => {
  const {
    data,
    error
  } = useSWR('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD,EUR,GBP', fetcher);

  const defaultEthPrice = {
    usd: 0,
    eur: 0,
    gbp: 0,
  };

  return {
    ethValue: data?.ethereum ?? defaultEthPrice,
    isLoading: !error && !data,
    isError: Boolean(error),
  };
};

export default useEthPrice;