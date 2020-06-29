import { Component, Input, OnInit, PipeTransform, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatFormField } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';

import { Profile } from '../model/profile';
import { ProfileInterest } from '../model/profileInterest';
import { ProfileObject } from '../model/profile';
import { ProfileService } from '../services/profile.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css'],
  animations: [
        trigger('detailExpand', [
        state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
        state('expanded', style({height: '*', visibility: 'visible'})),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      ]),
    ],
})

export class ProfilesComponent implements OnInit {

  @Input()
  profiles: Profile[];

  expandedProfile: Profile | null;

  editInProgress: boolean = false;
  httpCode: number;
  copiedProfile: Profile;
  newProfile: Profile;
  displayedColumns: string[] = ['id', 'username', 'firstName', 'lastName', 'email', 'address', 'phoneNumber', 'actions'];
  dataSource = new MatTableDataSource(this.profiles);

//  expandedRow: number;
//  @ViewChildren('myRow', { read: ViewContainerRef }) containers;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
//  @ViewChild(MatPaginator) paginator: MatPaginator;

//  length = 1000;
//  pageSize = 10;
//  pageSizeOptions: number[] = [5, 10, 25, 100];


  constructor(private profileService: ProfileService, private messageService: MessageService) { }

  ngOnInit(): void {
 //    setTimeout(() => this.dataSource.paginator = this.paginator);
 //   this.getProfiles();
  }

  onSelect(profile: Profile): void {
    this.messageService.add(`ProfileService: Selected profile id=${profile.id}`);
  }

  changeArchiveStatus(profile: Profile): void {
    this.messageService.add(`ProfilesComponent: Trying to change Archive Status`);
    this.profiles = this.profiles.filter(h => h.id !== profile.id);
    profile.active = !profile.active;
    this.profileService.updateProfile(profile)
      .subscribe(response => {
        this.httpCode = response.code;
      });
    this.messageService.add(`ProfilesComponent: Profile Archive Status changed`);
  }

  editProfile(profile) {
    if (this.editInProgress) {
      this.messageService.add("Save or cancel existing changes first");
      return;
    }
    this.copiedProfile = JSON.parse(JSON.stringify(profile));
    profile.editable = !profile.editable;
    this.editInProgress = !this.editInProgress;
  }

  updateProfile(profile: Profile) {
    this.messageService.add(`ProfilesComponent: Updating Profiles`);
    this.profileService.updateProfile(profile)
      .subscribe(response => {
        this.httpCode = response.code;
      });
    profile.editable = !profile.editable;
    this.messageService.add(`ProfilesComponent: Profile updated`);
    this.editInProgress = !this.editInProgress;
  }

  cancelUpdate(profile) {
    profile.editable = !profile.editable;
    profile.username = this.copiedProfile.username;
    profile.firstName = this.copiedProfile.firstName;
    profile.lastName = this.copiedProfile.lastName;
    profile.email = this.copiedProfile.email;
    profile.address = this.copiedProfile.address;
    profile.phoneNumber = this.copiedProfile.phoneNumber;
    this.copiedProfile = new ProfileObject();
    this.editInProgress = !this.editInProgress;
 }

  add(): void {
    this.newProfile = new ProfileObject();
    this.newProfile.editable = true;
    this.messageService.add("ProfilesComponent: Create new profile");
  }

  addNew(): void {
    this.messageService.add("Profile: Creating new profile");
    if (!this.newProfile.username || !this.newProfile.firstName || !this.newProfile.lastName) {
        this.messageService.add(`ProfilesComponent: username, first or last name emtpy - please update`);
        return;
    }
    this.profileService.addProfile(this.newProfile)
        .subscribe(response => {
          this.httpCode = response.code;
          if (this.httpCode == 200) {
            this.messageService.add(`ProfilesComponent: Profile added successfully`);
          } else {
            this.messageService.add(`ProfilesComponent: Adding new profile failed. Code ${this.httpCode} Message: ${response.data} `);
            return;
          }
        });
    this.newProfile.editable = false;
    this.profiles.push(this.newProfile);
    this.dataSource = new MatTableDataSource(this.profiles);

    this.newProfile = new ProfileObject();
  }

  onRowClicked(): void {
  }


/*
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
 */
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

