import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipologieVeicoloMTC } from 'app/shared/model/tipologie-veicolo-mtc.model';

@Component({
  selector: 'jhi-tipologie-veicolo-mtc-detail',
  templateUrl: './tipologie-veicolo-mtc-detail.component.html',
})
export class TipologieVeicoloMTCDetailComponent implements OnInit {
  tipologieVeicoloMTC: ITipologieVeicoloMTC | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipologieVeicoloMTC }) => (this.tipologieVeicoloMTC = tipologieVeicoloMTC));
  }

  previousState(): void {
    window.history.back();
  }
}
