import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service'
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { MatIconModule } from '@angular/material/icon'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiguracionService } from '../services/configuracion.service';
import { Factura } from '../models';
import { Renfacfo } from '../models';
import { Cliente } from '../models/clientes';
import { Ubivta } from '../models/ubivta';
import { Promotor } from '../models/promotor';
import { Nulets } from '../models/nulets';
import { Poblacs } from '../models/poblacs';
import { Tarjetatc } from '../models/tipostarjetastc';
import { Factorvtacred } from '../models';
import { Tabladesctocont } from '../models';
import { Articulo } from '../models';
import { Ofertas } from '../models';

import { DlgDatosvtaComponent } from './dlg-datosvta/dlg-datosvta.component';
import { DlgrenfacComponent } from '../altacli/dlgrenfac/dlgrenfac.component';
import { DlgbusarticuloComponent } from '../common/dlgbusarticulo/dlgbusarticulo.component';

interface Nvorenfac {
  id: number;
  codigo: string;
  concepto: string;
  canti: number;
  precionormal: number;
  preciou: number;
  esmoto: string;
  piva: number;
  linea: string;
  esoferta: boolean;
  proferta: number;
  factorvtacred: number;
  tasadescto: number;
  importe: number;
  iva: number;
};


@Component({
  selector: 'app-capvtas',
  templateUrl: './capvtas.component.html',
  styleUrls: ['./capvtas.component.css']
})
export class CapvtasComponent implements OnInit {

  factura? : Factura;
  cliente? : Cliente;
  renfacfo : Renfacfo[] = [];
  renfac: Renfacfo = <Renfacfo> {}
  ubivta : Ubivta[] = [];
  nulets : Nulets[] = [];
  tarjetastc : Tarjetatc[] = [];
  tarjetatc?: Tarjetatc;
  factortvtacrd? : Factorvtacred;
  factoresvtacrd: Factorvtacred[] = [];
  tabladesctocont? : Tabladesctocont;
  tabladesctoscont : Tabladesctocont[] = [];
  articulo? : Articulo;
  ofertas: Ofertas[] = [];
 

  codcli_z = "";
  idcli = 0;
  idfac = 0;
  cargoscli_z = 0;
  servic_z = 0;
  preciolista_z =  0;
  prodfin_z = 0;
  fechavta = ""
  escerrada = false;
  fechacierre_z = new Date();
  fechacorrecta_z = false;
  strfeccierre_z = "";
  linkcliente = "";
  msgerror_z = "";
  clientecred = false;
  rotarfac = false;
  nomcli = "";
  vtatc = true;
  mitarjetatc = "";
  contarjetatc = false;
  escredito = false;
  qom = "C";
  ticte = "CC";
  ubica = "AC";
  antubica = this.ubica;
  nulet = 0;
  enganche = 0;
  totimporte  = 0;
  totiva  = 0;
  tottotal = 0;
  totprodfin = 0;
  totgral = 0;
  preciolet = 0;
  factorlet = 0;
  descto = 0;
  factordscto = 0;
  linea_z = "";
  oferta = false;
  proferta = 0;
  hayerror = false;
  articuloscotizados : Nvorenfac[] = [];
  articulocotizado?: Nvorenfac;
  esvalido=false;
  
  tictes_z = [
    { clave:"PC", descri:"PRIMER CREDITO"},
    { clave:"AR", descri:"AVAL CON REFERENCIAS"},
    { clave:"CR", descri:"CLIENTE CON REFERENCIAS"},
    { clave:"CC", descri:"CLIENTE DE CONTADO"},
    { clave:"TC", descri:"TARJETA CREDITO"}

  ]

  tipoqom = [
    { clave:"C", descri:"Contado"},
    { clave:"Q", descri:"Quincenal"}
  ]


  constructor(
    public dialog: MatDialog, 
    private configuracion: ConfiguracionService,
    private servicioclientes: ClientesService,
    private route : ActivatedRoute,
    private miroute: Router

  ) { }

  ngOnInit(  ): void {
    this.inicializa();
  }

  inicializa() {
    this.obtencatalogos();
    this.cliente = <Cliente> {};
    let mistorage_z  = localStorage.getItem('capvtas') || "{}";
    let usrreg_z =  JSON.parse(mistorage_z);
    this.ubica = usrreg_z.ubicacion;
    this.antubica = this.ubica;
  }
  
  editar_factura() {

  }

  cerrar_factura() {

  }

  imprimir_factura() {

  } 

  validar_fecha_cierre() {

  }

  agregar_renfac() {
    const dialogmov = this.dialog.open(DlgbusarticuloComponent, {
      width:'700px',
      data: ""
    });
    let piva = 16;
    let proferta = 0;
    dialogmov.afterClosed().subscribe(res => {
      if (res) {
        console.log("Linea: ", this.linea_z, " Res.linea:", res.linea);
        if((res.linea == "MOTO" && this.linea_z !="") || this.linea_z == "MOTO") {
          this.alerta("La Linea Moto no se puede mezclar");
        } else {
          this.linea_z = res.linea;
          this.articulo = res;
          let idren = this.articuloscotizados.length;
          this.articulocotizado = <Nvorenfac> {};
          this.articulocotizado.codigo = res.codigo;
          this.articulocotizado.id = idren;
          this.articulocotizado.canti = 1;
          this.articulocotizado.precionormal = res.preciou;
          this.articulocotizado.piva = piva;
          this.articulocotizado.preciou = res.preciou / (piva / 100 + 1);
          this.articulocotizado.concepto = res.descri;
          this.articulocotizado.linea = this.linea_z;
          this.articulocotizado.proferta = 0;
          this.articulocotizado.factorvtacred = 0;
          this.articulocotizado.tasadescto = 0;
          this.articulocotizado.proferta = this.busca_oferta(res.codigo);
  
          if(this.articulocotizado.proferta) {
            this.articulocotizado.esoferta = true;
          } else {
            this.articulocotizado.esoferta = false;
          }
          if(this.ticte == "CC" && this.articulocotizado.esoferta ) {
              this.oferta = true;
              this.articulocotizado.importe = this.articulocotizado.proferta / (piva / 100 + 1);
          } else {
              this.oferta = false;
              this.articulocotizado.importe = this.articulocotizado.precionormal / (piva / 100 + 1);
          }
          this.articulocotizado.iva = this.articulocotizado.importe * piva / 100;
  
          this.articuloscotizados.push(this.articulocotizado);
          //console.log("Nuevorenfac:", this.articulocotizado);
          //console.log("Articulos Cotizados:", this.articuloscotizados);
          
          this.calcular_totales();
  
        }
      }
    });
  
  
  }

  busca_oferta(codigo: string) {
    let poferta = 0;
    let fechahoy = this.configuracion.fecha_a_str(new Date(), "YYYY-mm-dd");
    this.ofertas.forEach( oferta => {
      if(codigo == oferta.codigo) {
        if(fechahoy >= oferta.inioferta && fechahoy <= oferta.finoferta) {
          poferta = oferta.preciooferta;
        }
      }
    });
    return (poferta);

  }

  calcular_totales() {
    this.totimporte = 0;
    this.totiva = 0;
    let plazotc = 0;
    let importe = 0;
    let iva = 0;
    let factoroferta = 0;
    let hayoferta = false;
    this.hayerror = false;

    let ii_z =0;
    let milinea = "";
    this.esvalido=false;
    if(this.ticte == "TC") {
      this.tarjetastc.forEach( rentabla => {
        if(this.mitarjetatc  == rentabla.clave) {
          plazotc = rentabla.plazo;
        }
      });
    }
    this.oferta = false;
    if((this.ticte == "TC" && plazotc == 0)  || this.ticte == "CC") this.oferta = true;
    if(this.ticte == "TC" && plazotc == 0) {
      factoroferta = 2;
    }

    this.articuloscotizados.forEach(miren => {
      ii_z = miren.id;
      if(miren.esoferta && this.oferta) {
        hayoferta = true;
        importe = miren.proferta * (1 + factoroferta /100 ) / (miren.piva / 100 + 1);
      } else {
        importe = miren.precionormal  / (miren.piva / 100 + 1);
      }
      iva =  importe * (miren.piva / 100);
      this.articuloscotizados[ii_z].importe = importe;
      this.articuloscotizados[ii_z].iva = iva;
      this.totimporte += importe;
      this.totiva +=  iva;
      milinea = miren.linea;
    });
    this.tottotal = Math.round((this.totimporte + this.totiva) * 100 ) / 100;
    this.totgral = this.tottotal;
    this.descto = 0;
    if(this.escredito) {
      this.preciolet = 0;
      if(this.nulet == 0) { 
        this.nulet = 1;
      }
      this.factorlet  = this.busca_factor_vtacrd(this.nulet);
      if(!this.factorlet) this.factorlet = 1 / this.nulet;
      this.preciolet = Math.ceil(((this.tottotal - this.enganche) * this.factorlet));
      this.totgral = this.enganche +  (this.preciolet * this.nulet);
      this.totprodfin = this.totgral - this.tottotal;
    } else {
      this.factordscto = this.buscar_tasa_descto_cont(milinea, this.ticte, this.mitarjetatc);
      if(this.factordscto == -1 ) {
        this.hayerror = true;
        this.msgerror_z = "Forma de Pago Invalida";
      } else {
        if(!hayoferta) {
          this.descto = this.tottotal * this.factordscto / 100;
          this.totgral = this.tottotal - this.descto;
        }
      }
    }
    if(!this.hayerror && this.totgral > 1) this.esvalido=true;
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

  eliminar_renfac(mirenfac: Nvorenfac) {
    let idren = mirenfac.id;
    const dialogref = this.dialog.open(DialogBodyComponent, {
      width:'350px',
      data: 'Seguro de Eliminar Renglon: ' + mirenfac.codigo + 
      " " + mirenfac.concepto
    });
    dialogref.afterClosed().subscribe(res => {
      if(res) {
        this.linea_z = "";
        let miotrorenfac : Nvorenfac[] = [];
        this.articuloscotizados.forEach(miren => {
           if(miren.id != idren) {
             miotrorenfac.push(miren);
             this.linea_z = miren.linea;
           }
           this.articuloscotizados = miotrorenfac;
        });
        this.calcular_totales();
      }
    });
  
  } 

  busca_factura() {
    var params_z = {
      modo : "buscar_cli_facturas",
      idcli : this.idcli
    }
    console.log("Debug: Estoy en busca_factura ", this.idcli);
    this.servicioclientes.busca_factura_altas(JSON.stringify(params_z)).subscribe(
      respu => {
        if(respu) {
          this.factura = respu[0];
          if(this.factura) {
            this.idfac = this.factura.idfac;
            this.busca_renfacfo(this.factura.idfac);
            this.prodfin_z = ( this.preciolista_z * ( 16 / 100 + 1 )) -  this.servic_z;
            this.prodfin_z = Math.round (this.cargoscli_z - this.prodfin_z);
            if(this.prodfin_z < 0) this.prodfin_z = 0;
            this.factura.prodfin = this.prodfin_z;
            this.escerrada = ( this.factura.status == "C");
            this.strfeccierre_z = this.factura.fecha;
            this.validar_fecha_cierre();
          }
        }
      }
    );
  }
  
  subir_renfac(mirenfac: Nvorenfac) {
  }
  
  busca_renfacfo(idfacfon_z : number) {
    var params_z = {
      modo : "buscar_renfac",
      idfacfon : idfacfon_z
    }
    console.log("Debug: Estoy en busca_renfacfo ", idfacfon_z);
    this.servicioclientes.busca_renfac_altas(JSON.stringify(params_z)).subscribe(
      respu => {
        if(respu) {
          this.renfacfo = respu;
        } 
      }
    );
}

alerta(mensaje: string) {
  const dialogref = this.dialog.open(DialogBodyComponent, {
    width:'350px',
    data: mensaje
  });
  dialogref.afterClosed().subscribe(res => {
    //console.log("Debug", res);
  });

}

crear_factura() {
  let params_z = {
    fechavta: this.fechavta,
    factura:  <Factura> { },
    ubiage: this.ubica,
    modo: "NUEVO"
  }
  params_z.factura.idcli = this.idcli;
  params_z.factura.idfac = -1;
  const dialogmov = this.dialog.open(DlgDatosvtaComponent, {
    width:'700px',
    data: JSON.stringify(params_z)
  });
  dialogmov.afterClosed().subscribe(res => {
    if (res) {
      let params_z = {
        modo:"NUEVOx",
        idcli:this.idcli,
        factura:res
      }
      this.servicioclientes.crear_factura_altas(JSON.stringify(params_z)).subscribe( resalta=> {

        if(resalta.status == "OK") {
          this.busca_factura();
        } else {
          this.alerta("Error:" + resalta.error);
          console.log("Debug: Error", resalta);
        }
      });

    }
  });

}

obtencatalogos() {
  let params_z = {
    modo : "buscar_cartas_promo"
  }

  params_z.modo = "buscar_ubicacion_ventas";
  this.servicioclientes.obtenubivta(JSON.stringify(params_z)).subscribe(
    respu => {
      this.ubivta = respu;
    }
  );
  this.buscanulets();
  this.servicioclientes.buscar_aofertas_json().subscribe(
    respu => {
      this.ofertas = respu;
    }
  );
  this.buscanulets();
  
}

buscanulets() {
  let paramsnulet_z = {
    modo :"buscar_nulets_activo",
    qom : "Q"
  }
  this.servicioclientes.obtennulets(JSON.stringify(paramsnulet_z)).subscribe(
    respu => {
      this.nulets = respu;
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

}

selecciona_tarjetas_tc() {
  this.esvalido = false;
  this.qom = "C";
  this.escredito = false;
  this.nulet = 0;
  let capvtas = {
    "ubicacion": this.ubica
  };
  if(this.antubica != this.ubica) {
    localStorage.setItem("capvtas", JSON.stringify( capvtas));
    this.antubica = this.ubica;
  }
  
  if(this.ticte == "TC") {
    this.contarjetatc = true;
    this.busca_tipos_tarjetas();
  } else {
    this.contarjetatc = false;
    if(this.ticte != "CC" && this.ticte != "FR") {
      this.escredito = true;
      this.qom = "Q";
    }
  }
  this.calcular_totales();
}

busca_tipos_tarjetas() {
  let tarjetaspermitidas : Tarjetatc[] = [];
  let mistablasdescto = this.tabladesctoscont;
  let plazomax = 0;

  let params_z = {
    modo : "buscar_tarjetas_tc",
    ubiage : this.ubica,
    ticte: this.ticte
  }
  if(this.linea_z != "MOTO") this.linea_z = "GRAL";
  mistablasdescto.forEach(rentabla => {
    if(this.linea_z == rentabla.linea && plazomax < rentabla.plazo) {
        plazomax = rentabla.plazo;
      }
  });
  this.tarjetastc = [];
  console.log("Plazo Max:", plazomax, " Linea:", this.linea_z);
  
  this.servicioclientes.buscar_tarjetas_tc(JSON.stringify(params_z)).subscribe(
    respu => {
      if(respu) {
        respu.forEach(mitc => {
          if(mitc.plazo <= plazomax) {
            console.log("Agregando Tarjetas:", mitc);
            this.tarjetastc.push(mitc);
          }
        });
      }
    }
  );

}

aceptar() {
  this.calcular_totales();
  if(this.hayerror) {
    this.alerta("Verifique los datos");
    return(-1);
  }
  return(1);

}

regresar() {

}

}
