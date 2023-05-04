import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; 
import { ClientesService } from '../../services/clientes.service';
import { ConfiguracionService } from '../../services/configuracion.service';
import { PolizasService } from '../../services/polizas.service';
import { Cliente } from '../../models';
import { Compania } from '../../models';
import { Relcob } from '../../models';
import { DlgimpripolComponent } from '../../dlgimpripol/dlgimpripol.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBodyComponent } from '../../dialog-body/dialog-body.component';
import { ReplaySubject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Promotor } from '../../models';
import { CodigoPoliza } from '../../models';
import { Renrelco } from '../../models';
import { RelcobService } from '../../services/relcob.service';
import { DlgdatosrelcobComponent } from './../dlgdatosrelcob/dlgdatosrelcob.component'
import { DlgbuscliComponent } from '../../common/dlgbuscli/dlgbuscli.component';

@Component({
  selector: 'app-agrecliente',
  templateUrl: './agrecliente.component.html',
  styleUrls: ['./agrecliente.component.css']
})
export class AgreclienteComponent implements OnInit {

  cliente?: Cliente;
  codcli_z = ""
  idcli_z = -1;
  promo_z = "";
  cia_z?: Compania;
  listavencimientos_z = [ {
    "letra" : "",
    "vence" : ""
  }
]

  constructor(
    public dialog: MatDialog, public dialogRef: MatDialogRef<AgreclienteComponent>,
    @Inject(MAT_DIALOG_DATA) public message : string,
    private datePipe: DatePipe,
    private configuracion : ConfiguracionService,
    private servicioclientes: ClientesService

  ) { }

  ngOnInit(): void {
  }

  busqueda_por_nombre() {
    const dialogref = this.dialog.open(DlgbuscliComponent, {
      width:'650px',
      data: ''
    });
    dialogref.afterClosed().subscribe(res => {
      if (res) {
        this.codcli_z = res.numcli;
        this.buscarcliente();
      }
      console.log("Debug: Regrese de busqueda por Nombre", res);
    });
  

}

buscarcliente() {
  var params_z = {
    modo : "buscar_un_cliente",
    codigo: this.codcli_z,
    idcli : -1
  }

  this.servicioclientes.buscacliente(JSON.stringify(params_z)).subscribe(
    respu => {
      if(respu) {
        this.cliente = respu;
        //this.buscadiasgracia();
        this.calcular_datos_cliente();
      } else {
        this.alerta("Cliente Inexistente");
        this.closeno();
      }
    }
  )

}

calcular_datos_cliente() {
  if(this.cliente) {
    this.listavencimientos_z = JSON.parse (this.configuracion.generavencimientos(this.cliente.fechavta, this.cliente.qom, 1, this.cliente.nulet, this.cliente.diasgracia));

  }
}

closeno() {
  this.dialogRef.close(false);
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

siaceptarcliente() {
  this.dialogRef.close(this.cliente);
}

}
