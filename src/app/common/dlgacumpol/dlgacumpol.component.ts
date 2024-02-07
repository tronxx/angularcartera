import { Component, OnInit, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card'; 
import { FormsModule } from '@angular/forms';
import { ConfiguracionService } from '../../services/configuracion.service';


@Component({
  selector: 'app-dlgacumpol',
  templateUrl: './dlgacumpol.component.html',
  styleUrls: ['./dlgacumpol.component.css']
})
export class DlgacumpolComponent {

  fechafinal  = new Date();
  anu_z = this.fechafinal.getFullYear().toString();
  mes_z = ((this.fechafinal.getMonth()+101).toString()).substring(1,3);
  dia_z = ((this.fechafinal.getDate()+100).toString()).substring(1,3);
  //fechaini_z = this.fechafinal.setMonth(this.fechafinal.getMonth() -1);
  strfechaini =  this.anu_z + "-" + this.mes_z + "-" + "01";

  fechapol_z = "";
  tipoimpresion = "txt";
  title_z = "";
  codigopol="";
  nombrepol="";
  polizaini = "";
  polizafin = "";
  fechaini = "";
  fechafin = "";

  constructor(
    public dialogRef: MatDialogRef<DlgacumpolComponent>,
    private configuracion: ConfiguracionService,
    @Inject(MAT_DIALOG_DATA) public message : string

  ) { }

  ngOnInit(): void {
    this.fechaini = this.strfechaini;
    this.fechafin = this.configuracion.fecha_a_str(this.fechafinal, "YYYY-mm-dd");
    let misparam_z = JSON.parse(this.message);
    this.polizaini = misparam_z.polizaini;
    this.polizafin = misparam_z.polizafin;
    this.title_z = misparam_z.title;

  }

  closeyes () {
    let resultado = {
      'fechainicial': this.fechaini,
      'fechafinal': this.fechafin,
      'polizaini': this.polizaini,
      'polizafin': this.polizafin,
    }
    this.dialogRef.close(resultado);

  }

  closeno() {
    this.dialogRef.close(false);
  }

}
