import { Component, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Profile } from '../profile';
import { ProfileObject } from '../profile';
import { ProfileService } from '../profile.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})

export class ProfilesComponent implements OnInit {

  httpCode: number;
  selectedProfile: Profile;
  displayedColumns: string[] = ['id', 'username', 'firstName', 'lastName', 'email', 'address', 'phoneNumber', 'actions'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private profileService: ProfileService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getProfiles();
  }

  onSelect(profile: Profile): void {
    this.selectedProfile = profile;
    this.messageService.add(`ProfileService: Selected profile id=${profile.id}`);
  }

  getProfiles(): void {
    this.messageService.add(`ProfileService: Getting Profiles`);
    this.profileService.getProfiles()
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.sort = this.sort;
        this.httpCode = response.code;
      });
    this.messageService.add(`ProfileService: Profiles done`);

  }

  updateProfile(profile: Profile) {
    this.messageService.add(`ProfileService: Updating Profiles`);
    this.profileService.updateProfile(profile)
      .subscribe(response => {
        this.httpCode = response.code;
      });
    this.messageService.add(`ProfileService: Profile updated`);

  }

  refresh(): void {
    this.getProfiles();
  }

  editProfile(profile) {
    profile.editable = !profile.editable;
  }

  add(): void {
    this.selectedProfile = new ProfileObject();
    this.messageService.add("ProfileService: Create new profile");
  }
  //  add(username: string): void {
  //    username = username.trim();
  //    if (!name) { return; }
  //    this.profileService.addProfile({ username } as Profile)
  //      .subscribe(profile => {
  //        this.profiles.push(profile);
  //      });
  //  }

  archive(profile: Profile): void {
    this.dataSource = this.dataSource.filter(h => h !== profile);
    this.profileService.archive(profile).subscribe();
  }


/*   search(text: string, pipe: PipeTransform): Profile[] {
    return this.profiles.filter(profile => {
      const term = text.toLowerCase();
      return profile.username.toLowerCase().includes(term)
        || pipe.transform(profile.firstName).includes(term)
        || pipe.transform(profile.lastName).includes(term)
        || pipe.transform(profile.email).includes(term)
        || pipe.transform(profile.address).includes(term)
        || pipe.transform(profile.phoneNumber).includes(term)
        ;
    });
  } */
}

