import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  // Fetch all users with error handling
  getUsers(): Observable<any> {
    return this.http.get<any>(this.usersUrl).pipe(
      catchError(this.handleError) // Apply error handling
    );
  }

  // Fetch posts for a specific user with error handling
  getPostsForUser(userId: number): Observable<any> {
    return this.http.get<any>(`${this.postsUrl}?userId=${userId}`).pipe(
      catchError(this.handleError) // Apply error handling
    );
  }

  // Generic error handling function
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server error ${error.status}: ${error.message}`;
    }

    console.error(errorMessage); // Log error for debugging
    return throwError(() => new Error(errorMessage)); // Return an observable with an error message
  }
}