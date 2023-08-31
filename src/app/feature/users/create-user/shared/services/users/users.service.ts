import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { retry, timeout } from 'rxjs/operators';
import { UserList } from '../../interfaces/userList.interface';
import { NewUser } from '@feature/users/create-user/shared/interfaces/newUser.interface';
import { NewUserDTO } from '@core/models/newUserDTO.interface';

/**
 * El nombre de las clases o métodos no se pueden cambiar
 * */
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url = `${environment.API}/users`;
  constructor(private http: HttpClient) {}

  getUsers(): Promise<UserList> {
    return this.http.get(this.url).pipe(retry(1), timeout(5000)).toPromise() as Promise<UserList>;
  }

  createUser(newUser: NewUser): Promise<NewUserDTO> {
    return this.http
      .post(this.url, newUser)
      .pipe(retry(1), timeout(5000))
      .toPromise() as Promise<NewUserDTO>;
  }

  deleteUserForIndex(index: number) {
    return this.http.delete(`${this.url}/${index}`).pipe(retry(1), timeout(5000)).toPromise();
  }
}
