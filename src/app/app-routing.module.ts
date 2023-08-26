import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversaoComponent } from './conversao/conversao.component';
import { ListagemComponent } from './listagem/listagem.component';
import { SobreComponent } from './sobre/sobre.component';

const routes: Routes = [
  { path: 'conversao', component: ConversaoComponent },
  { path: 'listagem', component: ListagemComponent },
  { path: 'sobre', component: SobreComponent },
  { path: '', redirectTo: '/conversao', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
