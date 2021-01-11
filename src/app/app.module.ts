import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {MemberListComponent} from './main/member/member-list/member-list.component';
import {MemberFormComponent} from './main/member/member-form/member-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../@root/shared.module';
import {LayoutComponent} from './layout/layout.component';
import { ToolFormComponent } from './main/tool/tool-form/tool-form.component';
import { ToolListComponent } from './main/tool/tool-list/tool-list.component';
import { EventListComponent } from './main/event/event-list/event-list.component';
import { EventFormComponent } from './main/event/event-form/event-form.component';
import { PublicationFormComponent } from './main/publication/publication-form/publication-form.component';
import { PublicationListComponent } from './main/publication/publication-list/publication-list.component';
import { ParticipantListComponent } from './main/event/participant-list/participant-list.component';
<<<<<<< HEAD
import { AuteurListComponent } from './main/tool/auteur-list/auteur-list.component';
import {DatePipe} from "@angular/common";
=======
import { MemberDetailComponent } from './main/member/member-detail/member-detail.component';
import { MemberFormEtudiantComponent } from './main/member/member-form-etudiant/member-form-etudiant.component';
import { MemberFormEncadrantComponent } from './main/member/member-form-encadrant/member-form-encadrant.component';
>>>>>>> c2383a6d00611a2e8d60d6d450cef2420431ee53

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    MemberListComponent,
    MemberFormComponent,
    ToolFormComponent,
    ToolListComponent,
    EventListComponent,
    EventFormComponent,
    PublicationFormComponent,
    PublicationListComponent,
    ParticipantListComponent,
<<<<<<< HEAD
    AuteurListComponent,
=======
    MemberDetailComponent,
    MemberFormEtudiantComponent,
    MemberFormEncadrantComponent,
>>>>>>> c2383a6d00611a2e8d60d6d450cef2420431ee53
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
