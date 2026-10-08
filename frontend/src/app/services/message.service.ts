import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


export interface PhpData {
  status: 'ok' | 'error';
  data?: any;
}

@Injectable({providedIn: 'root'})

export class MessageService {
  private http = inject(HttpClient);
  private baseURL = environment.backendPrefix;
  sendMessage(url: string, data: any): Observable<PhpData> {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    const fullUrl = `${this.baseURL}/${url}.php`;
    formData.forEach((v, k) => console.log(k, v));
    return this.http.post<PhpData>(fullUrl, formData, {withCredentials: true});
  }
}