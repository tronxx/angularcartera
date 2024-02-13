import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { PolizasService } from '../services/polizas.service';
import { Cliente } from '../models/clientes';
import { Poliza } from '../models/polizas';
import { Renpol } from '../models/renpol';
import { FormsModule } from '@angular/forms';
import { formatNumber,  CommonModule,  CurrencyPipe, formatCurrency, formatDate, DatePipe } from '@angular/common';
import { isEmpty } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { DlgbuscliComponent } from '../common/dlgbuscli/dlgbuscli.component';
import { MatIconModule } from '@angular/material/icon'; 
import { Compania } from '../models/config';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerComponent } from '../common/spinner/spinner.component';

@Component({
  selector: 'app-consupol',
  templateUrl: './consupol.component.html',
  styleUrls: ['./consupol.component.css']
})
export class ConsupolComponent implements OnInit {

  poliza?: Poliza;
  renpol?: Renpol;
  renglonesPoliza : Renpol[] = [];
  
  codcli_z = "";
  uuid_z = "";
  cia_z ?: Compania;

  clienteactivo_z = false;
  polizaactiva_z = false;
  aceptarpago = false;
  ultltaoculto_z = true;
  errores_z = [""];
  sinerrores = true;
  errorespoliza = [""]
  listaletras = [""];
  enespera = false;
  uuidpol_z = "";
  uuidrec_z = "";
  poltimbrado_z = "";
  rectimbrado_z = "";
  statuspol_z = "";
  claveempresa = "";

  datosalerta = {
    alertapoliza : true
  }

  cobratario = {
    "idpromot": 0,
    "cvepromo":"",
    "poc":"",
    "nombre":""
  }
  tda_z = "";
  tdaspol_z? = {};
  nomtda_z = "";
  datospolenabled_z = false;
  yesno_z = false;
  tipopagosel_z = "";
  tiporecobon_z = "";


  usrreg_z = {
    "idusuario":0,
    "login":"",
    "nombre":"",
    "token":"",
    "acceso": "false",
    "iniciales":"",
    "nivel":""
  }

  totalimports_z = 0;
  totalrecargs_z = 0;
  totalbonifcs_z = 0;
  idpoliza = 0;
  
  
  fechahoy_z  = new Date();
  fechaayer_z = new Date (this.fechahoy_z.getTime() - (1 * 24 * 60 * 60 *  1000));
  strfecha_z = "" + this.datepipe.transform(this.fechaayer_z,"yyyy-MM-dd");
  fechapol_z = "";
  

  constructor(
    private servicioclientes: ClientesService,
    public dialog: MatDialog, 
    public datepipe: DatePipe,
    private serviciopolizas: PolizasService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    var mistorage_z  = localStorage.getItem('token') || "{}";
    this.usrreg_z =  JSON.parse(mistorage_z);
    let mialerta   = localStorage.getItem('alertapoliza') || '{ "alertapoliza":"true" }';
    this.datosalerta =  JSON.parse(mialerta);

    this.errorespoliza=[];
    this.buscar_codigos_poliza();
    this.cia_z =  this.serviciopolizas.obtendatoscia();
    this.claveempresa = this.cia_z.Clave;

    let mitda_z = String(this.route.snapshot.paramMap.get('tda'));
    let mifechapol_z =  String(this.route.snapshot.paramMap.get('fecha'));
    if (mifechapol_z) {
      this.fechapol_z = mifechapol_z;
    }
    if(mitda_z) {
      this.tda_z = mitda_z;
    }
    
    if (this.usrreg_z.nivel == "S") this.datospolenabled_z=true;
    this.datospolenabled_z=true;
    //this.tda_z  =  String(this.route.snapshot.paramMap.get('tda'));
    //this.fechapol_z =  String(this.route.snapshot.paramMap.get('fecha'));
    //this.alerta("fechapol:"+  this.fechapol_z + " tda:" + this.tda_z);
    this.buscar_poliza();
  }

  aceptarpoliza() {
    this.buscar_poliza();
 }

 buscar_poliza() {

  this.enespera = true;
  this.renglonesPoliza = [];
  this.totalimports_z = 0;
  this.totalrecargs_z = 0;
  this.totalbonifcs_z = 0;
  this.idpoliza = -1;

    //this.buscar_codigos_poliza();
  var params = {
      "modo":"acceder_poliza",
      "fecha":this.fechapol_z,
      "crearpoliza":"N",
      "tda":this.tda_z
  }
  
  this.serviciopolizas.buscapoliza(JSON.stringify(params)).subscribe(
    respu => {
      this.errorespoliza=[];
      console.log("Debug: buscar_poliza ", respu);
      if(respu.idpoliza) {
        this.poliza = respu;
        this.polizaactiva_z = true;
        this.tda_z = this.poliza.tda;
        this.fechapol_z = this.poliza.fecha;
        console.log("Poliza:", this.poliza, " this.fechapol_z:", this.fechapol_z);
        
        this.polizaactiva_z = true;
        this.idpoliza = this.poliza.idpoliza;
        this.buscar_renpol();
  
      }
    }
  )
  this.datos_poliza();
  
}


buscar_codigos_poliza() {
    var params = {
      "modo":"buscar_codigos_polizas",
      "idusuario": this.usrreg_z.idusuario
    };
    //console.log("idusuario:" + this.usrreg_z.idusuario);
    this.cobratario.cvepromo = this.usrreg_z.iniciales;

    this.serviciopolizas.busca_codigos_poliza(JSON.stringify(params)).subscribe(
      respu => {
        this.tda_z = respu[0].clave;
        this.nomtda_z = respu[0].nombre;
        //console.log("Codigos:" + JSON.stringify(respu));
        this.tdaspol_z = respu;
        //this.fechapol_z =  this.strfecha_z;
      }
    )
}

buscar_renpol() {
  let params = {
    "modo":"obtener_detalles_poliza",
    "idpoliza": this.idpoliza
  };
  
  //console.log("idusuario:" + this.usrreg_z.idusuario);
  this.serviciopolizas.buscar_renpol(JSON.stringify(params)).subscribe(
    respu => {
      
      this.renglonesPoliza = respu;
      if(this.poliza) {
         this.totalbonifcs_z = this.renglonesPoliza.reduce(( acc,
          obj,
        ) => acc + (obj.bonificacion),
        0);
        this.totalrecargs_z = this.renglonesPoliza.reduce(( acc,
          obj,
        ) => acc + (obj.recargo),
        0);
        this.totalimports_z = this.renglonesPoliza.reduce(( acc,
          obj,
        ) => acc + (obj.importe),
        0);

      }

    }
  )
}

imprimirdespacho() {
  let params = {
    "modo":"obtener_datos_poliza",
    "fechapoliza":this.fechapol_z,
    "tdapol":this.tda_z
  };
  this.serviciopolizas.obtener_datos_poliza(JSON.stringify(params)).subscribe(
    respu => {
      let mirespu_z = respu;
      console.log("Debug: 216 mirespu_z.status", mirespu_z.status);
      if(mirespu_z.status != "C") {
        this.checa_si_cerrar_poliza("Poliza Abierta, Se va a Cerrar al Imprimir el despacho, seguro de continuar ?");
      } else {
        this.serviciopolizas.obten_impresion_despacho_caja(JSON.stringify(params));
      }
    }
  );
 
}


imprimirpoliza() {
  let params = {
    "modo":"obtener_datos_poliza",
    "fechapoliza":this.fechapol_z,
    "tdapol":this.tda_z
  };
  this.serviciopolizas.obtener_datos_poliza(JSON.stringify(params)).subscribe(
    respu => {
      let mirespu_z = respu;
      //console.log("Debug: 216 mirespu_z.status", mirespu_z.status);
      if(mirespu_z.status != "C") {
        this.checa_si_cerrar_poliza("Poliza Abierta, Se va a Cerrar al Imprimir, seguro de continuar ?");
      } else {
        this.serviciopolizas.obten_impresion_poliza_caja(JSON.stringify(params));
      }
    }
  );
 
}


checa_si_cerrar_poliza(mensaje_z : string) {
  const dialogref = this.dialog.open(DialogBodyComponent, {
    width:'350px',
    data: mensaje_z
  });
  dialogref.afterClosed().subscribe(res => {
    //console.log("Debug", res);
    if(res) {
      this.checa_fecha_timbre("");
    }
  });

}

checa_fecha_timbre(mensaje: string) {
  let mifecpol_z = new Date(this.fechapol_z.replace(/-/g, '\/'));
  let dias = this.fechahoy_z.getTime()  - mifecpol_z.getTime();
  dias = Math.floor ( dias / (86400 * 1000));
  let fectimbre_z = this.fechapol_z;
  let timbrarpolizafechaespecial = "Poliza";
  let fecminima_z = new Date ( new Date().getTime() - ( 86400*1000*3 - 7200*1000 ));
  let params = {
    "modo":"cerrar_poliza",
    "fechapoliza":this.fechapol_z,
    "tdapol":this.tda_z,
    "timbrarpolizafechaespecial":timbrarpolizafechaespecial,
    "fechatimbrepol":fectimbre_z
  };
  if(dias <= 3) {
    this.cierra_poliza(JSON.stringify(params));
  }
  if(dias > 3) {
    mensaje = "Fecha de Timbrado minimo es " + this.datepipe.transform(fecminima_z,"yyyy-MM-dd"); 
    mensaje += " Desea Timbrar con esta fecha ?: ";
    const dialogref = this.dialog.open(DialogBodyComponent, {
      width:'350px',
      data: mensaje
    });
    dialogref.afterClosed().subscribe(res => {
      //console.log("Debug", res);
      if(res) {
        params.fechatimbrepol = "" + this.datepipe.transform(fecminima_z,"yyyy-MM-dd");
        params.timbrarpolizafechaespecial = "Especial";
        this.cierra_poliza(JSON.stringify(params));
      }
    });
  }
}

imprimir_timbre () {
  if(this.poltimbrado_z && this.uuidpol_z != "-1" ) {
    let paramcompl_z = { "uuid": this.uuidpol_z };
    if(this.claveempresa == "EC") {
      this.serviciopolizas.obten_pdf_cfdi(JSON.stringify(paramcompl_z));
    } else {
      //this.serviciopolizas.obtentxtcomplmentopol(JSON.stringify(paramcompl_z));  
      this.serviciopolizas.obtenpdfcomplmentopol(JSON.stringify(paramcompl_z));  
    }
  }

}

imprimir_cfdi_recargo() {
  if(this.uuidrec_z && this.uuidrec_z != "-1" ) {
    let paramrec_z = { "uuid": this.uuidrec_z };
    this.serviciopolizas.obten_pdf_cfdi(JSON.stringify(paramrec_z));  
  }

}

cierra_poliza( params_z: string) {
  let params = JSON.parse (params_z);
  console.log("Debug: Estoy en cerrar poliza:", params_z);
  this.serviciopolizas.cierra_poliza(JSON.stringify(params)).subscribe(
    respu => {
      let mirespu_z = respu;
      this.uuidpol_z = mirespu_z.uuidpol;
      this.uuidrec_z = mirespu_z.uuidrec;
      this.poltimbrado_z = mirespu_z.timbradopoliza;
      this.rectimbrado_z = mirespu_z.timbradorecargo;
      this.statuspol_z =  mirespu_z.status;
      console.log("Ya se timbró la poliza", this.uuidpol_z, "Empresa:", this.claveempresa);
      if(this.datosalerta.alertapoliza) {
        this.mensaje_cfdi("Ahora la impresion del CFDI se descarga por separado\n, Desea no volver a mostrar este mensaje ?");
      }

      // 8-Feb-2024 Se bloquea que se descargue el cfdi
      // if(this.uuidpol_z && this.uuidpol_z != "-1" ) {
      //     let paramcompl_z = { "uuid": this.uuidpol_z };
      //     if(this.claveempresa == "EC") {
      //       this.serviciopolizas.obten_pdf_cfdi(JSON.stringify(paramcompl_z));
      //     } else {
      //       this.serviciopolizas.obtenpdfcomplmentopol(JSON.stringify(paramcompl_z));  
      //     }
      // }
      // if(this.uuidrec_z && this.uuidrec_z != "-1" ) {
      //   let paramrec_z = { "uuid": this.uuidrec_z };
      //   this.serviciopolizas.obten_pdf_cfdi(JSON.stringify(paramrec_z));  
      // }
      let params = {
        "modo":"obtener_datos_poliza",
        "fechapoliza":this.fechapol_z,
        "tdapol":this.tda_z
      };
      this.serviciopolizas.obten_impresion_poliza_caja(JSON.stringify(params));
  }
  );

}

datos_poliza() {
  let params = {
    "modo":"obtener_datos_poliza",
    "fechapoliza":this.fechapol_z,
    "tdapol":this.tda_z
  };
  this.serviciopolizas.obtener_datos_poliza(JSON.stringify(params)).subscribe(
    respu => {
      console.log("Debug: ", respu);
      let mirespu_z = respu;
      this.uuidpol_z = mirespu_z.uuidpol;
      this.uuidrec_z = mirespu_z.uuidrec;
      this.poltimbrado_z = mirespu_z.timbradopoliza;
      this.rectimbrado_z = mirespu_z.timbradorecargo;
      this.statuspol_z =  mirespu_z.status;
    }
  );

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

mensaje_cfdi(mensaje: string) {
  const dialogref = this.dialog.open(DialogBodyComponent, {
    width:'350px',
    data: mensaje
  });
  dialogref.afterClosed().subscribe(res => {
    if(res) {
      this.datosalerta.alertapoliza = false;
      localStorage.setItem("alertapoliza", JSON.stringify( this.datosalerta));
    }
    //console.log("Debug", res);
  });

}



}
