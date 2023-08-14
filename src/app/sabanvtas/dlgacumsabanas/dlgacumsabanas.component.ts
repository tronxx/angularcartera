import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ClientesService } from '../../services/clientes.service'
import { ConfiguracionService } from '../../services/configuracion.service';
import { Ubivta } from '../../models/ubivta';


@Component({
  selector: 'app-dlgacumsabanas',
  templateUrl: './dlgacumsabanas.component.html',
  styleUrls: ['./dlgacumsabanas.component.css']
})
export class DlgacumsabanasComponent implements OnInit {
  fecha = "";
  codigoinicial = "";
  codigofinal = "";
  fechainicial_z = "";
  fechafinal_z = "";
  pobini_z = "";
  pobfin_z = "zz";
  diainicial = 0;
  diafinal = 0;
  qomini = "";
  qomfin = "";
  ubicaini = "";
  ubicafin = "";
  tictefin = "";
  ticteini = "";
  tipoventa = "C";
  acumulado = "";
  
  ubica_z? : Ubivta;

  datos = {
    title: ""
  }

  constructor(
    public dialogRef: MatDialogRef<DlgacumsabanasComponent>,
    private servicioclientes: ClientesService,
    private configuracion: ConfiguracionService,
    @Inject(MAT_DIALOG_DATA) public message : string    
  ) { }

  ngOnInit(): void {
    const misparam_z = JSON.parse(this.message);
    this.datos.title = misparam_z.titulo;
    this.ubica_z = misparam_z.ubica;
    const hoy_z = new Date();
    this.fechainicial_z = this.configuracion.fecha_a_str(hoy_z, "YYYY-mm-dd");
    this.fechafinal_z = this.fechainicial_z;
    this.fecha = this.fechainicial_z;
    // console.log("Params", misparam_z);
    
  }

  closeyes () {
    if(this.tipoventa == "Q") { this.qomini = "Q", this.qomfin = "Q" }
    if(this.tipoventa == "C") { this.qomini = "C", this.qomfin = "C" }
    if(this.tipoventa == "T") { this.qomini = "C", this.qomfin = "Q" }
    let resultado = {
      fecha: this.fecha,
      fechainicial: this.fechainicial_z,
      fechafinal: this.fechafinal_z,
      qomini : this.qomini,
      qomfin : this.qomfin,
      ubicaini :this.ubicaini,
      ubicafin : this.ubicafin,
      tictefin : this.tictefin,
      ticteini : this.ticteini,
      acumulado: this.acumulado,
    }
    this.dialogRef.close(resultado);
  }

  closeno() {
    this.dialogRef.close(false);
  }

}
