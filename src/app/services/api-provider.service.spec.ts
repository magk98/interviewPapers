import {TestBed} from '@angular/core/testing';

import {ApiProviderService} from './api-provider.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Block} from "../interfaces/block";
import {of} from "rxjs";
import {Transaction} from "../interfaces/transaction";
import {RouterTestingModule} from '@angular/router/testing';

describe('HttpProviderService', () => {
  let service: ApiProviderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
    service = TestBed.inject(ApiProviderService);
  });

  it('should return transactions count for block level 2695307', async () => {
    expect(service).toBeTruthy();
    const block = {level: 2695307, timestamp: "2022-09-09T12:10:59Z"};
    const resultBlock: Block = {level: 2695307, timestamp: '2022-09-09T12:10:59Z', transactionCount: 61};
    spyOn(service, 'getTransactionsCount').withArgs(block).and.returnValue(of(resultBlock));
    service.getTransactionsCount(block).subscribe(result => expect(result).toEqual(resultBlock));
  });

  it('should return transaction for block 23', () => {
    expect(service).toBeTruthy();
    const level = '23';
    const transaction: Transaction[] = [{
      sender: {
        address: "tz1NKVAxzJusWgKewn4LEViPSQVRE5Kg6XFV"
      },
      target: {
        alias: "Vested funds 1",
        address: "KT1WPEis2WhAc2FciM2tZVn8qe6pCBe9HkDp"
      },
      amount: 0,
      status: "applied"
    }];
    spyOn(service, 'getBlockTransactionsList').withArgs(level).and.returnValue(of(transaction));
    service.getBlockTransactionsList(level).subscribe(result => expect(result).toEqual(transaction));
  });

  it('should return empty transactions list for block 1', () => {
    expect(service).toBeTruthy();
    const level = '1';
    const transaction: Transaction[] = [];
    spyOn(service, 'getBlockTransactionsList').withArgs(level).and.returnValue(of(transaction));
    service.getBlockTransactionsList(level).subscribe(result => expect(result).toEqual(transaction));
  });

  it('should return empty transactions list for non existing block level', () => {
    expect(service).toBeTruthy();
    const level = '-1';
    const transaction: Transaction[] = [];
    spyOn(service, 'getBlockTransactionsList').withArgs(level).and.returnValue(of(transaction));
    service.getBlockTransactionsList(level).subscribe(result => expect(result).toEqual(transaction));
  });

});
