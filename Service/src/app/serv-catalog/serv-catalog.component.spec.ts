import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServCatalogComponent } from './serv-catalog.component';

describe('ServCatalogComponent', () => {
  let component: ServCatalogComponent;
  let fixture: ComponentFixture<ServCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
