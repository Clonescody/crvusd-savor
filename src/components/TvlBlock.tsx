import { Link } from "react-router-dom";

interface TVLBlockProps {
  tvl: string;
  borrowedTvl?: string;
  apy: string;
  tvlSuffix: string;
  isLoading: boolean;
  depositLink: string;
  withdrawLink?: string;
}

export const TVLBlock = ({
  tvl,
  apy,
  borrowedTvl,
  tvlSuffix,
  depositLink,
  isLoading,
  withdrawLink,
}: TVLBlockProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div
        className={`grid grid-cols-1 md:grid-cols-${
          borrowedTvl ? "4" : "3"
        } gap-4`}
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
            TVL
          </h3>
          <p
            className={`text-2xl font-bold ${
              isLoading && "animate-pulse"
            } text-green-600 dark:text-green-400`}
          >
            {tvl} {tvlSuffix}
          </p>
        </div>
        {borrowedTvl && (
          <div>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
              Borrowed TVL
            </h3>
            <p
              className={`text-2xl font-bold ${
                isLoading && "animate-pulse"
              } text-blue-600 dark:text-blue-400`}
            >
              {borrowedTvl} crvUSD
            </p>
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
            APY
          </h3>
          <p
            className={`text-2xl font-bold ${
              isLoading && "animate-pulse"
            } text-orange-600 dark:text-orange-400`}
          >
            {apy}%
          </p>
        </div>
        <div className="flex items-center">
          <Link
            to={depositLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors ${
              isLoading && "animate-pulse"
            }`}
          >
            Deposit
          </Link>
          {withdrawLink && (
            <Link
              to={withdrawLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors ml-2 ${
                isLoading && "animate-pulse"
              }`}
            >
              Withdraw
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
