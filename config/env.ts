// Parse and type environment variables
// Have to pass the variable name manually because it is not possible to access process.env variables dynamically
// and do something like process.env[variableName], so we pass both the env variable and its name separately
// for debugging purposes
// See: https://nextjs.org/docs/basic-features/environment-variables

// Use this function to require a mandatory environment variable
const getEnvironmentVariable = (
  environmentVariable: string | undefined,
  variableName: string,
): string => {
  if (!environmentVariable) {
    throw new Error(`Please provide environment variable: ${variableName}`);
  } else {
    return environmentVariable;
  }
};

type BeaconNetworkName = 'prater' | 'mainnet';
type EthNetworkName = 'Goerli' | 'Mainnet';
type SolanaNetworkName = 'Devnet' | 'Testnet' | 'Mainnet Beta';

interface envInterface {
  API_URL: string;
  IS_TESTNET: boolean;
  ETH_DEPOSIT_CONTRACT_ABI: string;
  ETH_DEPOSIT_CONTRACT_ADDRESS: string;
  BEACON_NETWORK_NAME: BeaconNetworkName;
  ETH_NETWORK_NAME: EthNetworkName;
  SOL_NETWORK_NAME: SolanaNetworkName;
  DASHBOARD_URL: string;
  INFURA_ID: string;
  SOL_VOTE_ACCOUNT_ADDRESS: string;
}

const IS_TESTNET =
  getEnvironmentVariable(
    process.env.NEXT_PUBLIC_TESTNET,
    'NEXT_PUBLIC_TESTNET',
  ) === 'true';

export const env: envInterface = {
  API_URL: getEnvironmentVariable(
    process.env.NEXT_PUBLIC_API_URL,
    'NEXT_PUBLIC_API_URL',
  ),
  ETH_DEPOSIT_CONTRACT_ABI: getEnvironmentVariable(
    process.env.NEXT_PUBLIC_ETH_DEPOSIT_CONTRACT_ABI,
    'NEXT_PUBLIC_ETH_DEPOSIT_CONTRACT_ABI',
  ),
  ETH_DEPOSIT_CONTRACT_ADDRESS: getEnvironmentVariable(
    process.env.NEXT_PUBLIC_ETH_DEPOSIT_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_ETH_DEPOSIT_CONTRACT_ADDRESS',
  ),
  IS_TESTNET: IS_TESTNET,
  BEACON_NETWORK_NAME: IS_TESTNET ? 'prater' : 'mainnet',
  ETH_NETWORK_NAME: IS_TESTNET ? 'Goerli' : 'Mainnet',
  SOL_NETWORK_NAME: IS_TESTNET ? 'Testnet' : 'Mainnet Beta',
  DASHBOARD_URL: getEnvironmentVariable(
    process.env.NEXT_PUBLIC_DASHBOARD_URL,
    'NEXT_PUBLIC_DASHBOARD_URL',
  ),
  INFURA_ID: getEnvironmentVariable(
    process.env.NEXT_PUBLIC_INFURA_ID,
    'NEXT_PUBLIC_INFURA_ID',
  ),
  SOL_VOTE_ACCOUNT_ADDRESS: getEnvironmentVariable(
    process.env.NEXT_PUBLIC_SOL_VOTE_ACCOUNT_ADDRESS,
    'NEXT_PUBLIC_SOL_VOTE_ACCOUNT_ADDRESS',
  ),
};
