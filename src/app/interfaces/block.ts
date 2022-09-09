export interface Block {
  level: number;
  proposer?: User;
  timestamp: string;
  transactionCount?: number;
}

export interface User {
  alias: string;
  address: string;
}
