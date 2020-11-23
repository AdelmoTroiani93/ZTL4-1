import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyZtl4SharedModule } from 'app/shared/shared.module';
import { CalendarizzazioneComponent } from './calendarizzazione.component';
import { CalendarizzazioneDetailComponent } from './calendarizzazione-detail.component';
import { CalendarizzazioneUpdateComponent } from './calendarizzazione-update.component';
import { CalendarizzazioneDeleteDialogComponent } from './calendarizzazione-delete-dialog.component';
import { calendarizzazioneRoute } from './calendarizzazione.route';

@NgModule({
  imports: [MyZtl4SharedModule, RouterModule.forChild(calendarizzazioneRoute)],
  declarations: [
    CalendarizzazioneComponent,
    CalendarizzazioneDetailComponent,
    CalendarizzazioneUpdateComponent,
    CalendarizzazioneDeleteDialogComponent,
  ],
  entryComponents: [CalendarizzazioneDeleteDialogComponent],
})
export class MyZtl4CalendarizzazioneModule {}
