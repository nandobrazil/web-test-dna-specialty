import { Injectable } from '@angular/core';
import { Subject, Observable, asyncScheduler } from 'rxjs';
import { delay, distinctUntilChanged, throttleTime } from 'rxjs/operators';

export interface ILoading {
    isLoading: boolean;
    message: string;
}


@Injectable({ providedIn: 'root' })
export class LoadingService {

  private loadingSubject: Subject<boolean> = new Subject<boolean>();

  setLoading(isLoading: boolean) {
    this.loadingSubject.next(isLoading);
  }

  isLoading(): Observable<boolean> {
    return this.loadingSubject.pipe(
      throttleTime(250, asyncScheduler, { leading: false, trailing: true }),
      distinctUntilChanged((x, y) => x === y),
      delay(0));
  }
}
