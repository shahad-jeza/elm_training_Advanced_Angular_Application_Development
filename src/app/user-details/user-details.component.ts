import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule], // Import CommonModule for *ngIf, *ngFor, etc.
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any;
  posts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      // Fetch user details
      this.usersService.getUsers().subscribe({
        next: (users) => {
          this.user = users.find((u: any) => u.id === +userId);
        },
        error: (err) => {
          console.error('Error fetching user details:', err);
        }
      });

      // Fetch user posts
      this.usersService.getPostsForUser(+userId).subscribe({
        next: (posts) => {
          this.posts = posts;
        },
        error: (err) => {
          console.error('Error fetching user posts:', err);
        }
      });
    }
  }
}