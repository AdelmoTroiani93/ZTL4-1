import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICalendarizzazione } from 'app/shared/model/calendarizzazione.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { CalendarizzazioneService } from './calendarizzazione.service';
import { CalendarizzazioneDeleteDialogComponent } from './calendarizzazione-delete-dialog.component';

@Component({
  selector: 'jhi-calendarizzazione',
  templateUrl: './calendarizzazione.component.html',
  styleUrls: ['./calendarizzazione.component.scss']
})
export class CalendarizzazioneComponent implements OnInit  {
  Mese =new Date().getMonth()+1
  Anno=new Date().getFullYear();
  Giorno=new Date().getUTCDate()
  giorniMensili=[]
  ngOnInit(): void {
 this.getCalendario()
  }
  
  getCalendario():void{
    let data=0
    data = new Date(this.Anno, this.Mese, 0).getDate()
    
    this.giorniMensili.push()
  }
  // calendarizzaziones?: ICalendarizzazione[];
  // eventSubscriber?: Subscription;
  // totalItems = 0;
  // itemsPerPage = ITEMS_PER_PAGE;
  // page!: number;
  // predicate!: string;
  // ascending!: boolean;
  // ngbPaginationPage = 1;

  // constructor(
  //   protected calendarizzazioneService: CalendarizzazioneService,
  //   protected activatedRoute: ActivatedRoute,
  //   protected router: Router,
  //   protected eventManager: JhiEventManager,
  //   protected modalService: NgbModal
  // ) {}

  // loadPage(page?: number, dontNavigate?: boolean): void {
  //   const pageToLoad: number = page || this.page || 1;

  //   this.calendarizzazioneService
  //     .query({
  //       page: pageToLoad - 1,
  //       size: this.itemsPerPage,
  //       sort: this.sort(),
  //     })
  //     .subscribe(
  //       (res: HttpResponse<ICalendarizzazione[]>) => this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate),
  //       () => this.onError()
  //     );
  // }

  // ngOnInit(): void {
  //   this.handleNavigation();
  //   this.registerChangeInCalendarizzaziones();
  // }

  // protected handleNavigation(): void {
  //   combineLatest(this.activatedRoute.data, this.activatedRoute.queryParamMap, (data: Data, params: ParamMap) => {
  //     const page = params.get('page');
  //     const pageNumber = page !== null ? +page : 1;
  //     const sort = (params.get('sort') ?? data['defaultSort']).split(',');
  //     const predicate = sort[0];
  //     const ascending = sort[1] === 'asc';
  //     if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
  //       this.predicate = predicate;
  //       this.ascending = ascending;
  //       this.loadPage(pageNumber, true);
  //     }
  //   }).subscribe();
  // }

  // ngOnDestroy(): void {
  //   if (this.eventSubscriber) {
  //     this.eventManager.destroy(this.eventSubscriber);
  //   }
  // }

  // trackId(index: number, item: ICalendarizzazione): number {
  //   // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  //   return item.id!;
  // }

  // registerChangeInCalendarizzaziones(): void {
  //   this.eventSubscriber = this.eventManager.subscribe('calendarizzazioneListModification', () => this.loadPage());
  // }

  // delete(calendarizzazione: ICalendarizzazione): void {
  //   const modalRef = this.modalService.open(CalendarizzazioneDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
  //   modalRef.componentInstance.calendarizzazione = calendarizzazione;
  // }

  // sort(): string[] {
  //   const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
  //   if (this.predicate !== 'id') {
  //     result.push('id');
  //   }
  //   return result;
  // }

  // protected onSuccess(data: ICalendarizzazione[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
  //   this.totalItems = Number(headers.get('X-Total-Count'));
  //   this.page = page;
  //   if (navigate) {
  //     this.router.navigate(['/calendarizzazione'], {
  //       queryParams: {
  //         page: this.page,
  //         size: this.itemsPerPage,
  //         sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
  //       },
  //     });
  //   }
  //   this.calendarizzaziones = data || [];
  //   this.ngbPaginationPage = this.page;
  // }

  // protected onError(): void {
  //   this.ngbPaginationPage = this.page ?? 1;
  // }
}
