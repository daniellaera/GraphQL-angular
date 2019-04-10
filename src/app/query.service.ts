import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get(this.URL + '/data');
  }

}
