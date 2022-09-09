import {User} from "./block";

export interface Transaction {
  sender?: User;
  target?: User;
  amount: number;
  status: string;
}
