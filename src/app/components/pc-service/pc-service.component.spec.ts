import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcServiceComponent } from './pc-service.component';

describe('PcServiceComponent', () => {
  let component: PcServiceComponent;
  let fixture: ComponentFixture<PcServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
