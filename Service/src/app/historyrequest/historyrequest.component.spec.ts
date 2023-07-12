import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryrequestComponent } from './historyrequest.component';

describe('HistoryrequestComponent', () => {
  let component: HistoryrequestComponent;
  let fixture: ComponentFixture<HistoryrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryrequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
