import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../models/clientes';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-dlgbuscli',
  templateUrl: './dlgbuscli.component.html',
  styleUrls: ['./dlgbuscli.component.css']
})
export class DlgbuscliComponent implements OnInit {

  nombus = "";
  messages = "";
  vigentes = true;
  clientes : Cliente[] = [];
  cliente?: Cliente;
  numcli_z = "";

  constructor(
    public dialogRef: MatDialogRef<DlgbuscliComponent>,
    @Inject(MAT_DIALOG_DATA) public message : string,
    private servicioclientes: ClientesService

  ) { }

  ngOnInit(): void {
  }

  busca_nombre() {
    var params_z = {
      modo : "buscar_nombre",
      nombre: this.nombus,
      vigencia : "F"
    }
    if (this.vigentes) { params_z.vigencia = "V"}
    console.log("Debug: this.vigentes:", this.vigentes);
    this.messages = "";
    this.servicioclientes.obtenclientes(JSON.stringify(params_z)).subscribe(
      respu => {
        if(respu.length > 0) {
          this.clientes = respu;
        } else {
          this.messages = "No hay clientes con ese nombre";
          console.log("Debug: No hay respuesta");
        }

      }
    )

  }

  select_cliente(cliente: Cliente ) {
    this.cliente = cliente;
    this.numcli_z = this.cliente.numcli;
  }

  closeyes() {
    this.dialogRef.close(this.cliente);
  }

  closeno() {
    this.dialogRef.close(false);
  }


}
