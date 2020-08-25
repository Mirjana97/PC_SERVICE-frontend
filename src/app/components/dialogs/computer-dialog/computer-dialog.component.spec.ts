import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerDialogComponent } from './computer-dialog.component';

describe('ComputerDialogComponent', () => {
  let component: ComputerDialogComponent;
  let fixture: ComponentFixture<ComputerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
