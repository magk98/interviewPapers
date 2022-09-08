import {Component} from '@angular/core';
import {ApiProviderService} from "../services/api-provider.service";
import {Router} from "@angular/router";
import {Block} from "../interfaces/Block";
import {BehaviorSubject, Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.scss']
})
export class BlockListComponent {
  public blockList$: Observable<Block[]>;
  public page$ = new BehaviorSubject<number>(1);

  constructor(public apiService: ApiProviderService,
              public router: Router) {
    this.blockList$ = this.page$.pipe(switchMap(number => this.apiService.getBlockList(number)));
  }

  public goToBlockDetails(level: number): void {
    this.router.navigateByUrl(String(level));
  }

  public loadNextPage(): void {
    this.page$.next(this.page$.getValue() + 1);
  }

  public loadPreviousPage(): void {
    this.page$.next(this.page$.getValue() > 2 ? this.page$.getValue() - 1 : 1);
  }

}
