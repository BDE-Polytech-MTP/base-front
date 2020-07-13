import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBdeFormComponent } from './create-bde-form.component';

describe('CreateBdeFormComponent', () => {
  let component: CreateBdeFormComponent;
  let fixture: ComponentFixture<CreateBdeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBdeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBdeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
