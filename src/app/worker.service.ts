import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, publishReplay, refCount, shareReplay } from 'rxjs';
import { Worker } from './worker';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private workerUrl$ : string = 'http://127.0.0.1:8765/hr-worker';
  private workers$ : Observable<Worker[]>;

  constructor(private http : HttpClient) { }

  requestWorkers(refresh?: boolean) : Observable<Worker[]> {
    const token_jwt : string = sessionStorage.getItem('token_jwt') || '';

    //if(!this.workers$ || refresh) {
      this.workers$ = this.http.get<Worker[]>(
        `${this.workerUrl$}/workers`,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + JSON.parse(token_jwt).access_token
          })
        }
      ).pipe(
        shareReplay(1),
        publishReplay(),
        refCount()
      );
    //}

    return this.workers$;
  }
}
