import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ClientesService } from '../../services/clientes.service'
import { ConfiguracionService } from '../../services/configuracion.service';
import { Reltrasp } from '../../models/reltrasp';

@Component({
  selector: 'app-dlgreltrasp',
  templateUrl: './dlgreltrasp.component.html',
  styleUrls: ['./dlgreltrasp.component.css']
})
export class DlgreltraspComponent implements OnInit {

  reltrasp? : Reltrasp;
  reltrasps : Reltrasp[] = [];
  fecha = "";
  datos = {
    title: ""
  }


  constructor(
    public dialogRef: MatDialogRef<DlgreltraspComponent>,
    private servicioclientes: ClientesService,
    private configuracion: ConfiguracionService,
    @Inject(MAT_DIALOG_DATA) public message : string    
  ) { }

  ngOnInit(): void {
    this.cargacatalogo();
    this.datos.title = this.message;
    this.fecha = this.configuracion.fecha_a_str(new Date, "YYYY-mm-dd");
  }

  cargacatalogo() {
    var params_z = {
      modo : "obten_lista_reltrasp"
    }
  
    this.servicioclientes.obtenreltrasp(JSON.stringify(params_z)).subscribe(
      respu => {
        if(respu) {
          this.reltrasps = respu;
        }
      }
    );

  }

  onChangeObj(numrep: any) {
    for(let mirel of this.reltrasps) {
      if(mirel.clave == numrep) {
        this.reltrasp = mirel;
      }
    }

  }
  
  closeyes () {
    let clavetrasp = "-1";
    if(this.reltrasp) {
      clavetrasp = this.reltrasp.clave;

    }
    let resultado = {
      "numeroreporte": clavetrasp,
      "fecha": this.fecha
    }
    this.dialogRef.close(resultado);
  }

  closeno() {
    this.dialogRef.close(false);
  }


}
