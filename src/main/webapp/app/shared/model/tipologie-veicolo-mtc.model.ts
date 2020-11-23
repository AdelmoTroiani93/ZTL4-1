import { ITipologiaVeicolo } from 'app/shared/model/tipologia-veicolo.model';

export interface ITipologieVeicoloMTC {
  id?: number;
  descrizione?: string;
  tipologiaVeicolo?: ITipologiaVeicolo;
}

export class TipologieVeicoloMTC implements ITipologieVeicoloMTC {
  constructor(public id?: number, public descrizione?: string, public tipologiaVeicolo?: ITipologiaVeicolo) {}
}
