import { VaultWithEvents } from "@/types/apiInterface";

export const useAllLendingVaultsValues = (vaults: VaultWithEvents[] | null) => {
  let totalRedeemValue = 0;
  let totalDeposited = 0;
  let currentEarnings = 0;
  let historicalEarnings = 0;

  if (vaults) {
    totalRedeemValue = vaults.reduce(
      (acc, vault) => acc + vault.redeemValue,
      0
    );
    totalDeposited = vaults.reduce((acc, vault) => acc + vault.deposited, 0);

    currentEarnings = vaults
      .filter((vault) => vault.redeemValue > 0)
      .reduce((acc, vault) => acc + vault.earnings, 0);
    historicalEarnings = vaults
      .filter((vault) => vault.redeemValue === 0)
      .reduce((acc, vault) => acc + vault.earnings, 0);
  }

  return {
    totalRedeemValue,
    totalDeposited,
    currentEarnings,
    historicalEarnings,
  };
};
