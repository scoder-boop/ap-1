import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

//import { Profile } from '../model/profile';
//import { ProfileService } from '../services/profile.service';
//import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-profile-site',
  templateUrl: './profile-site.component.html',
  styleUrls: ['./profile-site.component.css']
})
export class ProfileSiteComponent implements OnInit {
//  @Input() profile: Profile;

  constructor(
//    private profileService: ProfileService,
//    private messageService: MessageService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

}
