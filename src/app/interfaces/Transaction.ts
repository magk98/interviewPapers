import {User} from "./Block";

export interface Transaction {
  sender?: User;
  target?: User;
  amount: number;
  status: string;
}
