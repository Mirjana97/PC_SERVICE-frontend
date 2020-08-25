import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeBillComponent } from './guarantee-bill.component';

describe('GuaranteeBillComponent', () => {
  let component: GuaranteeBillComponent;
  let fixture: ComponentFixture<GuaranteeBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuaranteeBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuaranteeBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
