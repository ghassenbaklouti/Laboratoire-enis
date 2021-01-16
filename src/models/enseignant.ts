import {Publication} from './publication.model';
import {Evenement} from './evenement.model';
import {Tool} from './tool.model';

export class Enseignant {
  id: string;
  cin: string;
  nom: string;
  prenom: string;
  date: string;
  photo: any;
  cv: string;
  email: string;
  password: string;
  grade: string;
  etablissement: string;
}
