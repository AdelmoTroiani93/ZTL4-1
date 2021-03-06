import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRegolaOraria, RegolaOraria } from 'app/shared/model/regola-oraria.model';
import { RegolaOrariaService } from './regola-oraria.service';
import { RegolaOrariaComponent } from './regola-oraria.component';
import { RegolaOrariaDetailComponent } from './regola-oraria-detail.component';
import { RegolaOrariaUpdateComponent } from './regola-oraria-update.component';

@Injectable({ providedIn: 'root' })
export class RegolaOrariaResolve implements Resolve<IRegolaOraria> {
  constructor(private service: RegolaOrariaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRegolaOraria> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((regolaOraria: HttpResponse<RegolaOraria>) => {
          if (regolaOraria.body) {
            return of(regolaOraria.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RegolaOraria());
  }
}

export const regolaOrariaRoute: Routes = [
  {
    path: '',
    component: RegolaOrariaComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'myZtl4App.regolaOraria.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RegolaOrariaDetailComponent,
    resolve: {
      regolaOraria: RegolaOrariaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myZtl4App.regolaOraria.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RegolaOrariaUpdateComponent,
    resolve: {
      regolaOraria: RegolaOrariaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myZtl4App.regolaOraria.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RegolaOrariaUpdateComponent,
    resolve: {
      regolaOraria: RegolaOrariaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'myZtl4App.regolaOraria.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
