import api from './api';

export type ValidationKeyDepositData = {
  pubkey: string[];
  withdrawal_credentials: string[];
  signatures: string[];
  deposit_data_roots: string[];
};

export const generateEthKey = async (
  withdrawalAddress: string
): Promise<ValidationKeyDepositData> => {
  return api<ValidationKeyDepositData>('POST', '/v0/eth/keys', {
    withdrawalAddress,
  });
};
