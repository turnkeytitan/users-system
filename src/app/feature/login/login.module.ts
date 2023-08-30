import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './shared/services/login/login.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [ReactiveFormsModule, LoginRoutingModule, CommonModule, HttpClientModule],
  providers: [LoginService],
})
export class LoginModule {}
