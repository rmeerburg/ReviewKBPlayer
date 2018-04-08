import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TeamsService, Team } from '../../services/teams.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public user: User;
  public roles: string[];
  public teams: Team[];

  constructor(private readonly userService: UserService, private readonly teamsService: TeamsService, private readonly route: ActivatedRoute, private readonly router: Router, private readonly location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userService.getUserRoles().subscribe(roles => this.roles = roles);

      this.teamsService.getTeams().subscribe(teams => {
        this.teams = teams;
      });

      if (params['id'] === 'new') {
        this.user = new User();
        this.user.isNew = true;
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

  public userHasRole(role: string) {
    return this.user.roles.indexOf(role) !== -1;
  }
}