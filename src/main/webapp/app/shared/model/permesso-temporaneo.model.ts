import { Moment } from 'moment';
import { ICalendarizzazione } from 'app/shared/model/calendarizzazione.model';
import { ITipologiaPermesso } from 'app/shared/model/tipologia-permesso.model';
import { ITipologiaVeicolo } from 'app/shared/model/tipologia-veicolo.model';
import { IDurataCosto } from 'app/shared/model/durata-costo.model';
import { IZona } from 'app/shared/model/zona.model';
import { IMotivazione } from 'app/shared/model/motivazione.model';
import { IAutorizzazione } from 'app/shared/model/autorizzazione.model';
import { TipoPersona } from 'app/shared/model/enumerations/tipo-persona.model';

export interface IPermessoTemporaneo {
  id?: number;
  targa?: string;
  targaEstera?: boolean;
  domicilioDigitale?: string;
  tipoPersona?: TipoPersona;
  nomeRichiedente?: string;
  cognomeRichiedente?: string;
  ragioneSociale?: string;
  codiceFiscaleRichiedente?: string;
  partitaIva?: string;
  dataInizio?: Moment;
  impostaDiBollo?: boolean;
  costo?: number;
  copiaFirmataContentType?: string;
  copiaFirmata?: any;
  documentoRiconoscimentoContentType?: string;
  documentoRiconoscimento?: any;
  pagato?: boolean;
  protocolloEntrata?: string;
  protocolloUscita?: string;
  calendario?: ICalendarizzazione;
  tipoPermesso?: ITipologiaPermesso;
  tipogiaVeicolo?: ITipologiaVeicolo;
  durata?: IDurataCosto;
  zona?: IZona;
  motivazione?: IMotivazione;
  autorizzazionis?: IAutorizzazione[];
}

export class PermessoTemporaneo implements IPermessoTemporaneo {
  constructor(
    public id?: number,
    public targa?: string,
    public targaEstera?: boolean,
    public domicilioDigitale?: string,
    public tipoPersona?: TipoPersona,
    public nomeRichiedente?: string,
    public cognomeRichiedente?: string,
    public ragioneSociale?: string,
    public codiceFiscaleRichiedente?: string,
    public partitaIva?: string,
    public dataInizio?: Moment,
    public impostaDiBollo?: boolean,
    public costo?: number,
    public copiaFirmataContentType?: string,
    public copiaFirmata?: any,
    public documentoRiconoscimentoContentType?: string,
    public documentoRiconoscimento?: any,
    public pagato?: boolean,
    public protocolloEntrata?: string,
    public protocolloUscita?: string,
    public calendario?: ICalendarizzazione,
    public tipoPermesso?: ITipologiaPermesso,
    public tipogiaVeicolo?: ITipologiaVeicolo,
    public durata?: IDurataCosto,
    public zona?: IZona,
    public motivazione?: IMotivazione,
    public autorizzazionis?: IAutorizzazione[]
  ) {
    this.targaEstera = this.targaEstera || false;
    this.impostaDiBollo = this.impostaDiBollo || false;
    this.pagato = this.pagato || false;
  }
}
