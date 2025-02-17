import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderModalComponent } from './order-modal.component';

describe('StepOrderModalComponent', () => {
  let component: OrderModalComponent;
  let fixture: ComponentFixture<OrderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
