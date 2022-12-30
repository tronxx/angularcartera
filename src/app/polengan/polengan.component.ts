import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { Cliente } from '../models/clientes';
import { FormControl } from '@angular/forms'
import { formatNumber,  CommonModule,  CurrencyPipe, formatCurrency, formatDate, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { DlgbuscliComponent } from '../common/dlgbuscli/dlgbuscli.component';
import { MatIconModule } from '@angular/material/icon'; 
import { MatSpinner } from '@angular/material/progress-spinner';
import { Compania } from '../models/config';
import { ConfiguracionService } from '../services/configuracion.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerComponent } from '../common/spinner/spinner.component';

@Component({
  selector: 'app-polengan',
  templateUrl: './polengan.component.html',
  styleUrls: ['./polengan.component.css']
})
export class PolenganComponent implements OnInit {

  usrreg_z = {
    "idusuario":0,
    "login":"",
    "nombre":"",
    "token":"",
    "acceso": "false",
    "iniciales":"",
    "nivel":""
  }

  fechaini_z = "";
  fechafin_z = "";
  fechatimbre_z = "";
  datosinvalidos_z = true;
  msgerror_z = "";
  uuid_z = "";
  enespera_z = false;

  misdatosrelvta = {
    cvecia:"",
    codigoini:"",
    codigofin:"",
    ubica:""
  } 
  
  fechahoy_z  = new Date();
  anu_z = this.fechahoy_z.getFullYear().toString();
  mes_z = ((this.fechahoy_z.getMonth()+101).toString()).substring(1,3);
  dia_z = ((this.fechahoy_z.getDate()+100).toString()).substring(1,3);
  strfecha_z = this.anu_z + "-" + this.mes_z + "-" + this.dia_z;
  

  
  clientes : Cliente[] = [];
  cliente? : Cliente;

  cia_z ?: Compania;
  claveempresa = "";
  

  constructor(
    private servicioclientes: ClientesService,
    public dialog: MatDialog, 
    public datepipe: DatePipe,
    private config: ConfiguracionService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.carga_iniciales();
  }

  carga_iniciales() {
    this.misdatosrelvta.cvecia= this.config.getcvecia();
    let cverelvta_z = "polengan_" +this.misdatosrelvta.cvecia;
    console.log("cverelvta:", cverelvta_z);
    
    let registro_z = localStorage.getItem(cverelvta_z) || "{}";
    let misdatosiniciales_z = JSON.parse(registro_z);
    this.misdatosrelvta.codigoini = misdatosiniciales_z.codigoini;
    this.misdatosrelvta.codigofin = misdatosiniciales_z.codigofin;
    this.misdatosrelvta.ubica = misdatosiniciales_z.ubica;
    this.fechaini_z = this.anu_z + "-" + this.mes_z + "-" + "01";
    if(this.dia_z < "10") {
      let minvomes_z = Number(this.mes_z) - 1;
      let minvoanu_z = Number(this.anu_z);
      if(minvomes_z < 1) { 
        minvomes_z = 12; minvoanu_z = minvoanu_z - 1;
      }
      let mianu_z = minvoanu_z.toString();
      let mimes_z = ((minvomes_z+100).toString()).substring(1,3);
      this.fechaini_z = mianu_z + "-" + mimes_z + "-" + "01";
    }
    this.fechafin_z = this.config.fecha_a_str(new Date(), "YYYY-mm-dd");
    this.fechatimbre_z = this.fechafin_z;
    //this.mimodelo.ubicacionfinal = misdatosiniciales_z.ubicacionfinal;
  }

  buscar_clientes() {
    let params_z = {
      "modo":"buscar_ventas_enganches",
      "fechaini":this.fechaini_z,
      "fechafin":this.fechafin_z,
      "codigoini":this.misdatosrelvta.codigoini,
      "codigofin":this.misdatosrelvta.codigofin,
      "ubicacioninicial":this.misdatosrelvta.ubica,
      "ubicacionfinal":this.misdatosrelvta.ubica
    }
    let cverelvta_z = "polengan_" +this.misdatosrelvta.cvecia;
    localStorage.setItem(cverelvta_z, JSON.stringify( this.misdatosrelvta));
    this.enespera_z = true;
    this.servicioclientes.obtenrelvtas_enganches(JSON.stringify(params_z)).subscribe(
      respu => {
        this.clientes = respu;
        this.checa_datos_validos();
        this.enespera_z=false;
      }
    )

  }

  checa_datos_validos() {
    this.datosinvalidos_z = true;
    let resultado_z = this.validar_fecha_cierre();
    if(!resultado_z.escorrecto_z) {
      this.datosinvalidos_z = !resultado_z.escorrecto_z;
      this.msgerror_z = resultado_z.msg1_z;
      return;

    }
    if(!this.clientes.length) {
      this.datosinvalidos_z = true;
      this.msgerror_z = "No tiene ningun cliente";
      return;
    }
    this.datosinvalidos_z = false;

  }

  validar_fecha_cierre() {
    let resultado_z = {
      escorrecto_z : true,
      msg1_z : ""
    } 
    let fechaprop_z = ";"
    let msg1_z = "";
    let undia_z = 24 * 60 * 60 * 1000;
    let fechahoy_z = new Date();
    let fechacierre_z = new Date(this.fechatimbre_z);
    let dias_z = Math.floor(fechahoy_z.getTime() / (undia_z)) -  Math.floor(fechacierre_z.getTime() / (undia_z));
    let fechamin_z = new Date(Math.floor(fechahoy_z.getTime()/undia_z) - undia_z * 3);
    fechaprop_z = this.config.fecha_a_str(fechamin_z, "dd-mm-YYYY");
    if(dias_z < 0) {
      resultado_z.msg1_z += " No puede facturar con fecha Posterior";
      resultado_z.escorrecto_z = false;
    }
    if(dias_z > 3) {
      resultado_z.msg1_z += " No puede facturar con más de 3 días de diferencia";
      resultado_z.escorrecto_z = false;
    }
    return (resultado_z);
  }

  timbrar_enganches() {
    let params_z = {
      "modo":"timbrar_enganches",
      "fechaini":this.fechaini_z,
      "fechafin":this.fechafin_z,
      "ubicacion":this.misdatosrelvta.ubica,
      "fechatimbre":this.fechatimbre_z
    }
    this.enespera_z=true;

    this.servicioclientes.timbrar_enganches(JSON.stringify(params_z)).subscribe(
      respu => {
        this.enespera_z=false;

        if(respu.status == "OK") {
          this.descargar_pdf_cfdi(respu.uuid);
        } else {
          this.alerta("Error:" + respu.error);
        }
        
      }
    )

  }

  descargar_pdf_cfdi(uuid_z: string) {
    let params_z = {
      "modo":"descarga_pdf_cfdi",
      "uuid":uuid_z
    }

    this.servicioclientes.descarga_pdf_cfdi(JSON.stringify(params_z));

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
