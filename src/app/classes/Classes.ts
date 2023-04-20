export interface Departement {
    id: number | null;
    nomDepartement: string;
    membreDepartements: MembreDepartement[] | null;
}

export interface MembreDepartement {
    id: string;
    username: string;
    password: string;
    nom: string;
    prenom: string;
    cin: string;
    email: string;
    domaineExpertise: string;
    laboratoire: string;
    idDepartement: number;
    roles: Role[]
}

export interface Role {
  id: number | null;
  nomRole: string;
}

export interface Ressource {
    id: number | null;
    codeBarre: string | null;
    dateLivraison: Date | null;
    dateFinGarantie: Date | null;
    marque: string | null;
    prix: number | null;
    type: string | null;
    idFournisseur: string | null;
    idMembreDepartement: string | null;
    idDepartement: number | null;
    isDeleted: boolean | false;
}

export interface Ordinateur extends Ressource {
    disquedur: any;
    cpu: string;
    ram: number;
    disqueDur: string;
    ecran: string;
}

export interface Imprimante extends Ressource {
    resolution: string;
    vitesseImpression: string;
}

export interface Besoin {
    id: number | null;
    dateDemande: string;
    dateAffectation: string | null;
    isAffected: boolean;
    idMembreDepartement: string | null;
    idDepartement: number;
    isBesoinInAppelOffre: boolean;
    ordinateurs: Ordinateur[];
    imprimantes: Imprimante[];
}

export interface Demande {
  id: number;
  message: string;
  isSeen: boolean;
  dateDemande: Date;
  idMembreDepartement: string;
  idDepartement: number;
}

export interface AppelOffre {
  id:number|null;
  datePub:string|null|Date;
  isAffected:boolean;
  besoins:Besoin[];
}

export interface Offre {
  id:number|null;
  dateDebut:string|null;
  dateFin:string|null;
  isAffected:boolean;
  isRejected:boolean;
  isWaiting:boolean;
  idFournisseur:string|null;
  ressources :RessourceFournisseur[];
  idAppelOffre:number;
}

export interface RessourceFournisseur{
  id:number|null;
  marque:string|null;
  prix:number|null;
  idRessource:number|null;
}

export interface fournisseur{
  id: string;
  username: string;
  password: string;
  nom: string;
  prenom: string;
  cin: string;
  email: string;
  addresse:string;
  gerant: string;
  nomSociete: string;
  isBlackList:string;
  motifDeBlockage:string ;

}
