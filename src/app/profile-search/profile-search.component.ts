import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Profile } from '../profile';
import { ProfileService } from '../profile.service';
import { NoisyResponse } from '../noisyResponse';


@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.css']
})

export class ProfileSearchComponent implements OnInit {

  profiles$: Observable<Profile[]>;
  noisyResponse$: Observable<NoisyResponse>;

  private searchTerms = new Subject<string>();

  constructor(private profileService: ProfileService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.noisyResponse$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.profileService.searchProfiles(term)),
    );
  }
}
