import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTrackingComponent } from './service-tracking.component';

describe('ServiceTrackingComponent', () => {
  let component: ServiceTrackingComponent;
  let fixture: ComponentFixture<ServiceTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
