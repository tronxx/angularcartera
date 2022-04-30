import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { ConfiguracionService } from '../services/configuracion.service';
import { PolizasService } from '../services/polizas.service';
import { Cliente } from '../models/clientes';
import { Poliza } from '../models/polizas';
import { Compania } from '../models/config';
import { ActivatedRoute, Router } from '@angular/router';

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
    private servicioclientes: ClientesService,
    private serviciopolizas: PolizasService,
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
    this.serviciopolizas.busca_acumulado_polizas(JSON.stringify(params)).subscribe(
      respu => {
        this.polizas = respu;
      }
    )

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
      }
    )
}

}
