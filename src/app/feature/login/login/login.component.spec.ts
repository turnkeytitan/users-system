import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { LoginService } from '../shared/services/login/login.service';
import { FormBuilder, UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: jasmine.SpyObj<LoginService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: Router, useValue: routerSpy },
        UntypedFormBuilder,
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect if there is a token', () => {
    spyOn(localStorage, 'getItem').and.returnValue('token');
    component.ngOnInit();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/users/list');
  });

  it('should not redirect if there is not a token', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    component.ngOnInit();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should login and redirect if login is successful', async () => {
    const formValues = { email: 'test@test.com', password: 'password' };
    const response = { token: 'token' };
    component.form.setValue(formValues);
    loginService.login.and.returnValue(Promise.resolve(response));
    spyOn(localStorage, 'setItem');

    await component.login();

    expect(loginService.login).toHaveBeenCalledWith(formValues);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', response.token);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/users/list');
  });

  it('should handle error if login is unsuccessful', async () => {
    const formValues = { email: 'test@test.com', password: 'password' };
    component.form.setValue(formValues);
    loginService.login.and.returnValue(Promise.reject('error'));
    spyOn(console, 'error');

    await component.login();

    expect(loginService.login).toHaveBeenCalledWith(formValues);
    expect(console.error).toHaveBeenCalledWith('error');
  });
});