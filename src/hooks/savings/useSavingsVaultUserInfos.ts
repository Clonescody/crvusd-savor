import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { isAddress } from "viem";
import { useAddressStore } from "@/store/useAddressStore";
import { UserSavingsData } from "@/types/apiInterface";

export const useSavingsVaultUserInfos = (): {
  isLoading: boolean;
  data: UserSavingsData | null;
  error: Error | null;
} => {
  const { userAddress } = useAddressStore((state) => state);
  const fetchSavingsVaultUserInfos = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/savings`;

      const response = await axios.post<UserSavingsData>(
        url,
        {
          user: userAddress,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching savings vault user infos", error);
      return null;
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: [`savings-vault-user-infos-${userAddress}`],
    queryFn: () => fetchSavingsVaultUserInfos(),
    staleTime: 1000 * 60 * 5,
    enabled: !!userAddress && isAddress(userAddress),
  });

  return {
    isLoading,
    data: data ?? null,
    error,
  };
};
