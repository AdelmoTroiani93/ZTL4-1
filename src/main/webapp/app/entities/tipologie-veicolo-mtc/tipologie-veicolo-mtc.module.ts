import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyZtl4SharedModule } from 'app/shared/shared.module';
import { TipologieVeicoloMTCComponent } from './tipologie-veicolo-mtc.component';
import { TipologieVeicoloMTCDetailComponent } from './tipologie-veicolo-mtc-detail.component';
import { TipologieVeicoloMTCUpdateComponent } from './tipologie-veicolo-mtc-update.component';
import { TipologieVeicoloMTCDeleteDialogComponent } from './tipologie-veicolo-mtc-delete-dialog.component';
import { tipologieVeicoloMTCRoute } from './tipologie-veicolo-mtc.route';

@NgModule({
  imports: [MyZtl4SharedModule, RouterModule.forChild(tipologieVeicoloMTCRoute)],
  declarations: [
    TipologieVeicoloMTCComponent,
    TipologieVeicoloMTCDetailComponent,
    TipologieVeicoloMTCUpdateComponent,
    TipologieVeicoloMTCDeleteDialogComponent,
  ],
  entryComponents: [TipologieVeicoloMTCDeleteDialogComponent],
})
export class MyZtl4TipologieVeicoloMTCModule {}
