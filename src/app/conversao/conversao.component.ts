import { Component, OnInit } from '@angular/core';
import { ListagemService } from '../service/listagem.service';
import { MoedasResponse, Moeda } from '../conversao/listagem.model';
import { HttpClient } from '@angular/common/http';
import { ConversaoService } from '../service/conversao-service.service'; // Importe o novo serviço

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
  historico: any[] = [];

  constructor(
    private listagemService: ListagemService,
    private http: HttpClient,
    private conversaoService: ConversaoService // Injete o serviço de conversão
  ) {
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
      if (this.valor <= 0) {
        alert('O valor de conversão deve ser maior que zero.');
        return; // Interrompe a função se o valor for igual ou menor que zero
      }
  
      this.conversaoService.converterMoedas(this.moedaOrigem, this.moedaDestino, this.valor).subscribe(
        data => {
          this.resultado = data.result;
  
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
    this.historico.splice(index, 1);
  }
}
