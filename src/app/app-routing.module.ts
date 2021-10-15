import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConscliComponent } from './conscli/conscli.component'
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component'
import { PolizasComponent } from './polizas/polizas.component';
import { AuthGuard } from './guards/auth.guard'; 
import { DetallescliComponent } from './detallescli/detallescli.component';
import { ConsupolComponent } from './consupol/consupol.component';

const routes: Routes = [
  { path: 'conscli', component: ConscliComponent, canActivate : [AuthGuard]  },
  { path: 'detallescli', component: DetallescliComponent, canActivate : [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'polizas', component: PolizasComponent, canActivate : [AuthGuard] },
  { path: 'consupol', component: ConsupolComponent, canActivate : [AuthGuard] },
  { path: 'main', component: MainComponent },
  {path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
