import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfServiceComponent } from './type-of-service.component';

describe('TypeOfServiceComponent', () => {
  let component: TypeOfServiceComponent;
  let fixture: ComponentFixture<TypeOfServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeOfServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
