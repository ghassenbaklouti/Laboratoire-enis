import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {MemberListComponent} from './main/member/member-list/member-list.component';
import {MemberFormComponent} from './main/member/member-form/member-form.component';
import {ToolListComponent} from './main/tool/tool-list/tool-list.component';
import {ToolFormComponent} from './main/tool/tool-form/tool-form.component';
import {PublicationListComponent} from './main/publication/publication-list/publication-list.component';
import {PublicationFormComponent} from './main/publication/publication-form/publication-form.component';
import {EventListComponent} from './main/event/event-list/event-list.component';
import {EventFormComponent} from './main/event/event-form/event-form.component';
import {ParticipantListComponent} from './main/event/participant-list/participant-list.component';
import {AuteurListComponent} from './main/tool/auteur-list/auteur-list.component';
import { MemberFormEncadrantComponent } from './main/member/member-form-encadrant/member-form-encadrant.component';
import { MemberFormEtudiantComponent } from './main/member/member-form-etudiant/member-form-etudiant.component';
import { MemberDetailComponent } from './main/member/member-detail/member-detail.component';
import {AuteurPublicationListComponent} from './main/publication/auteur-publication-list/auteur-publication-list.component';
import {LoginComponent} from './main/login/login.component';
import {AuthGuardServiceGuard} from './guard/auth-guard-service.guard';
import {AuthroleguardGuard} from './guard/authroleguard.guard';


const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent,
  },
  {
    path: 'members',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MemberListComponent,
      },
      {
        path: 'createEncadrant',
        pathMatch: 'full',
        component: MemberFormEncadrantComponent,
        canActivate: [AuthGuardServiceGuard, AuthroleguardGuard],
      },
      {
        path: 'createEtudiant',
        pathMatch: 'full',
        component: MemberFormEtudiantComponent,
        canActivate: [AuthGuardServiceGuard, AuthroleguardGuard],
      },
      {
        path: 'editEncadrant/:id',
        pathMatch: 'full',
        component: MemberFormEncadrantComponent,
        canActivate: [AuthGuardServiceGuard],
      },
      {
        path: 'editEtudiant/:id',
        pathMatch: 'full',
        component: MemberFormEtudiantComponent,
        canActivate: [AuthGuardServiceGuard],
      },
      {
        path: ':id/detail',
        pathMatch: 'full',
        component: MemberDetailComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: 'tools',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ToolListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: ToolFormComponent,

        canActivate: [AuthGuardServiceGuard],
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: ToolFormComponent,

        canActivate: [AuthGuardServiceGuard],
      }, {
        path: ':id/auteurs',
        pathMatch: 'full',
        component: AuteurListComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: 'articles',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: PublicationListComponent,
      },
      {
        path: ':id/participants',
        pathMatch: 'full',
        component: AuteurPublicationListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: PublicationFormComponent,
        canActivate: [AuthGuardServiceGuard],
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: PublicationFormComponent,
        canActivate: [AuthGuardServiceGuard],
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: 'events',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: EventListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: EventFormComponent,
        canActivate: [AuthGuardServiceGuard],
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: EventFormComponent,
        canActivate: [AuthGuardServiceGuard],
      },
      {
        path: ':id/participants',
        pathMatch: 'full',
        component: ParticipantListComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
