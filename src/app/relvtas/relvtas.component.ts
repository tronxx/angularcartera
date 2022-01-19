import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms'
import { ClientesService } from '../services/clientes.service'
import { ConfiguracionService } from '../services/configuracion.service';
import { Cliente } from '../models/clientes';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-relvtas',
  templateUrl: './relvtas.component.html',
  styleUrls: ['./relvtas.component.css']
})
export class RelvtasComponent implements OnInit {


  fechahoy_z  = new Date();
  anu_z = this.fechahoy_z.getFullYear().toString();
  mes_z = ((this.fechahoy_z.getMonth()+101).toString()).substring(1,3);
  dia_z = ((this.fechahoy_z.getDate()+100).toString()).substring(1,3);
  strfecha_z = this.anu_z + "-" + this.mes_z + "-" + this.dia_z;

  clientes : Cliente[] = [];
  cliente? : Cliente;

  mimodelo = {
    clavecia: "",
    modo : "buscar_rango",
    fechaini: this.strfecha_z.substring(0,8) + '01',
    fechafin: this.strfecha_z,
    codigoini: '23',
    codigofin: '23'
  }


  constructor(public dialog: MatDialog, private servicioclientes: ClientesService,
    private configuracion: ConfiguracionService) { }

  ngOnInit(): void {
    this.carga_iniciales();
  }

  carga_iniciales() {
    let misdatosrelvta = {
      cvecia:this.configuracion.getcvecia(),
      codigoini:"",
      codigofin:""
    } 
    let cverelvta_z = "relvtas_" + misdatosrelvta.cvecia;

    this.mimodelo.clavecia = misdatosrelvta.cvecia;
    let registro_z = localStorage.getItem(cverelvta_z) || "{}";
    var misdatosiniciales_z = JSON.parse(registro_z);
    if(this.dia_z < "10") {
      let minvomes_z = Number(this.mes_z) - 1;
      let minvoanu_z = Number(this.anu_z);
      if(minvomes_z < 1) { 
        minvomes_z = 12; minvoanu_z = minvoanu_z - 1;
      }
      let mianu_z = minvoanu_z.toString();
      let mimes_z = ((minvomes_z+100).toString()).substring(1,3);
      this.mimodelo.fechaini = mianu_z + "-" + mimes_z + "-" + "01";
    }
    this.mimodelo.codigoini = misdatosiniciales_z.codigoini;
    this.mimodelo.codigofin = misdatosiniciales_z.codigofin;
  }

  onSubmit() {
    let cverelvta_z = "relvtas_" + this.mimodelo.clavecia;
    localStorage.setItem(cverelvta_z, JSON.stringify( this.mimodelo));

    this.servicioclientes.obtenrelvtas(JSON.stringify(this.mimodelo)).subscribe(
      respu => {
        this.clientes = respu;
      }
    )
  }

  onNoClick() {

  }


}
