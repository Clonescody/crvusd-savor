type Stat = {
  title: string;
  value: string;
  prefix?: string;
  suffix?: string;
};

interface StatsBlockProps {
  stats: Stat[];
  isLoading: boolean;
}

export const StatsBlock = ({ stats, isLoading }: StatsBlockProps) => (
  <div
    className={`grid grid-cols-1 ${stats.length === 4 ? "md:grid-cols-2" : "md:grid-cols-3"} lg:grid-cols-${stats.length} gap-4`}
  >
    {stats.map((stat) => (
      <StatCard
        key={stat.title}
        title={stat.title}
        value={stat.value}
        prefix={stat.prefix}
        suffix={stat.suffix}
        isLoading={isLoading}
      />
    ))}
  </div>
);

interface StatCardProps {
  title: string;
  value: string;
  prefix?: string;
  suffix?: string;
  isLoading: boolean;
}

const StatCard = ({
  title,
  value,
  prefix,
  suffix,
  isLoading,
}: StatCardProps) => (
  <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
      {title}
    </h3>
    <p
      className={`text-2xl font-bold ${
        isLoading && "animate-pulse"
      } text-blue-600 dark:text-blue-400`}
    >
      {prefix}
      {value} {suffix}
    </p>
  </div>
);
