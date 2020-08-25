import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTrackingDialogComponent } from './service-tracking-dialog.component';

describe('ServiceTrackingDialogComponent', () => {
  let component: ServiceTrackingDialogComponent;
  let fixture: ComponentFixture<ServiceTrackingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceTrackingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTrackingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
