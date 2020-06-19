import { TestBed } from '@angular/core/testing';

import { ProfileSiteService } from './profile-site.service';

describe('ProfileSiteService', () => {
  let service: ProfileSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileSiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
