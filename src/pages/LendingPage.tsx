import { Link, useParams } from "react-router-dom";
import { isAddress } from "viem";
import { StatsBlock } from "@/components/StatsBlock";
import { useAddressStore } from "@/store/useAddressStore";

import { VaultsTable } from "@/components/VaultsTable";
import { format } from "@greypixel_/nicenumbers";
import { useAllLendingVaults } from "@/hooks/lending/useAllLendingVaults";
import { EventType } from "@/types/apiInterface";
import { Spinner } from "@/components/Spinner";
import { ErrorMessage } from "@/components/ErrorMessage";

export const LendingPage = () => {
  const { userAddress: userAddressParam } = useParams();
  const { userAddress, setUserAddress } = useAddressStore((state) => state);
  const { data: vaults, isLoading: isLoadingVaults } = useAllLendingVaults();

  if (
    (userAddressParam && isAddress(userAddressParam) && !userAddress) ||
    (userAddressParam &&
      userAddress &&
      userAddress.toLowerCase() !== userAddressParam.toLowerCase())
  ) {
    setUserAddress(userAddressParam);
  }

  let totalRedeemValue = 0;
  let totalDeposited = 0;

  if (vaults) {
    totalRedeemValue = vaults.reduce(
      (acc, vault) => acc + vault.redeemValue,
      0
    );
    totalDeposited = vaults.reduce(
      (acc, vaultEvents) =>
        acc +
        vaultEvents.events.reduce(
          (acc, event) =>
            event.type === EventType.Deposit
              ? acc + event.amount
              : acc - event.amount,
          0
        ),
      0
    );
  }

  const totalRevenues = totalRedeemValue - totalDeposited;

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
          },
          {
            title: "Current balance",
            value: format(totalRedeemValue, {
              tokenDecimals: 0,
              useSymbols: false,
              addCommas: true,
            }),
          },
          {
            title: "Current earnings",
            value: format(totalRevenues, {
              tokenDecimals: 0,
              useSymbols: false,
              addCommas: true,
            }),
          },
          {
            title: "Historical earnings",
            value:
              totalRevenues > 0
                ? "0"
                : format(totalRevenues, {
                    tokenDecimals: 0,
                    useSymbols: false,
                    addCommas: true,
                  }),
          },
        ]}
      />
      {vaults ? (
        <VaultsTable vaults={vaults} />
      ) : isLoadingVaults ? (
        <Spinner />
      ) : (
        <ErrorMessage type="empty" />
      )}
    </div>
  );
};
