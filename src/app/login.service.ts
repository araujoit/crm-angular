import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NodeWithI18n } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry } from 'rxjs';
import { AccessResponse } from './access_response';
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded',
    Authorization: 'Basic bXlhcHBuYW1lMTIzOm15YXBwc2VjcmV0MTIz'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl : string = 'http://127.0.0.1:8765/hr-oauth';
  basicAuth : string = 'Basic bXlhcHBuYW1lMTIzOm15YXBwc2VjcmV0MTIz';

  access_response : AccessResponse = new AccessResponse('', '', -1, '', '');

  constructor(private http : HttpClient) { }

  private handleError(error: HttpErrorResponse) : Observable<boolean> {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${JSON.stringify(error.error)}`);
    }
    return of(false);
  }

  public login(user : User) : Observable<boolean> {
    const postData : string = "username=" + user.username + "&password=" + user.password + "&grant_type=password";
    return this.http.post<AccessResponse>(
      this.loginUrl + '/oauth/token', 
      postData, 
      httpOptions
    )
    .pipe(
      map(access_response => {
        console.log('access_response:', access_response);
        if (access_response) {
          const now = new Date();
          const ttl = access_response.expires_in;
          const item = {
            value: access_response.access_token,
            expiresAt: now.getTime() + ttl
          };
          sessionStorage.setItem('token_jwt', JSON.stringify(item));
          return true;
        }
        return false;
      }),
      catchError(this.handleError),
      retry(2)
    );
  }

  public logout() : Observable<boolean> {
    sessionStorage.removeItem('token_jwt');
    return of(true);
  }
}
