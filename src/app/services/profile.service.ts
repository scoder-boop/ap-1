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
export class ProfileService {

  private profileUrl = 'http://localhost:8080/noisy/profiles'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /* GET heroes whose name contains search term */
  searchProfiles(term: string): Observable<NoisyResponse> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of();
    }
    return this.http.get<NoisyResponse>(`${this.profileUrl}/?name=${term}`).pipe(
      tap(x => x.data.length ?
        this.log(`found profiles matching "${term}"`) :
        this.log(`no profiles matching "${term}"`)),
      catchError(this.handleError<NoisyResponse>('searchProfiles'))
    );
  }

  getProfiles(): Observable<NoisyResponse> {
    return this.http.get<NoisyResponse>(this.profileUrl)
      .pipe(
        tap(_ => this.log('ProfileService: fetched Active Profiles')),
        catchError(this.handleError<NoisyResponse>('getProfiles'))
      );
  }

  getInactiveProfiles(): Observable<NoisyResponse> {
    const url = `${this.profileUrl}/inactive`;
    return this.http.get<NoisyResponse>(url)
      .pipe(
        tap(_ => this.log('ProfileService: fetched Inactive Profiles')),
        catchError(this.handleError<NoisyResponse>('getProfiles'))
      );
  }

  getAllProfiles(): Observable<NoisyResponse> {
    const url = `${this.profileUrl}/all`;
    return this.http.get<NoisyResponse>(url)
      .pipe(
        tap(_ => this.log('ProfileService: fetched All Profiles')),
        catchError(this.handleError<NoisyResponse>('getProfiles'))
      );
  }

  /** GET profile by id. Will 404 if id not found */
  getProfile(id: number): Observable<NoisyResponse> {
    const url = `${this.profileUrl}/${id}`;
    return this.http.get<NoisyResponse>(url)
      .pipe(
        tap(_ => this.log(`fetched profile id=${id}`)),
        catchError(this.handleError<NoisyResponse>(`getProfile id=${id}`))
      );
  }

  /** PUT: update the profile on the server */
  updateProfile(profile: Profile): Observable<any> {
    const url = `${this.profileUrl}/${profile.id}`;
    return this.http.put(url, profile, this.httpOptions)
    .pipe(
      tap(_ => this.log(`updated profile id=${profile.id}`)),
      catchError(this.handleError<any>('updateProfile'))
    );
  }

  /** POST: add a new profile to the server */
  addProfile(profile: Profile): Observable<any> {
    return this.http.post<Profile>(this.profileUrl, profile, this.httpOptions)
    .pipe(
      tap((newProfile: Profile) => this.log(`added profile id=${newProfile.id}`)),
      catchError(this.handleError<Profile>('addProfile'))
    );
  }

  /** ARCHIVE: make this profile inative on the server */
  archive(profile: Profile): Observable<any> {
    profile.active = false;
    const url = `${this.profileUrl}/${profile.id}`;
    return this.http.put(url, profile, this.httpOptions).pipe(
      tap(_ => this.log(`archived profile id=${profile.id}`)),
      catchError(this.handleError<any>('archive'))
    );
  }

  /** UNARCHIVE: make this profile inative on the server */
  unArchive(profile: Profile): Observable<any> {
    profile.active = true;
    const url = `${this.profileUrl}/${profile.id}`;
    return this.http.put(url, profile, this.httpOptions).pipe(
      tap(_ => this.log(`archived profile id=${profile.id}`)),
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
