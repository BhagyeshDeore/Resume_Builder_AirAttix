import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private authStateSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  authState$ = this.authStateSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          console.log("User found and stored in localStorage:", JSON.stringify(user));
          this.authStateSubject.next(true); // Notify about login
          return user;
        } else {
          console.error("Invalid credentials.");
          return null;
        }
      }),
      catchError(error => {
        console.error("Login failed:", error);
        return of(null);
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, userData);
  }

  getUserId(): string {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).id : '';
  }

  logout(): void {
    localStorage.removeItem('user');
    this.authStateSubject.next(false); // Notify about logout
    this.router.navigate(["/login"]);
  }
}
