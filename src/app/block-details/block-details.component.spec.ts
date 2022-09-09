import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockDetailsComponent } from './block-details.component';
import {By} from "@angular/platform-browser";
import {AppComponent} from "../app.component";

describe('BlockDetailsComponent', () => {
  let component: BlockDetailsComponent;
  let fixture: ComponentFixture<BlockDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockDetailsComponent ]
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

});
