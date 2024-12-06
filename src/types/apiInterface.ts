import { Address } from "viem";

export type SavingsVaultInfos = {
  tvl: number;
  apr: number;
  url: string;
};

export enum EventType {
  Deposit = "deposit",
  Withdraw = "withdraw",
}

export type Event = {
  type: EventType;
  amount: number;
  hash: string;
  timestamp: number;
  chain: string;
};

type Vault = {
  collateral: string;
  borrowed: string;
  address: Address;
  lendApyPcent: number;
  chainId: string;
  depositUrl: string;
  withdrawUrl: string;
  collateralTvlUsd: number;
  borrowedTvl: number;
  availableToBorrow: number;
};

export type VaultWithEvents = Vault & {
  deposited: number;
  redeemValue: number;
  earnings: number;
  events: Event[];
};

export type UserSavingsData = {
  deposited: number;
  redeemValue: number;
  earnings: number;
  events: Event[];
};
