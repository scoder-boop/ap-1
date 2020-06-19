import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Profile } from '../model/profile';
import { NoisyResponse } from '../model/noisyResponse';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  private siteUrl = 'http://localhost:8080/noisy/sites'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getAllSites(): Observable<NoisyResponse> {
    const url = `${this.siteUrl}/all`;
    return this.http.get<NoisyResponse>(url)
      .pipe(
        tap(_ => this.log('SiteService: fetched All Sites')),
        catchError(this.handleError<NoisyResponse>('getSites'))
      );
  }

  /** Log a ProfileService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ProfileService: ${message}`);
  }
 /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      console.error(`Backend returned code ${error.status}, body was: ${error.error} ${error.error} ${error.error.message}`);

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
