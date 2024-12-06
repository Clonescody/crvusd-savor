type ErrorMessageProps = {
  type: "empty" | "error";
};

export const ErrorMessage = ({ type }: ErrorMessageProps) => (
  <div className="flex flex-col items-center justify-center h-48">
    <p className="text-gray-500 dark:text-gray-400">
      {type === "empty"
        ? "The llamas worked hard, but no transactions were found for this address."
        : "An error occurred while fetching the data."}
    </p>
  </div>
);
