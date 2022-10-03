import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { InputTextModule } from 'primeng/inputtext';
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import { BackNavigatorComponent } from './components/back-navigator/back-navigator.component';
import { FormValidatorComponent } from './components/form-validator/form-validator.component';

@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    ActionBarComponent,
    SearchBarComponent,
    BackNavigatorComponent,
    FormValidatorComponent,
  ],
  exports: [
    MenuComponent,
    HeaderComponent,
    ActionBarComponent,
    SearchBarComponent,
    BackNavigatorComponent,
    FormValidatorComponent,
  ],
  imports: [
    CommonModule,
    InputTextModule,
    CoreModule,
    FormsModule
  ]
})
export class SharedModule { }
