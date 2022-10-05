import { AuthHttpClientService } from './authhttpclient.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private authservice:AuthHttpClientService) { }

  listUser(): Observable<User[]>{
    return this.authservice.get(`/user`);
  }

  login(data: any): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${environment.hostUrl}/user/login`, data, { observe: 'response' });
  }

  changePassword(data:any,email:string): Observable<Object>{
    return this.authservice.put(`/user/changepassword/${email}`, data);
  }

  ForgotPassword(data:any): Observable<HttpResponse<User>>{
    return this.http.post<User>(`${environment.hostUrl}/user/forgotpassword`,data,{ observe: 'response' });
  }

  ResetPassword(data:any): Observable<User>{
    return this.http.put<User>(`${environment.hostUrl}/user/resetpassword`,data);
  }

  listUserByCreated(data:any): Observable<User[]>{
    return this.authservice.post(`/user/report`,data);
  }


  createUser(data:any): Observable<Object>{
    return this.authservice.post(`/user`, data);
  }
  adminCreateUser(data:any): Observable<Object>{
    return this.authservice.post(`/admin/user`, data);
  }

  getUser(id: number): Observable<User>{
    return this.authservice.get(`/user/${id}`);
  }
  getUserByRoleName(name: String): Observable<User>{
    return this.authservice.get(`/user/userrole/${name}`);
  }
  updateUser(id: number, data:any): Observable<Object>{
    return this.authservice.put(`/user/${id}`, data);
  }
  adminupdateUser(id: number, data:any): Observable<Object>{
    return this.authservice.put(`/admin/user/${id}`, data);
  }
  generatenewpassword(data:any): Observable<Object>{
    return this.authservice.put(`/user/generatenewpassword`, data);
  }

  deleteUser(id: number): Observable<Object>{
    return this.authservice.delete(`/user/${id}`);
  }
}
