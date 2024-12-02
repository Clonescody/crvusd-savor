export const getExplorerLinkForChain = (
  txHash: string,
  chain: string
): string => {
  if (chain === "arbitrum") {
    return `https://arbiscan.io/tx/${txHash}`;
  }
  if (chain === "fraxtal") {
    return `https://fraxscan.com/tx/${txHash}`;
  }
  return `https://etherscan.io/tx/${txHash}`;
};
