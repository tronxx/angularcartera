import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service'
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { MatIconModule } from '@angular/material/icon'; 
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { ConfiguracionService } from '../services/configuracion.service';
import { Factura } from '../models';
import { Renfacfo } from '../models';
import { Cliente } from '../models';
import { Ubivta } from '../models';
import { Promotor } from '../models';
import { Nulets } from '../models';
import { Poblacs } from '../models';
import { Tarjetatc } from '../models';
import { Factorvtacred } from '../models';
import { Tabladesctocont } from '../models';
import { Articulo } from '../models';
import { Ofertas } from '../models';
import { Vendedor } from '../models';

import { DlgDatosvtaComponent } from '../capvtas/dlg-datosvta/dlg-datosvta.component';
import { DlgrenfacComponent } from '../altacli/dlgrenfac/dlgrenfac.component';
import { DlgbusarticuloComponent } from '../common/dlgbusarticulo/dlgbusarticulo.component';
import { DatossolicitComponent } from '../altacli/datossolicit/datossolicit.component';
import { DlgdatosfacturaComponent  } from '../altacli/dlgdatosfactura/dlgdatosfactura.component';
import { SpinnerComponent } from '../common/spinner/spinner.component';
import { DlgpidprofertaComponent } from '../common/dlgpidproferta/dlgpidproferta.component';
import { PidepasswdComponent } from '../common/pidepasswd/pidepasswd.component';

interface Nvorenfac {
  id: number;
  codigo: string;
  concepto: string;
  canti: number;
  preciolista: number;
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
  selector: 'app-capturavtas',
  templateUrl: './capturavtas.component.html',
  styleUrls: ['./capturavtas.component.css']
})



export class CapturavtasComponent {

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
  nopuedecambiartc = false;
  
  promocion_z = {
    promodic_inicio: "2022-12-01",
    promodic_fin: "2022-12-31",
    promodic_dias:"15",
    promodic_mesesminimo:5
  }

  codcartera_z = "";
  pidprecio_z = false;
  pideoferta_z = false;
  
  antcod_z = "";
  codcli_z = "";
  codigo_z = "";
  idcli = 0;
  idfac = 0;
  cargoscli_z = 0;
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
  mitarjetatc = "-1";
  contarjetatc = false;
  escredito = false;
  simostrarprodfin = true;
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
  factoroferta = 0;
  servicio = 0;
  linea_z = "";
  oferta = false;
  proferta = 0;
  codvnd = "";
  antvnd = "-1";
  piva = 16;
  hayerror = false;
  yapedidatos = false;
  articuloscotizados : Nvorenfac[] = [];
  articulocotizado?: Nvorenfac;
  esvalido=false;
  grabando=false;
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
    private datePipe: DatePipe,
    private route : Router

  ) { }

  ngOnInit(  ): void {
    this.inicializa();
  }

  inicializa() {
    let ayer_z = new Date();
    ayer_z.setDate (ayer_z.getDate() - 1);
    let strfecha =  this.datePipe.transform(ayer_z,"yyMMdd");
    this.obtencatalogos();
    this.cliente = <Cliente> {};
    let mistorage_z  = localStorage.getItem('capvtas') || "{}";
    let usrreg_z =  JSON.parse(mistorage_z);
    this.ubica = usrreg_z.ubicacion;
    this.codvnd = usrreg_z.codvnd;
    this.codcartera_z = usrreg_z.codcartera + strfecha + "99";
    this.antubica = this.ubica;
    this.antcod_z = this.codcartera_z;
  }
  


  xagregar_renfac() {
    if(this.ticte == "TC" && this.mitarjetatc == "-1") {
      this.alerta("debe seleccionar el tipo de tarjeta de crédito");
      return;
    }
    this.nopuedecambiartc = true;
    console.log("El codigo es", this.codigo_z);
    let params_z = {
      "escomplementodatos": "NO",
      "pedircodigo": "SI",
      "pedirprecio": "NO",
      "buscaroferta": "NO",
      "codigo": this.codigo_z,
      "ticte": this.ticte,
      "qom": this.qom,
    }
    const dlgdatosrenfac= this.dialog.open(DlgrenfacComponent, {
      width: '700px',
      data: JSON.stringify(params_z)
     });
        
    let proferta = 0;
    dlgdatosrenfac.afterClosed().subscribe(res => {
      if (res) {
        //console.log("estoy en xagregar_renfac", res);
        
        
        if(res.linea == "MOTO" && ( this.linea_z !="" && res.renfac.codigo != "AUXILIAR") ) {
          this.alerta("La Linea Moto no se puede mezclar");
        } else {
          this.codigo_z = res.renfac.codigo;
          if(this.codigo_z != "AUXILIAR") {
            this.linea_z = res.linea;
            proferta = this.busca_oferta(this.codigo_z);
          } 
          //this.busca_oferta(res.renfac.codigo)
          let idren = this.articuloscotizados.length;
          this.articulocotizado = <Nvorenfac> {};
          this.articulocotizado.codigo = res.renfac.codigo;
          this.articulocotizado.preciolista = res.preciolista;
          this.articulocotizado.esmoto = res.esmoto;
          this.articulocotizado.id = idren;
          this.articulocotizado.canti = 1;
          this.articulocotizado.concepto = res.renfac.concepto;
          if(this.codigo_z != "AUXILIAR") { 
            this.articulocotizado.precionormal = res.renfac.preciou;
            this.articulocotizado.piva = res.piva;
            this.articulocotizado.preciou = res.renfac.preciou / ( res.piva / 100 + 1);
            this.articulocotizado.linea = res.linea;
            this.articulocotizado.proferta = proferta;
            this.articulocotizado.folio = res.renfac.folio;
            this.articulocotizado.serie = res.renfac.serie;
            this.articulocotizado.seriemotor = res.seriemotor;
            this.articulocotizado.aduana = res.aduana;
            this.articulocotizado.marca = res.marca;
            this.articulocotizado.pedimento = res.pedimento;
            this.articulocotizado.proferta = proferta;
            if(this.articulocotizado.proferta) {
              this.articulocotizado.esoferta = true;
            } else {
              this.articulocotizado.esoferta = false;
            }
            if(this.ticte == "CC" && this.articulocotizado.esoferta ) {
                this.oferta = true;
                this.articulocotizado.importe = this.articulocotizado.proferta / (this.piva / 100 + 1);
            } else {
                this.oferta = false;
                this.articulocotizado.importe = this.articulocotizado.precionormal / (this.piva / 100 + 1);
            }
            this.articulocotizado.iva = this.articulocotizado.importe * this.piva / 100;
      
          }
          this.articulocotizado.factorvtacred = 0;
          this.articulocotizado.tasadescto = 0;

  
          this.articuloscotizados.push(this.articulocotizado);
          // console.log("A Nuevorenfac:", this.articulocotizado);

          //console.log("Articulos Cotizados:", this.articuloscotizados);
          if(this.articulocotizado.codigo != "AUXILIAR") this.calcular_totales();
  
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
    const newoferta = this.ofertas.filter((oferta) => oferta.codigo == codigo);
    // console.log("cpvtas compnent Ofertas Filtradas:", newoferta);
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

  calcular_totales() {
    this.totimporte = 0;
    this.totiva = 0;
    let plazotc = 0;
    let importe = 0;
    let iva = 0;
    this.factoroferta = 0;
    let hayoferta = false;
    this.hayerror = false;
    let messages_z =[];

    let ii_z =0;
    let milinea = this.linea_z;
    this.esvalido=false;
    let conse_z = this.codcartera_z.substring(8,10);
    let consecorrecto_z = Number(conse_z).toString().padStart(2, "0");
    if ( conse_z != consecorrecto_z) {
      this.hayerror = true;
      this.msgerror_z =  "El codigo del cliente es incorrecto, el Consecutivo tiene:" +  
      conse_z + " y debería ser " + consecorrecto_z;
    }

    this.servicio = Number(this.servicio);
    if(Number(this.servicio)  < 0) {
        this.alerta("El Servicio No puede ser negativo, lo convierto en a cero");
        this.servicio = 0;
    }
    if(this.ticte == "TC") {
      this.tarjetastc.forEach( rentabla => {
        if(this.mitarjetatc  == rentabla.clave) {
          plazotc = rentabla.plazo;
        }
      });
    }
    this.factordscto = 0;
    this.descto = 0;
    let mifacdescto = 0;
    let midescto = 0;
    this.oferta = false;
    if((this.ticte == "TC" && plazotc == 0)  || this.ticte == "CC" )  {
      this.oferta = true;
    }
    if(this.ticte == "TC" && plazotc == 0) {
      this.factoroferta = 3;
      this.oferta = true;
    }

    if(milinea != 'MOTO' && this.nulet == 4) {
      this.factordscto = 12;
      this.descto = Math.floor(this.tottotal * this.factordscto / 100);
      this.totgral = this.tottotal - this.descto;
    }
    messages_z.push("01- Ya seleccione factorDescto:" + this.factordscto.toString());
    
    milinea = "-1"
    console.log("articulos cotizados:", this.articuloscotizados);
    
    this.articuloscotizados.forEach(miren => {
      ii_z = miren.id;
      if(miren.codigo != "AUXILIAR") {
        if(miren.esoferta && this.oferta) {
          hayoferta = true;
          importe = (miren.proferta * (1 + this.factoroferta /100 ) / (miren.piva / 100 + 1));
        } else {
          //console.log("Recalculando Precio Lista", miren.preciolista);
          
          miren.precionormal = miren.preciolista;
          importe = miren.precionormal * (1 + this.factoroferta /100 ) / (miren.piva / 100 + 1);
        }
        iva =  importe * (miren.piva / 100);
        this.articuloscotizados[ii_z].importe = importe;
        this.articuloscotizados[ii_z].iva = iva;
        this.totimporte += importe;
        this.totiva +=  iva;
        if(milinea == "-1" )  milinea = miren.linea;
        if(milinea != "MOTO")  milinea = miren.linea;
 
      }
    });
    this.tottotal = Math.round((this.totimporte + this.totiva) + .49);
    this.totgral = this.tottotal;
    messages_z.push("02 Ya Calcule totales Tottotal:" + 
      this.tottotal.toString() + " totgral:" + this.totgral.toString() +
      " Servicio: " + this.servicio.toString() );

    if(this.escredito) {
      this.preciolet = 0;
      if(this.nulet == 0) { 
        this.nulet = 1;
      }
      this.factorlet  = this.busca_factor_vtacrd(this.nulet);
      this.descto = Math.floor(this.tottotal * this.factordscto / 100);
      this.totgral = this.tottotal - this.descto;
      messages_z.push("03 Es Credito Tottotal:" + 
        this.tottotal.toString() + " totgral:" + this.totgral.toString() +
        " Descto:"+ this.descto.toString() + " Factor Letra: " + this.factorlet.toString()
      );

      if(!this.factorlet) this.factorlet = 1 / this.nulet;
      this.preciolet = Math.round((((this.tottotal - this.descto) - this.enganche) * this.factorlet));
      this.totgral = this.enganche +  (this.preciolet * this.nulet);
      this.totprodfin = this.totgral - this.tottotal;
      if(this.totprodfin < 0) this.simostrarprodfin = false; else  this.simostrarprodfin = true;
    } else {
      this.factordscto = this.buscar_tasa_descto_cont(milinea, this.ticte, this.mitarjetatc);
      if(this.factordscto == -1 ) {
        this.hayerror = true;
        this.msgerror_z = "Forma de Pago Invalida";
      } else {
        if(!hayoferta) {
          this.descto = Math.floor(this.tottotal * this.factordscto / 100);
          this.totgral = this.tottotal - this.descto;
            messages_z.push("04 Contado Tottotal:" + 
            this.tottotal.toString() + " totgral:" + this.totgral.toString() +
            " Descto:"+ this.descto.toString() + " Factor Descto:" + this.factordscto.toString()
            );
        }
      }
    }
    console.log("Resultados:", messages_z);
    
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

  busca_porcentaje_comision(nulets: number) : number {
    let porcomis = 0;
    this.factoresvtacrd.forEach(element => {
      if(element.plazo == nulets) {
        porcomis = element.porcomis;
      }
    });
    return (porcomis);

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
        if(mirenfac.codigo != "AUXILIAR") this.calcular_totales();
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
            this.prodfin_z = ( this.preciolista_z * ( 16 / 100 + 1 )) -  this.servicio;
            this.prodfin_z = Math.round (this.cargoscli_z - this.prodfin_z);
            if(this.prodfin_z < 0) this.prodfin_z = 0;
            this.factura.prodfin = this.prodfin_z;
            this.escerrada = ( this.factura.status == "C");
            this.strfeccierre_z = this.factura.fecha;
          }
        }
      }
    );
  }
  
  cambiar_orden_renfac(mirenfac: Nvorenfac, hacia: String) {
    let miid = mirenfac.id;
    let idanter = 0;
    if(hacia == "SUBIR") idanter = miid - 1;
    if(hacia == "BAJAR") idanter = miid + 1;
    if(idanter >= 0 || idanter <= this.articuloscotizados.length ) {
      let antren : Nvorenfac = this.articuloscotizados[idanter];
      this.articuloscotizados[idanter] = mirenfac;
      this.articuloscotizados[idanter].id = idanter;
      this.articuloscotizados[miid] = antren;
      this.articuloscotizados[miid].id = miid;
    }

  }

  subir_renfac(mirenfac: Nvorenfac) {
    this.cambiar_orden_renfac(mirenfac, "SUBIR");
  }

  bajar_renfac(mirenfac: Nvorenfac) {
    this.cambiar_orden_renfac(mirenfac, "BAJAR");
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
  this.promocion_z = this.configuracion.obtenpromocion();


  
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
  let micodcartera_z = this.codcartera_z.substring(0, 2);
  
  if( this.antubica != this.ubica || 
      this.antvnd != this.codvnd || 
      this.antcod_z != micodcartera_z
  )  {
    let capvtas = {
      "ubicacion": this.ubica,
      "codvnd": this.codvnd,
      "codcartera": micodcartera_z
    };
    localStorage.setItem("capvtas", JSON.stringify( capvtas));
    this.antubica = this.ubica;
    this.antvnd = this.codvnd;
    this.antcod_z = micodcartera_z;
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
            //console.log("Agregando Tarjetas:", mitc);
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
    codigo: this.codcartera_z,
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
  let minvourl_z = [
    '/main/'
  ];
  //this.alerta("Voy a hacer route navigate: " + minvourl_z + " Respu:" + JSON.stringify(mirespu_z));
  this.route.navigate(minvourl_z)


}

async grabar_cliente(datoscliente: string): Promise <any> {
  let miotrorenfac : Nvorenfac[] = [];
  let mismessages_z =[""];
  let opcion_z = "";
  let prlista_z = 0;
  this.grabando=true;
  
  this.articuloscotizados.forEach(ren => {
    if(ren.codigo != "AUXILIAR") {
      if(this.qom == "C") {
        if((this.ticte == "CC" || this.ticte == "TC") && (ren.esoferta)) {
            ren.preciou = Math.round(ren.proferta * (1 + this.factoroferta / 100) + .49);
            opcion_z = "O";
        } else {
          ren.preciou = Math.round (ren.precionormal *  (1 - (this.factordscto/100))+ .49);
        }
      } else{
        if(this.nulet  < 5) {
          ren.preciou = Math.round (ren.precionormal *  (1 - (this.factordscto/100)) + .49);
          // ren.preciou = ren.preciou * (ren.piva / 100 + 1);
        } else {
          ren.preciou = Math.round (ren.precionormal );
          // ren.preciou = ren.preciou * (ren.piva / 100 + 1);
        }
      }
      prlista_z += ren.preciou;
  
    }
   
    console.log('Para Grabar:', ren);
    
    miotrorenfac.push(ren)
  });

  let mirespu = {}
  let nvocli = JSON.parse(datoscliente);
  nvocli.modo = "agregar_cliente";
  nvocli.clienterespu.modo="agregar_cliente";

  nvocli.modo = "agregar_cliente";
  nvocli.fechavta = "2022-09-09";
  nvocli.clienterespu.status = this.nvoclistatus;
  nvocli.clienterespu.qom = this.qom;
  nvocli.clienterespu.appat = nvocli.clienterespu.appat.trim();
  nvocli.clienterespu.apmat = nvocli.clienterespu.apmat.trim();
  nvocli.clienterespu.nompil1 = nvocli.clienterespu.nompil1.trim();
  nvocli.clienterespu.nompil2 = nvocli.clienterespu.nompil2.trim();
  nvocli.clienterespu.ticte = this.ticte;
  nvocli.clienterespu.ubica = this.ubica;
  nvocli.clienterespu.opcion = opcion_z;
  nvocli.clienterespu.enganche = this.enganche;
  nvocli.clienterespu.nulet = this.nulet;
  nvocli.clienterespu.canle = this.preciolet;
  nvocli.clienterespu.cargos = this.totgral;
  nvocli.clienterespu.servicio = this.servicio;
  nvocli.clienterespu.preciolista = prlista_z / (nvocli.clienterespu.piva / 100 + 1);
  nvocli.clienterespu.tarjetatc = this.mitarjetatc;

  this.servicioclientes.agrega_nuevo_cliente(JSON.stringify(nvocli)).subscribe( res =>{
    mirespu = res;

    this.grabar_promocion_cliente(this.codcartera_z, this.qom, this.nulet);
    let paramsmodif_z = {
      numcli: res.codigo,
      statusfacalmomento: "SI"
    }


    this.servicioclientes.grabar_status_cliente_modificable(JSON.stringify(paramsmodif_z)).subscribe( resalta=> {
      console.log("Se ha agregado status no modificable");
      
    });

    let factura_z = JSON.parse(this.datosfactura_z);
    factura_z.idcli = nvocli.idcli;
    const preciolista = nvocli.clienterespu.preciolista;
    const porcomis = this.busca_porcentaje_comision(this.nulet);
    const comision = Math.round( preciolista * porcomis /100 );
    console.log("Voy a agregar Comision Precio Lista", preciolista, "Comision", comision, "porcomis", porcomis);
    
    let comisionagregada = false;
    let paramcomisi = {
      modo: "agregar_cli_agente",
      idcli: res.idcli,
      idvnd: -1,
      codvnd: this.codvnd,
      comis: comision
    }
    this.servicioclientes.agregar_cli_agente(JSON.stringify(paramcomisi)).subscribe( resalta=> {
      comisionagregada = true;

    });

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
  let fechavta_z = "20" + this.codcartera_z.substring(2,4) + "-" + 
    this.codcartera_z.substring(4,6) + "-" + 
    this.codcartera_z.substring(6,8);

  let params_z = {
    fechavta: fechavta_z,
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
      console.log("-x021- Datos Factura:", this.datosfactura_z);
      
      this.yapedidatos = true;
    }

  });

}

pide_precio_oferta(renfac: Nvorenfac) {
  console.log("acompletar datos renfac", renfac);
  
   let id  = renfac.id;
   let params_z = {
    "proferta": renfac.proferta,
    "tipo":true
   }
   const dlgdatosrenfac= this.dialog.open(DlgpidprofertaComponent, {
    width: '700px',
    data: JSON.stringify(params_z)
   });
   dlgdatosrenfac.afterClosed().subscribe(res => {
      if(res) {
        if(res.esoferta) {
          this.articuloscotizados[id].proferta = res.proferta;
          this.articuloscotizados[id].esoferta = true;
  
         } else {
          this.articuloscotizados[id].precionormal = res.proferta;
          if(res.proferta) this.articuloscotizados[id].esoferta = false;
   
         }
      }
       console.log("ya actualicé", this.articuloscotizados[id]);
       this.calcular_totales();
       console.log("100: Articulos Cotizados:", this.articuloscotizados);
       
      }
   );

}

precios_abiertos() {
  this.pideoferta_z = false;
  let cod_z = this.codcartera_z.substring(0,2);
   let params_z = {
    "ubicacion": cod_z
   }
   const dlgdatosrenfac= this.dialog.open(PidepasswdComponent, {
    width: '400px',
    data: JSON.stringify(params_z)
   });
   dlgdatosrenfac.afterClosed().subscribe(res => {
      //console.log("Regresando de Pide Password", res);
       
       if(res) {
         this.pideoferta_z = true;
       }
       
      }
   );

}



async agregar_factura(datosagente: string): Promise <any> {
  

}

grabar_promocion_cliente(codigo: String, qom:string, letras: number) {
  let mesesvta = letras;
  if(qom == "Q") mesesvta = mesesvta * 2;
  if(qom == 'C') return;
  let fvta_z = "20" + codigo.substring(2,4) + "-" + 
    codigo.substring(4,6) + "-" + 
    codigo.substring(6,8);
  
  //console.log("Grabando promocion cliente Fechavta:", fvta_z, " Meses", mesesvta);
  
  if(fvta_z < this.promocion_z.promodic_inicio ||
    fvta_z  > this.promocion_z.promodic_fin)
  return;
  
  if(mesesvta < this.promocion_z.promodic_mesesminimo) return;
  //this.alerta("Se va a grabar la promocion");

    var params_z = {
        modo : "grabar_dias_promocion",
        diasgracia: this.promocion_z.promodic_dias,
        codigo: codigo
    }
    console.log("Grabar promocion", params_z);
    
    this.servicioclientes.altas_agregar_dias_promocion(JSON.stringify(params_z)).subscribe(
      respu => {
        console.log("Se agrego los dias de promocion");
      }
    );
  
}



}
