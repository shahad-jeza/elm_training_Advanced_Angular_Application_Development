import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  selectedUserId: number | null = null; // Track which user's posts are visible

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    // Fetch users
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;

        // Fetch posts for each user
        this.users.forEach(user => {
          this.usersService.getPostsForUser(user.id).subscribe({
            next: (posts) => {
              user.posts = posts; // Add posts to the user object
              user.postCount = posts.length; // Add post count to the user object
            },
            error: (err) => {
              console.error(`Error fetching posts for user ${user.name}:`, err);
            }
          });
        });
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  // Toggle posts visibility for a user
  togglePosts(userId: number): void {
    this.selectedUserId = this.selectedUserId === userId ? null : userId;
  }
}