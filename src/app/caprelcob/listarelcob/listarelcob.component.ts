import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; 
import { ClientesService } from '../../services/clientes.service';
import { ConfiguracionService } from '../../services/configuracion.service';
import { PolizasService } from '../../services/polizas.service';
import { Cliente } from '../../models';
import { Poliza } from '../../models';
import { Compania } from '../../models';
import { Relcob } from '../../models';
import { DlgimpripolComponent } from '../../dlgimpripol/dlgimpripol.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBodyComponent } from '../../dialog-body/dialog-body.component';
import { ReplaySubject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Promotor } from '../../models';
import { CodigoPoliza } from '../../models';
import { Renrelco } from '../../models';

@Component({
  selector: 'app-listarelcob',
  templateUrl: './listarelcob.component.html',
  styleUrls: ['./listarelcob.component.css']
})
export class ListarelcobComponent implements OnInit {

  relcobs : Relcob[] = [];
  codigospolizas : CodigoPoliza[] = [];
  tienda = "";
  fechaini = this.datePipe.transform(new Date(),"yyyy-MM") + "-01";
  fechafin = this.datePipe.transform(new Date(),"yyyy-MM-dd");
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
    this.carga_catalogos();
  }

  buscarrelcobs () {

  }

  carga_catalogos() {
    this.buscar_codigos_poliza();
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
        console.log("Codigos Polizas:", respu);
      }
    )
  }

}
