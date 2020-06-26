import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopNavBarComponent } from './desktop-nav-bar.component';

describe('DesktopNavBarComponent', () => {
  let component: DesktopNavBarComponent;
  let fixture: ComponentFixture<DesktopNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesktopNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
