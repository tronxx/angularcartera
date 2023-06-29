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
          console.log(res);
        }
      });
  

    }

    imprmir_relacion (sabanvtas : SabanaVtas) {
      let params_z = {
        modo: "imprimir_sabana_ventas",
        idsabanavta: sabanvtas.idsabana,
        ubicacion: this.ubica,
        titulo:"Sabana de Ventas Numero " + String( sabanvtas.folio) +
        " Fecha:" + sabanvtas.fecha + " Con Ventas del " + sabanvtas.fechainicial +
        " Al " + sabanvtas.fechafinal
      }
      this.servicioclientes.imprimir_sabanas_vtas(JSON.stringify(params_z));
    }
    

}
