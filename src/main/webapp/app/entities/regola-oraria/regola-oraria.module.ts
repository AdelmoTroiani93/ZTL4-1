import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyZtl4SharedModule } from 'app/shared/shared.module';
import { RegolaOrariaComponent } from './regola-oraria.component';
import { RegolaOrariaDetailComponent } from './regola-oraria-detail.component';
import { RegolaOrariaUpdateComponent } from './regola-oraria-update.component';
import { RegolaOrariaDeleteDialogComponent } from './regola-oraria-delete-dialog.component';
import { regolaOrariaRoute } from './regola-oraria.route';

@NgModule({
  imports: [MyZtl4SharedModule, RouterModule.forChild(regolaOrariaRoute)],
  declarations: [RegolaOrariaComponent, RegolaOrariaDetailComponent, RegolaOrariaUpdateComponent, RegolaOrariaDeleteDialogComponent],
  entryComponents: [RegolaOrariaDeleteDialogComponent],
})
export class MyZtl4RegolaOrariaModule {}
