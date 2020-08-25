import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcServiceDialogComponent } from './pc-service-dialog.component';

describe('PcServiceDialogComponent', () => {
  let component: PcServiceDialogComponent;
  let fixture: ComponentFixture<PcServiceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcServiceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
