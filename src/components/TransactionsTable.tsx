import { format as formatDate } from "date-fns";
import { ExternalLink } from "lucide-react";
import { getExplorerLinkForChain } from "@/utils/explorer";
import { format } from "@greypixel_/nicenumbers";
import { Event, EventType } from "@/types/apiInterface";

type TransactionsTableProps = {
  events: Event[];
};

export const TransactionsTable = ({ events }: TransactionsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
              Date
            </th>
            <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
              Event
            </th>
            <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
              Amount
            </th>
            <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
              TxHash
            </th>
          </tr>
        </thead>
        <tbody>
          {events.map((tx) => (
            <tr key={tx.hash} className="border-b dark:border-gray-700">
              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                {formatDate(new Date(tx.timestamp), "dd/MM/yyyy")}
              </td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
              </td>
              <td
                className={`px-4 py-2 ${
                  tx.type === EventType.Deposit
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {tx.type === EventType.Deposit ? "+" : "-"}
                {format(tx.amount, {
                  tokenDecimals: 0,
                  useSymbols: false,
                  addCommas: true,
                })}
              </td>
              <td className="px-4 py-2">
                <a
                  href={getExplorerLinkForChain(tx.hash, tx.chain)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 flex items-center gap-2"
                >
                  View <ExternalLink className="w-5 h-5" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
