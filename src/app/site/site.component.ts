import { Component, OnInit } from '@angular/core';
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
  displayedColumns: string[] = ['id', 'name', 'type', 'connect', 'description', 'siteAuthDetails', 'accept', 'useable', 'actions'];
  dataSource;

  constructor(private siteService: SiteService, private messageService: MessageService) { }

  ngOnInit(): void {
     this.messageService.add(`SiteComponent: NgInit`);
     this.getAllSites();
  }

  getAllSites() {
      this.messageService.add(`SiteComponent: Getting all sites`);
      this.siteService.getAllSites()
            .subscribe(response => {
              this.sites = response.data;
              console.log(this.sites);
              this.dataSource = new MatTableDataSource(response.data);
              this.httpCode = response.code;
            });
      this.messageService.add(`SiteComponent: Got all sites`);

  }

    add(): void {
      this.newSite = new SiteObject();
      this.newSite.editable = true;
      this.messageService.add("SiteComponent: Creating new site");
    }

  addNew(): void {
    this.messageService.add("SiteComponent: Creating new site");
    console.log("new");
    console.log(this.newSite);
    if (!this.newSite.name || !this.newSite.siteType || !this.newSite.connectionString) {
        this.messageService.add(`SiteComponent: name, type or connection details missing - please update`);
        return;
    }
    this.newSite.useable = true;
    this.siteService.addSite(this.newSite)
        .subscribe(response => {
          this.httpCode = response.code;
          if (this.httpCode == 200) {
             this.newSite = response.data;
            this.messageService.add(`SiteComponent: Site added successfully`);
          } else {
            this.messageService.add(`SiteComponent: Adding new site failed. Code ${this.httpCode} Message: ${response.data} `);
            return;
          }
        });
    this.sites.push(this.newSite);
    this.dataSource = new MatTableDataSource(this.sites);
    this.newSite = new SiteObject();
  }

  changeUseableStatus(site: Site): void {
    this.messageService.add(`SitesComponent: Trying to change Archive Status`);
    this.sites = this.sites.filter(h => h.id !== site.id);
    site.useable = !site.useable;
    this.siteService.updateSite(site)
      .subscribe(response => {
        this.httpCode = response.code;
      });
    this.messageService.add(`SitesComponent: Site Archive Status changed`);
  }

  editSite(site: Site) {
    if (this.siteEditInProgress) {
      this.messageService.add("Save or cancel existing changes first");
      return;
    }
    this.copiedSite = JSON.parse(JSON.stringify(site));
    site.editable = !site.editable;
    this.siteEditInProgress = !this.siteEditInProgress;
  }

  updateSite(site: Site) {
    this.messageService.add(`SiteComponent: Updating Site`);
    this.siteService.updateSite(site)
      .subscribe(response => {
        this.httpCode = response.code;
      });
    site.editable = !site.editable;
    this.messageService.add(`SiteComponent: Site updated`);
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
