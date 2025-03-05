import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiURL = 'https://jsonplaceholder.typicode.com/users'
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts'
  constructor(private http: HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get<any>(this.apiURL);
  }

    // Fetch posts for a specific user
    getPostsForUser(userId: number): Observable<any> {
      return this.http.get<any>(`${this.postsUrl}?userId=${userId}`);
    }
}
