import {Publication} from './publication.model';
import {Tool} from './tool.model';
import {Evenement} from './evenement.model';

export interface Member {
  id: string;
  cin: string;
  nom: string;
  prenom: string;
  date: string;
  photo: any;
  cv: string;
  email: string;
  password: string;
  pubs: Publication[];
  events: Evenement[];
  outils: Tool[];
  encadrant: Member;
  diplome: string;
  grade: string;
  dateInscription: string;
  etablissement: string;
}

