import { isAddress } from "viem";
import { Link, useParams } from "react-router-dom";
import { format } from "@greypixel_/nicenumbers";
import { StatsBlock } from "@/components/StatsBlock";
import { TransactionsTable } from "@/components/TransactionsTable";
import { useSavingsVaultUserInfos } from "@/hooks/savings/useSavingsVaultUserInfos";
import { useAddressStore } from "@/store/useAddressStore";
import { useSavingsVaultInfos } from "@/hooks/savings/useSavingsVaultInfos";
import { Spinner } from "@/components/Spinner";
import { ErrorMessage } from "@/components/ErrorMessage";

export const SavingsPage = () => {
  const { userAddress: userAddressParam } = useParams();
  const { userAddress, setUserAddress } = useAddressStore((state) => state);
  const { data: userInfos, isLoading: isLoadingUserInfos } =
    useSavingsVaultUserInfos();
  const {
    apr,
    tvl,
    url,
    isLoading: isLoadingSavingsInfos,
  } = useSavingsVaultInfos();

  const isLoading = isLoadingUserInfos || isLoadingSavingsInfos;

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
  let totalEarnings = 0;

  if (userInfos) {
    totalRedeemValue = userInfos.redeemValue;
    totalDeposited = userInfos.deposited;
    totalEarnings = userInfos.earnings;
  }

  return (
    <div className={`container mx-auto p-4 space-y-4`}>
      <div className="flex flex-row items-center justify-start">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Savings Vault
        </h2>
        <p className="text-2xl text-blue-600 dark:text-blue-400 ml-2">
          | TVL :{" "}
          {format(tvl, {
            tokenDecimals: 0,
            useSymbols: false,
            addCommas: true,
          })}
          <span className="ml-1">crvUSD</span>
        </p>
        <p className="text-2xl text-blue-600 dark:text-blue-400 ml-2">
          | APY :{" "}
          {format(apr, {
            tokenDecimals: 0,
            useSymbols: false,
            addCommas: true,
          })}
          <span className="ml-1">%</span>
        </p>
      </div>
      <div className="flex flex-col text-gray-500 dark:text-gray-400">
        <span>
          The Savings vault is a vault that allows you to deposit your crvUSD
          and earn interest on it.
        </span>
        <span>
          The vault revenues come from a share of the fees made by the Curve
          DAO.
        </span>
        <span>
          Go to Curve{" "}
          <Link
            to={url || ""}
            target="_blank"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            Savings page
          </Link>{" "}
          to manage your position.
        </span>
      </div>
      <StatsBlock
        isLoading={isLoading}
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
            title:
              totalRedeemValue > 0 ? "Current earnings" : "Historical earnings",
            value: format(totalEarnings, {
              tokenDecimals: 0,
              useSymbols: false,
              addCommas: true,
            }),
            suffix: "crvUSD",
          },
        ]}
      />
      {userInfos && userInfos.events.length > 0 ? (
        <TransactionsTable events={userInfos.events} />
      ) : isLoading ? (
        <Spinner />
      ) : (
        <ErrorMessage type="empty" />
      )}
    </div>
  );
};
