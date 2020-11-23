import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { MyZtl4TestModule } from '../../../test.module';
import { AutorizzazioneDetailComponent } from 'app/entities/autorizzazione/autorizzazione-detail.component';
import { Autorizzazione } from 'app/shared/model/autorizzazione.model';

describe('Component Tests', () => {
  describe('Autorizzazione Management Detail Component', () => {
    let comp: AutorizzazioneDetailComponent;
    let fixture: ComponentFixture<AutorizzazioneDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ autorizzazione: new Autorizzazione(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyZtl4TestModule],
        declarations: [AutorizzazioneDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AutorizzazioneDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AutorizzazioneDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load autorizzazione on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.autorizzazione).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
