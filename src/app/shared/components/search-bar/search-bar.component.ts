import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  debounceSearch = new Subject();
  $destroy = new Subject();
  filter!: string;

  @Input() placeholder!: string;
  @Input() routerlinkAddButton!: string;
  @Output() callFilter = new EventEmitter();

  constructor(
    private router: Router
  ) {
    this.debounceSearch.pipe(debounceTime(500), takeUntil(this.$destroy)).subscribe(() => {
      this.emitEvent();
    });
  }

  ngOnDestroy(): void {
    this.$destroy.next(null);
    this.$destroy.complete();
  }

  ngOnInit(): void { }

  emitEvent() {
    this.callFilter.emit(this.filter);
  }

  navigateTo() {
    this.router.navigate([this.routerlinkAddButton]);
  }

}
