import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantCoalComponent } from './plant-coal.component';

describe('PlantCoalComponent', () => {
  let component: PlantCoalComponent;
  let fixture: ComponentFixture<PlantCoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantCoalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlantCoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
