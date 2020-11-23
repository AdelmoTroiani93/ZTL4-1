import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipologieVeicoloMTC } from 'app/shared/model/tipologie-veicolo-mtc.model';
import { TipologieVeicoloMTCService } from './tipologie-veicolo-mtc.service';
import { TipologieVeicoloMTCDeleteDialogComponent } from './tipologie-veicolo-mtc-delete-dialog.component';

@Component({
  selector: 'jhi-tipologie-veicolo-mtc',
  templateUrl: './tipologie-veicolo-mtc.component.html',
})
export class TipologieVeicoloMTCComponent implements OnInit, OnDestroy {
  tipologieVeicoloMTCS?: ITipologieVeicoloMTC[];
  eventSubscriber?: Subscription;

  constructor(
    protected tipologieVeicoloMTCService: TipologieVeicoloMTCService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.tipologieVeicoloMTCService
      .query()
      .subscribe((res: HttpResponse<ITipologieVeicoloMTC[]>) => (this.tipologieVeicoloMTCS = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTipologieVeicoloMTCS();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITipologieVeicoloMTC): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTipologieVeicoloMTCS(): void {
    this.eventSubscriber = this.eventManager.subscribe('tipologieVeicoloMTCListModification', () => this.loadAll());
  }

  delete(tipologieVeicoloMTC: ITipologieVeicoloMTC): void {
    const modalRef = this.modalService.open(TipologieVeicoloMTCDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipologieVeicoloMTC = tipologieVeicoloMTC;
  }
}
