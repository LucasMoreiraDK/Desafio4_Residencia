import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversaoService {

  constructor(private http: HttpClient) { }

  converterMoedas(moedaOrigem: string, moedaDestino: string, valor: number): Observable<any> {
    if (valor <= 0 ) {
       throwError('Valor de conversão deve ser maior que zero.');
    }
    const url = `https://api.exchangerate.host/convert?from=${moedaOrigem}&to=${moedaDestino}&amount=${valor}`;
    return this.http.get(url);
  }
}
