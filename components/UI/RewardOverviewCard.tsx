import React from 'react';
import Link from 'next/link';
import Card from "./Card";
import { ChevronRightIcon } from "@heroicons/react/solid";

type Props = {
  token: string;
  icon: any;
  totalBalance: string;
  totalBalanceFiat: string;
  totalRewards: string;
  totalRewardsFiat: string;
  href: string;
}

const RewardOverviewCard = (props: Props) => {
  const {
    token,
    icon,
    totalRewards,
    totalRewardsFiat,
    totalBalance,
    totalBalanceFiat,
    href,
  } = props;

  return (
    <div>
      <div className="flex items-center gap-x-2 mb-4">
        {icon}
        <h2>{token}</h2>
      </div>
      <Link href={href}>
        <a className="">
          <Card className="hover:shadow-lg">
            <div
              className={`flex items-center gap-x-2 border-b text-left border-transparent`}>
              <div>
                <div className="grid grid-cols-2 gap-32 mb-1">
                  <span
                    className="text-sm font-medium text-gray-500 truncate">Total balance</span>
                  <span
                    className="text-sm font-medium text-gray-500 truncate">Total rewards</span>
                </div>
                <div className="grid grid-cols-2 gap-32">
                  <div>
                    <span className="text-2xl font-semibold">
                      {totalBalance} {token}
                    </span>
                    <span className="block text-sm font-light">
                      {totalBalanceFiat}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-x-2">
                      <span className="text-2xl font-semibold">
                        {totalRewards} {token}
                      </span>
                    </div>
                    <span className="block text-sm font-light">
                      {totalRewardsFiat}
                    </span>
                  </div>
                </div>
              </div>
              <div className="ml-auto">
                <ChevronRightIcon
                  className={`w-8 h-8 transition ease-in duration-50`}
                />
              </div>
            </div>
          </Card>
        </a>
      </Link>
    </div>
  );
};

export default RewardOverviewCard;