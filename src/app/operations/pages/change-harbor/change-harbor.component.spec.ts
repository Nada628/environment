import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeHarborComponent } from './change-harbor.component';

describe('ChangeHarborComponent', () => {
  let component: ChangeHarborComponent;
  let fixture: ComponentFixture<ChangeHarborComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeHarborComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeHarborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
