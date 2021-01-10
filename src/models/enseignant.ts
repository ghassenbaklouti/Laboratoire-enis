import {Publication} from './publication.model';
import {Event} from './event.model';
import {Tool} from './tool.model';

export class Enseignant {
  id: string;
  cin: string;
  nom: string;
  prenom: string;
  date: string;
  photo: string;
  cv: string;
  email: string;
  password: string;
  grade: string;
  etablissement: string;
}
