import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityDetailedComponent } from './city-detailed.component';

describe('CityDetailedComponent', () => {
  let component: CityDetailedComponent;
  let fixture: ComponentFixture<CityDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityDetailedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CityDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
