import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITipologieVeicoloMTC } from 'app/shared/model/tipologie-veicolo-mtc.model';

type EntityResponseType = HttpResponse<ITipologieVeicoloMTC>;
type EntityArrayResponseType = HttpResponse<ITipologieVeicoloMTC[]>;

@Injectable({ providedIn: 'root' })
export class TipologieVeicoloMTCService {
  public resourceUrl = SERVER_API_URL + 'api/tipologie-veicolo-mtcs';

  constructor(protected http: HttpClient) {}

  create(tipologieVeicoloMTC: ITipologieVeicoloMTC): Observable<EntityResponseType> {
    return this.http.post<ITipologieVeicoloMTC>(this.resourceUrl, tipologieVeicoloMTC, { observe: 'response' });
  }

  update(tipologieVeicoloMTC: ITipologieVeicoloMTC): Observable<EntityResponseType> {
    return this.http.put<ITipologieVeicoloMTC>(this.resourceUrl, tipologieVeicoloMTC, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipologieVeicoloMTC>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipologieVeicoloMTC[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
