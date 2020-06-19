import { Component, OnInit } from '@angular/core';
import { Site } from '../model/site';
import { SiteService } from '../services/site.service';
import { MessageService } from '../services/message.service';

import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

  sites: Site[];
  httpCode: number;
  displayedColumns: string[] = ['id', 'name', 'type', 'connect', 'description', 'authentication'];
  dataSource;

  constructor(private siteService: SiteService, private messageService: MessageService) { }

  ngOnInit(): void {
     this.getAllSites();
  }

  getAllSites() {
      this.messageService.add(`SiteComponent: Getting all sites`);
      this.siteService.getAllSites()
            .subscribe(response => {
              this.dataSource = new MatTableDataSource(response.data);
              this.httpCode = response.code;
            });
      this.messageService.add(`SiteComponent: Got all sites`);

  }

}
