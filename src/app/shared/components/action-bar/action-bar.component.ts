import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/core/breadcrumb.service';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {

  subscription: Subscription;
  items: MenuItem[] = [];
  home!: MenuItem;
  loadBreadcrumb = false;

  constructor(
    public breadcrumbService: BreadcrumbService,
  ) {
    this.subscription = breadcrumbService.itemsHandler.subscribe(async response => {
      this.items = response;
      if (this.items && this.items.length > 0) {
        this.loadBreadcrumb = true;
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async ngOnInit() {
  }

}
