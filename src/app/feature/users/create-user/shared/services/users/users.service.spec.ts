import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { UserList } from '../../interfaces/userList.interface';
import { HttpClient } from '@angular/common/http';
import { asyncData } from '@core/testing/async-observable-helpers';
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
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let userService: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService, HttpClientTestingModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    userService = new UsersService(httpClientSpy);
  });

  it('should send a get request to get the list of users', () => {
    httpClientSpy.get.and.returnValue(asyncData(userList));
    userService.getUsers().subscribe((data) => {
      expect(data).toEqual(userList);
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});
