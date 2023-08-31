import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from './shared/services/users/users.service';
import { ToastService } from '@core/services/toast.service';
import { NewUser } from './shared/interfaces/newUser.interface';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  form: FormGroup;
  constructor(
    private readonly router: Router,
    private fb: FormBuilder,
    private usersService: UsersService,
    private toastService: ToastService,
  ) {
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      job: ['', Validators.required],
    });
  }
  async createUser() {
    try {
      const users = await this.usersService.createUser(this.form.value);
      this.toastService.showToast({
        type: 'success',
        message: `User ${users.name} created successfully`,
      });
      this.redirectToListUsers()
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Este método no se puede modificar
   * */
  public redirectToListUsers(): void {
    this.router.navigateByUrl('/users/list');
  }
  get name() {
    return this.form.controls.name;
  }
  get job() {
    return this.form.controls.job;
  }
}
