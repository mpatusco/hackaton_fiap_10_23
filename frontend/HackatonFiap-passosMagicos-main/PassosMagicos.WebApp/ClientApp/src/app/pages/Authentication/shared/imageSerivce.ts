import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export class ImageService
{
    baseUrl = environment.minimalUrl;
    
    constructor(private http: HttpClient) { }


    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    adicionar(formData) : Observable<any>
    {
        return this.http.post<any>(`${this.baseUrl}/Upload`, formData, this.httpOptions);
    }
}