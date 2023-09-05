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
import { RelcobService } from '../../services/relcob.service';
import { DlgdatosrelcobComponent } from './../dlgdatosrelcob/dlgdatosrelcob.component'

@Component({
  selector: 'app-listarelcob',
  templateUrl: './listarelcob.component.html',
  styleUrls: ['./listarelcob.component.css']
})
export class ListarelcobComponent implements OnInit {

  relcobs : Relcob[] = [];
  codigospolizas : CodigoPoliza[] = [];
  micodpol?: CodigoPoliza;
  codpol_z= "";
  idcodpol = 0;
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
    private servicosRelcob: RelcobService,
    private router: Router,
     private configuracion : ConfiguracionService

  ) { }

  ngOnInit(): void {
    var mistorage_z  = localStorage.getItem('token') || "{}";
    this.usrreg_z =  JSON.parse(mistorage_z);
    this.carga_catalogos();
  }

  buscarrelcobs () {
    let miclave = this.micodpol?.clave;
    var params = {
      "modo":"buscar_relaciones_relcob",
      "fechainicial": this.fechaini,
      "fechafinal": this.fechafin,
      "codpol": this.micodpol?.clave,
      "tiporel":"710"
    };
    console.log("Bucar relaciones cobranza:", params);
    
    //console.log("idusuario:" + this.usrreg_z.idusuario);
    this.servicosRelcob.busca_relaciones_cobranza(JSON.stringify(params)).subscribe(
      respu => {
        this.relcobs = respu;
      }
    )

  }

    detalles_relcob(relcob: Relcob) {
    let minvourl_z = [
      '/detallesrelcob/' + relcob.idcarrelcob
    ];
    //this.alerta("Voy a hacer route navigate: " + minvourl_z + " Respu:" + JSON.stringify(mirespu_z));
    console.log("Voy a ir a mi url:", minvourl_z);
    
    this.router.navigate(minvourl_z)
  }
  
  liquidar_relcob(relcob: Relcob) {
    let minvourl_z = [
      '/liqrelcob/' + relcob.idcarrelcob
    ];
    //this.alerta("Voy a hacer route navigate: " + minvourl_z + " Respu:" + JSON.stringify(mirespu_z));
    console.log("Voy a ir a mi url:", minvourl_z);
    
    this.router.navigate(minvourl_z)
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
        this.micodpol = this.codigospolizas[0];
        this.codpol_z = this.micodpol.clave;
        //console.log("Codigos Polizas:", respu);
      }
    )
  }

  agregar_relcob() {
    const dialogmov = this.dialog.open(DlgdatosrelcobComponent, {
      width:'650px',
      data: JSON.stringify(this.micodpol)
    });
    dialogmov.afterClosed().subscribe(res => {
      if (res) {
        
        let params_z = {
          modo: "agregar_relacion_relcob",
          fecha : res.fecha,
          codpol: this.micodpol?.clave,
          promotor: res.promotor,
          idusuario: this.usrreg_z.idusuario,
          tiporel: 710

        }
        console.log("Los parametros a pasar son: ", params_z);

        this.servicosRelcob.agrega_nueva_relcob(JSON.stringify(params_z)).subscribe(
          result => {
            console.log("Se ha agregado la nueva relacion", result);
            this.buscarrelcobs();
          }
        );
        console.log("Regresando de dlgdatosrelcob", res);
      }
    });
      

  }

  imprimir_poliza() {
    // Si una póliza existe y no está cerrada lo mando a consulta de esa
    // póliza para que se pueda cerrar
    // Si la póliza no existe o ya está cerrada, simplemente lo mando a imprimir
    let params_z = {
      "codtda": this.codpol_z,
      "title": "Proporcione la Fecha de la Poliza"
    }
    const dialogref = this.dialog.open(DlgimpripolComponent, {
      width:'350px',
      data: JSON.stringify( params_z)
    });
    dialogref.afterClosed().subscribe(res => {
      if(res) {
        //console.log(res);
        let params_z = {
          "modo":"obtener_datos_poliza",
          "fechapoliza":res.fecha,
          "tdapol":this.codpol_z,
          "modopdf": res.tipoimpresion
        }
        this.serviciopolizas.obtener_datos_poliza(JSON.stringify(params_z)).subscribe(
          respu => {
            let mirespu_z = respu;
            params_z.modo = "imprimir_poliza_morosos";
            //console.log("Debug: 216 mirespu", mirespu_z);
            //this.alerta(JSON.stringify(respu));
            if(mirespu_z.error == "Poliza Inexistente") {
              this.serviciopolizas.imprimir_poliza_morosos(JSON.stringify(params_z));
              return;
            }
            if(mirespu_z.status == "C") {
              this.serviciopolizas.imprimir_poliza_morosos(JSON.stringify(params_z));
              return;
            }
            let minvourl_z = [
              '/consupol/' + this.codpol_z +'/'+ params_z.fechapoliza
            ];
            //this.alerta("Voy a hacer route navigate: " + minvourl_z + " Respu:" + JSON.stringify(mirespu_z));
            this.router.navigate(minvourl_z)
          }
    
        );
      }
    });
  }
  
  imprimir_despacho() {
    // Si una póliza existe y no está cerrada lo mando a consulta de esa
    // póliza para que se pueda cerrar
    // Si la póliza no existe o ya está cerrada, simplemente lo mando a imprimir
    let params_z = {
      "codtda": this.codpol_z,
      "title": "Proporcione la Fecha de la Poliza"
    }
    const dialogref = this.dialog.open(DlgimpripolComponent, {
      width:'350px',
      data: JSON.stringify( params_z)
    });
    dialogref.afterClosed().subscribe(res => {
      if(res) {
        //console.log(res);
        let params_z = {
          "modo":"obtener_datos_poliza",
          "fechapoliza":res.fecha,
          "tdapol":this.codpol_z,
          "modopdf": res.tipoimpresion
        }
        this.serviciopolizas.obten_impresion_despacho_caja(JSON.stringify(params_z));
      }
    });
  }

  imprimir_cfdi_recargo(modo: string) {
    let params_z = {
      "codtda": this.codpol_z,
      "title": "Proporcione la Fecha de la Poliza"
    }
    const dialogref = this.dialog.open(DlgimpripolComponent, {
      width:'350px',
      data: JSON.stringify( params_z)
    });
    dialogref.afterClosed().subscribe(res => {
      if(res) {
        //console.log(res);
        let params_z = {
          "modo":"obtener_datos_poliza",
          "fechapoliza":res.fecha,
          "tdapol":this.codpol_z
        }
        let paramrec_z = { "uuid": "-1" };
        this.serviciopolizas.obtener_datos_poliza(JSON.stringify(params_z)).subscribe( res => {
            if(modo == "RECARGO") {
              paramrec_z.uuid = res.uuidrec;
              this.serviciopolizas.obten_pdf_cfdi(JSON.stringify(paramrec_z));  
            } else {
              paramrec_z.uuid = res.uuidpol;
              this.serviciopolizas.obtenpdfcomplmentopol(JSON.stringify(paramrec_z)); 
            }
            
        })
        
      }
    });

  
  }
  

}
