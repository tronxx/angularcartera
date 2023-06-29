import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; 
import { ClientesService } from '../../services/clientes.service';
import { ConfiguracionService } from '../../services/configuracion.service';
import { PolizasService } from '../../services/polizas.service';
import { Cliente } from '../../models';
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
import { Rutasmor } from '../../models';
import { Desrutasmor } from '../../models';
import { RelcobService } from '../../services/relcob.service';
import { DlgdatosrelcobComponent } from './../dlgdatosrelcob/dlgdatosrelcob.component'
import { AgreclienteComponent } from '../agrecliente/agrecliente.component';

@Component({
  selector: 'app-generarelcob',
  templateUrl: './generarelcob.component.html',
  styleUrls: ['./generarelcob.component.css']
})
export class GenerarelcobComponent implements OnInit {

  idrelcob_z = 0;
  idrutamor_z =0;
  relcob? : Relcob;
  rutamor?: Rutasmor;
  rutasmor: Rutasmor[] = [];
  desrutasmor : Desrutasmor[] = [];

  usrreg_z = {
    "idusuario":0,
    "login":"",
    "nombre":"",
    "token":"",
    "acceso": "false",
    "iniciales":"",
    "nivel":""
  }

  numeromaximoclientes = 10;

  constructor(
    public dialog: MatDialog, public dialogRef: MatDialogRef<GenerarelcobComponent>,
    @Inject(MAT_DIALOG_DATA) public message : string,
    private datePipe: DatePipe,
    private configuracion : ConfiguracionService,
    private route: ActivatedRoute,
    private relcobservice : RelcobService,
  ) { }

  ngOnInit(): void {
    const params = JSON.parse(this.message);
    this.idrelcob_z = params.idrelcob;
    this.numeromaximoclientes = params.numeromaximoclientes;
    console.log("Maxnumcli:", this.numeromaximoclientes);
    
    this.buscar_rutas_mor()
  }

  buscar_rutas_mor() {
    const params_z = {
      modo: "obtener_rutas_morosos"
    }
    this.relcobservice.obtener_rutas_morosos(JSON.stringify(params_z)).subscribe(
      respu => {
        this.rutasmor = respu;
      });
  }

  onChangeObj(idruta: any) {
    this.idrutamor_z = idruta;
    const params_z = {
      modo: "obtener_poblaciones_rutas_morosos",
      idruta: idruta
    }
    this.relcobservice.obtener_poblciones_rutas_morosos(JSON.stringify(params_z)).subscribe(
      respu => {
        this.desrutasmor = respu;
      });

  }

  closeno() {
    this.dialogRef.close(false);
  }

  closeyes() {
    let resultado = {
      idrelcob: this.idrelcob_z,
      idruta: this.idrutamor_z,
      numeromaximoclientes: this.numeromaximoclientes
    }
    this.dialogRef.close(resultado);
  }
  
  alerta(mensaje: string) {
    const dialogref = this.dialog.open(DialogBodyComponent, {
      width:'350px',
      data: mensaje
    });
    dialogref.afterClosed().subscribe(res => {
      //console.log("Debug", res);
    });
  
  }
  
}
