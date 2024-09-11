import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptTemplatePlantComponent } from './accept-template-plant.component';

describe('AcceptTemplatePlantComponent', () => {
  let component: AcceptTemplatePlantComponent;
  let fixture: ComponentFixture<AcceptTemplatePlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptTemplatePlantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcceptTemplatePlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
