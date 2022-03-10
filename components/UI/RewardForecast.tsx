import React from 'react';

type Props = {
  token_name: string,
  token_daily_rewards: string,
  token_monthly_rewards: string,
  token_yearly_rewards: string,
  fiat_daily_rewards: string,
  fiat_monthly_rewards: string,
  fiat_yearly_rewards: string,
}

const RewardForecast = (props: Props) => {
  const {
    token_name,
    token_daily_rewards,
    token_monthly_rewards,
    token_yearly_rewards,
    fiat_daily_rewards,
    fiat_monthly_rewards,
    fiat_yearly_rewards,
  } = props;

  return (
    <div>
      <div
        className="flex items-center justify-between border-b border-gray-300 py-4 gap-x-2">
        <span
          className="w-1/3 text-gray-500 font-light text-base leading-snug">
                Daily rewards
        </span>
        <span
          className="w-1/3 font-bold text-base leading-snug text-right flex-shrink-0 break-all">
          {token_daily_rewards} <span
            className="whitespace-nowrap">{token_name}</span>
        </span>
        <span
          className="w-1/3 font-light text-base leading-snug text-right flex-shrink-0 break-all">
          {fiat_daily_rewards}
        </span>
      </div>
      <div
        className="flex items-center justify-between border-b border-gray-300 py-4 gap-x-2">
        <span
          className="w-1/3 text-gray-500 font-light text-base leading-snug">
                Monthly rewards
        </span>
        <span
          className="w-1/3 font-bold text-base leading-snug text-right flex-shrink-0 break-all">
          {token_monthly_rewards} <span
            className="whitespace-nowrap">{token_name}</span>
        </span>
        <span
          className="w-1/3 font-light text-base leading-snug text-right flex-shrink-0 break-all">
          {fiat_monthly_rewards}
        </span>
      </div>
      <div className="flex items-center justify-between py-4 gap-x-2">
        <span
          className="w-1/3 text-gray-500 font-light text-base leading-snug">
                Yearly rewards
        </span>
        <span
          className="w-1/3 font-bold text-base leading-snug text-right flex-shrink-0 break-all">
          {token_yearly_rewards} <span
            className="whitespace-nowrap">{token_name}</span>
        </span>
        <span
          className="w-1/3 font-light text-base leading-snug text-right flex-shrink-0 break-all">
          {fiat_yearly_rewards}
        </span>
      </div>
    </div>
  );
};

export default RewardForecast;