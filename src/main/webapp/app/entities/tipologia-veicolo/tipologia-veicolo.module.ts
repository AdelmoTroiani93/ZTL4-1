import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyZtl4SharedModule } from 'app/shared/shared.module';
import { TipologiaVeicoloComponent } from './tipologia-veicolo.component';
import { TipologiaVeicoloDetailComponent } from './tipologia-veicolo-detail.component';
import { TipologiaVeicoloUpdateComponent } from './tipologia-veicolo-update.component';
import { TipologiaVeicoloDeleteDialogComponent } from './tipologia-veicolo-delete-dialog.component';
import { tipologiaVeicoloRoute } from './tipologia-veicolo.route';

@NgModule({
  imports: [MyZtl4SharedModule, RouterModule.forChild(tipologiaVeicoloRoute)],
  declarations: [
    TipologiaVeicoloComponent,
    TipologiaVeicoloDetailComponent,
    TipologiaVeicoloUpdateComponent,
    TipologiaVeicoloDeleteDialogComponent,
  ],
  entryComponents: [TipologiaVeicoloDeleteDialogComponent],
})
export class MyZtl4TipologiaVeicoloModule {}
