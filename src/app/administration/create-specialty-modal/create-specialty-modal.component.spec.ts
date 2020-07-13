import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSpecialtyModalComponent } from './create-specialty-modal.component';

describe('CreateSpecialtyModalComponent', () => {
  let component: CreateSpecialtyModalComponent;
  let fixture: ComponentFixture<CreateSpecialtyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSpecialtyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSpecialtyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
