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
import { AcumpolComponent } from './acumpol/acumpol.component';
import { CapvtasComponent } from './capvtas/capvtas.component';
import { PolenganComponent } from './polengan/polengan.component'
import { DetallesrelcobComponent } from './caprelcob/detallesrelcob/detallesrelcob.component';
import { ListarelcobComponent } from './caprelcob/listarelcob/listarelcob.component';
import { SabanvtasComponent } from './sabanvtas/sabanvtas.component';
import { LiqrelcobComponent } from './caprelcob/liqrelcob/liqrelcob.component'
import { ReportescliComponent } from './reportescli/reportescli.component';
import { MorososComponent } from './morosos/morosos.component';
import { ReqcajasComponent } from './reqcajas/reqcajas.component';
import { DetallesreqcajaComponent } from './reqcajas/detallesreqcaja/detallesreqcaja.component';
import { ImagenesComponent } from './capvtas/imagenes/imagenes.component';
import { CapturavtasComponent } from './capturavtas/capturavtas.component';

const routes: Routes = [
  { path: 'conscli', component: ConscliComponent, canActivate : [AuthGuard]  },
  { path: 'detallescli', component: DetallescliComponent, canActivate : [AuthGuard]  },
  { path: 'detallescli/:numcli', component: DetallescliComponent, canActivate : [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'polizas', component: PolizasComponent, canActivate : [AuthGuard] },
  { path: 'consupol', component: ConsupolComponent, canActivate : [AuthGuard] },
  { path: 'consupol/:tda/:fecha', component: ConsupolComponent, canActivate : [AuthGuard] },
  { path: 'acumpol', component: AcumpolComponent, canActivate : [AuthGuard] },
  { path: 'altacli/:numcli', component: AltacliComponent, canActivate : [AuthGuard] },
  { path: 'facturacli/:idfac/:numcli', component: FacturacliComponent, canActivate : [AuthGuard] },
  { path: 'solicitud/:numcli', component: DatossolicitComponent, canActivate : [AuthGuard] },
  { path: 'nuevocli', component: AltacliComponent,  canActivate : [AuthGuard]},
  { path: 'listaaltas', component: RelvtasComponent, canActivate : [AuthGuard] },
  { path: 'polengan', component: PolenganComponent, canActivate : [AuthGuard] },
  { path: 'nvavta', component: CapvtasComponent, canActivate : [AuthGuard] },
  { path: 'nvavtav2', component: CapturavtasComponent, canActivate : [AuthGuard] },
  { path: 'listarelcob', component: ListarelcobComponent, canActivate : [AuthGuard] },
  { path: 'detallesrelcob/:idrelcob', component: DetallesrelcobComponent, canActivate : [AuthGuard] },
  { path: 'liqrelcob/:idrelcob', component: LiqrelcobComponent, canActivate : [AuthGuard] },
  { path: 'reportescli/:numcli', component: ReportescliComponent, canActivate : [AuthGuard] },
  { path: 'sabanavtas', component: SabanvtasComponent, canActivate : [AuthGuard] },
  { path: 'morosos', component: MorososComponent, canActivate : [AuthGuard] },
  { path: 'reqcajas', component: ReqcajasComponent, canActivate : [AuthGuard] },
  { path: 'detallereqcajas/:idrelcob', component: DetallesreqcajaComponent, canActivate : [AuthGuard] },
  { path: 'imagenes', component: ImagenesComponent, canActivate : [AuthGuard] },
  { path: 'main', component: MainComponent },
  {path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
