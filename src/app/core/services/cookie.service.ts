import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CookieService implements OnDestroy {
  prefix = 'settings-';
  onSubject = new Subject<{ key: string; value: any }>();
  changes = this.onSubject.asObservable().pipe(share());

  constructor() {
    this.start();
  }

  ngOnDestroy(): void {
    this.stop();
  }

  set(key, value): void {
    localStorage.setItem(this.prefix + key, JSON.stringify(value));
    this.onSubject.next({ key: this.prefix + key, value });
  }

  get(key, fallback): any {
    try {
      if (localStorage.getItem(this.prefix + key)) {
        const a = JSON.parse(localStorage.getItem(this.prefix + key));
        return JSON.parse(localStorage.getItem(this.prefix + key));
      }
    } catch (error) {
      console.error('Something went wrong parsing the item, returning fallback', error);
    }

    return fallback;
  }

  delete(key): void {
    localStorage.removeItem(this.prefix + key);
    this.onSubject.next({ key: this.prefix + key, value: null });
  }

  count(): number {
    return localStorage.length;
  }

  deleteAll(): void {
    const items = { ...localStorage };

    for (const key in items) {
      if (Object.prototype.hasOwnProperty.call(items, key)) {
        localStorage.removeItem(key);
        this.onSubject.next({ key, value: null });
      }
    }
  }

  start(): void {
    window.addEventListener('storage', this.storageEventListener.bind(this));
  }

  stop(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
    this.onSubject.complete();
  }

  storageEventListener(event: StorageEvent): void {
    if (event.storageArea === localStorage) {
      let value;
      try {
        value = JSON.parse(event.newValue);
      } catch (e) {
        value = event.newValue;
      }
      this.onSubject.next({ key: event.key, value });
    }
  }
}
