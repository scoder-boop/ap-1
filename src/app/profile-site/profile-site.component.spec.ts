import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSiteComponent } from './profile-site.component';

describe('ProfileSiteComponent', () => {
  let component: ProfileSiteComponent;
  let fixture: ComponentFixture<ProfileSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
