import {Component, OnInit} from '@angular/core';
import {ApiProviderService, pageCount} from "../services/api-provider.service";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, map, Observable, switchMap} from "rxjs";
import {Transaction} from "../interfaces/Transaction";

const PARAM_ID = 'id';

@Component({
  selector: 'app-block-details',
  templateUrl: './block-details.component.html',
  styleUrls: ['../block-list/block-list.component.scss', './block-details.component.scss']
})
export class BlockDetailsComponent implements OnInit {
  public id = this.activatedRoute.snapshot.paramMap.get(PARAM_ID);

  public page$ = new BehaviorSubject<number>(1);
  public transactionsList$: Observable<Transaction[]>;
  public isLastPage$: Observable<boolean>;

  constructor(public apiService: ApiProviderService,
              public activatedRoute: ActivatedRoute) {
    this.transactionsList$ = this.page$.pipe(switchMap(number => this.apiService.getBlockTransactionsList(this.id || '', number)));
    this.isLastPage$ = this.transactionsList$.pipe(map(list => list.length <= pageCount));
  }

  ngOnInit(): void {
  }

  public loadNextPage(): void {
    this.page$.next(this.page$.getValue() + 1);
  }

  public loadPreviousPage(): void {
    this.page$.next(this.page$.getValue() > 2 ? this.page$.getValue() - 1 : 1);
  }

}
