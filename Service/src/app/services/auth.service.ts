import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Class/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'https://localhost:7223/api/Authentification';

  constructor(private http: HttpClient) {}

    login(username: string, password: string) {
    const params = new HttpParams()
    .set('username', username)
    .set('password', password);
    return this.http.post<any>(`${this.authUrl}/login`, params);
  }
  loginAdm(username: string, password: string) {
    const params = new HttpParams()
    .set('username', username)
    .set('password', password);
    return this.http.post<any>(`${this.authUrl}/loginadm`, params);
  }
  logouts(){
    return this.http.post<any>(this.authUrl +'/logout',{});
  }
  saveToken(token : any) {
    localStorage.setItem('token', token['tokenString']);
  }
  resetToken(){
    localStorage.removeItem('token');
  }
  getToken(): string {
    return localStorage.getItem('token')!;
  }
  register(user :User) {
    return this.http.post<any>(`${this.authUrl}/registration`, user);
  }
  validateToken(){
    const header = new HttpHeaders().set('token', 'Bearer' + this.getToken());
    return this.http.post(`${this.authUrl}/token`,null, { headers: header });
  }
  getUser(){
    const header = new HttpHeaders().set('token', 'Bearer' + this.getToken());
    return this.http.post<User>(`${this.authUrl}/user`,null, { headers: header });
  }
}
