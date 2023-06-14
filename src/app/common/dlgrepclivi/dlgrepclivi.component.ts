import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ClientesService } from '../../services/clientes.service'
import { ConfiguracionService } from '../../services/configuracion.service';


@Component({
  selector: 'app-dlgrepclivi',
  templateUrl: './dlgrepclivi.component.html',
  styleUrls: ['./dlgrepclivi.component.css']
})
export class DlgrepcliviComponent implements OnInit {
  fecha = "";
  codigoinicial = "";
  codigofinal = "";
  pobini_z = "";
  pobfin_z = "zz";
  diainicial = 0;
  diafinal = 0;

  datos = {
    title: ""
  }

  constructor(
    public dialogRef: MatDialogRef<DlgrepcliviComponent>,
    private servicioclientes: ClientesService,
    private configuracion: ConfiguracionService,
    @Inject(MAT_DIALOG_DATA) public message : string    
  ) { }

  ngOnInit(): void {
    const misparam_z = JSON.parse(this.message);
    this.datos.title = misparam_z.titulo;
    this.diainicial = 1;
    this.diafinal = 31;
    this.codigoinicial = misparam_z.codigoinicial;
    this.codigofinal = misparam_z.codigofinal;
    const hoy_z = new Date();
    const anu = hoy_z.getFullYear();
    const mes = hoy_z.getMonth();
    let mesant_z = new Date (anu.toString() + "/" + mes.toString() + '/' + "01") ;
    mesant_z = this.configuracion.damefindemes(mesant_z);
    this.fecha = this.configuracion.fecha_a_str(mesant_z, "YYYY-mm-dd");
  }

  closeyes () {
    let resultado = {
      fechabase: this.fecha,
      codigoinicial: this.codigoinicial,
      codigofinal: this.codigofinal,
      diainicial: this.diainicial.toString(),
      diafinal: this.diafinal.toString(),
      poblacioninicial: this.pobini_z,
      poblacionfinal: this.pobfin_z
    }
    this.servicioclientes.imprime_repclivi(JSON.stringify(resultado));
    this.dialogRef.close(resultado);
  }

  closeno() {
    this.dialogRef.close(false);
  }



}
