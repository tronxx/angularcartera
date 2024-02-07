import { Component, OnInit, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card'; 
import { ConfiguracionService } from '../services/configuracion.service';

@Component({
  selector: 'app-dlgimpripol',
  templateUrl: './dlgimpripol.component.html',
  styleUrls: ['./dlgimpripol.component.css']
})
export class DlgimpripolComponent implements OnInit {

  fechapol_z = "";
  tipoimpresion = "txt";
  title_z = "";
  codigopol="";
  nombrepol="";

  constructor(
    public dialogRef: MatDialogRef<DlgimpripolComponent>,
    private configuracion: ConfiguracionService,
    @Inject(MAT_DIALOG_DATA) public message : string

  ) { }

  ngOnInit(): void {
    this.fechapol_z = this.configuracion.fecha_a_str(new Date(), "YYYY-mm-dd");
    let misparam_z = JSON.parse(this.message);
    this.codigopol = misparam_z.codtda;
    this.nombrepol = misparam_z.nombrepol;
    this.title_z = misparam_z.title;

  }

  closeyes () {
    let resultado = {
      'fecha': this.fechapol_z,
      'tipoimpresion': this.tipoimpresion
    }
    this.dialogRef.close(resultado);

  }

  closeno() {
    this.dialogRef.close(false);
  }

}
