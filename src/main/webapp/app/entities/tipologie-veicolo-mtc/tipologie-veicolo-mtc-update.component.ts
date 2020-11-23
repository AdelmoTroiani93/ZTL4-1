import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITipologieVeicoloMTC, TipologieVeicoloMTC } from 'app/shared/model/tipologie-veicolo-mtc.model';
import { TipologieVeicoloMTCService } from './tipologie-veicolo-mtc.service';
import { ITipologiaVeicolo } from 'app/shared/model/tipologia-veicolo.model';
import { TipologiaVeicoloService } from 'app/entities/tipologia-veicolo/tipologia-veicolo.service';

@Component({
  selector: 'jhi-tipologie-veicolo-mtc-update',
  templateUrl: './tipologie-veicolo-mtc-update.component.html',
})
export class TipologieVeicoloMTCUpdateComponent implements OnInit {
  isSaving = false;
  tipologiaveicolos: ITipologiaVeicolo[] = [];

  editForm = this.fb.group({
    id: [],
    descrizione: [null, [Validators.required]],
    tipologiaVeicolo: [],
  });

  constructor(
    protected tipologieVeicoloMTCService: TipologieVeicoloMTCService,
    protected tipologiaVeicoloService: TipologiaVeicoloService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipologieVeicoloMTC }) => {
      this.updateForm(tipologieVeicoloMTC);

      this.tipologiaVeicoloService.query().subscribe((res: HttpResponse<ITipologiaVeicolo[]>) => (this.tipologiaveicolos = res.body || []));
    });
  }

  updateForm(tipologieVeicoloMTC: ITipologieVeicoloMTC): void {
    this.editForm.patchValue({
      id: tipologieVeicoloMTC.id,
      descrizione: tipologieVeicoloMTC.descrizione,
      tipologiaVeicolo: tipologieVeicoloMTC.tipologiaVeicolo,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipologieVeicoloMTC = this.createFromForm();
    if (tipologieVeicoloMTC.id !== undefined) {
      this.subscribeToSaveResponse(this.tipologieVeicoloMTCService.update(tipologieVeicoloMTC));
    } else {
      this.subscribeToSaveResponse(this.tipologieVeicoloMTCService.create(tipologieVeicoloMTC));
    }
  }

  private createFromForm(): ITipologieVeicoloMTC {
    return {
      ...new TipologieVeicoloMTC(),
      id: this.editForm.get(['id'])!.value,
      descrizione: this.editForm.get(['descrizione'])!.value,
      tipologiaVeicolo: this.editForm.get(['tipologiaVeicolo'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipologieVeicoloMTC>>): void {
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

  trackById(index: number, item: ITipologiaVeicolo): any {
    return item.id;
  }
}
