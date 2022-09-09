import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {BlockDetailsComponent} from './block-details.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CommonModule} from "@angular/common";
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";
import {ApiProviderService} from "../services/api-provider.service";
import {Transaction} from "../interfaces/transaction";
import {of} from "rxjs";
import SpyObj = jasmine.SpyObj;

describe('BlockDetailsComponent', () => {
  let component: BlockDetailsComponent;
  let fixture: ComponentFixture<BlockDetailsComponent>;
  let apiServiceMockup: SpyObj<ApiProviderService>;

  beforeEach(async () => {
    apiServiceMockup = jasmine.createSpyObj('ApiProviderService',
      ['getBlockList', 'getTransactionsCount', 'getBlockTransactionsList']);
    await TestBed.configureTestingModule({
      declarations: [BlockDetailsComponent],
      imports: [CommonModule, HttpClientTestingModule, RouterTestingModule],
      providers: [{provide: ApiProviderService, useValue: apiServiceMockup}]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BlockDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(BlockDetailsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should display one transaction in table', fakeAsync(() => {
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
    const fixture = TestBed.createComponent(BlockDetailsComponent);
    apiServiceMockup.getBlockTransactionsList.and.returnValue(of(transaction));
    fixture.detectChanges();
    const compiled = fixture.debugElement.queryAll(By.css('.table-element'));
    expect(compiled.length).toEqual(1);
  }))

});
