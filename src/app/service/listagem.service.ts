import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoedasResponse } from '../conversao/listagem.model'; // Importe a interface 

@Injectable({
  providedIn: 'root'
})
export class ListagemService {
  private apiUrl = 'https://api.exchangerate.host/symbols';

  constructor(private http: HttpClient) { }

  getMoedas(): Observable<MoedasResponse> {
    return this.http.get<MoedasResponse>(this.apiUrl);
  }
}
