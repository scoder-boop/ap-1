import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { Profile } from '../profile';
import { ProfileService } from '../profile.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  @Input() profile: Profile;
  title: string;
  data: any;
  code: number;

  constructor(
    private profileService: ProfileService,
    private messageService: MessageService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  save(): void {
    if (this.profile.id) {
      this.profileService.updateProfile(this.profile)
        .subscribe(response => {
          this.code = response.code;
          this.data = response.data;
          if (this.code == 200) {
            this.messageService.add(`ProfileDetail: Profile id=${this.profile.id} updated successfully`);
          } else {
            this.messageService.add(`ProfileDetail: Profile update failed. Code ${this.code} Message: ${this.data} `);
          }
        });

    } else {
      this.messageService.add(`ProfileDetail: Trying to add 1`);
      this.profileService.addProfile(this.profile)
        .subscribe(response => {
          this.code = response.code;
          this.data = response.data;
          if (this.code == 200) {
            this.messageService.add(`ProfileDetail: Profile added successfully`);
          } else {
            this.messageService.add(`ProfileDetail: Adding new profile failed. Code ${this.code} Message: ${this.data} `);
          }
        });

    }
  }

  // use with     .subscribe(() => this.goBack());
  goBack(): void {
    this.location.back();
  }
}
