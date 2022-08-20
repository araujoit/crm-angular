import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, flatMap, from, map, mergeMap, Observable, of, retry, switchMap, tap } from 'rxjs';

import { Worker } from '../worker';
import { WorkerService } from '../worker.service';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.scss']
})
export class WorkerListComponent implements OnInit {
  workers: Worker[] = [];

  constructor(private workerService : WorkerService) {}

  private handleError(error: HttpErrorResponse) : Observable<Array<Worker>> {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${JSON.stringify(error.error)}`);
    }
    return of([]);
  }

  ngOnInit(): void {
    this.workerService
    .requestWorkers()
    .pipe(
      //mergeMap(worker => worker),
      catchError(this.handleError),
      tap(() => console.log('HTTP request executed')),
      map(res => res),
      tap(res => console.log('mapped res', res)),
      retry(2)
    )
    .subscribe(workers => {
      if(workers) {
        workers.forEach(worker => this.workers.push(worker));
      }
    });
  }

}
