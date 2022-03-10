import React from 'react';
import Card from "../../UI/Card";
import { formatNumber, formatPrice } from "../../../config/utils";
import useEthPrice from "../../../hooks/useEthPrice";
import useEthStats from "../../../hooks/useEthStats";
import { useAppContext } from "../../../hooks/useAppContext";
import WarningCard from "../../UI/WarningCard";
import Spinner from "../../UI/Spinner";

const EthereumNetworkStats = () => {
  const {
    ethValue,
    isLoading: isPriceLoading,
    isError: isPriceError,
  } = useEthPrice();
  const {
    activeValidators,
    stakedEther,
    isLoading,
    isError,
  } = useEthStats();
  const { context } = useAppContext();

  const ethPrice = formatPrice(ethValue[context.currency.toLowerCase()], context.currency);
  const formattedStakedEther = stakedEther ? formatNumber(stakedEther, 0) : 0;
  const formattedActiveValidator = activeValidators ? formatNumber(activeValidators, 0) : 0;

  const showSpinner: boolean = isLoading || isPriceLoading;
  const showError: boolean = isError || isPriceError;
  const showStats: boolean = !showSpinner && !showError;

  return (
    <div className="">
      <h2 className="text-center font-extrabold text-gray-900 text-3xl mb-6">Ethereum
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
            <dt className="text-sm font-medium text-gray-500 truncate">ETH
              Price
            </dt>
            <dd
              className="mt-1 text-3xl font-semibold text-gray-900">{ethPrice}</dd>
          </Card>

          <Card>
            <dt className="text-sm font-medium text-gray-500 truncate">Active
              validators
            </dt>
            <dd
              className="mt-1 text-3xl font-semibold text-gray-900">{formattedActiveValidator}</dd>
          </Card>

          <Card>
            <dt className="text-sm font-medium text-gray-500 truncate">Staked
              ETH
            </dt>
            <dd
              className="mt-1 text-3xl font-semibold text-gray-900">{formattedStakedEther}</dd>
          </Card>

          <Card>
            <dt className="text-sm font-medium text-gray-500 truncate">Average
              APY
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">5.0%</dd>
          </Card>
        </dl>
      )}
    </div>
  );
};

export default EthereumNetworkStats;
