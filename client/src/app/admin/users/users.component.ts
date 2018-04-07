import { Component, OnInit } from '@angular/core';
import { UserService, User } from 'app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private users: User[];

  constructor(private readonly userService: UserService) {
  }

  public async ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
