import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { environment } from '@environments/environment';
import { UserList } from '../../interfaces/userList.interface';
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

describe('UsersService', () => {
  let usersService: UsersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService, HttpClientTestingModule],
    });
    usersService = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that there are no outstanding requests
    httpTestingController.verify();
  });

  it('should send a get request to get the list of users', () => {
    usersService.getUsers().then((response) => {
      expect(response).toEqual(userList);
    });

    const req = httpTestingController.expectOne(`${environment.API}/users`);
    expect(req.request.method).toBe('GET');
    expect(req.request.body).toEqual(userList);

    req.flush(userList);
  });
});
