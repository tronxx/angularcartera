import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormsModule } from '@angular/forms'
import { HttpClientModule } from "@angular/common/http";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConscliComponent } from './conscli/conscli.component';
import { CajaComponent } from './caja/caja.component';
import { LoginComponent } from './login/login.component';
import { UsuariosService } from './services/usuarios.service';
import { ConfiguracionService } from './services/configuracion.service';
import { MainComponent } from './main/main.component';
import { PolizasComponent } from './polizas/polizas.component'
import { AuthGuard } from './guards/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { formatNumber,  CommonModule,  CurrencyPipe, formatCurrency, formatDate, DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule  } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

import { DlgedoctaComponent } from './common/dlgedocta/dlgedocta.component';
import { DlgbuscliComponent } from './common/dlgbuscli/dlgbuscli.component';
import { DetallescliComponent } from './detallescli/detallescli.component';
import { ConsupolComponent } from './consupol/consupol.component';
import { AltacliComponent } from './altacli/altacli.component';
import { RelvtasComponent } from './relvtas/relvtas.component';
import { DlgdatoscliComponent } from './altacli/dlgdatoscli/dlgdatoscli.component';
import { DlgdatosmovcliComponent } from './altacli/dlgdatosmovcli/dlgdatosmovcli.component';
import { DatossolicitComponent } from './altacli/datossolicit/datossolicit.component';
import { DlgdatosavalComponent } from './altacli/dlgdatosaval/dlgdatosaval.component';
import { DlgdatosvendedorComponent } from './altacli/dlgdatosvendedor/dlgdatosvendedor.component';
import { DlgDatosSolicComponent } from './altacli/dlg-datos-solic/dlg-datos-solic.component';
import { DlgDatosVndComponent } from './altacli/dlg-datos-vnd/dlg-datos-vnd.component';

@NgModule({
  declarations: [
    AppComponent,
    ConscliComponent,
    CajaComponent,
    LoginComponent,
    MainComponent,
    PolizasComponent,
    DialogBodyComponent,
    DlgbuscliComponent,
    DetallescliComponent,
    DlgdatoscliComponent,
    DlgedoctaComponent,
    ConsupolComponent,
    AltacliComponent,
    RelvtasComponent,
    DlgdatoscliComponent,
    DlgdatosmovcliComponent,
    DatossolicitComponent,
    DlgdatosavalComponent,
    DlgdatosvendedorComponent,
    DlgDatosSolicComponent,
    DlgDatosVndComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatRadioModule,
    MatCardModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [ UsuariosService, 
     ConfiguracionService,
     DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [DialogBodyComponent,
    DlgbuscliComponent
  ]
  
})
export class AppModule { }
