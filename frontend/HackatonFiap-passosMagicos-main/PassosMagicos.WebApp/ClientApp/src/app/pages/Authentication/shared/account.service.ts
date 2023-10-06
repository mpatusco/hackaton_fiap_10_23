import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Foto } from 'src/app/models/Foto';
import { ResponseModel, ResponseTokenModel } from 'src/app/models/Login';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.baseUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  httpOptionsImage = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data; boundary=something' })
  };

  constructor(private http: HttpClient) { }

  logar(formData) : Observable<ResponseTokenModel>
  {
    return this.http.post<ResponseTokenModel>(`${this.baseUrl}/create_session`, formData, this.httpOptions);
  }

  Cadastrar(formData): Observable<ResponseModel>
  {
    return this.http.post<ResponseModel>(`${this.baseUrl}/create_user`, formData, this.httpOptions);
  }

  checkIn()
  {
    return this.http.post<any>(`${this.baseUrl}/checkin`, null);
  }

  checkOut()
  {
    return this.http.post<any>(`${this.baseUrl}/checkout`, null);
  }
}
