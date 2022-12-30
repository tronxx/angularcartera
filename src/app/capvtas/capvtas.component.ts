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
import { Vendedor } from '../models/vendedor';

import { DlgDatosvtaComponent } from './dlg-datosvta/dlg-datosvta.component';
import { DlgrenfacComponent } from '../altacli/dlgrenfac/dlgrenfac.component';
import { DlgbusarticuloComponent } from '../common/dlgbusarticulo/dlgbusarticulo.component';
import { DatossolicitComponent } from '../altacli/datossolicit/datossolicit.component';
import { DlgdatosfacturaComponent  } from '../altacli/dlgdatosfactura/dlgdatosfactura.component';
import { SpinnerComponent } from '../common/spinner/spinner.component';

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
  seriemotor: string,
  pedimento: string,
  aduana: string,
  marca: string,
  serie: string,
  folio: number
};


@Component({
  selector: 'app-capvtas',
  templateUrl: './capvtas.component.html',
  styleUrls: ['./capvtas.component.css']
})
export class CapvtasComponent implements OnInit {

  vendedores : Vendedor[] = [];
  vendedor? : Vendedor;
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
  

  codcartera_z = "";
  antcod_z = "";
  codcli_z = "";
  codigo_z = "";
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
  codvnd = "";
  antvnd = "-1";
  hayerror = false;
  yapedidatos = false;
  articuloscotizados : Nvorenfac[] = [];
  articulocotizado?: Nvorenfac;
  esvalido=false;
  esmoto = "S";
  datosfactura_z = "";
  nvoclistatus = "*";
  anterstatus = "*";
  statuscli = [
    { clave:"*", descri:"Status1"},
    { clave:"", descri:"Status2" }

  ]

  
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
    private route : Router

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
    this.codvnd = usrreg_z.codvnd;
    this.codcartera_z = usrreg_z.codcartera;
    this.antubica = this.ubica;
    this.antcod_z = this.codcartera_z;
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
    console.log("El codigo es", this.codigo_z);
    
    const dialogmov = this.dialog.open(DlgbusarticuloComponent, {
      width:'700px',
      data: this.codigo_z
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

  verficar_cambio_status() {
    if(this.nvoclistatus != this.anterstatus ) {
      this.yapedidatos = false;
      this.anterstatus = this.nvoclistatus;
    }

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
      this.preciolet = Math.round(((this.tottotal - this.enganche) * this.factorlet));
      this.totgral = this.enganche +  (this.preciolet * this.nulet);
      this.totprodfin = this.totgral - this.tottotal;
    } else {
      this.factordscto = this.buscar_tasa_descto_cont(milinea, this.ticte, this.mitarjetatc);
      if(this.factordscto == -1 ) {
        this.hayerror = true;
        this.msgerror_z = "Forma de Pago Invalida";
      } else {
        if(!hayoferta) {
          this.descto = Math.floor(this.tottotal * this.factordscto / 100);
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
  // Voy a Agregar la lista de los vendedores
  params_z = {
    modo:"buscar_agentes"
  }
  this.servicioclientes.buscar_agentes(JSON.stringify(params_z)).subscribe(
    respu => {
      this.vendedores = respu;
    }

  );

  
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

grabar_datos_venta() {
  console.log("Estoy en grabar_datos_venta()");
  
  if( this.antubica != this.ubica || 
      this.antvnd != this.codvnd || 
      this.antcod_z != this.codcartera_z
  )  {
    let capvtas = {
      "ubicacion": this.ubica,
      "codvnd": this.codvnd,
      "codcartera": this.codcartera_z
    };
    localStorage.setItem("capvtas", JSON.stringify( capvtas));
    this.antubica = this.ubica;
    this.antvnd = this.codvnd;
    this.antcod_z = this.codcartera_z;
  }

}
selecciona_tarjetas_tc() {
  this.esvalido = false;
  this.qom = "C";
  this.escredito = false;
  this.nulet = 0;
  this.grabar_datos_venta();
  
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
  this.pide_datos_cliente();

  return(1);

}

async pide_datos_cliente() {
  if(this.ticte == "CC" || this.ticte == "TC") {
     this.enganche = this.totgral;
  }
  let params_z = {
    codigo: this.codcartera_z + this.configuracion.fecha_a_str(new Date(), "yymmdd") + "99",
    ticte: this.ticte,
    ubica: this.ubica,
    enganche: this.enganche,
    status:this.nvoclistatus
  }
  const dialogmov = this.dialog.open(DlgDatosvtaComponent, {
    width:'700px',
    data: JSON.stringify(params_z)
  });
  dialogmov.afterClosed().subscribe(async res => { 
    // Aqui ya tengo los datos del Cliente, y total P.Lista
    // y total Cargos y QOM/TC
    try {
      let mifac_z = JSON.parse(this.datosfactura_z);
      res.clienterespu.factura = mifac_z.numero;
      res.clienterespu.status = this.nvoclistatus;
      const respu = await this.grabar_cliente(JSON.stringify(res));
      let idcli = respu.idcli;
      this.alerta("Se ha agregado al cliente" + idcli.toString());
    } catch {
    }

  });

}

acompletar_datos_renfac(renfac: Nvorenfac){
  console.log("acompletar datos renfac", renfac);
  
   let id  = renfac.id;
   let params_z = {
    "escomplementodatos": "SI",
    "pedircodigo": "NO",
    "codigo": renfac.codigo,
    "seriemotor": renfac.seriemotor,
    "aduana": renfac.aduana,
    "marca": renfac.marca,
    "folio": renfac.folio,
    "serie": renfac.serie,
    "esmoto": renfac.esmoto,
    "pedimento": renfac.pedimento
   }
   const dlgdatosrenfac= this.dialog.open(DlgrenfacComponent, {
    width: '700px',
    data: JSON.stringify(params_z)
   });
   dlgdatosrenfac.afterClosed().subscribe(res => {
    console.log("Regresando del Dialog", res);

     this.articuloscotizados[id].folio = res.renfac.folio;
     this.articuloscotizados[id].serie = res.renfac.serie;
     this.articuloscotizados[id].seriemotor = res.seriemotor;
     this.articuloscotizados[id].aduana = res.aduana;
     this.articuloscotizados[id].marca = res.marca;
     this.articuloscotizados[id].pedimento = res.pedimento;
     this.articuloscotizados[id].esmoto = res.esmoto;
     console.log("ya actualicé", this.articuloscotizados[id]);

   }
  );
}

regresar() {

}

async grabar_cliente(datoscliente: string): Promise <any> {
  let miotrorenfac : Nvorenfac[] = [];
  let opcion_z = "";
  this.articuloscotizados.forEach(ren => {
    if(this.qom == "C") {
      if(this.ticte == "CC" && ren.esoferta) {
          ren.preciou = ren.proferta
          opcion_z = "O";
      } else {
          ren.preciou = ren.preciou * (1 - this.factordscto/100) * (ren.piva / 100 + 1);
      }
    } else{
      ren.preciou = ren.preciou * (ren.piva / 100 + 1);
    }
    miotrorenfac.push(ren)
  });

  let mirespu = {}
  let nvocli = JSON.parse(datoscliente);
  nvocli.modo = "agregar_cliente";
  nvocli.clienterespu.modo="agregar_cliente";

  nvocli.modo = "agregar_cliente";
  nvocli.fechavta = "2022-09-09";
  nvocli.clienterespu.qom = this.qom;
  nvocli.clienterespu.ticte = this.ticte;
  nvocli.clienterespu.ubica = this.ubica;
  nvocli.clienterespu.opcion = opcion_z;
  nvocli.clienterespu.enganche = this.enganche;
  nvocli.clienterespu.nulet = this.nulet;
  nvocli.clienterespu.canle = this.preciolet;
  nvocli.clienterespu.cargos = this.totgral;
  nvocli.clienterespu.preciolista = (this.tottotal - this.descto) / ( 1 + nvocli.clienterespu.piva / 100);
  nvocli.clienterespu.tarjetatc = this.mitarjetatc;

  this.servicioclientes.agrega_nuevo_cliente(JSON.stringify(nvocli)).subscribe( res =>{
    mirespu = res;
    let paramsmodif_z = {
      numcli: res.codigo,
      statusfacalmomento: "SI"
    }


    this.servicioclientes.grabar_status_cliente_modificable(JSON.stringify(paramsmodif_z)).subscribe( resalta=> {
      console.log("Se ha agregado status no modificable");
      
    });

    let factura_z = JSON.parse(this.datosfactura_z);
    factura_z.idcli = nvocli.idcli;

    let params_z = {
      modo:"crear_cli_fac_capvtas",
      idcli:res.idcli,
      codigo:res.codigo,
      factura:factura_z,
      numrenglones:this.articuloscotizados.length,
      renglones:miotrorenfac
    }
    console.log("Datos p Agregar Fac:", params_z);
    
    this.servicioclientes.crear_factura_capvtas(JSON.stringify(params_z)).subscribe( resalta=> {

       if(resalta.status == "OK") {
        this.alerta("Cliente Agregado");
        let minvourl_z = [
          '/altacli/' + res.codigo
        ];
        //this.alerta("Voy a hacer route navigate: " + minvourl_z + " Respu:" + JSON.stringify(mirespu_z));
        this.route.navigate(minvourl_z)

       } else {
         this.alerta("Error:" + resalta.error);
         console.log("Debug: Error", resalta);
       }
    });


  });
  return (mirespu);

}

pedir_datos_fac() {
  let params_z = {
    fechavta:  this.configuracion.fecha_a_str(new Date(), "YYYY-mm-dd"),
    factura:  <Factura> { },
    ubiage: this.ubica,
    statuscli: this.nvoclistatus,
    modo: "NUEVO"
  }
  params_z.factura.idcli = this.idcli;
  params_z.factura.idfac = -1;
  const dialogmov = this.dialog.open(DlgdatosfacturaComponent, {
    width:'700px',
    data: JSON.stringify(params_z)
  });
  dialogmov.afterClosed().subscribe(res => {
    if(res) {
      this.datosfactura_z = JSON.stringify(res);
      this.yapedidatos = true;
    }

  });

}

async agregar_factura(datosagente: string): Promise <any> {
  

}

}
