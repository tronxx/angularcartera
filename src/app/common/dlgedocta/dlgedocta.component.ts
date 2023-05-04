import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import { Cliente } from '../../models/clientes';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-dlgedocta',
  templateUrl: './dlgedocta.component.html',
  styleUrls: ['./dlgedocta.component.css']
})
export class DlgedoctaComponent implements OnInit {

  datossol = false;
  observaciones = false;
  tipoimpresion = "pdf";
  numobs = 0;
  edoctaespecial = false;
  constructor(
    public dialogRef: MatDialogRef<DlgedoctaComponent>,
    @Inject(MAT_DIALOG_DATA) public message : string,
    private servicioclientes: ClientesService

  ) { }

  ngOnInit(): void {
  }

  closeyes () {
    let resultado = {
      'tipoimpresion': this.tipoimpresion,
      'observaciones': this.observaciones,
      'numobs': this.numobs,
      'datosol': this.datossol,
      "edoctaespecial": this.edoctaespecial
    }
    this.dialogRef.close(resultado);

  }

  closeno() {
    this.dialogRef.close(false);
  }

}
