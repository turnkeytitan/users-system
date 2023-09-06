import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TokenGuard } from './token.guard';

describe('TokenGuard', () => {
  let guard: TokenGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        TokenGuard,
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(TokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow to continue if there is a token', () => {
    spyOn(localStorage, 'getItem').and.returnValue('token');
    expect(guard.canActivate()).toBe(true);
  });

  it('should redirect to /login path if there is not a token', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(guard.canActivate()).toBe(false);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});