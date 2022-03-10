import useSWR from 'swr';
import axios from "axios";

type Value = {
  [key: string]: number
};

type Price = {
  solValue: Value,
  isLoading: boolean,
  isError: boolean,
};

const fetcher = (url: string) => {
  return axios
    .get(`${url}`,)
    .then(res => res.data);
};

const useSolPrice = (): Price => {
  const {
    data,
    error
  } = useSWR('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=USD,EUR,GBP', fetcher);

  const defaultPrice = {
    usd: 0,
    eur: 0,
    gbp: 0,
  };

  return {
    solValue: data?.solana ?? defaultPrice,
    isLoading: !error && !data,
    isError: Boolean(error),
  };
};

export default useSolPrice;