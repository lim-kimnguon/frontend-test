import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = "http://localhost:9090/api";

  constructor(private http : HttpClient) {  }

  getQuizById(id : number) : Observable<any>{
    return this.http.get<any>(`${this.url}/quiz/${id}`);
  }

  storeQCMAnswer(result: any) : Observable<any> {
    return this.http.post<any>(`${this.url}/questionAnswer/add`, result);
  }

  storeSelectionAnswer(result : any) : Observable<any> {
    return this.http.post<any>(`${this.url}/questionAnswer/add`, result);
  }

  storeQuestionAnswer(result : any) : Observable<any> {
    return this.http.post<any>(`${this.url}/questionAnswer/add`, result);
  }

  storeMatchingAnswer(result : any) : Observable<any> {
    return this.http.post<any>(`${this.url}/questionAnswer/add`, result);
  }

  storeGapAnswer(result : any) : Observable<any> {
    return this.http.post<any>(`${this.url}/questionAnswer/add`, result);
  }
}
