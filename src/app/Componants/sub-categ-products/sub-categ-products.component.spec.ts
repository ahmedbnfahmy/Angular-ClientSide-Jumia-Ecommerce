import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategProductsComponent } from './sub-categ-products.component';

describe('SubCategProductsComponent', () => {
  let component: SubCategProductsComponent;
  let fixture: ComponentFixture<SubCategProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCategProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
