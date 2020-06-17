import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Profile } from "../model/profile";
import { ProfileService } from "../services/profile.service";
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    httpCode: number;
    activeProfiles$: Observable<Profile[]>;
    archivedProfiles$: Observable<Profile[]>;

    constructor(private profileService: ProfileService, private messageService: MessageService) { }

    ngOnInit() {
        this.messageService.add(`Home: Getting Profiles`);

        const response$ = this.profileService.getAllProfiles();
        console.log(response$);

        this.messageService.add(`Home: Profiles done`);


        this.activeProfiles$ = response$.pipe(
          map(profiles => profiles.data.filter(profile => profile.active === true) )
        );

        this.archivedProfiles$ = response$.pipe(
            map(profiles => profiles.data.filter(profile => profile.active === false) )
        );
    }

}
