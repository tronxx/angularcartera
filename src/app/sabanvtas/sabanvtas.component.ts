import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms'
import { ClientesService } from '../services/clientes.service'
import { ConfiguracionService } from '../services/configuracion.service';
import { Cliente } from '../models/clientes';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ReportecomisComponent } from '../reportecomis/reportecomis.component';
import { SpinnerComponent } from '../common/spinner/spinner.component';
import { DatePipe } from '@angular/common';
import { Ubivta } from '../models/ubivta';
import { SabanaVtas } from '../models/';
import { DlgnvasabanaComponent } from './dlgnvasabana/dlgnvasabana.component';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { DlgacumsabanasComponent } from './dlgacumsabanas/dlgacumsabanas.component';

@Component({
  selector: 'app-sabanvtas',
  templateUrl: './sabanvtas.component.html',
  styleUrls: ['./sabanvtas.component.css']
})

export class SabanvtasComponent implements OnInit {

  ubivta : Ubivta[] = [];
  sabanasvtas: SabanaVtas[] = [];
  sabanavtas?: SabanaVtas;
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
  };

  reginicial_z = {
    ubica: ""
  };

  ubica = "";
  cvecia = "";
  nombreubica_z = "";
 


  constructor(
    public dialog: MatDialog, 
    private servicioclientes: ClientesService,
    private router: Router,
    private datePipe: DatePipe,

    private configuracion: ConfiguracionService) { }

    ngOnInit(): void {
      var mistorage_z  = localStorage.getItem('token') || "{}";
      let usrreg_z =  JSON.parse(mistorage_z);
      this.cvecia = this.configuracion.getcvecia();
      let cverelvta_z = "sabanvtas_" + this.cvecia;
      let registro_z = localStorage.getItem(cverelvta_z) || "{}";
      let misdatosiniciales_z = JSON.parse(registro_z);
      this.reginicial_z.ubica = misdatosiniciales_z.ubica;
      this.ubica = this.reginicial_z.ubica;
      this.obtencatalogos();
    }

    buscar_sabnavtas() {
      let cverelvta_z = "sabanvtas_" + this.cvecia;
      this.reginicial_z.ubica = this.ubica;
      localStorage.setItem(cverelvta_z, JSON.stringify( this.reginicial_z));
  
      let params_z = {
        modo : "buscar_sabanas_ventas",
        fechainicial: this.fechaini,
        fechafinal: this.fechafin,
        ubicacion: this.ubica
      }
    
      this.servicioclientes.obten_sabanas_vtas(JSON.stringify(params_z)).subscribe(
        respu => {
          this.sabanasvtas = respu;
          if(this.sabanasvtas.length < 1) {
            this.alerta("No hay ningún registro con esas características");
          }
        }
      );

    }

    obtencatalogos() {
      let params_z = {
        modo : "buscar_ubicacion_ventas"
      }
   
      this.servicioclientes.obtenubivta(JSON.stringify(params_z)).subscribe(
        respu => {
          this.ubivta = respu;
        }
      );
    }

    generar_saban_vtas() {
      let ubi = this.ubivta.filter(mi => mi.ubica === this.ubica)[0];
      let params_z = {
        ubica: ubi,
        titulo: "Datos de la Sabana"
      }
      const dialogref = this.dialog.open(DlgnvasabanaComponent, {
        width:'800px',
        data: JSON.stringify(params_z)
      });
      dialogref.afterClosed().subscribe(res => {
        if(res) {
          //console.log(res);
          this.si_generar_sabana_vtas(res);
        }
      });
  

    }

    si_generar_sabana_vtas(res: any) {
      //console.log("Parametros:", res);
      let params_z = {
        fechainicial: res.fechainicial,
        fechafinal: res.fechafinal,
        fecha: res.fecha,
        ubicacion: res.ubicacion,
        modo: 'generar_sabana_ventas'
      }
      this.servicioclientes.genera_sabanas_vtas(JSON.stringify(params_z)).subscribe( resul => {
        let resultado = JSON.parse(JSON.stringify(resul));
         if(resultado.status == "OK") {
            this.sabanavtas = {
              folio: resultado.folio,
              fechainicial: res.fechainicial,
              fechafinal: res.fechafinal,
              idsabana: resultado.idsabana,
              fecha: res.fecha,
              ubica: res.ubicacion,
              cia: 0
            };
            this.imprmir_relacion(this.sabanavtas);
            this.buscar_sabnavtas();

         } else {
          this.alerta("Error:" + resultado.mensaje);
         }

      });

    }

    imprmir_relacion (sabanvtas : SabanaVtas) {
      let ubi = this.ubivta.filter(mi => mi.ubica === this.ubica)[0];
      
      let params_z = {
        modo: "imprimir_sabana_ventas",
        idsabanavta: sabanvtas.idsabana,
        ubicacion: this.ubica,
        titulo:"Sabana de Ventas " +ubi.ubica + " " + ubi.nombre.trim() + " Numero " + String( sabanvtas.folio) +
        " Fecha:" + sabanvtas.fecha + " Con Ventas del " + sabanvtas.fechainicial +
        " Al " + sabanvtas.fechafinal
      }
      this.servicioclientes.imprimir_sabanas_vtas(JSON.stringify(params_z));
    }

    acumulado_sabnavtas() {
      let params_z = {
        titulo: "Datos de Acumulado de Sabanas de Ventas"
      }
      const dialogref = this.dialog.open(DlgacumsabanasComponent, {
        width:'800px',
        data: JSON.stringify(params_z)
      });
      dialogref.afterClosed().subscribe(res => {
        if(res) {
          console.log(res);
          this.si_generar_informe_sabana_vtas(res);
        }
      });
  

    }

    si_generar_informe_sabana_vtas(res: any) {
      console.log("Parametros:", res);
      let params_z = {
        fechainicial: res.fechainicial,
        fechafinal: res.fechafinal,
        ubicaini: res.ubicaini,
        ubicafin: res.ubicafin,
        tipocteinicial: res.ticteini,
        tipoctefinal: res.tictefin,
        qominicial: res.qomini,
        qomfinal: res.qomfin,
        acumulado: res.acumulado,
        modo: 'generar_informe_sabana_ventas'
      }
      this.servicioclientes.imprimir_informe_sabanas_vtas(JSON.stringify(params_z));
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

descargar_sabana_inven (sabanvtas : SabanaVtas) {
  let ubi = this.ubivta.filter(mi => mi.ubica === this.ubica)[0];
  
  let params_z = {
    modo: "generar_archivo_sabana_vtas_para_inven",
    idsabanavta: sabanvtas.idsabana,
    ubicacion: this.ubica,
  }
  //this.alerta("Estoy en descargar_saba_inven " + JSON.stringify(params_z));
  this.servicioclientes.descargar_sabana_inven(JSON.stringify(params_z));
}


}
