import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { User } from 'src/models/User';
import { environment } from 'src/environments/environment';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public signUp(user: User): Observable<any>{
    return this.http.post<User>(`${this.apiServerUrl}/api/v1/registration`, user);
  }

  public signIn(email:string, password: string): Observable<any>{
    const params = new HttpParams().append('email', email).append('password', password);
    return this.http.get<any>(`${this.apiServerUrl}/api/v1/registration/signIn`, {params});
  }

}
