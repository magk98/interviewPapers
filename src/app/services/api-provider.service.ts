import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Block} from "../interfaces/block";

const basicUrl = 'https://api.tzkt.io/v1';


@Injectable({
  providedIn: 'root'
})
export class ApiProviderService {

  constructor(public httpClient: HttpClient) {
  }

  public getList(): Observable<Block[]> {
    return this.httpClient.get(basicUrl + '/blocks').pipe(tap(console.log));
  }
}
