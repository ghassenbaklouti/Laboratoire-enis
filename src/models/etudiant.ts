import {Publication} from './publication.model';
import {Evenement} from './evenement.model';
import {Tool} from './tool.model';
import {Enseignant} from './enseignant';

export class Etudiant {
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
  encadrant: Enseignant;
  diplome: string;
  dateInscription: string;
}
