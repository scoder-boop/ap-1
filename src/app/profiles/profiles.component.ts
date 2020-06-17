import { Component, Input, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatFormField } from '@angular/material/form-field';
//import { MatPaginator } from '@angular/material/paginator';

import { Profile } from '../model/profile';
import { ProfileObject } from '../model/profile';
import { ProfileService } from '../services/profile.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})

export class ProfilesComponent implements OnInit {

  @Input()
  profiles: Profile[];

  httpCode: number;
  selectedProfile: Profile;
  newProfile: Profile;
  displayedColumns: string[] = ['id', 'username', 'firstName', 'lastName', 'email', 'address', 'phoneNumber', 'actions'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
//  @ViewChild(MatPaginator) paginator: MatPaginator;

  length = 1000;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];


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

  archive(profile: Profile): void {
    this.messageService.add(`ProfileService: Trying to Archive Profiles`);
    profile.active = false;
    this.dataSource = this.dataSource.data.filter(h => h != profile);
    this.profileService.updateProfile(profile)
      .subscribe(response => {
        this.httpCode = response.code;
      });
    this.messageService.add(`ProfileService: Profile archived`);
  }

  updateProfile(profile: Profile) {
    this.messageService.add(`ProfileService: Updating Profiles`);
    this.profileService.updateProfile(profile)
      .subscribe(response => {
        this.httpCode = response.code;
      });
    profile.editable = !profile.editable;
    this.messageService.add(`ProfileService: Profile updated`);

  }

  onRowClicked(): void {
  }

  refresh(): void {
    this.getProfiles();
  }

  refresh2(): void {
/*
    this.service.method().subscribe(resources => {
      this.dataSource.data = resources;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
 */
    this.table.renderRows();
  }

  editProfile(profile) {
    profile.editable = !profile.editable;
  }

  addNew(): void {
    this.messageService.add("Profile: Creating new profile");
    this.messageService.add(`ProfileDetail: Trying to add 1`);
    this.profileService.addProfile(this.newProfile)
        .subscribe(response => {
          this.httpCode = response.code;
          if (this.httpCode == 200) {
            this.messageService.add(`ProfileDetail: Profile added successfully`);
          } else {
            this.messageService.add(`ProfileDetail: Adding new profile failed. Code ${this.httpCode} Message: ${response.data} `);
          }
        });
    this.refresh();
    this.newProfile = new ProfileObject();
  }

  add(): void {
    this.newProfile = new ProfileObject();
    this.newProfile.editable = true;
    this.messageService.add("ProfileService: Create new profile");
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

