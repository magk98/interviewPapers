export interface Block {
  level: number;
  proposer?: Proposer;
  timestamp: string;

}

interface Proposer {
  alias: string;
  address: string;
}
