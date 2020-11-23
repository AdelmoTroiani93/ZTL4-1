import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MyZtl4TestModule } from '../../../test.module';
import { TipologieVeicoloMTCUpdateComponent } from 'app/entities/tipologie-veicolo-mtc/tipologie-veicolo-mtc-update.component';
import { TipologieVeicoloMTCService } from 'app/entities/tipologie-veicolo-mtc/tipologie-veicolo-mtc.service';
import { TipologieVeicoloMTC } from 'app/shared/model/tipologie-veicolo-mtc.model';

describe('Component Tests', () => {
  describe('TipologieVeicoloMTC Management Update Component', () => {
    let comp: TipologieVeicoloMTCUpdateComponent;
    let fixture: ComponentFixture<TipologieVeicoloMTCUpdateComponent>;
    let service: TipologieVeicoloMTCService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyZtl4TestModule],
        declarations: [TipologieVeicoloMTCUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TipologieVeicoloMTCUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipologieVeicoloMTCUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipologieVeicoloMTCService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipologieVeicoloMTC(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipologieVeicoloMTC();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
