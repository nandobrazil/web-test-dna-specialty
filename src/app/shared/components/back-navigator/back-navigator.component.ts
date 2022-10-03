import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-navigator',
  templateUrl: './back-navigator.component.html',
  styleUrls: ['./back-navigator.component.scss']
})
export class BackNavigatorComponent implements OnInit {

  @Input() routerUrl!: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  handleBackNavigator() {
    this.router.navigate([this.routerUrl]);
  }
}
