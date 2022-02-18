import { Injectable } from '@angular/core';
/**
 * LocalStorageService
 *
 * Wrapper to window.localStorage service.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 *
 * This can be extend in future using following references.
 * 1. https://firstclassjs.com/persist-data-using-local-storage-and-angular/
 * 2. https://blog.briebug.com/blog/managing-local-storage-in-angular
 */
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage;

  constructor() {
    this.localStorage = localStorage;
  }

  getItem(key: string): string | null {
    return this.localStorage.getItem(key);
  }

  setItem(key: string, data: string): void {
    this.localStorage.setItem(key, data);
  }

  removeItem(key: string): void {
    this.localStorage.removeItem(key);
  }
}
