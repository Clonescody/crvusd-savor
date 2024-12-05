import { format as formatDate } from "date-fns";
import { Download, ExternalLink } from "lucide-react";
import { getExplorerLinkForChain } from "@/utils/explorer";
import { format } from "@greypixel_/nicenumbers";
import { Event, EventType } from "@/types/apiInterface";

type TransactionsTableProps = {
  events: Event[];
};

export const TransactionsTable = ({ events }: TransactionsTableProps) => {
  const downloadCSV = () => {
    const headers = ["Date", "Chain", "Event", "Amount", "Transaction Hash"];
    const csvData = events.map((tx) => [
      formatDate(new Date(tx.timestamp), "dd/MM/yyyy"),
      tx.chain,
      tx.type,
      tx.amount,
      getExplorerLinkForChain(tx.hash, tx.chain),
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "savings_vault_events.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end mb-4">
        <button
          onClick={downloadCSV}
          className="flex items-center gap-2 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Events CSV
        </button>
      </div>
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
