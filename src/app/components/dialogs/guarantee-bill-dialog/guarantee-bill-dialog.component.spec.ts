import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeBillDialogComponent } from './guarantee-bill-dialog.component';

describe('GuaranteeBillDialogComponent', () => {
  let component: GuaranteeBillDialogComponent;
  let fixture: ComponentFixture<GuaranteeBillDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuaranteeBillDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuaranteeBillDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
