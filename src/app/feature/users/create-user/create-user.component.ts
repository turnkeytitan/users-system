import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from './shared/services/users/users.service';
import { ToastService } from '@core/services/toast.service';
import { NewUserDTO } from '@core/models/newUserDTO.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnDestroy {
  form: FormGroup<{ name: FormControl<string>; job: FormControl<string> }> = this.fb.group({
    name: ['', [Validators.required]],
    job: ['', Validators.required],
  });
  createUser$: Subscription = Subscription.EMPTY;
  constructor(
    private readonly router: Router,
    private fb: NonNullableFormBuilder,
    private usersService: UsersService,
    private toastService: ToastService,
  ) {}
  createUser() {
    this.createUser$ = this.usersService
      .createUser(this.form.getRawValue())
      .subscribe(this.handleCreation.bind(this));
  }
  handleCreation(user: NewUserDTO) {
    this.toastService.showToast({
      type: 'success',
      message: `User ${user.name} created successfully`,
    });
    this.redirectToListUsers();
  }
  public redirectToListUsers(): void {
    this.router.navigateByUrl('/users/list');
  }
  get name() {
    return this.form.controls.name;
  }
  get job() {
    return this.form.controls.job;
  }

  ngOnDestroy(): void {
      this.createUser$.unsubscribe();
  }
}
