import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ClientesService } from '../../services/clientes.service';
import { ConfiguracionService } from '../../services/configuracion.service';
import { Articulo } from '../../models/';
import { Ofertas } from '../../models/';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from '../spinner/spinner.component';
  
@Component({
  selector: 'app-dlgbusarticulo',
  templateUrl: './dlgbusarticulo.component.html',
  styleUrls: ['./dlgbusarticulo.component.css']
})
export class DlgbusarticuloComponent implements OnInit {

  articulos: Articulo[] = [];
  articulo?: Articulo;
  ofertas: Ofertas[] = [];

  codigo_z = "";
  messages_z = "";

  constructor(
    public dialogRef: MatDialogRef<DlgbusarticuloComponent>,
    @Inject(MAT_DIALOG_DATA) public message : string,
    private configuracion: ConfiguracionService,
    private servicioclientes: ClientesService

  ) { }

  ngOnInit(): void {
    this.codigo_z = this.message;
    this.obten_catalogos();
    this.busca_articulos();
  }

  obten_catalogos() {
    this.servicioclientes.buscar_aofertas_json().subscribe(
      respu => {
        this.ofertas = respu;
        //console.log("Ofertas:", this.ofertas);
      }
    );
      
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
          if(this.articulos.length < 2) {
            this.select_articulo(this.articulos[0]);
          }
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

  busca_oferta(codigo: string) {
    let poferta = 0;
    let fechahoy = this.configuracion.fecha_a_str(new Date(), "YYYY-mm-dd");
    const newoferta = this.ofertas.filter((oferta) => oferta.codigo == codigo);
    //console.log("cpvtas compnent Ofertas Filtradas:", newoferta, "codigo", codigo);
    newoferta.forEach( oferta => {
      if(codigo == oferta.codigo) {
        if(fechahoy >= oferta.inioferta && fechahoy <= oferta.finoferta) {
          poferta = oferta.preciooferta;
        }
      }
    });
    //this.alerta("Precio Oferta " + codigo + " " + poferta.toString());
    return (poferta);

  }

}
