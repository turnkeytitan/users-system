import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { User } from '../../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { retry, timeout } from 'rxjs/operators';
import { TokenObject } from '../../interfaces/token.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  /**
   * El nombre de este metodo no debería ser cambiado, pero de ser necesario podrías cambiar la firma
   * */
  public login(user: User): Promise<TokenObject> {
    return this.http
      .post(`${environment.API}/login`, user)
      .pipe(retry(1), timeout(5000))
      .toPromise() as Promise<TokenObject>;
  }
}
