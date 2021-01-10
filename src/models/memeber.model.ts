import {Publication} from './publication.model';
import {Tool} from './tool.model';
import {Event} from './event.model';

export interface Member {
  id: string;
  cin: string;
  nom: string;
  prenom: string;
  date: string;
  photo: string;
  cv: string;
  email: string;
  password: string;
  pubs: Publication[];
  events: Event[];
  outils: Tool[];
  encadrant: Member;
  diplome: string;
  grade: string;
  dateInscription: string;
  etablissement: string;
}

