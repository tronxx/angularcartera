import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms'
import { ClientesService } from '../services/clientes.service'
import { ConfiguracionService } from '../services/configuracion.service';
import { Cliente } from '../models/clientes';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DlgreltraspComponent } from '../common/dlgreltrasp/dlgreltrasp.component';
import { DlgrepcliviComponent } from '../common/dlgrepclivi/dlgrepclivi.component';

@Component({
  selector: 'app-conscli',
  templateUrl: './conscli.component.html',
  styleUrls: ['./conscli.component.css']
})

export class ConscliComponent implements OnInit {

  fechahoy_z  = new Date();
  anu_z = this.fechahoy_z.getFullYear().toString();
  mes_z = ((this.fechahoy_z.getMonth()+101).toString()).substring(1,3);
  dia_z = ((this.fechahoy_z.getDate()+100).toString()).substring(1,3);
  strfecha_z = this.anu_z + "-" + this.mes_z + "-" + this.dia_z;

  clientes : Cliente[] = [];
  cliente? : Cliente;

  mimodelo = {
    clavecia:"",
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
    let cverelvta_z = "conscli_" + misdatosrelvta.cvecia;

    this.mimodelo.clavecia = misdatosrelvta.cvecia;
    let registro_z = localStorage.getItem(cverelvta_z) || "{}";
    var misdatosiniciales_z = JSON.parse(registro_z);
    this.mimodelo.codigoini = misdatosiniciales_z.codigoini;
    this.mimodelo.codigofin = misdatosiniciales_z.codigofin;
  }


  onSubmit() {
    let cverelvta_z = "conscli_" + this.mimodelo.clavecia;
    localStorage.setItem(cverelvta_z, JSON.stringify( this.mimodelo));

    this.servicioclientes.obtenclientes(JSON.stringify(this.mimodelo)).subscribe(
      respu => {
        this.clientes = respu;
      }
    )
  }

  impresion_reltrasp() {
    let message = "Relacion de Traspasos";
    const dialogref = this.dialog.open(DlgreltraspComponent, {
      width:'650px',
      data: message
    });
    dialogref.afterClosed().subscribe(res => {
      if (res) {
        let params = res;
        this.servicioclientes.imprime_reltrasp(JSON.stringify( params));
      }
    });

  }

  onNoClick() {

  }

  impresion_repclivi() {
    let message = {
      codigoinicial: this.mimodelo.codigoini,
      codigofinal: this.mimodelo.codigofin,
      titulo: "Reporte de Clientes Vigentes"
    }
    const dialogref = this.dialog.open(DlgrepcliviComponent, {
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
