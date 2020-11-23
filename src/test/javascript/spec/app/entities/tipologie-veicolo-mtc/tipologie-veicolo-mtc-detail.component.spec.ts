import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MyZtl4TestModule } from '../../../test.module';
import { TipologieVeicoloMTCDetailComponent } from 'app/entities/tipologie-veicolo-mtc/tipologie-veicolo-mtc-detail.component';
import { TipologieVeicoloMTC } from 'app/shared/model/tipologie-veicolo-mtc.model';

describe('Component Tests', () => {
  describe('TipologieVeicoloMTC Management Detail Component', () => {
    let comp: TipologieVeicoloMTCDetailComponent;
    let fixture: ComponentFixture<TipologieVeicoloMTCDetailComponent>;
    const route = ({ data: of({ tipologieVeicoloMTC: new TipologieVeicoloMTC(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyZtl4TestModule],
        declarations: [TipologieVeicoloMTCDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TipologieVeicoloMTCDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipologieVeicoloMTCDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tipologieVeicoloMTC on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipologieVeicoloMTC).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
