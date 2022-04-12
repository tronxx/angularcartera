import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ClientesService } from '../../services/clientes.service';
import { Articulo } from '../../models/articulo';
import { MatIconModule } from '@angular/material/icon/icon-module';

@Component({
  selector: 'app-dlgbusarticulo',
  templateUrl: './dlgbusarticulo.component.html',
  styleUrls: ['./dlgbusarticulo.component.css']
})
export class DlgbusarticuloComponent implements OnInit {

  articulos: Articulo[] = [];
  articulo?: Articulo;
  codigo_z = "";
  messages_z = "";

  constructor(
    public dialogRef: MatDialogRef<DlgbusarticuloComponent>,
    @Inject(MAT_DIALOG_DATA) public message : string,
    private servicioclientes: ClientesService

  ) { }

  ngOnInit(): void {
    this.codigo_z = this.message;
    this.busca_articulos();
  }

  busca_articulos() {
    var params_z = {
      modo : "buscar_inven_varios_codigos",
      codigo: this.codigo_z
    }
    this.messages_z = "";
    console.log("Debug: busca_articulos ", params_z);
    this.servicioclientes.busca_varios_codigos_inven(JSON.stringify(params_z)).subscribe(
      respu => {
        if(respu.length > 0) {
          this.articulos = respu;
        } else {
          this.messages_z = "No hay Articulos que coincidan";
          console.log("Debug: No hay Articulos que coincidan:", this.codigo_z);
        }
      }
    )

  }

  select_articulo(articulosel: Articulo ) {
    this.articulo = articulosel;
    this.codigo_z = this.articulo.codigo;
  }

  closeyes() {
    this.dialogRef.close(this.articulo);
  }

  closeno() {
    this.dialogRef.close(false);
  }


}
