import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { MenubarModule } from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { PipesModule } from '../shared/pipes/pipes.module';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TooltipModule,
    MenubarModule,
    OverlayPanelModule,
    BreadcrumbModule,
    ButtonModule,
    InputNumberModule,
    ToastModule,
    PipesModule,
    FieldsetModule,
    InputTextModule,
    InputMaskModule,
    ProgressSpinnerModule
  ],
  exports: [
    TableModule,
    TooltipModule,
    MenubarModule,
    OverlayPanelModule,
    BreadcrumbModule,
    ButtonModule,
    InputNumberModule,
    ToastModule,
    PipesModule,
    FieldsetModule,
    InputTextModule,
    InputMaskModule,
    ProgressSpinnerModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class CoreModule { }
