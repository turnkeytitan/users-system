import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { environment } from '@environments/environment';
import { LoginUser } from '../../interfaces/user.interface';
import { TokenObject } from '../../interfaces/token.interface';

describe('LoginService', () => {
  let loginService: LoginService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService],
    });
    loginService = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that there are no outstanding requests
    httpTestingController.verify();
  });

  it('should send a POST request to the API with the provided user data', () => {
    const user: LoginUser = { email: 'test@test.com', password: 'password' };
    const expectedResponse: TokenObject = { token: 'token' };

    loginService.login(user).then((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(`${environment.API}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(user);

    req.flush(expectedResponse);
  });
});
