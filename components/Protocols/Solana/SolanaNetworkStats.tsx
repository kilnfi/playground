import React from 'react';
import Card from "../../UI/Card";
import { formatNumber, formatPrice } from "../../../config/utils";
import useEthPrice from "../../../hooks/useEthPrice";
import useEthStats from "../../../hooks/useEthStats";
import { useAppContext } from "../../../hooks/useAppContext";
import WarningCard from "../../UI/WarningCard";
import Spinner from "../../UI/Spinner";
import useSolStats from "../../../hooks/useSolStats";
import useSolPrice from "../../../hooks/useSolPrice";

const SolanaNetworkStats = () => {
  const {
    solValue,
    isLoading: isPriceLoading,
    isError: isPriceError,
  } = useSolPrice();
  const {
    solana_nb_validators,
    solana_network_apy,
    solana_supply_staked_percent,
    isLoading,
    isError,
  } = useSolStats();
  const { context } = useAppContext();

  const price = formatPrice(solValue[context.currency.toLowerCase()], context.currency);
  const formattedSupplyStaked = solana_supply_staked_percent ? formatNumber(solana_supply_staked_percent, 2) : 0;
  const formattedActiveValidator = solana_nb_validators ? formatNumber(solana_nb_validators, 0) : 0;
  const formattedApy = solana_network_apy ? formatNumber(solana_network_apy, 2) : 0;

  const showSpinner: boolean = isLoading || isPriceLoading;
  const showError: boolean = isError || isPriceError;
  const showStats: boolean = !showSpinner && !showError;

  return (
    <div className="">
      <h2 className="text-center font-extrabold text-gray-900 text-3xl mb-6">Solana
        network stats</h2>

      {showError && (
        <WarningCard>
          We could not fetch the network stats for now. Please try again later.
        </WarningCard>
      )}

      {showSpinner && (
        <Spinner/>
      )}

      {showStats && (
        <dl className="grid gap-5 grid-cols-2 max-w-screen-laptop mx-auto">
          <Card>
            <dt className="text-sm font-medium text-gray-500 truncate">
              SOL Price
            </dt>
            <dd
              className="mt-1 text-3xl font-semibold text-gray-900">
              {price}
            </dd>
          </Card>

          <Card>
            <dt className="text-sm font-medium text-gray-500 truncate">
              Active validators
            </dt>
            <dd
              className="mt-1 text-3xl font-semibold text-gray-900">
              {formattedActiveValidator}
            </dd>
          </Card>

          <Card>
            <dt className="text-sm font-medium text-gray-500 truncate">
              Supply staked
            </dt>
            <dd
              className="mt-1 text-3xl font-semibold text-gray-900">
              {formattedSupplyStaked}%
            </dd>
          </Card>

          <Card>
            <dt className="text-sm font-medium text-gray-500 truncate">
              Network APY
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {formattedApy}%
            </dd>
          </Card>
        </dl>
      )}
    </div>
  );
};

export default SolanaNetworkStats;
