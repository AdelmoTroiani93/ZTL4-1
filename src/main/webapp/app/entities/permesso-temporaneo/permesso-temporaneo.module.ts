import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyZtl4SharedModule } from 'app/shared/shared.module';
import { PermessoTemporaneoComponent } from './permesso-temporaneo.component';
import { PermessoTemporaneoDetailComponent } from './permesso-temporaneo-detail.component';
import { PermessoTemporaneoUpdateComponent } from './permesso-temporaneo-update.component';
import { PermessoTemporaneoDeleteDialogComponent } from './permesso-temporaneo-delete-dialog.component';
import { permessoTemporaneoRoute } from './permesso-temporaneo.route';

@NgModule({
  imports: [MyZtl4SharedModule, RouterModule.forChild(permessoTemporaneoRoute)],
  declarations: [
    PermessoTemporaneoComponent,
    PermessoTemporaneoDetailComponent,
    PermessoTemporaneoUpdateComponent,
    PermessoTemporaneoDeleteDialogComponent,
  ],
  entryComponents: [PermessoTemporaneoDeleteDialogComponent],
})
export class MyZtl4PermessoTemporaneoModule {}
