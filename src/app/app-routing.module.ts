import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { WorkerListComponent } from './worker-list/worker-list.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'worker-list', component: WorkerListComponent},
  {path: 'crisis-list', component: CrisisListComponent},
  {path: 'heroes-list', component: HeroesListComponent},
  {path: 'recuperar-senha', component: RecuperarSenhaComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
