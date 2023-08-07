import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Moment } from '../../interfaces/Moment';
import { Response } from 'src/app/interfaces/Response';

import { environments} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MommentService {
  // Chama a url da api
  private baseApiUrl = environments.baseApiUrl
  // a url pode mudar o final.
  // Neste caso vamos fazer requisisções para o moments
  private apiUrl = `${this.baseApiUrl}api/moments`

  constructor(private http: HttpClient) { }

  getMoment(): Observable<Response<Moment[]>> {
    return this.http.get<Response<Moment[]>>(this.apiUrl)
  }

  // envia para a api os dados
  createMoment(formData: FormData): Observable<FormData> {
    // sintaxe para fazer um post na api
    
                                    // url       data
    return this.http.post<FormData>(this.apiUrl, formData);
  }
}
