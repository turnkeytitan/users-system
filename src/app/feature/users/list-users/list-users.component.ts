import { Component, OnInit } from '@angular/core';
import { UsersService } from '@feature/users/create-user/shared/services/users/users.service';
import { User, UserList } from '@feature/users/create-user/shared/interfaces/userList.interface';
import { ToastService } from '@core/services/toast/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  users: User[];
  filter: string = '';
  getUsers$: Subscription = Subscription.EMPTY;
  deleteUser$: Subscription = Subscription.EMPTY;

  constructor(private usersService: UsersService, private toastService: ToastService) {
    this.users = [];
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.getUsers$ = this.usersService.getUsers().subscribe(this.handleUsersList.bind(this));
  }
  handleUsersList(users: UserList) {
    this.users = users.data;
  }

  deleteUser(index: number) {
    this.deleteUser$ = this.usersService
      .deleteUserForIndex(index)
      .subscribe(this.handleUserDeletion.bind(this, index));
  }
  handleUserDeletion(index: number) {
    this.toastService.showToast({
      type: 'success',
      message: `User ${
        this.users.find((user) => user.id === index)?.first_name
      } deleted successfully`,
    });
    this.users = this.users.filter((user) => user.id !== index);
  }
}
