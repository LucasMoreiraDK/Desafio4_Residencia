import { Component, OnInit, ViewChild } from '@angular/core';
import { ListagemService } from '../service/listagem.service';
import { MoedasResponse, Moeda } from '../conversao/listagem.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {
  moedas: { [key: string]: Moeda };
  displayedColumns: string[] = ['simbolo', 'descricao'];
  dataSource: MatTableDataSource<Moeda>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private listagemService: ListagemService) {
    this.moedas = {};
    this.dataSource = new MatTableDataSource<Moeda>();
  }

  filtroMoeda: string = '';
  moedasArray: Moeda[] = [];

  ngOnInit(): void {
    this.listagemService.getMoedas().subscribe(
      (data: MoedasResponse) => {
        this.moedas = data.symbols;
        this.moedasArray = Object.keys(this.moedas).map(key => this.moedas[key]);
        this.dataSource.data = this.moedasArray;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.error('Erro ao obter moedas:', error);
      }
    );
  }

  get filteredMoedas(): Moeda[] {
    return this.moedasArray.filter(moeda =>
      moeda.code.toLowerCase().includes(this.filtroMoeda.toLowerCase()) ||
      moeda.description.toLowerCase().includes(this.filtroMoeda.toLowerCase())
    );
  }

  applyFilter() {
    this.dataSource.data = this.filteredMoedas;
    this.paginator.firstPage();
  }

  onPaginatorChange(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
  }
  
  
}
