import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  workerUrl : string = 'http://127.0.0.1:8765/hr-worker';

  constructor(private http : HttpClient, private sessionService : SessionService) { }

  public requestWorkers() : Observable<Worker[]> {
    const token_jwt : string = sessionStorage.getItem('token_jwt') || '';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + JSON.parse(token_jwt).access_token
      })
    };

    return this.http.get<Worker[]>(
      this.workerUrl + '/workers',
      httpOptions
    );
  }
}
