import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllComputersComponent } from './all-computers.component';

describe('AllComputersComponent', () => {
  let component: AllComputersComponent;
  let fixture: ComponentFixture<AllComputersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllComputersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllComputersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
