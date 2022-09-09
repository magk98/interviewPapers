import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin, map, mergeMap, Observable} from "rxjs";
import {Block} from "../interfaces/block";
import {Transaction} from "../interfaces/transaction";

export const pageCount = 100;
const basicUrl = 'https://api.tzkt.io/v1';
const basicTransactionsUrl = 'https://api.tzkt.io/v1/operations/transactions';


@Injectable({
  providedIn: 'root'
})
export class ApiProviderService {

  constructor(public httpClient: HttpClient) {
  }

  public getBlockList(page: number = 1): Observable<Block[]> {
    return this.httpClient
      .get<Block[]>(basicUrl + '/blocks', {params: {'sort.desc': 'level', 'offset.pg': page, limit: pageCount}})
      .pipe(mergeMap(result => forkJoin(...result.map(block => this.getTransactionsCount(block)))));
  }

  public getTransactionsCount(block: Block): Observable<Block> {
    return this.httpClient.get<number>(basicTransactionsUrl + '/count', {params: {level: block.level}})
      .pipe(map(count => {
        return {...block, transactionCount: count}
      }));
  }

  public getBlockTransactionsList(level: string, page: number = 1): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(basicTransactionsUrl,
      {params: {level, 'offset.pg': page, limit: pageCount}})
      .pipe(map(transactions => transactions.length > 0 ? transactions : []));
  }
}
