import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInterestComponent } from './profile-interest.component';

describe('ProfileInterestComponent', () => {
  let component: ProfileInterestComponent;
  let fixture: ComponentFixture<ProfileInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
