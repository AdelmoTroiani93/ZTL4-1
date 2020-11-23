import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyZtl4SharedModule } from 'app/shared/shared.module';
import { ProfiloOrarioComponent } from './profilo-orario.component';
import { ProfiloOrarioDetailComponent } from './profilo-orario-detail.component';
import { ProfiloOrarioUpdateComponent } from './profilo-orario-update.component';
import { ProfiloOrarioDeleteDialogComponent } from './profilo-orario-delete-dialog.component';
import { profiloOrarioRoute } from './profilo-orario.route';

@NgModule({
  imports: [MyZtl4SharedModule, RouterModule.forChild(profiloOrarioRoute)],
  declarations: [ProfiloOrarioComponent, ProfiloOrarioDetailComponent, ProfiloOrarioUpdateComponent, ProfiloOrarioDeleteDialogComponent],
  entryComponents: [ProfiloOrarioDeleteDialogComponent],
})
export class MyZtl4ProfiloOrarioModule {}
