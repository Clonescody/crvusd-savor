import { VaultWithEvents } from "@/types/apiInterface";
import { useAllLendingVaults } from "./useAllLendingVaults";

export const useSingleLendingVault = (
  vaultAddress: string | undefined
): VaultWithEvents | undefined => {
  const { data: vaults } = useAllLendingVaults();
  if (!vaultAddress) {
    return undefined;
  }

  return vaults?.find((vault) => vault.address === vaultAddress);
};
