import { Component, OnInit } from '@angular/core';
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
import { CodigoPoliza } from '../../models';
import { Renrelco } from '../../models';
import { RelcobService } from '../../services/relcob.service';
import { DlgdatosrelcobComponent } from './../dlgdatosrelcob/dlgdatosrelcob.component'
import { AgreclienteComponent } from '../agrecliente/agrecliente.component';
import { GenerarelcobComponent } from '../generarelcob/generarelcob.component';

@Component({
  selector: 'app-detallesrelcob',
  templateUrl: './detallesrelcob.component.html',
  styleUrls: ['./detallesrelcob.component.css']
})
export class DetallesrelcobComponent implements OnInit {

  relcob? : Relcob;
  renglonesrelcob: Renrelco[] = [];
  codigopoliza?: CodigoPoliza;
  idrelcob_z = 0;
  estadocerrado_z = 9;
  estadoabierto_z = 0;
  sirotarpdf = false;
  creandoRelacion = false;

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
    public dialog: MatDialog, 
    private route: ActivatedRoute,
    private relcobservice : RelcobService,
    private seviciospolizas: PolizasService,
    private servicioclientes: ClientesService
  ) { }

  ngOnInit(): void {
    this.idrelcob_z = Number(this.route.snapshot.paramMap.get('idrelcob'));
    console.log("idrelcob", this.idrelcob_z);
    var mistorage_z  = localStorage.getItem('token') || "{}";
    this.usrreg_z =  JSON.parse(mistorage_z);
    this.buscar_relacion();
  }

  buscar_relacion() {
    let params_z = {
      modo: "buscar_relacion_cobranza",
      idrelacion: this.idrelcob_z
    }
    this.relcobservice.busca_relacion_cobranza(JSON.stringify(params_z)).subscribe(
      respu => {
        this.relcob = respu;
        this.idrelcob_z = this.relcob.idcarrelcob;
        this.busca_codigo_poliza(this.relcob.idcodpol);
        this.busca_renglones_relcob();
      }
    )

  }

  busca_codigo_poliza(idcodpol: number) {
    let params_z = {
      modo : "buscar_datos_codigo_tienda",
      idcodpol: idcodpol
    }
    this.seviciospolizas.obtener_datos_codigo_tienda (JSON.stringify(params_z)).subscribe(
      respu => {
        this.codigopoliza = respu;
      }
    )

  }

  busca_renglones_relcob(){
    let params_z = {
      modo: "obtener_datalles_relcob",
      idrelacion: this.idrelcob_z
    }
    this.relcobservice.busca_renglones_relacion_cobranza(JSON.stringify(params_z)).subscribe(
      respu => {
        this.renglonesrelcob  = respu;
      }
    )

  }

  imprimir_relcob() {
    let rotacion = "NO";
    if(this.sirotarpdf) rotacion = "SI";

    let params_z = {
      titulo: "Relación de Cobranza del " + this.relcob?.fecha +  " Cobratario: " + this.relcob?.promot +
       " " + this.relcob?.nombrepromo,
      idrelacion: this.idrelcob_z,
      rotarpdf: rotacion,
      modo: "imprimir_relacion_relcob"
    }
    this.relcobservice.imprimir_relcob(JSON.stringify(params_z));

  }

  
  agregar_cliente_a_relcob() {
    const dialogref = this.dialog.open(AgreclienteComponent, {
      width:'800px',
      data: JSON.stringify("")
    });
    dialogref.afterClosed().subscribe(res => {
      if(res) {
        this.agregar_cliente(res);
       
      }
    });

  }

  agregar_cliente( datos: any) {
    
    const params_z = {
      modo: "agregar_renglon_relacion_relcob",
      idrelacion: this.relcob?.idcarrelcob,
      idpromot: this.relcob?.idpromot,
      codigo: datos.codigo,
      ltaini: datos.ltaini,
      ltafin: datos.ltafin,
      impxlet: datos.impxlet,
      abonos: datos.importe,
      idusuario: this.usrreg_z.idusuario,
      cia: this.relcob?.cia,
      numrel: 1,
    }
    this.relcobservice.agrega_renglones_relacion_cobranza(JSON.stringify(params_z)).subscribe(
      result => {
        this.busca_renglones_relcob();
      }
    );

  }

  eliminar_renglon_relcob(renrelco: Renrelco) {
    const dialogref = this.dialog.open(DialogBodyComponent, {
      width:'350px',
      data: 'Seguro de Eliminar : ' +renrelco.codigo + 
      " " + renrelco.nombre
    });
    dialogref.afterClosed().subscribe(res => {
      if(res) {
        let params_z = {
          modo: "eliminar_renglon_relacion_relcob",
          idcarrenrelco: renrelco.idcarrenrelco
        }
        this.relcobservice.eliminar_renglon_relacion_cobranza(JSON.stringify(params_z)).subscribe( resalta=> 
          {
           
            if(resalta.status == "OK") {
              this.busca_renglones_relcob();
            } else {
              this.alerta("Error:" + resalta.error);
            }
  
          });
        }
    });
  
  }

  generar_relacion() {
    const params_z = {
      "idrelcob": this.idrelcob_z,
      "numeromaximoclientes": 10
    }
    const dialogref = this.dialog.open(GenerarelcobComponent, {
      width:'800px',
      data: JSON.stringify(params_z)
    });
    dialogref.afterClosed().subscribe(res => {
      if(res) {
        this.creandoRelacion = true;
        
        let params_z = {
          modo: "genera_relacion",
          idrelacion: this.idrelcob_z,
          numeromaximoclientes: res.numeromaximoclientes,
          idruta: res.idruta
        }
        this.relcobservice.generar_relacion_cobranza(JSON.stringify(params_z)).subscribe( resul => {
          this.creandoRelacion = false;
          if(resul) this.busca_renglones_relcob();
        })
        
      }
    });

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
