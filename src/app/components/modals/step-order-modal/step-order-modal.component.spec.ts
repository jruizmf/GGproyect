import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepOrderModalComponent } from './step-order-modal.component';

describe('StepOrderModalComponent', () => {
  let component: StepOrderModalComponent;
  let fixture: ComponentFixture<StepOrderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepOrderModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepOrderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
