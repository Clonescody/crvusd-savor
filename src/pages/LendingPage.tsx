import { Link, useParams } from "react-router-dom";
import { isAddress } from "viem";
import { StatsBlock } from "@/components/StatsBlock";
import { useAddressStore } from "@/store/useAddressStore";

import { VaultsTable } from "@/components/VaultsTable";
import { format } from "@greypixel_/nicenumbers";
import { useAllLendingVaults } from "@/hooks/lending/useAllLendingVaults";
import { Spinner } from "@/components/Spinner";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useAllLendingVaultsValues } from "@/hooks/lending/useAllLendingVaultsValues";
import { useState } from "react";

export const LendingPage = () => {
  const { userAddress: userAddressParam } = useParams();
  const { userAddress, setUserAddress } = useAddressStore((state) => state);
  const { data: vaults, isLoading: isLoadingVaults } = useAllLendingVaults();
  const {
    totalRedeemValue,
    totalDeposited,
    currentEarnings,
    historicalEarnings,
  } = useAllLendingVaultsValues(vaults);
  const [hideZeroDeposits, setHideZeroDeposits] = useState(false);
  const [hideZeroEarnings, setHideZeroEarnings] = useState(false);

  if (
    (userAddressParam && isAddress(userAddressParam) && !userAddress) ||
    (userAddressParam &&
      userAddress &&
      userAddress.toLowerCase() !== userAddressParam.toLowerCase())
  ) {
    setUserAddress(userAddressParam);
  }

  return (
    <div className={`container mx-auto p-4 space-y-4`}>
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        Lending Vaults
      </h2>
      <div className="flex flex-col text-gray-500 dark:text-gray-400">
        <span>
          The Curve DAO allows users to loan their crvUSD to other users willing
          to borrow against their assets.
        </span>
        <span>
          The LLAMMA model is unique and introduces an innovative model for
          users to manage their loans.
        </span>
        <span>
          Check out the Curve{" "}
          <Link
            to={"https://resources.curve.fi/lending/overview/"}
            target="_blank"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            documentation
          </Link>{" "}
          to learn more.
        </span>
      </div>
      <StatsBlock
        isLoading={isLoadingVaults}
        stats={[
          {
            title: "Total deposited",
            value: format(totalDeposited, {
              tokenDecimals: 0,
              useSymbols: false,
              addCommas: true,
            }),
            suffix: "crvUSD",
          },
          {
            title: "Redeem value",
            value: format(totalRedeemValue, {
              tokenDecimals: 0,
              useSymbols: false,
              addCommas: true,
            }),
            suffix: "crvUSD",
          },
          {
            title: "Current earnings",
            value: format(currentEarnings, {
              tokenDecimals: 0,
              useSymbols: false,
              addCommas: true,
            }),
            suffix: "crvUSD",
          },
          {
            title: "Historical earnings",
            value: format(historicalEarnings, {
              tokenDecimals: 0,
              useSymbols: false,
              addCommas: true,
            }),
            suffix: "crvUSD",
          },
        ]}
      />
      <div className="flex md:flex-col md:items-end md:justify-start">
        <div className="flex flex-row items-center justify-start">
          <span>Hide zero deposits</span>
          <input
            title="Hide zero deposits"
            type="checkbox"
            className="ml-2 mr-2 md:mr-0"
            checked={hideZeroDeposits}
            onChange={() => setHideZeroDeposits(!hideZeroDeposits)}
          />
        </div>
        <div className="flex flex-row items-center justify-start">
          <span>Hide zero earnings</span>
          <input
            title="Hide zero earnings"
            type="checkbox"
            className="ml-2"
            checked={hideZeroEarnings}
            onChange={() => setHideZeroEarnings(!hideZeroEarnings)}
          />
        </div>
      </div>
      {vaults ? (
        <VaultsTable
          vaults={vaults}
          hideZeroDeposits={hideZeroDeposits}
          hideZeroEarnings={hideZeroEarnings}
        />
      ) : isLoadingVaults ? (
        <Spinner />
      ) : (
        <ErrorMessage type="empty" />
      )}
    </div>
  );
};
