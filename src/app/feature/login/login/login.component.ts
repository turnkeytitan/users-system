import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/services/login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private readonly router: Router,
    private loginService: LoginService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      // email: ['eve.holt@reqres.in', Validators.required],
      // password: ['cityslicka', [Validators.required, Validators.minLength(8)]],
    });
  }
  ngOnInit(): void {
    localStorage.getItem('token') && this.redirectUsers();
  }
  async login() {
    try {
      const loginResponse = await this.loginService.login(this.form.value);
      loginResponse.token && localStorage.setItem('token', loginResponse.token);
      this.redirectUsers();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Este método no se puede modificar
   * */
  public redirectUsers(): void {
    this.router.navigateByUrl('/users/list');
  }

  get email() {
    return this.form.controls.email;
  }
  get password(){
    return this.form.controls.password;
  }
}
