import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyZtl4SharedModule } from 'app/shared/shared.module';
import { PermessoTemporaneoComponent } from './permesso-temporaneo.component';
import { PermessoTemporaneoDetailComponent } from './permesso-temporaneo-detail.component';
import { PermessoTemporaneoUpdateComponent } from './permesso-temporaneo-update.component';
import { PermessoTemporaneoDeleteDialogComponent } from './permesso-temporaneo-delete-dialog.component';
import { permessoTemporaneoRoute } from './permesso-temporaneo.route';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [MyZtl4SharedModule, RouterModule.forChild(permessoTemporaneoRoute),

    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule

    ],
  declarations: [
    PermessoTemporaneoComponent,
    PermessoTemporaneoDetailComponent,
    PermessoTemporaneoUpdateComponent,
    PermessoTemporaneoDeleteDialogComponent,
  ],
  entryComponents: [PermessoTemporaneoDeleteDialogComponent],
})
export class MyZtl4PermessoTemporaneoModule {}
