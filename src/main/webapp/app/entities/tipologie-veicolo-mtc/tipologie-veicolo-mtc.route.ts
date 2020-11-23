import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITipologieVeicoloMTC, TipologieVeicoloMTC } from 'app/shared/model/tipologie-veicolo-mtc.model';
import { TipologieVeicoloMTCService } from './tipologie-veicolo-mtc.service';
import { TipologieVeicoloMTCComponent } from './tipologie-veicolo-mtc.component';
import { TipologieVeicoloMTCDetailComponent } from './tipologie-veicolo-mtc-detail.component';
import { TipologieVeicoloMTCUpdateComponent } from './tipologie-veicolo-mtc-update.component';

@Injectable({ providedIn: 'root' })
export class TipologieVeicoloMTCResolve implements Resolve<ITipologieVeicoloMTC> {
  constructor(private service: TipologieVeicoloMTCService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipologieVeicoloMTC> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tipologieVeicoloMTC: HttpResponse<TipologieVeicoloMTC>) => {
          if (tipologieVeicoloMTC.body) {
            return of(tipologieVeicoloMTC.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipologieVeicoloMTC());
  }
}

export const tipologieVeicoloMTCRoute: Routes = [
  {
    path: '',
    component: TipologieVeicoloMTCComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myZtl4App.tipologieVeicoloMTC.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipologieVeicoloMTCDetailComponent,
    resolve: {
      tipologieVeicoloMTC: TipologieVeicoloMTCResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myZtl4App.tipologieVeicoloMTC.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipologieVeicoloMTCUpdateComponent,
    resolve: {
      tipologieVeicoloMTC: TipologieVeicoloMTCResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myZtl4App.tipologieVeicoloMTC.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipologieVeicoloMTCUpdateComponent,
    resolve: {
      tipologieVeicoloMTC: TipologieVeicoloMTCResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myZtl4App.tipologieVeicoloMTC.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
