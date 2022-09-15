import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLoansComponent } from './edit-loans.component';

describe('EditLoansComponent', () => {
  let component: EditLoansComponent;
  let fixture: ComponentFixture<EditLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLoansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
