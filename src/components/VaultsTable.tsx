import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { chainIcons, tokenIcons } from "@/utils/icons";
import { useAddressStore } from "@/store/useAddressStore";
import { format } from "@greypixel_/nicenumbers";
import { EventType, VaultWithEvents } from "@/types/apiInterface";

type VaultsTableProps = {
  vaults: VaultWithEvents[];
};

export const VaultsTable = ({ vaults }: VaultsTableProps) => {
  const { userAddress } = useAddressStore((state) => state);
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
          {vaults
            .sort((a, b) => {
              return b.redeemValue - a.redeemValue;
            })
            .map((vault) => {
              const { redeemValue, events } = vault;

              const vaultDeposited = events.reduce(
                (acc, event) =>
                  event.type === EventType.Deposit ? acc + event.amount : acc,
                0
              );

              const vaultRevenues = redeemValue - vaultDeposited;

              return (
                <tr
                  key={vault.address}
                  className="border-b dark:border-gray-700"
                >
                  <td className="px-4 py-2 flex flex-row items-center justify-center lg:justify-start">
                    <img
                      className="lg:ml-3"
                      height={20}
                      width={20}
                      src={chainIcons[vault.chainId]}
                      alt={`${vault.chainId}-icon`}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-row items-center justify-center md:justify-start gap-2">
                      <img
                        className=""
                        height={20}
                        width={20}
                        src={tokenIcons[vault.collateral.toLowerCase()]}
                        alt={`${vault.collateral}-icon`}
                      />
                      <span className="hidden md:inline">
                        {vault.collateral}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200 hidden md:block">
                    {format(vaultDeposited, {
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
                    {format(vaultRevenues, {
                      tokenDecimals: 0,
                      useSymbols: false,
                      addCommas: true,
                    })}{" "}
                    <span className="hidden lg:inline">crvUSD</span>
                  </td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                    {format(vault.lendApyPcent, {
                      tokenDecimals: 0,
                      useSymbols: false,
                      addCommas: true,
                    })}
                    %
                  </td>
                  <td className="px-4 py-2 flex flex-row justify-center md:justify-start">
                    <Link
                      to={`/${userAddress}/lending/${vault.address}`}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                    >
                      <span className="hidden md:inline">Details</span>{" "}
                      <ExternalLink size={16} />
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
