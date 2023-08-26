import { Component, OnInit, ViewChild } from '@angular/core';
import { ListagemService } from '../service/listagem.service';
import { MoedasResponse, Moeda } from '../conversao/listagem.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {
  moedas: { [key: string]: Moeda };
  displayedColumns: string[] = ['simbolo', 'descricao'];
  dataSource: MatTableDataSource<Moeda>; // Alterado para MatTableDataSource

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private listagemService: ListagemService) {
    this.moedas = {};
    this.dataSource = new MatTableDataSource<Moeda>(); // Inicialização do dataSource
  }

  ngOnInit(): void {
    this.listagemService.getMoedas().subscribe(
      (data: MoedasResponse) => {
        this.moedas = data.symbols;
        this.dataSource.data = Object.keys(this.moedas).map(key => this.moedas[key]); // Atribuição dos dados ao dataSource.data
        this.dataSource.paginator = this.paginator; // Conexão do paginador ao dataSource
      },
      error => {
        console.error('Erro ao obter moedas:', error);
      }
    );
  }
}
