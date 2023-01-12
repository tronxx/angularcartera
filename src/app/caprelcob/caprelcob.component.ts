import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { ConfiguracionService } from '../services/configuracion.service';
import { PolizasService } from '../services/polizas.service';
import { Cliente } from '../models/clientes';
import { Poliza } from '../models/polizas';
import { Compania } from '../models/config';
import { Relcob } from '../models/relcob';
import { DlgimpripolComponent } from '../dlgimpripol/dlgimpripol.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { ReplaySubject } from 'rxjs';
import { SpinnerComponent } from '../common/spinner/spinner.component';
import { DatePipe } from '@angular/common';
import { Promotor } from '../models';
import { CodigoPoliza } from '../models';

@Component({
  selector: 'app-caprelcob',
  templateUrl: './caprelcob.component.html',
  styleUrls: ['./caprelcob.component.css']
})
export class CaprelcobComponent implements OnInit {
  clientes : Cliente [] = [];
  cliente?: Cliente;
  promotores: Promotor[] = [];
  promotor?: Promotor;
  codigospolizas: CodigoPoliza[] = [];
  codigopoliza? : CodigoPoliza;
  

  polizaactiva_z = false;
  fecha = this.datePipe.transform(new Date(),"yyyy-MM-dd");
  tienda = "";
  promot = "";
  
  usrreg_z = {
    "idusuario":0,
    "login":"",
    "nombre":"",
    "token":"",
    "acceso": "false",
    "iniciales":"",
    "nivel":""
  }



  constructor(
    private servicioclientes: ClientesService,
    private datePipe: DatePipe,
    public dialog: MatDialog, 
     private serviciopolizas: PolizasService,
     private configuracion : ConfiguracionService
  ) { }

  ngOnInit(): void {
    var mistorage_z  = localStorage.getItem('token') || "{}";
    this.usrreg_z =  JSON.parse(mistorage_z);

  }

  aceptarpoliza() {
    

  }

  buscar_codigos_poliza() {
    var params = {
      "modo":"buscar_codigos_polizas",
      "idusuario": this.usrreg_z.idusuario
    };
    //console.log("idusuario:" + this.usrreg_z.idusuario);
    this.serviciopolizas.busca_codigos_poliza(JSON.stringify(params)).subscribe(
      respu => {
        this.codigospolizas = respu;
        
      }
    )
    this.buscar_cobratarios();
  }

  buscar_cobratarios() {
    var params = {
      "modo":"buscar_cobratario",
      "codprom": "-1"
    };
    //console.log("idusuario:" + this.usrreg_z.idusuario);

    this.serviciopolizas.busca_cobratarios(JSON.stringify(params)).subscribe(
      respu => {
        this.promotores = respu;
      }
    )
  }

  selecciona_tienda(mitienda: CodigoPoliza) {
   this.codigopoliza = mitienda;
   this.tienda = this.codigopoliza.clave;
  }




}

