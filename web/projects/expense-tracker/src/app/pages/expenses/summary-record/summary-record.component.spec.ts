import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryRecordComponent } from './summary-record.component';

describe('SummaryRecordComponent', () => {
  let component: SummaryRecordComponent;
  let fixture: ComponentFixture<SummaryRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
