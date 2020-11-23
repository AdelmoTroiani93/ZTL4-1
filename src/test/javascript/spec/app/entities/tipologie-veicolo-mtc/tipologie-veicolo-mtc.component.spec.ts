import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyZtl4TestModule } from '../../../test.module';
import { TipologieVeicoloMTCComponent } from 'app/entities/tipologie-veicolo-mtc/tipologie-veicolo-mtc.component';
import { TipologieVeicoloMTCService } from 'app/entities/tipologie-veicolo-mtc/tipologie-veicolo-mtc.service';
import { TipologieVeicoloMTC } from 'app/shared/model/tipologie-veicolo-mtc.model';

describe('Component Tests', () => {
  describe('TipologieVeicoloMTC Management Component', () => {
    let comp: TipologieVeicoloMTCComponent;
    let fixture: ComponentFixture<TipologieVeicoloMTCComponent>;
    let service: TipologieVeicoloMTCService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyZtl4TestModule],
        declarations: [TipologieVeicoloMTCComponent],
      })
        .overrideTemplate(TipologieVeicoloMTCComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipologieVeicoloMTCComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipologieVeicoloMTCService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipologieVeicoloMTC(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipologieVeicoloMTCS && comp.tipologieVeicoloMTCS[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
