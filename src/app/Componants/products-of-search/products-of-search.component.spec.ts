import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsOfSearchComponent } from './products-of-search.component';

describe('ProductsOfSearchComponent', () => {
  let component: ProductsOfSearchComponent;
  let fixture: ComponentFixture<ProductsOfSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsOfSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsOfSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
