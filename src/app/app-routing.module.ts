import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConscliComponent } from './conscli/conscli.component'
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component'
import { PolizasComponent } from './polizas/polizas.component';
import { AuthGuard } from './guards/auth.guard'; 
import { DetallescliComponent } from './detallescli/detallescli.component';
import { ConsupolComponent } from './consupol/consupol.component';
import { AltacliComponent } from './altacli/altacli.component';
import { DlgdatosfacturaComponent } from './altacli/dlgdatosfactura/dlgdatosfactura.component';
import { FacturacliComponent } from './altacli/facturacli/facturacli.component';
import { RelvtasComponent  } from './relvtas/relvtas.component';
import { DatossolicitComponent } from './altacli/datossolicit/datossolicit.component';

const routes: Routes = [
  { path: 'conscli', component: ConscliComponent, canActivate : [AuthGuard]  },
  { path: 'detallescli', component: DetallescliComponent, canActivate : [AuthGuard]  },
  { path: 'detallescli/:numcli', component: DetallescliComponent, canActivate : [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'polizas', component: PolizasComponent, canActivate : [AuthGuard] },
  { path: 'consupol', component: ConsupolComponent, canActivate : [AuthGuard] },
  { path: 'altacli/:numcli', component: AltacliComponent, canActivate : [AuthGuard] },
  { path: 'facturacli/:idfac/:numcli', component: FacturacliComponent, canActivate : [AuthGuard] },
  { path: 'solicitud/:numcli', component: DatossolicitComponent, canActivate : [AuthGuard] },
  { path: 'nuevocli', component: AltacliComponent,  canActivate : [AuthGuard]},
  { path: 'listaaltas', component: RelvtasComponent, canActivate : [AuthGuard] },
  { path: 'main', component: MainComponent },
  {path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
