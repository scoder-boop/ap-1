import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Site } from '../model/site';
import { SiteObject } from '../model/site';
import { SiteService } from '../services/site.service';
import { MessageService } from '../services/message.service';

import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

  siteEditInProgress: boolean = false;
  sites: Site[];
  newSite: Site;
  copiedSite: Site;
  httpCode: number;
  selected: 'APP';
  displayedColumns: string[] = ['name', 'type', 'connect', 'description', 'siteAuthDetails', 'accept', 'useable', 'actions'];
//  allowedSiteTypes: string[] = ['URL', 'APP'];
  dataSource;
  componentName = 'SiteComponent';

  constructor(private siteService: SiteService, private messageService: MessageService) { }

  ngOnInit(): void {
     this.messageService.add(`${this.componentName}: NgInit`);
     this.getAllSites();
  }

  getAllSites() {
      this.messageService.add(`${this.componentName}: Getting all sites`);
      this.siteService.getAllSites()
            .subscribe(response => {
              this.sites = response.data;
              this.dataSource = new MatTableDataSource(response.data);
              this.httpCode = response.code;
            });
      this.messageService.add(`${this.componentName}: Got all sites`);

  }

   add(): void {
      this.newSite = new SiteObject();
      this.newSite.editable = true;
      this.messageService.add(`${this.componentName}: Creating new site`);
    }

  addNew(): void {
    this.messageService.add(`${this.componentName}: Creating new site`);
    this.messageService.add(`${this.componentName}: Selected=${this.selected}`);
    if (!this.newSite.name || !this.newSite.siteType || !this.newSite.connectionString) {
        this.messageService.add(`${this.componentName}: name, type or connection details missing - please update`);
        return;
    }
    this.newSite.useable = true;
    this.siteService.addSite(this.newSite)
        .subscribe(response => {
          this.httpCode = response.code;
          if (this.httpCode == 200) {
            this.messageService.add(`${this.componentName}: Site added successfully ID: ${response.data.id}  `);
          } else {
            this.messageService.add(`${this.componentName}: Adding new site failed. Code ${this.httpCode} Message: ${response.data} `);
            return;
          }
        });
    this.newSite.editable = false;
    this.sites.push(this.newSite);
    this.dataSource = new MatTableDataSource(this.sites);
    this.newSite = new SiteObject();
  }

  changeUseableStatus(site: Site): void {
    this.messageService.add(`${this.componentName}: Trying to change Archive Status`);
    this.sites = this.sites.filter(h => h.id !== site.id);
    site.useable = !site.useable;
    this.siteService.updateSite(site)
      .subscribe(response => {
        this.httpCode = response.code;
      });
    this.messageService.add(`${this.componentName}: Site Archive Status changed`);
  }

  editSite(site: Site) {
    if (this.siteEditInProgress) {
      this.messageService.add(`${this.componentName} Save or cancel existing changes first`);
      return;
    }
    this.copiedSite = JSON.parse(JSON.stringify(site));
    site.editable = !site.editable;
    this.siteEditInProgress = !this.siteEditInProgress;
  }

  updateSite(site: Site) {
    this.messageService.add(`${this.componentName}: Updating Site`);
    this.siteService.updateSite(site)
      .subscribe(response => {
        this.httpCode = response.code;
      });
    site.editable = !site.editable;
    this.messageService.add(`${this.componentName}: Site updated`);
    this.siteEditInProgress = !this.siteEditInProgress;
  }

  cancelUpdate(site) {
    site.editable = !site.editable;
    site.name = this.copiedSite.name;
    site.siteType = this.copiedSite.siteType;
    site.connectionString = this.copiedSite.connectionString;
    site.description = this.copiedSite.description;
    site.siteAuthDetails = this.copiedSite.siteAuthDetails;
    site.acceptXpath = this.copiedSite.acceptXpath;
    site.useable = this.copiedSite.useable;
    this.copiedSite = new SiteObject();
    this.siteEditInProgress = !this.siteEditInProgress;
 }

  onRowClicked(): void {
  }

}
