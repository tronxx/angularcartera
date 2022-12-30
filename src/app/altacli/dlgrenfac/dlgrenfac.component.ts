import { Component, OnInit, Inject, Input } from '@angular/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { ClientesService } from '../../services/clientes.service'
import { FormsModule, FormControl } from '@angular/forms';
import { formatNumber,  CommonModule,  CurrencyPipe, formatCurrency, formatDate, DatePipe } from '@angular/common';
import { isEmpty } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
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
import { Ofertas } from '../../models';
import { Factorvtacred } from '../../models';
import { Tabladesctocont } from '../../models';
import { Tarjetatc } from '../../models/tipostarjetastc';
import { SpinnerComponent } from '../../common/spinner/spinner.component';

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
  datoshabilitados = true;
  ticte = "";
  qom = "";
  nlets = 0;
  tarjeta = "";
  ubica_z = "";
  linea_z = "";
  
  nuevorenfac = {
    renfac: this.renfac,
    esmoto: "",
    piva: 16,
    linea: "",
    seriemotor: "",
    pedimento: "",
    aduana: "",
    oferta: "",
    marca: ""
  };

  pedirserie = false;
  editdescri = false;
  seriemanual = false;
  conoferta = "S";
  almacen = "";
  noescomplementodatos_z = false;
  factortvtacrd? : Factorvtacred;
  factoresvtacrd: Factorvtacred[] = [];
  tabladesctocont? : Tabladesctocont;
  tabladesctoscont : Tabladesctocont[] = [];
  tarjetastc : Tarjetatc[] = [];
  tarjetatc?: Tarjetatc;
  ofertas: Ofertas[] = [];

  constructor(
    public dialog: MatDialog, public dialogRef: MatDialogRef<DlgrenfacComponent>,
    @Inject(MAT_DIALOG_DATA) public message : string,
    private configuracion: ConfiguracionService,
    private servicioclientes: ClientesService

  ) { }

  ngOnInit(): void {
    this.renfac.canti = 1;
    let datosparam = JSON.parse(this.message);
    this.noescomplementodatos_z = true;
    console.log("No es complemento datos:", datosparam.noescomplementodatos);
    
    if(datosparam.escomplementodatos == "SI" ) {
      this.noescomplementodatos_z = false;
    }
    this.carga_ofertas();
    this.nuevorenfac.renfac.codigo = datosparam.codigo;
    this.nuevorenfac.renfac.folio = datosparam.folio;
    this.nuevorenfac.renfac.serie = datosparam.serie;
    this.nuevorenfac.esmoto = datosparam.esmoto;
    this.nuevorenfac.seriemotor = datosparam.seriemotor;
    this.nuevorenfac.pedimento = datosparam.pedimento;
    this.nuevorenfac.aduana = datosparam.aduana;
    this.nuevorenfac.marca = datosparam.marca;
    this.ticte = datosparam.ticte;
    this.qom = datosparam.qom;
    this.nlets = datosparam.nulets;
    this.tarjeta = datosparam.tarjeta;
    this.ubica_z = datosparam.ubica_z;

    if(datosparam.codigo) this.busca_articulo();
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
        this.linea_z = "";
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
    let proferta = 0;
    if(this.articulo) {
      this.renfac.codigo = this.articulo.codigo;
      this.renfac.concepto = this.articulo.descri;
      this.renfac.preciou = this.articulo.preciou;
      this.linea_z = this.articulo.linea;
      this.nuevorenfac.oferta = "N";
      if (this.ticte == "CC" ) {
        proferta = this.busca_oferta (this.articulo.codigo);
        if(proferta > 0) {
          this.nuevorenfac.oferta = "S";
          this.nuevorenfac.renfac.preciou = proferta;
        } else {
          let tasadecto = this.buscar_tasa_descto_cont(this.linea_z, this.ticte, this.tarjeta);
          this.nuevorenfac.renfac.preciou *= (1 - (tasadecto / 100) );
        }
      }
      if(this.ticte == "TC") {
        let tasadecto = this.buscar_tasa_descto_cont(this.linea_z, this.ticte, this.tarjeta);
        this.nuevorenfac.renfac.preciou *= (1 - (tasadecto / 100) );
      }
      this.nuevorenfac.renfac.preciou = Math.round(this.nuevorenfac.renfac.preciou);

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

  buscar_tasa_descto_cont(milinea: string, ticte: string, cvetarjetatc: string)
  {
    let tasa = -1;
    let plazo = 0;
    if(milinea != "MOTO") milinea = "GRAL";
    if(ticte == "TC") {
      this.tarjetastc.forEach( rentabla => {
        if(cvetarjetatc == rentabla.clave) {
          plazo = rentabla.plazo;
        }
      });
    }
    let mistablasdescto = this.tabladesctoscont;
    mistablasdescto.forEach(rentabla => {
      if(ticte == rentabla.tipo && milinea == rentabla.linea && plazo == rentabla.plazo) {
          tasa = rentabla.descto;
        }
    });

    return (tasa);

  }  

  busca_factor_vtacrd(nulets: number) : number {
    let factor = 0;
    this.factoresvtacrd.forEach(element => {
      if(element.plazo == nulets) {
        factor = element.factor;
      }
    });
    return (factor);

  }

  busca_tipos_tarjetas() {
 
  }
  

  verstatus() {
    this.seriemanual = !this.seriemanual;
    //console.log("Estatus seriemanual:", this.seriemanual);
    
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

  carga_ofertas(){
    this.servicioclientes.buscar_aofertas_json().subscribe(
      respu => {
        this.ofertas = respu;
      }
    );
    this.servicioclientes.obtenfactorvtacrd().subscribe(
      respu => {
        this.factoresvtacrd = respu;
      }
    );
    this.servicioclientes.obtentabladesctocont().subscribe(
      respu => {
        this.tabladesctoscont = respu;
      }
    );
    let params_z = {
      modo : "buscar_tarjetas_tc",
      ubiage : this.ubica_z,
      ticte: this.ticte
    }
    this.servicioclientes.buscar_tarjetas_tc(JSON.stringify(params_z)).subscribe(
      respu => {
        this.tarjetastc = respu;
      }
    );
      
  }

  busca_oferta(codigo: string):number {
    let poferta = 0;
    if (this.qom == "C") {
      let fechahoy = this.configuracion.fecha_a_str(new Date(), "YYYY-mm-dd");
      this.ofertas.forEach( oferta => {
        if(codigo == oferta.codigo) {
          if(fechahoy >= oferta.inioferta && fechahoy <= oferta.finoferta) {
            poferta = oferta.preciooferta;
          }
        }
      });
    }
    return (poferta);

  }
  

  formularioEnviado() {}

}
