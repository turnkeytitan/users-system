import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { UserList } from '../../interfaces/userList.interface';
import { HttpClient } from '@angular/common/http';
import { asyncData } from '@core/testing/async-observable-helpers';
import { throwError } from 'rxjs';
const userList: UserList = {
  page: 1,
  per_page: 2,
  total: 1,
  total_pages: 1,
  data: [
    {
      id: 1,
      email: 'test@test.com',
      first_name: 'test',
      last_name: 'test',
      avatar: 'img',
    },
  ],
};
const newUser = {
  name: 'test name',
  job: 'test job',
  id: 'test id',
  createdAt: 'test time',
};

describe('UsersService', () => {
  let httpClient: HttpClient;
  let userService: UsersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService, HttpClientTestingModule],
    });
    httpClient = TestBed.inject(HttpClient);
    userService = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should send a get request to get the list of users', () => {
    userService.getUsers().subscribe({
      next: (heroes) =>
        expect(heroes).withContext('should return expected heroes').toEqual(userList),
      error: fail,
    });
    const req = httpTestingController.expectOne(userService.url);
    expect(req.request.method).toEqual('GET');

    // Respond with the mock heroes
    req.flush(userList);
  });
  it('should send a post request to save a user', () => {
    userService.createUser({ name: 'test name', job: 'test job' }).subscribe({
      next: (res) => expect(res).withContext('should return new user info').toEqual(newUser),
      error: fail,
    });
    const req = httpTestingController.expectOne(userService.url);
    expect(req.request.method).toEqual('POST');

    // Respond with the mock heroes
    req.flush(newUser);
  });
  it('should send a delete request to delete a user', () => {
    userService.deleteUserForIndex(1).subscribe({
      next: (res) => expect(res).withContext('should return success').toEqual(null),
      error: fail,
    });
    const req = httpTestingController.expectOne(`${userService.url}/1`);
    expect(req.request.method).toEqual('DELETE');

    // Respond with the mock heroes
    req.flush(null);
  });
  it("should handle errors whenever there's one", () => {
    userService.getUsers().subscribe({
      next: (res) => null,
      error: (error) => {
        expect(error.operation).toEqual('getUsers');
      },
    });
    const req = httpTestingController.expectOne(userService.url);
    expect(req.request.method).toEqual('GET');

    // Respond with the mock heroes
    req.flush(new Error('error'));
  });
});
