import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // Import RouterModule for routerLink
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.users.forEach(user => {
          this.usersService.getPostsForUser(user.id).subscribe({
            next: (posts) => {
              user.posts = posts;
              user.postCount = posts.length;
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
}