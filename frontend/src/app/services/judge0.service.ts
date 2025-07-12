import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, filter, Observable, of, switchMap, take, timer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Judge0Service {
  private url = 'https://judge0-ce.p.rapidapi.com';
  private headers = new HttpHeaders({
    'X-RapidAPI-Key': 'bc10b06375msh10696d6812c8f96p186bcejsn91775a5444f0',
    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  submitCode(code: string, languageId: number, input: string = ''): Observable<any> {
    const body = {
      source_code: btoa(code),
      language_id: languageId,
      stdin: btoa(input)
    };

    const params = new HttpParams()
      .set('base64_encoded', 'true')
      .set('wait', 'false');

    return this.http.post(`${this.url}/submissions`, body, {
      headers: this.headers,
      params: params
    });
  }

  getResult(token: string): Observable<any> {
    const params = new HttpParams().set('base64_encoded', 'true');

    return this.http.get(`${this.url}/submissions/${token}`, {
      headers: this.headers,
      params: params
    });
  }

  pollResult(token: string): Observable<any> {
    return timer(0, 1000).pipe(
      switchMap(() => this.getResult(token)),
      // Complete when status >= 3 (e.g., status.id 3 = "Accepted")
      filter(result => result.status?.id >= 3),
      take(1),
      catchError(err => of({ error: true, details: err }))
    );
  }

  decode(output: string): string {
    return output ? atob(output) : '';
  }
}
