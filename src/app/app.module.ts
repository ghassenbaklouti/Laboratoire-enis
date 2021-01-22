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
import { AuteurListComponent } from './main/tool/auteur-list/auteur-list.component';
import {DatePipe} from '@angular/common';
import { MemberDetailComponent } from './main/member/member-detail/member-detail.component';
import { MemberFormEtudiantComponent } from './main/member/member-form-etudiant/member-form-etudiant.component';
import { MemberFormEncadrantComponent } from './main/member/member-form-encadrant/member-form-encadrant.component';
import { AuteurPublicationListComponent } from './main/publication/auteur-publication-list/auteur-publication-list.component';
import { LoginComponent } from './main/login/login.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
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
    AuteurListComponent,
    MemberDetailComponent,
    MemberFormEtudiantComponent,
    MemberFormEncadrantComponent,
    AuteurPublicationListComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
