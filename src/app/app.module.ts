import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfilesComponent } from './profiles/profiles.component';
//import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { MessageComponent } from './message/message.component';
import { ProfileSearchComponent } from './profile-search/profile-search.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { HomeComponent } from './home/home.component';
import { ProfileSiteComponent } from './profile-site/profile-site.component';
import { SiteComponent } from './site/site.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfilesComponent,
//    ProfileDetailComponent,
    MessageComponent,
    ProfileSearchComponent,
    ProgressSpinnerComponent,
    HomeComponent,
    ProfileSiteComponent,
    SiteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
