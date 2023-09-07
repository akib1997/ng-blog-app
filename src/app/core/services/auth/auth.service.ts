import { Injectable } from '@angular/core';
import { LocalStorageService } from '@services/local-store/local-storage.service';
import { User } from '@app/models/user.model';
import { NavigateService } from '../navigate/navigate.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser = 'currentUser';
  private registeredUsers = 'registeredUsers';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.isAuthenticated()
  );
  isAuthenticated$: Observable<boolean> =
    this.isAuthenticatedSubject.asObservable();

  private readonly defaultCredentials = [
    { userName: 'admin', password: 'password' },
    { userName: 'user', password: 'password' },
  ];

  constructor(
    private storageService: LocalStorageService,
    private navigateService: NavigateService
  ) {
    if (!this.storageService.getItem(this.registeredUsers)) {
      this.storageService.setLocalItem(
        this.registeredUsers,
        JSON.stringify(this.defaultCredentials)
      );
    }
  }


  signUp(payload: User): boolean {
    const users: User[] = JSON.parse(
      this.storageService.getItem(this.registeredUsers) || '[]'
    );
    const existingUser = users.find(
      (user) => user.userName === payload.userName
    );

    if (existingUser) {
      return false;
    } else {
      users.push(payload);
      this.storageService.setLocalItem(
        this.registeredUsers,
        JSON.stringify(users)
      );
      return true;
    }
  }

  logout() {
    this.storageService.removeLocalItem(this.currentUser);
    this.isAuthenticatedSubject.next(false);
  }

  login(payload: User): boolean {
    const currentUsers = this.getCurrentUsers();
    console.log(currentUsers);
    const userFound = currentUsers.find(
      (user) => user.userName === payload.userName
    );

    if (userFound && userFound.password === payload.password) {
      this.storageService.setLocalItem(
        this.currentUser,
        JSON.stringify(payload)
      );
      this.isAuthenticatedSubject.next(true);
      return true;
    } else {
      return false;
    }
  }

  getCurrentUsers(): User[] {
    return JSON.parse(
      this.storageService.getItem(this.registeredUsers) || '{}'
    );
  }

  getCurrentUser(): User {
    return JSON.parse(this.storageService.getItem(this.currentUser) || '{}');
  }

  isAuthenticated(): boolean {
    return !!this.storageService.getItem(this.currentUser);
  }
}
