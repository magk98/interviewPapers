import {Component} from '@angular/core';
import {ApiProviderService, pageCount} from "../services/api-provider.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, map, Observable, switchMap} from "rxjs";
import {Transaction} from "../interfaces/transaction";

const PARAM_ID = 'id';

@Component({
  selector: 'app-block-details',
  templateUrl: './block-details.component.html',
  styleUrls: ['../block-list/block-list.component.scss', './block-details.component.scss']
})
export class BlockDetailsComponent {
  public readonly page$ = new BehaviorSubject<number>(0);
  public readonly transactionsList$: Observable<Transaction[]>;

  public level: string = this.activatedRoute.snapshot.paramMap.get(PARAM_ID) as string;
  public isLastPage$: Observable<boolean>;

  constructor(public apiService: ApiProviderService,
              public activatedRoute: ActivatedRoute,
              public router: Router) {
    this.transactionsList$ = this.page$.pipe(switchMap(number => this.apiService.getBlockTransactionsList(this.level, number)));
    this.isLastPage$ = this.transactionsList$.pipe(map(list => list.length <= pageCount));
  }


  public loadNextPage(): void {
    this.page$.next(this.page$.value + 1);
  }

  public loadPreviousPage(): void {
    this.page$.next(this.page$.value > 1 ? this.page$.value - 1 : 0);
  }

  public goBack(): void {
    this.router.navigateByUrl('/');
  }

}
