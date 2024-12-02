import { Link, useNavigate, useParams } from "react-router-dom";
import { isAddress } from "viem";
import { StatsBlock } from "@/components/StatsBlock";
import { TransactionsTable } from "@/components/TransactionsTable";

import { useAddressStore } from "@/store/useAddressStore";
import { format } from "@greypixel_/nicenumbers";
import { useSingleLendingVault } from "@/hooks/lending/useSingleLendingVault";
import { EventType } from "@/types/apiInterface";
import { EmptyEventsMessage } from "@/components/EmptyEventsMessage";

export const LendingVaultPage = () => {
  const navigate = useNavigate();
  const { vaultAddress, userAddress: userAddressParam } = useParams<{
    vaultAddress: string;
    userAddress: string;
  }>();
  const { userAddress, setUserAddress } = useAddressStore((state) => state);
  const vault = useSingleLendingVault(vaultAddress);

  if (
    userAddressParam &&
    isAddress(userAddressParam) &&
    userAddress.toLowerCase() !== userAddressParam.toLowerCase()
  ) {
    setUserAddress(userAddressParam);
  }

  if (!vault) {
    navigate(`${userAddress}/lending`);
    return;
  }

  console.log("vault", vault);
  const { events, redeemValue } = vault;

  let totalDeposited = 0;

  if (redeemValue > 0 && events.length > 0) {
    totalDeposited = events.reduce(
      (acc, event) =>
        event.type === EventType.Deposit
          ? acc + event.amount
          : acc - event.amount,
      0
    );
  }

  const totalRevenues = redeemValue - totalDeposited;

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex flex-row items-center justify-start">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {`${vault.collateral}/${vault.borrowed}`} Vault
        </h2>
        <p className="text-2xl text-blue-600 dark:text-blue-400 ml-2">
          | TVL :{" "}
          {format(vault.collateralTvlUsd, {
            tokenDecimals: 0,
            useSymbols: false,
            addCommas: true,
          })}
          <span className="ml-1">$</span>
        </p>
        <p className="text-2xl text-blue-600 dark:text-blue-400 ml-2">
          | APY :{" "}
          {format(vault.lendApyPcent, {
            tokenDecimals: 0,
            useSymbols: false,
            addCommas: true,
          })}
          <span className="ml-1">%</span>
        </p>
      </div>
      <div className="flex flex-col text-gray-500 dark:text-gray-400">
        <span>
          This vault allow users to borrow crvUSD lent by others against their{" "}
          <span className="underline">{vault.collateral}</span>.
        </span>
        <span>
          There is currently{" "}
          <span className="underline">
            {format(vault.borrowedTvl, {
              tokenDecimals: 0,
              useSymbols: false,
              addCommas: true,
            })}{" "}
            crvUSD
          </span>{" "}
          borrowed earning{" "}
          <span className="underline">{vault.lendApyPcent}% APY</span>.
        </span>
        <span>
          Go to the{" "}
          <Link
            to={vault.depositUrl}
            target="_blank"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            Curve Vault page
          </Link>{" "}
          to borrow or deposit & start earning.
        </span>
      </div>
      <StatsBlock
        isLoading={false}
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
            value: format(redeemValue, {
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
              redeemValue > 0
                ? "0"
                : format(totalRevenues, {
                    tokenDecimals: 0,
                    useSymbols: false,
                    addCommas: true,
                  }),
          },
        ]}
      />
      {events.length > 0 ? (
        <TransactionsTable events={events} />
      ) : (
        <EmptyEventsMessage />
      )}
    </div>
  );
};
