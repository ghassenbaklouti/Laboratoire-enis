import {Publication} from './publication.model';
import {Event} from './event.model';
import {Tool} from './tool.model';
import {Enseignant} from './enseignant';

export class Etudiant {
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
  encadrant: Enseignant;
  diplome: string;
  dateInscription: string;
}
