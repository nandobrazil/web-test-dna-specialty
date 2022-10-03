import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { StorageKeys } from '../../constants/storage-key';
import { AuthService } from '../../services/core/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isLogged!: boolean;
  inputSearch = '';
  toggleUser = false;

  lightTheme = localStorage.getItem(StorageKeys.LIGHT_THEME_KEY) === 'light-theme';
  constructor(
    private confirmationService: ConfirmationService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.setLightTheme();
  }

  saveAndChangeTheme() {
    this.lightTheme = !this.lightTheme;
    localStorage.setItem(StorageKeys.LIGHT_THEME_KEY, this.lightTheme ? 'light-theme' : '');
    this.setLightTheme();
  }

  setLightTheme() {
    const lightTheme = localStorage.getItem(StorageKeys.LIGHT_THEME_KEY);
    const body = document.getElementsByTagName('body')[0];
    lightTheme?.trim() ? body.classList.add(lightTheme || '') : body.classList.remove('light-theme');
  }

  handleSignout() {
    this.authService.signOut();
  }

}
