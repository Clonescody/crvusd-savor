import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAddress } from "viem";
import { useAddressStore } from "@/store/useAddressStore";

export const RootPage = () => {
  const [inputAddress, setInputAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { userAddress, setUserAddress } = useAddressStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (userAddress) {
      navigate(`/${userAddress}/savings`);
    }
  }, [userAddress, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAddress(inputAddress)) {
      setError("Invalid address");
      return;
    }
    setUserAddress(inputAddress);
    navigate(`/${inputAddress}/savings`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
          Enter Your Address
        </h2>
        <input
          type="text"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
          placeholder="Enter your address"
          className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
