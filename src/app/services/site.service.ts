import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Site } from '../model/site';
import { NoisySite } from '../model/noisySite';
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

  getAllSites(): Observable<NoisySite> {
    this.messageService.add(`SiteService: Getting all sites`);
    const url = `${this.siteUrl}/all`;
    return this.http.get<NoisySite>(url)
      .pipe(
        tap(_ => this.log('fetched All Sites')),
        catchError(this.handleError<NoisySite>('getSites'))
      );
  }

    /** POST: add a new site to the server */
    addSite(site: Site): Observable<any> {
      return this.http.post<Site>(this.siteUrl, site, this.httpOptions)
      .pipe(
        tap((newSite: Site) => this.log(`added site id=${newSite.id}`)),
        catchError(this.handleError<Site>('addSite'))
      );
    }

  /** PUT: update the site on the server */
  updateSite(site: Site): Observable<any> {
    const url = `${this.siteUrl}/${site.id}`;
    return this.http.put(url, site, this.httpOptions)
    .pipe(
      tap(_ => this.log(`updated site id=${site.id}`)),
      catchError(this.handleError<any>('updateSite'))
    );
  }


  /** Log a SiteService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`SiteService: ${message}`);
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
