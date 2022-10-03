import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { InputTextModule } from 'primeng/inputtext';
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    ActionBarComponent,
    SearchBarComponent,
  ],
  exports: [
    MenuComponent,
    HeaderComponent,
    ActionBarComponent,
    SearchBarComponent,
  ],
  imports: [
    CommonModule,
    InputTextModule,
    CoreModule,
    FormsModule
  ]
})
export class SharedModule { }
