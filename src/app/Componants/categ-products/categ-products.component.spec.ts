import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategProductsComponent } from './categ-products.component';

describe('CategProductsComponent', () => {
  let component: CategProductsComponent;
  let fixture: ComponentFixture<CategProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
