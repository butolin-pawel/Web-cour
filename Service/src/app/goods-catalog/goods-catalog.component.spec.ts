import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsCatalogComponent } from './goods-catalog.component';

describe('GoodsCatalogComponent', () => {
  let component: GoodsCatalogComponent;
  let fixture: ComponentFixture<GoodsCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodsCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
