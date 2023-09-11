import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { catchError, retry, timeout } from 'rxjs/operators';
import { UserList } from '../../interfaces/userList.interface';
import { NewUser } from '@feature/users/create-user/shared/interfaces/newUser.interface';
import { NewUserDTO } from '@core/models/newUserDTO.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url = `${environment.API}/users`;
  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserList> {
    return this.http
      .get<UserList>(this.url)
      .pipe(retry(1), timeout(5000), catchError(this.handleError<UserList>('getUsers')));
  }

  createUser(newUser: NewUser): Observable<NewUserDTO> {
    return this.http
      .post<NewUserDTO>(this.url, newUser)
      .pipe(retry(1), timeout(5000), catchError(this.handleError<NewUserDTO>('createUser')));
  }

  deleteUserForIndex(index: number) {
    return this.http
      .delete(`${this.url}/${index}`)
      .pipe(retry(1), timeout(5000), catchError(this.handleError<any>('deleteUserForIndex')));
  }

  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);

      if (error.error instanceof Event) {
        throw error.error;
      }

      const message = `server returned code ${error.status} with body "${error.error}"`;
      throw new Error(`${operation} failed: ${message}`);
    };
  }
}
