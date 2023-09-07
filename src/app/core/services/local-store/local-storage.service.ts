import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  storeTokens(token: string, refreshToken: string): void {
    if (this.getLocalItem('token')) {
      this.setLocalItem('token', token);
    } else {
      this.setSessionItem('token', token);
    }

    if (this.getLocalItem('refreshToken')) {
      this.setLocalItem('refreshToken', refreshToken);
    } else {
      this.setSessionItem('refreshToken', refreshToken);
    }
  }

  setLocalItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return this.getLocalItem(key) ?? this.getSessionItem(key);
  }

  getToken(): string {
    return this.getLocalItem('token') ?? this.getSessionItem('token');
  }

  setSessionItem(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  getLocalItem(key: string): string {
    return localStorage.getItem(key)!;
  }

  getSessionItem(key: string): string {
    return sessionStorage.getItem(key)!;
  }

  removeLocalItem(key: string): void {
    localStorage.removeItem(key);
  }

  removeSessionItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clearAllStorage(): void {
    localStorage.clear();
    sessionStorage.clear();
  }
}
