import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IPermessoTemporaneo, PermessoTemporaneo } from 'app/shared/model/permesso-temporaneo.model';
import { PermessoTemporaneoService } from './permesso-temporaneo.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ICalendarizzazione } from 'app/shared/model/calendarizzazione.model';
import { CalendarizzazioneService } from 'app/entities/calendarizzazione/calendarizzazione.service';
import { ITipologiaPermesso } from 'app/shared/model/tipologia-permesso.model';
import { TipologiaPermessoService } from 'app/entities/tipologia-permesso/tipologia-permesso.service';
import { ITipologiaVeicolo } from 'app/shared/model/tipologia-veicolo.model';
import { TipologiaVeicoloService } from 'app/entities/tipologia-veicolo/tipologia-veicolo.service';
import { IDurataCosto } from 'app/shared/model/durata-costo.model';
import { DurataCostoService } from 'app/entities/durata-costo/durata-costo.service';
import { IZona } from 'app/shared/model/zona.model';
import { ZonaService } from 'app/entities/zona/zona.service';
import { IMotivazione } from 'app/shared/model/motivazione.model';
import { MotivazioneService } from 'app/entities/motivazione/motivazione.service';
import { IAutorizzazione } from 'app/shared/model/autorizzazione.model';
import { AutorizzazioneService } from 'app/entities/autorizzazione/autorizzazione.service';
import { ProfiloOrarioService} from '../profilo-orario/profilo-orario.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {GruppoVarchiService} from '../gruppo-varchi/gruppo-varchi.service'
type SelectableEntity = ICalendarizzazione | ITipologiaPermesso | ITipologiaVeicolo | IDurataCosto | IZona | IMotivazione | IAutorizzazione;

@Component({
  selector: 'jhi-permesso-temporaneo-update',
  templateUrl: './permesso-temporaneo-update.component.html',
})
export class PermessoTemporaneoUpdateComponent implements OnInit {
  isTarga=false;
  isLinear = false;
  isSaving = false;
  calendarios: ICalendarizzazione[] = [];
  tipologiapermessos: ITipologiaPermesso[] = [];
  tipologiaveicolos: ITipologiaVeicolo[] = [];
  duratacostos: IDurataCosto[] = [];
  zonas: IZona[] = [];
  motivaziones: IMotivazione[] = [];
  autorizzaziones: IAutorizzazione[] = [];
  closeResult = '';
  orario:any=[]
  varchi:any=[]
  public costoDurataZona!: number;
  valore=0

  formStep1=this.fb.group({
    targa: [null, [Validators.required, Validators.maxLength(10)]],
    targaEstera: [],
  })
  formStep2 = this.fb.group({
    domicilioDigitale: [null, [Validators.required, Validators.maxLength(50)]],
    tipoPersona: [],
    nomeRichiedente: [],
    cognomeRichiedente: [],
    ragioneSociale: [],
    codiceFiscaleRichiedente: [],
    partitaIva: [],
    dataInizio: [],
    impostaDiBollo: [],
    costo: [],
    copiaFirmata: [],
    copiaFirmataContentType: [],
    documentoRiconoscimento: [],
    documentoRiconoscimentoContentType: [],
    pagato: [],
    protocolloEntrata: [],
    protocolloUscita: [],
    calendario: [],
    tipoPermesso: [],
    tipogiaVeicolo: [],
    durata: [],
    zona: [],
    motivazione: [],
    autorizzazionis: [],
  });




  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected permessoTemporaneoService: PermessoTemporaneoService,
    protected calendarizzazioneService: CalendarizzazioneService,
    protected tipologiaPermessoService: TipologiaPermessoService,
    protected tipologiaVeicoloService: TipologiaVeicoloService,
    protected durataCostoService: DurataCostoService,
    protected zonaService: ZonaService,
    protected motivazioneService: MotivazioneService,
    protected autorizzazioneService: AutorizzazioneService,
    protected activatedRoute: ActivatedRoute,
    protected profiloOrarioService:ProfiloOrarioService,
    protected gruppoVarchiService: GruppoVarchiService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  open(content:any):void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  
  isImpostaBollo():void{
    this.costoDurataZona=0;
console.log(!this.formStep2.get('impostaDiBollo')?.value)
if(!this.formStep2.get('impostaDiBollo')?.value){
  this.costoDurataZona+=18;
}else{
  this.costoDurataZona+=0;
}
  }

  ngOnInit(): void {
    this.costoDurataZona=0
    this.activatedRoute.data.subscribe(({ permessoTemporaneo }) => {
      this.updateForm(permessoTemporaneo);

      this.calendarizzazioneService
        .query({ 'permessoTemporaneoId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<ICalendarizzazione[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICalendarizzazione[]) => {
          if (!permessoTemporaneo.calendario || !permessoTemporaneo.calendario.id) {
            this.calendarios = resBody;
          } else {
            this.calendarizzazioneService
              .find(permessoTemporaneo.calendario.id)
              .pipe(
                map((subRes: HttpResponse<ICalendarizzazione>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICalendarizzazione[]) => (this.calendarios = concatRes));
          }
        });

      this.tipologiaPermessoService
        .query()
        .subscribe((res: HttpResponse<ITipologiaPermesso[]>) => (this.tipologiapermessos = res.body || []));

      this.tipologiaVeicoloService.query().subscribe((res: HttpResponse<ITipologiaVeicolo[]>) => (this.tipologiaveicolos = res.body || []));

      this.durataCostoService.query().subscribe((res: HttpResponse<IDurataCosto[]>) => (this.duratacostos = res.body || []));

      this.zonaService.query().subscribe((res: HttpResponse<IZona[]>) => (this.zonas = res.body || []));

      this.motivazioneService.query().subscribe((res: HttpResponse<IMotivazione[]>) => (this.motivaziones = res.body || []));

      this.autorizzazioneService.query().subscribe((res: HttpResponse<IAutorizzazione[]>) => (this.autorizzaziones = res.body || []));
    });
    this.formStep2.get('costo')?.setValue(0)
    this.formStep2.get('tipoPersona')?.setValue('FISICA')
  }




  cambioDurata():void{
    
    console.log(this.formStep2.get('durata')?.value)
    try{
    this.valore=this.formStep2.get('durata')?.value['costo'];
    }catch(e){
      this.valore=0
    }
    }
    




  cambioZona():void{
    console.log(this.formStep2.get("zona")?.value)
    try{
this.profiloOrarioService.find(this.formStep2.get("zona")?.value['profiloOrario']['id']).subscribe(data=>{
  this.orario=data['body']?.['regolaOrarias']
})
this.zonaService.find(this.formStep2.get("zona")?.value['id']).subscribe(data=>{
  this.varchi=data['body']?.['gruppoVarchis']
})
    }
    catch(e){console.log(e)}
  //TODO
  // this.gruppoVarchiService.find(this.formStep2.get("zona")?.value['id']).subscribe(data=>{
  //  console.log(data)
  // })

  }

 
  updateForm(permessoTemporaneo: IPermessoTemporaneo): void {
    this.formStep2.patchValue({
      id: permessoTemporaneo.id,
      targa: permessoTemporaneo.targa,
      targaEstera: permessoTemporaneo.targaEstera,
      domicilioDigitale: permessoTemporaneo.domicilioDigitale,
      tipoPersona: permessoTemporaneo.tipoPersona,
      nomeRichiedente: permessoTemporaneo.nomeRichiedente,
      cognomeRichiedente: permessoTemporaneo.cognomeRichiedente,
      ragioneSociale: permessoTemporaneo.ragioneSociale,
      codiceFiscaleRichiedente: permessoTemporaneo.codiceFiscaleRichiedente,
      partitaIva: permessoTemporaneo.partitaIva,
      dataInizio: permessoTemporaneo.dataInizio,
      impostaDiBollo: permessoTemporaneo.impostaDiBollo,
      costo: permessoTemporaneo.costo,
      copiaFirmata: permessoTemporaneo.copiaFirmata,
      copiaFirmataContentType: permessoTemporaneo.copiaFirmataContentType,
      documentoRiconoscimento: permessoTemporaneo.documentoRiconoscimento,
      documentoRiconoscimentoContentType: permessoTemporaneo.documentoRiconoscimentoContentType,
      pagato: permessoTemporaneo.pagato,
      protocolloEntrata: permessoTemporaneo.protocolloEntrata,
      protocolloUscita: permessoTemporaneo.protocolloUscita,
      calendario: permessoTemporaneo.calendario,
      tipoPermesso: permessoTemporaneo.tipoPermesso,
      tipogiaVeicolo: permessoTemporaneo.tipogiaVeicolo,
      durata: permessoTemporaneo.durata,
      zona: permessoTemporaneo.zona,
      motivazione: permessoTemporaneo.motivazione,
      autorizzazionis: permessoTemporaneo.autorizzazionis,
    });
  }

  
  inputTarga():void{
    this.isTarga=false;
    if( this.formStep1.get("targa")?.value.length===7){
      this.permessoTemporaneoService.getTipologiaveicolo(this.formStep1.get("targa")?.value).subscribe(data=>{
        console.log(data)
        try{
        if(data['body']?.[0]['tipologia']!==null){
          this.formStep1.get("tipogiaVeicolo")?.setValue(data['body']?.[0]['tipologia'])
          this.isTarga=true;
          console.log(this.isTarga)
        }else{
          this.isTarga=false;
        }
      }catch(e){
        console.log(e)
      }
      })
    }else{
      this.isTarga=false;
      this.formStep1.get("tipogiaVeicolo")?.setValue(null)
    }
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.formStep2, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('myZtl4App.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  step(): void {
    if(this.formStep2.invalid){
      return
    }
    this.isSaving = true;
    
  
  }
  save(): void {
  const permessoTemporaneo = this.createFromForm();
  if (permessoTemporaneo.id !== undefined) {
    this.subscribeToSaveResponse(this.permessoTemporaneoService.update(permessoTemporaneo));
  } else {
    this.subscribeToSaveResponse(this.permessoTemporaneoService.create(permessoTemporaneo));
  }
  }
  private createFromForm(): IPermessoTemporaneo {
    return {
      ...new PermessoTemporaneo(),
      id: this.formStep2.get(['id'])!.value,
      targa: this.formStep2.get(['targa'])!.value,
      targaEstera: this.formStep2.get(['targaEstera'])!.value,
      domicilioDigitale: this.formStep2.get(['domicilioDigitale'])!.value,
      tipoPersona: this.formStep2.get(['tipoPersona'])!.value,
      nomeRichiedente: this.formStep2.get(['nomeRichiedente'])!.value,
      cognomeRichiedente: this.formStep2.get(['cognomeRichiedente'])!.value,
      ragioneSociale: this.formStep2.get(['ragioneSociale'])!.value,
      codiceFiscaleRichiedente: this.formStep2.get(['codiceFiscaleRichiedente'])!.value,
      partitaIva: this.formStep2.get(['partitaIva'])!.value,
      dataInizio: this.formStep2.get(['dataInizio'])!.value,
      impostaDiBollo: this.formStep2.get(['impostaDiBollo'])!.value,
      costo: this.formStep2.get(['costo'])!.value,
      copiaFirmataContentType: this.formStep2.get(['copiaFirmataContentType'])!.value,
      copiaFirmata: this.formStep2.get(['copiaFirmata'])!.value,
      documentoRiconoscimentoContentType: this.formStep2.get(['documentoRiconoscimentoContentType'])!.value,
      documentoRiconoscimento: this.formStep2.get(['documentoRiconoscimento'])!.value,
      pagato: this.formStep2.get(['pagato'])!.value,
      protocolloEntrata: this.formStep2.get(['protocolloEntrata'])!.value,
      protocolloUscita: this.formStep2.get(['protocolloUscita'])!.value,
      calendario: this.formStep2.get(['calendario'])!.value,
      tipoPermesso: this.formStep2.get(['tipoPermesso'])!.value,
      tipogiaVeicolo: this.formStep2.get(['tipogiaVeicolo'])!.value,
      durata: this.formStep2.get(['durata'])!.value,
      zona: this.formStep2.get(['zona'])!.value,
      motivazione: this.formStep2.get(['motivazione'])!.value,
      autorizzazionis: this.formStep2.get(['autorizzazionis'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPermessoTemporaneo>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IAutorizzazione[], option: IAutorizzazione): IAutorizzazione {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
