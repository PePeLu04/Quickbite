import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Empresa} from "../model/Empresa";
import {Login_Request} from "../model/DTO/Login_Request";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = environment.endpoint+"/"+environment.apiAuth;

  public admin: Login_Request={
    username: '',
    password: '',
    dni: ''
  };

  constructor(private http: HttpClient) { }

  login(username: string, password: string, dni: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login`, { username, password, dni });
  }
}
