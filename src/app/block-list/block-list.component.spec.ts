import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockListComponent } from './block-list.component';
import {BlockDetailsComponent} from "../block-details/block-details.component";
import {By} from "@angular/platform-browser";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ApiProviderService} from "../services/api-provider.service";
import {ActivatedRoute} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

describe('BlockListComponent', () => {
  let component: BlockListComponent;
  let fixture: ComponentFixture<BlockListComponent>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockListComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ApiProviderService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render table with 5 column titles', () => {
    const fixture = TestBed.createComponent(BlockDetailsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.query(By.css('table-titles'));
    expect(compiled.children.length).toEqual(5);
  })

  it('should render title TZKT blocks in header tag', () => {
    const fixture = TestBed.createComponent(BlockDetailsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('header').textContent).toContain('TZKT blocks');
  })
});
