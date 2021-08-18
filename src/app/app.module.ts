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
import { MatIconModule } from '@angular/material/icon';
import { DlgbuscliComponent } from './common/dlgbuscli/dlgbuscli.component';


@NgModule({
  declarations: [
    AppComponent,
    ConscliComponent,
    CajaComponent,
    LoginComponent,
    MainComponent,
    PolizasComponent,
    DialogBodyComponent,
    DlgbuscliComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
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
