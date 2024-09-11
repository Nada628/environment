import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseCompaniesComponent } from './warehouse-companies.component';

describe('WarehouseCompaniesComponent', () => {
  let component: WarehouseCompaniesComponent;
  let fixture: ComponentFixture<WarehouseCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseCompaniesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WarehouseCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
