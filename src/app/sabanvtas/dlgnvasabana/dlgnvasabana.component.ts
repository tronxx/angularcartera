import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ClientesService } from '../../services/clientes.service'
import { ConfiguracionService } from '../../services/configuracion.service';
import { Ubivta } from '../../models/ubivta';


@Component({
  selector: 'app-dlgnvasabana',
  templateUrl: './dlgnvasabana.component.html',
  styleUrls: ['./dlgnvasabana.component.css']
})

export class DlgnvasabanaComponent implements OnInit {
  fecha = "";
  codigoinicial = "";
  codigofinal = "";
  fechainicial_z = "";
  fechafinal_z = "";
  pobini_z = "";
  pobfin_z = "zz";
  diainicial = 0;
  diafinal = 0;
  ubica_z? : Ubivta;

  datos = {
    title: ""
  }

  constructor(
    public dialogRef: MatDialogRef<DlgnvasabanaComponent>,
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
    let resultado = {
      fecha: this.fecha,
      fechainicial: this.fechainicial_z,
      fechafinal: this.fechafinal_z,
      ubicacion: this.ubica_z?.ubica,
    }
    this.dialogRef.close(resultado);
  }

  closeno() {
    this.dialogRef.close(false);
  }

}
