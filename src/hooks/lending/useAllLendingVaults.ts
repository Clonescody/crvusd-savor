import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { isAddress } from "viem";
import { useAddressStore } from "@/store/useAddressStore";
import { VaultWithEvents } from "@/types/apiInterface";

export const useAllLendingVaults = (): {
  isLoading: boolean;
  data: VaultWithEvents[] | null;
  error: Error | null;
} => {
  const { userAddress: user } = useAddressStore((state) => state);
  const fetchAllLendingVaults = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/lending`;

      const response = await axios.post<{
        status: string;
        data: VaultWithEvents[];
      }>(
        url,
        {
          user,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response lending", response.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching lending vaults with infos", error);
      return null;
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: [`lending-vaults-${user}`],
    queryFn: () => fetchAllLendingVaults(),
    staleTime: 1000 * 60 * 5,
    enabled: !!user && isAddress(user),
  });

  return {
    isLoading,
    data: data ?? null,
    error,
  };
};
