import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqlistComponent } from './reqlist.component';

describe('ReqlistComponent', () => {
  let component: ReqlistComponent;
  let fixture: ComponentFixture<ReqlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReqlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReqlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
