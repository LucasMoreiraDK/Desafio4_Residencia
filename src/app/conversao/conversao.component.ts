import { Component, OnInit } from '@angular/core';
import { ListagemService } from '../service/listagem.service';
import { MoedasResponse, Moeda } from '../conversao/listagem.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-conversao',
  templateUrl: './conversao.component.html',
  styleUrls: ['./conversao.component.css']
})
export class ConversaoComponent implements OnInit {
  moedas: { [key: string]: Moeda };
  moedaOrigem: string;
  moedaDestino: string;
  valor: number;
  resultado: number;
  historico: any[] = []; // Array para armazenar o histórico

  constructor(private listagemService: ListagemService, private http: HttpClient) {
    this.moedas = {};
    this.moedaOrigem = '';
    this.moedaDestino = '';
    this.valor = 0;
    this.resultado = 0;
  }

  ngOnInit(): void {
    this.listagemService.getMoedas().subscribe(
      (data: MoedasResponse) => {
        this.moedas = data.symbols;
      },
      error => {
        console.error('Erro ao obter moedas:', error);
      }
    );
  }

  converter(): void {
    if (this.moedaOrigem && this.moedaDestino && this.valor) {
      const url = `https://api.exchangerate.host/convert?from=${this.moedaOrigem}&to=${this.moedaDestino}&amount=${this.valor}`;
      
      this.http.get<any>(url).subscribe(
        data => {
          this.resultado = data.result;

          // Adicionar a entrada ao histórico
          this.historico.unshift({
            data: new Date(),
            valor: this.valor,
            moedaOrigem: this.moedaOrigem,
            moedaDestino: this.moedaDestino,
            resultado: this.resultado,
            taxa: data.info.rate
          });
        },
        error => {
          console.error('Erro ao converter:', error);
        }
      );
    }
  }

  excluirConversao(index: number): void {
    this.historico.splice(index, 1); // Remover a entrada do histórico
  }
}
