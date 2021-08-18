import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConscliComponent } from './conscli/conscli.component'
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component'
import { PolizasComponent } from './polizas/polizas.component';
import { AuthGuard } from './guards/auth.guard'; 

const routes: Routes = [
  { path: 'conscli', component: ConscliComponent },
  { path: 'login', component: LoginComponent },
  { path: 'polizas', component: PolizasComponent, canActivate : [AuthGuard] },
  { path: 'main', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
