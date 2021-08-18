import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms'
import { ClientesService } from '../services/clientes.service'
import { Cliente } from '../models/clientes';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
    modo : "buscar_rango",
    fechaini: this.strfecha_z.substring(0,8) + '01',
    fechafin: this.strfecha_z,
    codigoini: '23',
    codigofin: '23'
  }

  constructor(public dialog: MatDialog, private servicioclientes: ClientesService) { }

  ngOnInit(): void {
    console.log("inimes:" + this.mimodelo.fechaini);
  }

  onSubmit() {
    this.servicioclientes.obtenclientes(JSON.stringify(this.mimodelo)).subscribe(
      respu => {
        this.clientes = respu;
      }
    )
  }

  onNoClick() {

  }

}
