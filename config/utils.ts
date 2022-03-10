import { ChainId, Config, Goerli, Mainnet } from '@usedapp/core';
import { env } from './env';
import { Currency } from "../contexts/AppContext";

export const formatPrice = (
  price: number,
  currency: Currency = 'USD'
): string => {
  return new Intl.NumberFormat('en-EN', { style: 'currency', currency: currency }).format(price);
};

export const formatNumber = (
  number: number,
  maximumFractionDigits: number = 2
): string => {
  return new Intl.NumberFormat('en-EN', {
    maximumFractionDigits: maximumFractionDigits,
  }).format(number);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-EN').format(date);
};

export const dAppConfig: Config = {
  readOnlyChainId: env.IS_TESTNET ? ChainId.Goerli : ChainId.Mainnet,
  networks: [env.IS_TESTNET ? Goerli : Mainnet],
  readOnlyUrls: {
    [Goerli.chainId]: `https://goerli.infura.io/v3/${env.INFURA_ID}`,
    [Mainnet.chainId]: `https://mainnet.infura.io/v3/${env.INFURA_ID}`,
  },
  autoConnect: false,
};

// Convert Ethereum gwei to ETH
export const gweiToEth = (gwei: number): number => {
  return gwei / 10 ** 9;
};
