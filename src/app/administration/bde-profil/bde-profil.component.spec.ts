import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdeProfilComponent } from './bde-profil.component';

describe('BdeProfilComponent', () => {
  let component: BdeProfilComponent;
  let fixture: ComponentFixture<BdeProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdeProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdeProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
