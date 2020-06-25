import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ProfileInterest } from '../model/profileInterest';
import { NoisyProfileInterest } from '../model/noisyProfileInterest';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileInterestService {

  private profileInterestUrl = 'http://localhost:8080/noisy/profile-interest'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET profileInterests for profile by profile id. Will 404 if id not found */
  getProfileInterests(id: number): Observable<NoisyProfileInterest> {
    const url = `${this.profileInterestUrl}/${id}`;
    return this.http.get<NoisyProfileInterest>(url)
      .pipe(
        tap(_ => this.log(`fetched profile id=${id}`)),
        catchError(this.handleError<NoisyProfileInterest>(`getProfileInterest id=${id}`))
      );
  }

  /** PUT: update the profile on the server */
  updateProfileInterest(profileInterest: ProfileInterest): Observable<any> {
    const url = `${this.profileInterestUrl}/${profileInterest.id}`;
    return this.http.put(url, profileInterest, this.httpOptions)
    .pipe(
      tap(_ => this.log(`updated profile id=${profileInterest.id}`)),
      catchError(this.handleError<any>('updateProfileInterest'))
    );
  }

  /** POST: add a new profileInterest to the server */
  addProfileInterest(profileInterest: ProfileInterest): Observable<any> {
    return this.http.post<ProfileInterest>(this.profileInterestUrl, profileInterest, this.httpOptions)
    .pipe(
      tap((newProfileInterest: ProfileInterest) => this.log(`added profile id=${newProfileInterest.id}`)),
      catchError(this.handleError<ProfileInterest>('addProfileInterest'))
    );
  }

  /** ARCHIVE: make this profileInterest inative on the server */
  archive(profileInterest: ProfileInterest): Observable<any> {
    profileInterest.active = false;
    const url = `${this.profileInterestUrl}/${profileInterest.id}`;
    return this.http.put(url, profileInterest, this.httpOptions).pipe(
      tap(_ => this.log(`archived profile id=${profileInterest.id}`)),
      catchError(this.handleError<any>('archive'))
    );
  }

  /** UNARCHIVE: make this profileInterest inative on the server */
  unArchive(profileInterest: ProfileInterest): Observable<any> {
    profileInterest.active = true;
    const url = `${this.profileInterestUrl}/${profileInterest.id}`;
    return this.http.put(url, profileInterest, this.httpOptions).pipe(
      tap(_ => this.log(`archived profileInterest id=${profileInterest.id}`)),
      catchError(this.handleError<any>('archive'))
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
