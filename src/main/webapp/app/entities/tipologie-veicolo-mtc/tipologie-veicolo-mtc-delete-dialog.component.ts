import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipologieVeicoloMTC } from 'app/shared/model/tipologie-veicolo-mtc.model';
import { TipologieVeicoloMTCService } from './tipologie-veicolo-mtc.service';

@Component({
  templateUrl: './tipologie-veicolo-mtc-delete-dialog.component.html',
})
export class TipologieVeicoloMTCDeleteDialogComponent {
  tipologieVeicoloMTC?: ITipologieVeicoloMTC;

  constructor(
    protected tipologieVeicoloMTCService: TipologieVeicoloMTCService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipologieVeicoloMTCService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tipologieVeicoloMTCListModification');
      this.activeModal.close();
    });
  }
}
