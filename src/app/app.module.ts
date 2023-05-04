import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormsModule } from '@angular/forms'
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http";

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
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card'; 
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule  } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
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
import { DlgfacturaComponent } from './altacli/dlgfactura/dlgfactura.component';
import { DlgrenfacComponent } from './altacli/dlgrenfac/dlgrenfac.component';
import { DlgdatosfacturaComponent } from './altacli/dlgdatosfactura/dlgdatosfactura.component';
import { DlgbusarticuloComponent } from './common/dlgbusarticulo/dlgbusarticulo.component';
import { FacturacliComponent } from './altacli/facturacli/facturacli.component';
import { DlgbuscaseriesComponent } from './common/dlgbuscaseries/dlgbuscaseries.component';
import { DlgimpriletrasComponent } from './common/dlgimpriletras/dlgimpriletras.component';
import { ReportecomisComponent } from './reportecomis/reportecomis.component';
import { AcumpolComponent } from './acumpol/acumpol.component';
import { DlgreltraspComponent } from './common/dlgreltrasp/dlgreltrasp.component';
import { CapvtasComponent } from './capvtas/capvtas.component';
import { DlgDatosvtaComponent } from './capvtas/dlg-datosvta/dlg-datosvta.component';
import { AgregarenpolComponent } from './polizas/agregarenpol/agregarenpol.component';
import { DlgimpripolComponent } from './dlgimpripol/dlgimpripol.component';
import { PolenganComponent } from './polengan/polengan.component';
import { SpinnerModule } from './common/spinner/spinner.module';
import { SpinnerInterceptor } from './common/interceptors/spinner.interceptor';
import { DlgpidprofertaComponent } from './common/dlgpidproferta/dlgpidproferta.component';
import { PidepasswdComponent } from './common/pidepasswd/pidepasswd.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { ListarelcobComponent } from './caprelcob/listarelcob/listarelcob.component';
import { DlgdatosrelcobComponent } from './caprelcob/dlgdatosrelcob/dlgdatosrelcob.component';
import { DetallesrelcobComponent } from './caprelcob/detallesrelcob/detallesrelcob.component';
import { AgreclienteComponent } from './caprelcob/agrecliente/agrecliente.component';


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
    DlgDatosVndComponent,
    DlgfacturaComponent,
    DlgrenfacComponent,
    DlgdatosfacturaComponent,
    DlgbusarticuloComponent,
    FacturacliComponent,
    DlgbuscaseriesComponent,
    DlgimpriletrasComponent,
    ReportecomisComponent,
    AcumpolComponent,
    DlgreltraspComponent,
    CapvtasComponent,
    DlgDatosvtaComponent,
    AgregarenpolComponent,
    DlgimpripolComponent,
    PolenganComponent,
    DlgpidprofertaComponent,
    PidepasswdComponent,
    ListarelcobComponent,
    DlgdatosrelcobComponent,
    DetallesrelcobComponent,
    AgreclienteComponent,
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
    MatCheckboxModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    BrowserAnimationsModule,
    SpinnerModule,
  ],
  providers: [ 
    UsuariosService, 
     ConfiguracionService,
     {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi:true},
     DatePipe],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
