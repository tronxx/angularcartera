import { Component, OnInit } from '@angular/core';
import { DlgimpripolComponent } from '../dlgimpripol/dlgimpripol.component';
import { ClientesService } from '../services/clientes.service';
import { ConfiguracionService } from '../services/configuracion.service';
import { PolizasService } from '../services/polizas.service';
import { RelcobService } from '../services/relcob.service';
import { Cliente } from '../models/clientes';
import { Poliza } from '../models/polizas';
import { Compania } from '../models/config';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DlgacumpolComponent } from '../common/dlgacumpol/dlgacumpol.component';

@Component({
  selector: 'app-morosos',
  templateUrl: './morosos.component.html',
  styleUrls: ['./morosos.component.css']
})
export class MorososComponent implements OnInit {

  menus = [
    { link: "/listarelcob", titulo: "Relacion de Cobranza", active:"active"  },
    { link: "/reqcajas", titulo: "Relación de Requerimiento de Cajas ", active:"active"  },
  ]

  usrreg_z = {
    "idusuario":0,
    "login":"",
    "nombre":"",
    "token":"",
    "acceso": "false",
    "iniciales":"",
    "nivel":""
  }

  cia_z ?: Compania;

  poliza?: Poliza;
  polizas? : Poliza[] = [];

  tda_z = "";
  datospolenabled_z = false;
  nomtda_z = "";
  enespera = false;
  tdaspol_z? = {};


  constructor(
    public dialog: MatDialog,     
    private servicioclientes: ClientesService,
    private serviciopolizas: PolizasService,
    private serviciorelcob:RelcobService,
    private router: Router,
    private configuracion: ConfiguracionService

  ) { }

  ngOnInit(): void {
    var mistorage_z  = localStorage.getItem('token') || "{}";
    this.usrreg_z =  JSON.parse(mistorage_z);
    let mialerta   = localStorage.getItem('alertapoliza') || '{ "alertapoliza":"true" }';

    this.buscar_codigos_poliza();
    this.cia_z =  this.serviciopolizas.obtendatoscia();
    if (this.usrreg_z.nivel == "S") this.datospolenabled_z=true;

  }

  buscar_codigos_poliza() {
    var params = {
      "modo":"buscar_codigos_polizas",
      "idusuario": this.usrreg_z.idusuario
    };
    this.enespera = true;
    //console.log("idusuario:" + this.usrreg_z.idusuario);

    this.serviciopolizas.busca_codigos_poliza(JSON.stringify(params)).subscribe(
      respu => {
        this.enespera = false;
        this.tda_z = respu[0].clave;
        this.nomtda_z = respu[0].nombre;
        //console.log("Codigos:" + JSON.stringify(respu));
        this.tdaspol_z = respu;
      }
    )
  }

  imprimir_poliza() {
    // Si una póliza existe y no está cerrada lo mando a consulta de esa
    // póliza para que se pueda cerrar
    // Si la póliza no existe o ya está cerrada, simplemente lo mando a imprimir
    let params_z = {
      "codtda": this.tda_z,
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
          "tdapol":this.tda_z,
          "modopdf": res.tipoimpresion
        }
        this.serviciopolizas.obtener_datos_poliza(JSON.stringify(params_z)).subscribe(
          respu => {
            let mirespu_z = respu;
            //console.log("Debug: 216 mirespu", mirespu_z);
            //this.alerta(JSON.stringify(respu));
            if(mirespu_z.error == "Poliza Inexistente") {
              this.serviciopolizas.imprimir_poliza_morosos(JSON.stringify(params_z));
              return;
            }
            if(mirespu_z.status == "C") {
              const params_z = {
                modo: "impresion_poliza_morosos",
                fechapoliza:res.fecha,
                tdapol:this.tda_z,
              }
          
              this.serviciopolizas.imprimir_poliza_morosos(JSON.stringify(params_z));
              return;
            }
            let minvourl_z = [
              '/consupol/' + this.tda_z +'/'+ params_z.fechapoliza
            ];
            //this.alerta("Voy a hacer route navigate: " + minvourl_z + " Respu:" + JSON.stringify(mirespu_z));
            this.router.navigate(minvourl_z)
          }
    
        );
      }
    });
  }

  imprimir_acum_comis_morosos() {
    // Si una póliza existe y no está cerrada lo mando a consulta de esa
    // póliza para que se pueda cerrar
    // Si la póliza no existe o ya está cerrada, simplemente lo mando a imprimir
    let params_z = {
      "polizaini": this.tda_z,
      "polizafin": this.tda_z,
      "title": "Proporcione el Rango de Fechas de la Poliza"
    }
    const dialogref = this.dialog.open(DlgacumpolComponent, {
      width:'350px',
      data: JSON.stringify( params_z)
    });
    dialogref.afterClosed().subscribe(res => {
      if(res) {
        //console.log(res);
        let params_z = {
          "modo":"reportecomisiones",
          "fechainicial":res.fechainicial,
          "fechafinal":res.fechafinal,
          'polizaini': res.polizaini,
          'polizafin': res.polizafin,
        }
        this.serviciorelcob.imprimir_acumulado_comisiones_morosos(JSON.stringify(params_z));
      }
    
    });
  }
  
  imprimir_comis_morosos_x_dia() {
    // Si una póliza existe y no está cerrada lo mando a consulta de esa
    // póliza para que se pueda cerrar
    // Si la póliza no existe o ya está cerrada, simplemente lo mando a imprimir
    let params_z = {
      "polizaini": this.tda_z,
      "polizafin": this.tda_z,
      "title": "Proporcione el Rango de Fechas de la Poliza"
    }
    const dialogref = this.dialog.open(DlgacumpolComponent, {
      width:'350px',
      data: JSON.stringify( params_z)
    });
    dialogref.afterClosed().subscribe(res => {
      if(res) {
        //console.log(res);
        let params_z = {
          "modo":"analiticocomisiones",
          "fechainicial":res.fechainicial,
          "fechafinal":res.fechafinal,
          'polizaini': res.polizaini,
          'polizafin': res.polizafin,
        }
        this.serviciorelcob.imprimir_acumulado_comisiones_morosos(JSON.stringify(params_z));
      }
    
    });
  }
  
  
  alerta(mensaje: string)  {
    let yesno_z = true;
    const dialogref = this.dialog.open(DialogBodyComponent, {
      width:'350px',
      data: mensaje
    });
    dialogref.afterClosed().subscribe(res => {
      //console.log("Debug", res);
      if(res) {
        yesno_z = true;
      } else {
        yesno_z = false;
      }
    });
    return (yesno_z);
  
  }
  
}
