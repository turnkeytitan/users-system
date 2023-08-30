import { NgModule } from '@angular/core';
import { HomeUserComponent } from './home-user/home-user.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [HomeUserComponent, NavBarComponent, ListUsersComponent, CreateUserComponent],
  imports: [RouterModule, UsersRoutingModule],
})
export class UsersModule {}
