import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeApiService {
  private apiUrl = 'http://worldtimeapi.org/api/timezone';

  constructor(private http: HttpClient) {}

  getTimeAndDate(timezone: string): Observable<any> {
    const url = `${this.apiUrl}/${timezone}`;
    return this.http.get<any>(url);
  }
}
