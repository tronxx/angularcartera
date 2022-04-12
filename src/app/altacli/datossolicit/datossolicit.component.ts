import { Component, OnInit, Inject, Input } from '@angular/core';
import { ClientesService } from '../../services/clientes.service'
import { FormsModule } from '@angular/forms';
import { formatNumber,  CommonModule,  CurrencyPipe, formatCurrency, formatDate, DatePipe } from '@angular/common';
import { isEmpty } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card'; 
import { MatTabsModule } from '@angular/material/tabs';
import { DialogBodyComponent } from '../../dialog-body/dialog-body.component';
import { DlgbuscliComponent } from '../../common/dlgbuscli/dlgbuscli.component';
import { MatIconModule } from '@angular/material/icon'; 
import { Movclis } from '../../models/movclis';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConfiguracionService } from '../../services/configuracion.service';
import { Solicitud } from '../../models/solicitud';
import { Cliente } from '../../models/clientes';

@Component({
  selector: 'app-datossolicit',
  templateUrl: './datossolicit.component.html',
  styleUrls: ['./datossolicit.component.css']
})
export class DatossolicitComponent implements OnInit {

  solicitud : Solicitud = <Solicitud> {};  
  cliente?: Cliente;
  linkcliente = "";
  idcli_z = 0;
  numcli_z= "";
  edoscivil = [
    {clave:"C", descri:"Casado"},
    {clave:"S", descri:"Soltero"}
  ];

  sexos = [
    {clave:"F", descri:"Femenino"},
    {clave:"M", descri:"Masculino"}
  ];



  constructor(
    public dialog: MatDialog, 
    private configuracion: ConfiguracionService,
    private servicioclientes: ClientesService,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.numcli_z = String(this.route.snapshot.paramMap.get('numcli'));
    this.solicitud.estadocivil = "S";
    this.solicitud.sexo = "M";
    this.busca_cliente(this.numcli_z);
    this.linkcliente = "/altacli/" + this.numcli_z;
  }

  busca_cliente(numcli_z: string) {
    var params_z = {
      modo : "buscar_un_cliente",
      codigo: this.numcli_z,
      idcli : -1
    }
  
    this.servicioclientes.buscaclientealta(JSON.stringify(params_z)).subscribe(
      respu => {
        if(respu) {
          this.cliente = respu;    
          this.idcli_z = this.cliente.idcli;
          this.busca_solicitud(this.idcli_z);
        }
      });
  }

  busca_solicitud(idcli_z : number) {
      var params_z = {
        modo : "buscar_solicitud",
        codigo: this.numcli_z,
        idcli : idcli_z
      }
      console.log("Debug: Estoy en busca_solicit ", idcli_z);
      this.servicioclientes.busca_solicitud_altas(JSON.stringify(params_z)).subscribe(
        respu => {
          if(respu) {
            this.solicitud = respu;
          } 
        }
      );
  }

  formularioEnviado() {}

  grabar_solicitud() {
    let params_z = {
      modo:"grabar_solicitud",
      numcli:this.numcli_z,
      solicitud: this.solicitud
    }
    this.servicioclientes.grabar_solicitud_altas(JSON.stringify(params_z)).subscribe(
      respu => {
        if(respu) {
          if(respu.status == "OK") {
            this.alerta("Solicitud grabada");
            this.busca_solicitud(this.idcli_z);
          } else {
            this.alerta("Ocurrio un Error al grabar");
          }
        } 
      }
    );

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
