import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public user: User;
  public roles: string[];

  constructor(private readonly userService: UserService, private readonly route: ActivatedRoute, private readonly router: Router, private readonly location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userService.getUserRoles().subscribe(roles => this.roles = roles);

      if (params['id'] === 'new') {
        this.user = new User();
        return;
      }
      this.userService.getUser(params['id']).subscribe(user => this.user = user);
    });
  }

  public onChange() {
    this.userService.saveUser(this.user);
    if (this.user.isNew) {
      this.user.isNew = false;
      this.location.go(this.router.createUrlTree(['admin', 'users', this.user.email]).toString());
    }
  }
}