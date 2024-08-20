import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient ,private router : Router) {}

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

 
  register(user: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  // Retrieve user ID from localStorage
  getUserId(): string {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).id : '';
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(["/login"]);
  }
}
