import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KabinetComponent } from './kabinet.component';

describe('KabinetComponent', () => {
  let component: KabinetComponent;
  let fixture: ComponentFixture<KabinetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KabinetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
