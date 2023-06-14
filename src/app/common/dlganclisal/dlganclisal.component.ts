import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ClientesService } from '../../services/clientes.service'
import { ConfiguracionService } from '../../services/configuracion.service';


@Component({
  selector: 'app-dlganclisal',
  templateUrl: './dlganclisal.component.html',
  styleUrls: ['./dlganclisal.component.css']
})

export class DlganclisalComponent implements OnInit {
  fechainicial = "";
  fechafinal = "";
  codigoinicial = "";
  codigofinal = "";
  pobini_z = "";
  pobfin_z = "zz";

  datos = {
    title: ""
  }

  constructor(
    public dialogRef: MatDialogRef<DlganclisalComponent>,
    private servicioclientes: ClientesService,
    private configuracion: ConfiguracionService,
    @Inject(MAT_DIALOG_DATA) public message : string    
  ) { }

  ngOnInit(): void {
    const misparam_z = JSON.parse(this.message);
    this.datos.title = misparam_z.titulo;
    this.codigoinicial = misparam_z.codigoinicial;
    this.codigofinal = misparam_z.codigofinal;
    let mesant_z = this.configuracion.SumaDiasaFecha(new Date (), -30);
    
    const anu =mesant_z.getFullYear();
    const mes = mesant_z.getMonth();
    mesant_z = new Date (anu.toString() + "/" + mes.toString() + '/' + "01") 
    this.fechainicial = this.configuracion.fecha_a_str(mesant_z, "YYYY-mm-dd");
    mesant_z = this.configuracion.damefindemes(mesant_z);
    this.fechafinal = this.configuracion.fecha_a_str(mesant_z, "YYYY-mm-dd");
  }

  closeyes () {
    let resultado = {
      fechainicial: this.fechainicial,
      fechafinal: this.fechafinal,
      codigoinicial: this.codigoinicial,
      codigofinal: this.codigofinal,
      poblacioninicial: this.pobini_z,
      poblacionfinal: this.pobfin_z
    }
    this.servicioclientes.imprime_analitico_clientes_saldados(JSON.stringify(resultado));
    this.dialogRef.close(resultado);
  }

  closeno() {
    this.dialogRef.close(false);
  }



}
