import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {  Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpClientService {

  constructor(private http: HttpClient, private authservice:AuthService) {}

  Token:any = 'Bearer ' + this.authservice.getToken();
  headers = new HttpHeaders().set('Authorization', this.Token);


  get(pathurl: string): Observable<any>{
    return this.http.get<any[]>(`${environment.hostUrl}${pathurl}`, {
      headers: this.headers
    });
  }

  post(pathurl: string, body:any): Observable<any> {
    return this.http.post(
      `${environment.hostUrl}${pathurl}`,
      body, { headers: this.headers }
    );
  }

  put(pathurl: string, body: any = {}): Observable<any> {
    return this.http.put(
      `${environment.hostUrl}${pathurl}`,
      body,
      { headers: this.headers }
    );
  }

  delete(pathurl: any): Observable<any> {
    return this.http.delete(
      `${environment.hostUrl}${pathurl}`,{ headers: this.headers }
    );
  }
}
