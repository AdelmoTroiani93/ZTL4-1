import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'tipologia-zona',
        loadChildren: () => import('./tipologia-zona/tipologia-zona.module').then(m => m.MyZtl4TipologiaZonaModule),
      },
      {
        path: 'varco',
        loadChildren: () => import('./varco/varco.module').then(m => m.MyZtl4VarcoModule),
      },
      {
        path: 'gruppo-varchi',
        loadChildren: () => import('./gruppo-varchi/gruppo-varchi.module').then(m => m.MyZtl4GruppoVarchiModule),
      },
      {
        path: 'tipologia-veicolo',
        loadChildren: () => import('./tipologia-veicolo/tipologia-veicolo.module').then(m => m.MyZtl4TipologiaVeicoloModule),
      },
      {
        path: 'festivita',
        loadChildren: () => import('./festivita/festivita.module').then(m => m.MyZtl4FestivitaModule),
      },
      {
        path: 'regola-oraria',
        loadChildren: () => import('./regola-oraria/regola-oraria.module').then(m => m.MyZtl4RegolaOrariaModule),
      },
      {
        path: 'profilo-orario',
        loadChildren: () => import('./profilo-orario/profilo-orario.module').then(m => m.MyZtl4ProfiloOrarioModule),
      },
      {
        path: 'autorizzazione',
        loadChildren: () => import('./autorizzazione/autorizzazione.module').then(m => m.MyZtl4AutorizzazioneModule),
      },
      {
        path: 'zona',
        loadChildren: () => import('./zona/zona.module').then(m => m.MyZtl4ZonaModule),
      },
      {
        path: 'tipologia-permesso',
        loadChildren: () => import('./tipologia-permesso/tipologia-permesso.module').then(m => m.MyZtl4TipologiaPermessoModule),
      },
      {
        path: 'durata-costo',
        loadChildren: () => import('./durata-costo/durata-costo.module').then(m => m.MyZtl4DurataCostoModule),
      },
      {
        path: 'motivazione',
        loadChildren: () => import('./motivazione/motivazione.module').then(m => m.MyZtl4MotivazioneModule),
      },
      {
        path: 'calendarizzazione',
        loadChildren: () => import('./calendarizzazione/calendarizzazione.module').then(m => m.MyZtl4CalendarizzazioneModule),
      },
      {
        path: 'tipologie-veicolo-mtc',
        loadChildren: () => import('./tipologie-veicolo-mtc/tipologie-veicolo-mtc.module').then(m => m.MyZtl4TipologieVeicoloMTCModule),
      },
      {
        path: 'permesso-temporaneo',
        loadChildren: () => import('./permesso-temporaneo/permesso-temporaneo.module').then(m => m.MyZtl4PermessoTemporaneoModule),
      },
      {
        path: 'calendario',
        loadChildren: () => import('./profilo-orario/Calendario/calendario-module').then(m => m.DemoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class MyZtl4EntityModule {}
