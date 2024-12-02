import { SavingsVaultInfos } from "@/types/apiInterface";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useSavingsVaultInfos = () => {
  const fetchSavingsVaultRedeemValue = async () => {
    const url = `${import.meta.env.VITE_API_URL}/savings-infos`;

    const response = await axios.get<SavingsVaultInfos>(url);

    return response.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: [`savings-vault-infos`],
    queryFn: () => fetchSavingsVaultRedeemValue(),
    staleTime: 1000 * 60 * 5,
  });

  return {
    isLoading,
    tvl: data?.tvl,
    apr: data?.apr,
    url: data?.url,
  };
};
