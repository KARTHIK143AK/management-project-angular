import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = signal(false);

  async login(email: string, password: string): Promise<boolean> {
    // Replace this fake logic with real API call later
    if (email === 'admin@test.com' && password === 'admin') {
      this.loggedIn.set(true);
      return true;
    }
    return false;
  }

  logout() {
    this.loggedIn.set(false);
  }

  isLoggedIn() {
    return this.loggedIn();
  }
}