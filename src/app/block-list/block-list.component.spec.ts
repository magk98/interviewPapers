import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from "@angular/common";

import {BlockListComponent} from './block-list.component';
import {By} from "@angular/platform-browser";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ApiProviderService} from "../services/api-provider.service";
import {RouterTestingModule} from "@angular/router/testing";
import {of} from "rxjs";
import {Block} from "../interfaces/block";
import SpyObj = jasmine.SpyObj;

describe('BlockListComponent', () => {
  let component: BlockListComponent;
  let fixture: ComponentFixture<BlockListComponent>;
  let apiServiceMockup: SpyObj<ApiProviderService>;

  beforeEach(async () => {
    apiServiceMockup = jasmine.createSpyObj('ApiProviderService',
      ['getBlockList', 'getTransactionsCount', 'getBlockTransactionsList']);
    await TestBed.configureTestingModule({
      declarations: [BlockListComponent],
      imports: [CommonModule, HttpClientTestingModule, RouterTestingModule],
      providers: [{provide: ApiProviderService, useValue: apiServiceMockup}]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BlockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render table with 5 column titles', () => {
    const fixture = TestBed.createComponent(BlockListComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.query(By.css('.table-titles'));
    expect(compiled.children.length).toEqual(5);
  });

  it('should render title TZKT blocks in header tag', () => {
    const fixture = TestBed.createComponent(BlockListComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('header').textContent).toContain('TZKT blocks');
  });

  it('should render table with one block', () => {
    const block: Block[] = [{
      level: 1,
      proposer: {
        alias: "Vested funds 1",
        address: "KT1WPEis2WhAc2FciM2tZVn8qe6pCBe9HkDp"
      },
      timestamp: '',
      transactionCount: 12,
    }];
    const fixture = TestBed.createComponent(BlockListComponent);
    apiServiceMockup.getBlockList.and.returnValue(of(block));
    fixture.detectChanges();
    const compiled = fixture.debugElement.queryAll(By.css('.table-element'));
    expect(compiled.length).toEqual(1);
  });
});
