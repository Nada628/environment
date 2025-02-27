import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyModalComponent } from './add-company-modal.component';

describe('AddCompanyModalComponent', () => {
  let component: AddCompanyModalComponent;
  let fixture: ComponentFixture<AddCompanyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCompanyModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCompanyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
