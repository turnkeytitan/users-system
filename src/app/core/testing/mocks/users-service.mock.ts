import { asyncData } from '../async-observable-helpers';

export class MockUsersService {
  getUsers() {
    return asyncData({
      id: 1,
      email: 'XXXXXXXXXXXXX',
      first_name: 'XXXX',
      last_name: 'XXXX',
      avatar: 'img',
    });
  }
  createUser() {
    return asyncData({
      id: 1,
      email: 'XXXXXXXXXXXXX',
      first_name: 'XXXX',
      last_name: 'XXXX',
      avatar: 'img',
    });
  }
  deleteUserForIndex() {}
}
