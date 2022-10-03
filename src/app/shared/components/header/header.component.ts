import { Component, Input, OnInit } from '@angular/core';
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

  darkTheme = localStorage.getItem(StorageKeys.DARK_THEME) === 'dark-theme';
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.setLightTheme();
  }

  saveAndChangeTheme() {
    this.darkTheme = !this.darkTheme;
    localStorage.setItem(StorageKeys.DARK_THEME, this.darkTheme ? 'dark-theme' : '');
    this.setLightTheme();
  }

  setLightTheme() {
    const darkTheme = localStorage.getItem(StorageKeys.DARK_THEME);
    const body = document.getElementsByTagName('body')[0];
    darkTheme?.trim() ? body.classList.add(darkTheme || '') : body.classList.remove('dark-theme');
  }

  handleSignout() {
    this.authService.signOut();
  }

}
