import { Component, OnInit } from '@angular/core';
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
import { ProfileInterestObject } from '../model/profileInterest';
import { ProfileInterestService } from '../services/profile-interest.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-profile-interest',
  templateUrl: './profile-interest.component.html',
  styleUrls: ['./profile-interest.component.css']
})

export class ProfileInterestComponent implements OnInit {
  profileInterests: ProfileInterest[];
  newProfileInterest: ProfileInterest;
  copiedProfileInterest: ProfileInterest;
  httpCode: number;
  displayedColumns: string[] = ['topic', 'active', 'actions'];
  dataSource;
  componentName = 'ProfileInterestComponent';
  editInProgress: boolean = false;

  constructor(private profileInterestService: ProfileInterestService, private messageService: MessageService) { }

  ngOnInit(): void {
       this.messageService.add(`${this.componentName}: NgInit`);
//       this.getProfileInterests();
  }

  getProfileInterests(profile: Profile) {
      this.messageService.add(`${this.componentName}: Getting all interests`);
      this.profileInterestService.getProfileInterests(profile.id)
            .subscribe(response => {
              this.profileInterests = response.data;
              this.dataSource = new MatTableDataSource(response.data);
              this.httpCode = response.code;
            });
      this.messageService.add(`${this.componentName}: Got all interests`);
  }


   add(): void {
      this.newProfileInterest = new ProfileInterestObject();
      this.newProfileInterest.editable = true;
      this.messageService.add(`${this.componentName}: Creating new profileInterest`);
    }

  addNew(): void {
    this.messageService.add(`${this.componentName}: Creating new profileInterest`);
    if (!this.newProfileInterest.topic ) {
        this.messageService.add(`${this.componentName}: topic missing - please update`);
        return;
    }
    this.newProfileInterest.active = true;
    this.profileInterestService.addProfileInterest(this.newProfileInterest)
        .subscribe(response => {
          this.httpCode = response.code;
          if (this.httpCode == 200) {
            this.messageService.add(`${this.componentName}: ProfileInterest added successfully ID: ${response.data.id}  `);
          } else {
            this.messageService.add(`${this.componentName}: Adding new profileInterest failed. Code ${this.httpCode} Message: ${response.data} `);
            return;
          }
        });
    this.newProfileInterest.editable = false;
    this.profileInterests.push(this.newProfileInterest);
    this.dataSource = new MatTableDataSource(this.profileInterests);
    this.newProfileInterest = new ProfileInterestObject();
  }

  changeActiveStatus(profileInterest: ProfileInterest): void {
    this.messageService.add(`${this.componentName}: Trying to change Archive Status`);
    this.profileInterests = this.profileInterests.filter(h => h.id !== profileInterest.id);
    profileInterest.active = !profileInterest.active;
    this.profileInterestService.updateProfileInterest(profileInterest)
      .subscribe(response => {
        this.httpCode = response.code;
      });
    this.messageService.add(`${this.componentName}: ProfileInterest Archive Status changed`);
  }

  editProfileInterest(profileInterest: ProfileInterest) {
    if (this.editInProgress) {
      this.messageService.add(`${this.componentName} Save or cancel existing changes first`);
      return;
    }
    this.copiedProfileInterest = JSON.parse(JSON.stringify(profileInterest));
    profileInterest.editable = !profileInterest.editable;
    this.editInProgress = !this.editInProgress;
  }

  updateProfileInterest(profileInterest: ProfileInterest) {
    this.messageService.add(`${this.componentName}: Updating ProfileInterest`);
    this.profileInterestService.updateProfileInterest(profileInterest)
      .subscribe(response => {
        this.httpCode = response.code;
      });
    profileInterest.editable = !profileInterest.editable;
    this.messageService.add(`${this.componentName}: ProfileInterest updated`);
    this.editInProgress = !this.editInProgress;
  }

  cancelUpdate(profileInterest) {
    profileInterest.editable = !profileInterest.editable;
    profileInterest.topic = this.copiedProfileInterest.topic;
    profileInterest.active = this.copiedProfileInterest.active;
    this.copiedProfileInterest = new ProfileInterestObject();
    this.editInProgress = !this.editInProgress;
 }
  onRowClicked(): void {
  }

}
