import { Component, OnInit } from '@angular/core';
import {ApiProviderService} from "../services/api-provider.service";

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.css']
})
export class BlockListComponent implements OnInit {
  public blockList$ = this.apiService.getList();

  constructor(public apiService: ApiProviderService) { }

  ngOnInit(): void {
    this.blockList$.subscribe();
  }

}
