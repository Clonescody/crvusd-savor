import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { chainIcons, tokenIcons } from "@/utils/icons";
import { useAddressStore } from "@/store/useAddressStore";
import { format } from "@greypixel_/nicenumbers";
import { VaultWithEvents } from "@/types/apiInterface";

type VaultsTableProps = {
  vaults: VaultWithEvents[];
  hideZeroDeposits: boolean;
  hideZeroEarnings: boolean;
};

export const VaultsTable = ({
  vaults,
  hideZeroDeposits,
  hideZeroEarnings,
}: VaultsTableProps) => {
  const { userAddress } = useAddressStore((state) => state);

  let filteredVaults = vaults;

  if (hideZeroDeposits) {
    filteredVaults = filteredVaults.filter((vault) => vault.deposited > 0);
  }

  if (hideZeroEarnings) {
    filteredVaults = filteredVaults.filter((vault) => vault.earnings > 0);
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
              Chain
            </th>
            <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
              Collateral
            </th>
            <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300 hidden md:block">
              Deposits
            </th>
            <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
              Value
            </th>
            <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
              Earnings
            </th>
            <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
              APY
            </th>
            <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredVaults
            .sort((a, b) => b.redeemValue - a.redeemValue)
            .map(
              ({
                redeemValue,
                deposited,
                earnings,
                address,
                chainId,
                collateral,
                lendApyPcent,
              }) => (
                <tr key={address} className="border-b dark:border-gray-700">
                  <td className="px-4 py-2 flex flex-row items-center justify-center lg:justify-start">
                    <img
                      className="lg:ml-3"
                      height={20}
                      width={20}
                      src={chainIcons[chainId]}
                      alt={`${chainId}-icon`}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-row items-center justify-center md:justify-start gap-2">
                      <img
                        className=""
                        height={20}
                        width={20}
                        src={tokenIcons[collateral.toLowerCase()]}
                        alt={`${collateral}-icon`}
                      />
                      <span className="hidden md:inline">{collateral}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200 hidden md:block">
                    {format(deposited, {
                      tokenDecimals: 0,
                      useSymbols: false,
                      addCommas: true,
                    })}{" "}
                    <span className="hidden lg:inline">crvUSD</span>
                  </td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                    {format(redeemValue, {
                      tokenDecimals: 0,
                      useSymbols: false,
                      addCommas: true,
                    })}{" "}
                    <span className="hidden lg:inline">crvUSD</span>
                  </td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                    {format(earnings, {
                      tokenDecimals: 0,
                      useSymbols: false,
                      addCommas: true,
                    })}{" "}
                    <span className="hidden lg:inline">crvUSD</span>
                  </td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                    {format(lendApyPcent, {
                      tokenDecimals: 0,
                      useSymbols: false,
                      addCommas: true,
                    })}
                    %
                  </td>
                  <td className="px-4 py-2 flex flex-row justify-center md:justify-start">
                    <Link
                      to={`/${userAddress}/lending/${address}`}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                    >
                      <span className="hidden md:inline">Details</span>{" "}
                      <ExternalLink size={16} />
                    </Link>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
};
