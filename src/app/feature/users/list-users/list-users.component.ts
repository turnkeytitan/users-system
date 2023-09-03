import { Component, OnInit } from '@angular/core';
import { UsersService } from '@feature/users/create-user/shared/services/users/users.service';
import { User } from '@feature/users/create-user/shared/interfaces/userList.interface';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  users: User[];
  filter: string = '';

  constructor(private usersService: UsersService, private toastService: ToastService) {
    this.users = [];
  }

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    try {
      const users = await this.usersService.getUsers();
      this.users = users.data;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteUser(index: number) {
    try {
      await this.usersService.deleteUserForIndex(index);
      this.toastService.showToast({
        type: 'success',
        message: `User ${
          this.users.find((user) => user.id === index)?.first_name
        } deleted successfully`,
      });
      this.users = this.users.filter((user) => user.id !== index);
    } catch (error) {
      console.error(error);
    }
  }
}
