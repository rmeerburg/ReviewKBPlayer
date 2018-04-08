import { NgModule } from '@angular/core';
import * as ngcommon  from '@angular/common';
import { UsersComponent } from './users/users.component';
import { UserService } from '../services/user.service';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoutingModule } from './admin.routing';
import { MatListModule, MatButtonModule, MatIconModule, MatInputModule, MatSelectModule, MatCheckboxModule } from '@angular/material';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from 'app/common/common.module';
import { TeamsService } from 'app/services/teams.service';

@NgModule({
  imports: [
    ngcommon.CommonModule,
    CommonModule,
    AdminRoutingModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatCheckboxModule,
  ],
  declarations: [
    UsersComponent,
    UserComponent
  ],
  providers: [
    UserService,
    TeamsService,
  ]
})
export class AdminModule { }
