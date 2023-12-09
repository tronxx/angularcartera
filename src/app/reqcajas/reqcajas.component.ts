import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; 
import { ClientesService } from '../services/clientes.service';
import { ConfiguracionService } from '../services/configuracion.service';
import { PolizasService } from '../services/polizas.service';
import { Cliente } from '../models';
import { Poliza } from '../models';
import { Compania } from '../models';
import { Relcob } from '../models';
import { DlgimpripolComponent } from '../dlgimpripol/dlgimpripol.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { ReplaySubject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Promotor } from '../models';
import { CodigoPoliza } from '../models';
import { Renrelco } from '../models';
import { RelcobService } from '../services/relcob.service';
import { DlgdatosrelcobComponent } from '../caprelcob/dlgdatosrelcob/dlgdatosrelcob.component'


@Component({
  selector: 'app-reqcajas',
  templateUrl: './reqcajas.component.html',
  styleUrls: ['./reqcajas.component.css']
})
export class ReqcajasComponent implements OnInit {

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
  claveempresa = "";
  cia_z ?: Compania;
  tiporel = 711;
 
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
    this.cia_z =  this.serviciopolizas.obtendatoscia();
    this.claveempresa = this.cia_z.Clave;
    this.carga_catalogos();
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
        this.codpol_z = this.codigospolizas[0].clave;
        //console.log("Codigos Polizas:", respu);
      }
    )
  }

  seleccionar_codigo() {
    for(let micodigo of this.codigospolizas) {
      if(micodigo.clave == this.codpol_z ) {
        this.micodpol = micodigo;
      }
    }
  }


  buscarrelcobs () {
    let miclave = this.micodpol?.clave;
    var params = {
      "modo":"buscar_relaciones_relcob",
      "fechainicial": this.fechaini,
      "fechafinal": this.fechafin,
      "codpol": this.micodpol?.clave,
      "tiporel":this.tiporel
    };
    console.log("Bucar relaciones cobranza:", params);
    
    //console.log("idusuario:" + this.usrreg_z.idusuario);
    this.servicosRelcob.busca_relaciones_cobranza(JSON.stringify(params)).subscribe(
      respu => {
        this.relcobs = respu;
      }
    )

  }

  agregar_relcob() {
    console.log("micodpol:", this.micodpol);
    const params = {
      poliza: this.micodpol,
      tiporel: this.tiporel
    }
    
    const dialogmov = this.dialog.open(DlgdatosrelcobComponent, {
      width:'650px',
      data: JSON.stringify(params)
    });
    dialogmov.afterClosed().subscribe(res => {
      if (res) {
        
        let params_z = {
          modo: "agregar_relacion_reqcaja",
          fecha : res.fecha,
          codpol: this.micodpol?.clave,
          promotor: res.promotor,
          caja: res.caja,
          folio: res.folio,
          idusuario: this.usrreg_z.idusuario,
          tiporel: this.tiporel

        }

        this.servicosRelcob.agrega_nueva_relcob(JSON.stringify(params_z)).subscribe(
          result => {
            const idrelcob = result.idrelcob;
            const  minvourl_z = [
              `/detallereqcajas/${idrelcob}`
            ];
            //this.alerta("Voy a hacer route navigate: " + minvourl_z + " Respu:" + JSON.stringify(mirespu_z));
            //console.log("Voy a ir a mi url:", minvourl_z);
            
            this.router.navigate(minvourl_z)
          }
        );
        
      }
    });
      

  }

  detalles_relcob(relcob: Relcob) {
    let minvourl_z = [
      '/detallereqcajas/' + relcob.idcarrelcob
    ];
    //this.alerta("Voy a hacer route navigate: " + minvourl_z + " Respu:" + JSON.stringify(mirespu_z));
    //console.log("Voy a ir a mi url:", minvourl_z);
    
    this.router.navigate(minvourl_z)
  }


}
