import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { ConfiguracionService } from '../services/configuracion.service';
import { PolizasService } from '../services/polizas.service';
import { Cliente } from '../models/clientes';
import { Poliza } from '../models/polizas';
import { Compania } from '../models/config';
import { DlgimpripolComponent } from '../dlgimpripol/dlgimpripol.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { ReplaySubject } from 'rxjs';
import { SpinnerComponent } from '../common/spinner/spinner.component';
import { DlganclisalComponent } from '../common/dlganclisal/dlganclisal.component';

@Component({
  selector: 'app-acumpol',
  templateUrl: './acumpol.component.html',
  styleUrls: ['./acumpol.component.css']
})

export class AcumpolComponent implements OnInit {
  fechafinal  = new Date();
  anu_z = this.fechafinal.getFullYear().toString();
  mes_z = ((this.fechafinal.getMonth()+101).toString()).substring(1,3);
  dia_z = ((this.fechafinal.getDate()+100).toString()).substring(1,3);
  //fechaini_z = this.fechafinal.setMonth(this.fechafinal.getMonth() -1);
  strfechaini =  this.anu_z + "-" + this.mes_z + "-" + "01";
  strfechafin = "";
  tda_z = "";
  datospolenabled_z = false;
  nomtda_z = "";
  enespera = false;
  tdaspol_z? = {};

  cobratario = {
    "idpromot": 0,
    "cvepromo":"",
    "poc":"",
    "nombre":""
  }

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

  constructor(
    public dialog: MatDialog,     
    private servicioclientes: ClientesService,
    private serviciopolizas: PolizasService,
    private router: Router,
    private configuracion: ConfiguracionService

  ) { }

  ngOnInit(): void {
    var mistorage_z  = localStorage.getItem('token') || "{}";
    this.usrreg_z =  JSON.parse(mistorage_z);
    this.buscar_codigos_poliza();
    this.cia_z =  this.serviciopolizas.obtendatoscia();
    if (this.usrreg_z.nivel == "S") this.datospolenabled_z=true;

    if(this.dia_z < "10") {
      let minvomes_z = Number(this.mes_z) - 1;
      let minvoanu_z = Number(this.anu_z);
      if(minvomes_z < 1) { 
        minvomes_z = 12; minvoanu_z = minvoanu_z - 1;
      }
      let mianu_z = minvoanu_z.toString();
      let mimes_z = ((minvomes_z+100).toString()).substring(1,3);
      this.strfechaini = mianu_z + "-" + mimes_z + "-" + "01";
    }
    this.strfechafin = this.configuracion.fecha_a_str(this.fechafinal, "YYYY-mm-dd");

  }

  buscarpolizas() {
    var params = {
      "modo":"acumulado_polizas",
      "fechainicial": this.strfechaini,
      "fechafinal": this.strfechafin,
      "codigoinicial": this.tda_z,
      "codigofinal":this.tda_z
    };
    //console.log("idusuario:" + this.usrreg_z.idusuario);
    this.enespera = true;
    this.serviciopolizas.busca_acumulado_polizas(JSON.stringify(params)).subscribe(
      respu => {
        this.enespera = false;
        this.polizas = respu;
      }
    )

  }

  buscar_codigos_poliza() {
    var params = {
      "modo":"buscar_codigos_polizas",
      "idusuario": this.usrreg_z.idusuario
    };
    this.enespera = true;
    //console.log("idusuario:" + this.usrreg_z.idusuario);
    this.cobratario.cvepromo = this.usrreg_z.iniciales;

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

imprimir_repacupo_pdf() {
  var params = {
    "modo":"reporte_acumulado_polizas_pdf",
    "fechainicial": this.strfechaini,
    "fechafinal": this.strfechafin,
    "codigoinicial": this.tda_z,
    "codigofinal":this.tda_z,
    "titulo":"Reporte acumulado de Pólizas del " + 
      this.strfechaini + " Al " + this.strfechafin + 
      " Del Codigo " + this.tda_z + " " + this.nomtda_z
  };
  //console.log("idusuario:" + this.usrreg_z.idusuario);
  this.enespera = true;
  this.serviciopolizas.reporte_repacupo_pdf(JSON.stringify(params)).subscribe(
    respu => {
      console.log("respu", respu);
      const params =  {
        filename: respu.output
      }
      this.serviciopolizas.descargar_archivo(JSON.stringify(params));
      //this.descargarArchivo(respu, "repacupo.pdf");
    }
  )

  
}

descargarArchivo(response: any, fileName: string): void {
  const dataType = response.type;
  const binaryData = [];
  binaryData.push(response);

  const filePath = window.URL.createObjectURL(new Blob (binaryData, {type: dataType}));
  const downloadLink = document.createElement('a');
  downloadLink.href = filePath;
  downloadLink.setAttribute('download', fileName);
  document.body.appendChild(downloadLink);
  downloadLink.click();

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
            this.serviciopolizas.obten_impresion_poliza_caja(JSON.stringify(params_z));
            return;
          }
          if(mirespu_z.status == "C") {
            this.serviciopolizas.obten_impresion_poliza_caja(JSON.stringify(params_z));
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

impresion_anclisal() {
  let message = {
    codigoinicial: this.tda_z,
    codigofinal: this.tda_z,
    titulo: "Reporte de Clientes Saldados"
  }
  const dialogref = this.dialog.open(DlganclisalComponent, {
    width:'650px',
    data: JSON.stringify(message)
  });
  dialogref.afterClosed().subscribe(res => {
    if (res) {
      let params = res;
    }
  });

}


}
