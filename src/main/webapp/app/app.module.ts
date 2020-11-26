import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import './vendor';
import { MyZtl4SharedModule } from 'app/shared/shared.module';
import { MyZtl4CoreModule } from 'app/core/core.module';
import { MyZtl4AppRoutingModule } from './app-routing.module';
import { MyZtl4HomeModule } from './home/home.module';
import { MyZtl4EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MyZtl4SharedModule,
    MyZtl4CoreModule,
    MyZtl4HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    MyZtl4EntityModule,
    MyZtl4AppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent],
})
export class MyZtl4AppModule {}
