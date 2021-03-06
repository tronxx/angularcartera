import { Component, OnInit, Inject, Input } from '@angular/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { ClientesService } from '../../services/clientes.service'
import { FormsModule, FormControl } from '@angular/forms';
import { formatNumber,  CommonModule,  CurrencyPipe, formatCurrency, formatDate, DatePipe } from '@angular/common';
import { isEmpty } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card'; 
import { MatTabsModule } from '@angular/material/tabs';
import { DialogBodyComponent } from '../../dialog-body/dialog-body.component';
import { DlgbuscliComponent } from '../../common/dlgbuscli/dlgbuscli.component';
import { MatIconModule } from '@angular/material/icon'; 
import { Movclis } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConfiguracionService } from '../../services/configuracion.service';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Factura } from '../../models';
import { Renfacfo } from '../../models';
import { Articulo } from '../../models';
import { Serie } from '../../models';
import { DlgbusarticuloComponent } from '../../common/dlgbusarticulo/dlgbusarticulo.component';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-dlgrenfac',
  templateUrl: './dlgrenfac.component.html',
  styleUrls: ['./dlgrenfac.component.css']
})
export class DlgrenfacComponent implements OnInit {

  myControl = new FormControl();
  renfac: Renfacfo = <Renfacfo> {}
  articulo? : Articulo;
  serie?: Serie;
  series : Serie[] = [];
  esmoto = false;
  serievalida = true;
  seriemotorvalida = true;
  renfacvalido = true;
  yabusqueinven = false;
  datoshabilitados = false;
  
  nuevorenfac = {
    renfac: this.renfac,
    esmoto: "",
    piva: 16,
    linea: "",
    seriemotor: "",
    pedimento: "",
    aduana: "",
    marca: ""
  };

  pedirserie = false;
  editdescri = false;
  seriemanual = false;
  almacen = "";

  constructor(
    public dialog: MatDialog, public dialogRef: MatDialogRef<DlgrenfacComponent>,
    @Inject(MAT_DIALOG_DATA) public message : string,
    private configuracion: ConfiguracionService,
    private servicioclientes: ClientesService

  ) { }

  ngOnInit(): void {
    this.renfac.canti = 1;
    let datosparam = JSON.parse(this.message);
  }

  closeyes() {
    console.log("Cerrando dlgrenfac:", this.nuevorenfac);
    this.dialogRef.close(this.nuevorenfac);
  }

  closeno() {
    this.dialogRef.close(false);
  }

  busca_articulo() {
      var params_z = {
        modo : "buscar_codigo_inven",
        codigo : this.renfac.codigo
      }
      console.log("Debug: Estoy en busca_articulo ", this.renfac.codigo);
      this.yabusqueinven = true;
      this.esmoto = false;
      this.editdescri = false;
      this.pedirserie = false;
      if(this.renfac.codigo == "AUXILIAR") {
        this.datoshabilitados = true;
        this.articulo = <Articulo> {};
        this.articulo.codigo=this.renfac.codigo;
        this.articulo.tipo = "GLO";
        this.editdescri = true;
        this.pedirserie = false;
      } else {
        this.servicioclientes.busca_codigo_inven(JSON.stringify(params_z)).subscribe(
          respu => {
            if(respu) {
              this.articulo = respu;
              this.definir_propiedades_articulo();
            } else {
              this.selecciona_codigo_inven();
            }
          } 
        );
  
      }
  }

  definir_propiedades_articulo() {
    if(this.articulo) {
      this.renfac.codigo = this.articulo.codigo;
      this.renfac.concepto = this.articulo.descri;
      this.renfac.preciou = this.articulo.preciou;
      this.nuevorenfac.linea = this.articulo.linea;
      this.datoshabilitados = true;
      this.nuevorenfac.esmoto = "N";
      if(this.articulo.linea == "MOTO") {
        this.esmoto = true;
        this.seriemanual = true;
        this.pedirserie = true;
        this.series = [];
      } else {
        this.esmoto = false;
        this.pedirserie = false;
        if(this.articulo.tipo == "ALF") {
          this.pedirserie = true;
          this.selecciona_serie();
          this.seriemotorvalida = true;
          this.serievalida = true;
          this.seriemanual = false;
        } 
      }
      if(this.esmoto) this.nuevorenfac.esmoto = "S";

    }

  }

  verstatus() {
    this.seriemanual = !this.seriemanual;
    console.log("Estatus seriemanual:", this.seriemanual);
    
  }

  selecciona_codigo_inven() {
    const dialogref = this.dialog.open(DlgbusarticuloComponent, {
      width:'650px',
      data: this.renfac.codigo
    });
    dialogref.afterClosed().subscribe(res => {
      if (res) {
        this.articulo = res;
        this.definir_propiedades_articulo();
      }
      console.log("Debug: Regrese de busqueda Articulo", res);
    });
  }

  selecciona_serie() {
    let params_z = {
      modo : "buscar_inven_todas_series",
      codigo : this.renfac.codigo,
      almacen: '%'
    }
  this.servicioclientes.busca_series_disponibles(JSON.stringify(params_z)).subscribe(
      respu => {
        if(respu) {
          this.series = respu;
        }
      }
    );

  }

  valida_serie() {
    if(this.articulo) {
      if(this.articulo.linea == "MOTO") this.valida_serie_moto();
    } else {
      this.serievalida = true;
    }
  }

  valida_serie_moto() {
    var params_z = {
      codigo: this.nuevorenfac.renfac.codigo,
      serie: this.nuevorenfac.renfac.serie,
      seriemotor: this.nuevorenfac.seriemotor
    }
    this.serievalida = false;
    console.log("Debug: Estoy en busca_articulo_serie_moto", params_z);
    this.servicioclientes.busca_serie_moto(JSON.stringify(params_z)).subscribe(
      respu=> {
        this.serie = respu;
        this.serievalida = true;
        this.nuevorenfac.pedimento = this.serie.pedimento;
        this.nuevorenfac.aduana = this.serie.aduana;
        this.nuevorenfac.marca = this.serie.marca;
      }
    );
  }

  valida_serie_motor_moto() {
    if(this.serie) {
      this.seriemotorvalida = (this.nuevorenfac.seriemotor == this.serie.seriemotor);
    } else {
      this.seriemotorvalida = false;
    }

  }

  formularioEnviado() {}

}
