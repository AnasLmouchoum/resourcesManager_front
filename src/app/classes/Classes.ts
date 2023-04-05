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
    cpu: string;
    ram: number;
    disqueDur: string;
    ecran: string;
}

export interface Imprimante extends Ressource {
    resolution: string;
    vitesseImpression: string;
}
