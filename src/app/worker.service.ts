import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';
import { Worker } from './worker';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  workerUrl : string = 'http://127.0.0.1:8765/hr-worker';

  constructor(private http : HttpClient, private sessionService : SessionService) { }

  public requestWorkers() : Observable<Worker[]> {
    const token_jwt : string = sessionStorage.getItem('token_jwt') || '';

    return this.http.get<Worker[]>(
      `${this.workerUrl}/workers`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + JSON.parse(token_jwt).access_token
        })
      }
    );
  }
}
