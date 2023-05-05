import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuicklyRequestComponent } from './quickly-request.component';

describe('QuicklyRequestComponent', () => {
  let component: QuicklyRequestComponent;
  let fixture: ComponentFixture<QuicklyRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuicklyRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuicklyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
