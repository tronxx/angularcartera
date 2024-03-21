import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { PolizasService } from '../services/polizas.service';
import { ConfiguracionService } from '../services/configuracion.service';
import { Cliente } from '../models/clientes';
import { Aval } from '../models/aval'
import { Poliza } from '../models/polizas';
import { Renpol } from '../models/renpol';
import { FormsModule } from '@angular/forms';
import { formatNumber,  CommonModule,  CurrencyPipe, formatCurrency, formatDate, DatePipe } from '@angular/common';
import { isEmpty } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { DlgbuscliComponent } from '../common/dlgbuscli/dlgbuscli.component';
import { MatIconModule } from '@angular/material/icon'; 
import { Compania } from '../models/config';
import { AgregarenpolComponent} from './agregarenpol/agregarenpol.component';
import { SpinnerComponent } from '../common/spinner/spinner.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-polizas',
  templateUrl: './polizas.component.html',
  styleUrls: ['./polizas.component.css']
})

export class PolizasComponent implements OnInit {

  clientes : Cliente [] = [];
  cliente?: Cliente;
  aval? : Aval;
  poliza?: Poliza;
  renpol?: Renpol;
  renglonesPoliza : Renpol[] = [];
  
  codcli_z = "";
  uuid_z = "";
  cia_z?: Compania;
  
  clienteactivo_z = false;
  polizaactiva_z = false;
  aceptarpago = false;
  ultltaoculto_z = true;
  esstatus1 = true;
  errores_z = [""];
  sinerrores = true;
  errorespoliza = [""]
  listaletras = [""];
  
  ultimo_z = "";
  
  cobratario = {
    "idpromot": 0,
    "cvepromo":"",
    "poc":"",
    "nombre":""
  }
  tda_z = "";
  tdaspol_z? = {};
  fechapol_z = "";
  fechasrv_z = "";
  nomtda_z = "";
  datospolenabled_z = false;
  cobratarioactivo_z = false;
  tipopagosel_z = "";
  tiporecobon_z = "";
  bonif_cerrada = true;
  tipomovcerrado = true;
  importecerrado = true;

  diascontingencia = 90;
  diasbon = 5;
  claveempresa = "";
  AplicarContingencia = true;
  FechaContingencia = "20200401";
  MesesMinimoCarta = 0;
  CartaSaldadosMesesAntes = 0;
  PrecioListaMinimoCarta = 0;
  sdoparacarta_z = 0;
  compracli_z = "";
  conpromo_z = false;


  tipospagos =[ 
    { "clave":"C", "descri":"COMPLETO"  },
    { "clave":"A", "descri":"A CUENTA"  },
    { "clave":"S", "descri":"SALDO"  }
  ]

  tiposmov = [
    { "tipo":"B", "descri":"BONIFICACION", "activo":"true"  },
    { "tipo":"R", "descri":"RECARGO", "activo":"false"  },
    { "tipo":"N", "descri":"NETO" , "activo":"false"}
  ]

  tasarecargo_z = 10;
  ltasxpag_z = 0;
  sigletra_z = 0;
  ltpag_z = 0;
  abonos_z = 0;
  cargos_z = 0;
  let1_z = 0;
  prlet_z = 0;
  saldo_z = 0;
  imp1_z = 0;
  engan_z = 0;
  serv_z = 0;
  impxcob_z = 0;
  recobon_z = 0;
  recargo_z = 0;
  nulets_z = 0;
  bonifi_z = 0;
  idpoliza = 0;
  idrenpol = 0;
  prlista_z = 0;
  pivacli_z = 0;
  qom_z = "";
  concarta_z = false;

  tipomovsel_z = "";

  totalbonifcs_z=0;
  totalrecargs_z=0;
  totalimports_z=0;

  msg_z ="";

  letras = [{
    letra: "",
    vence: "",
    fecven: new Date,
    pagado: false,
    vencido: false,
  }]

  grabando = false;


  datospago = {
    "idcli":0,
    "numcli":"",
    "idpoliza":0,
    "tipopago":"",
    "ltaini":"",
    "ltafin":"",
    "concepto":"",
    "conceptocompl":"",
    "tipomov":"",
    "recobon":0,
    "importe":0,
    "neto":0,
    "dias":0,
    "idusuario":0,
    "comision":0,
    "cobratario":"",
    "vence":"",
    "moroso":"",
    "claveempresa":""
  }

  usrreg_z = {
    "idusuario":0,
    "login":"",
    "nombre":"",
    "token":"",
    "acceso": "false",
    "iniciales":"",
    "nivel":""
  }

  fechahoy_z  = new Date();
  anu_z = this.fechahoy_z.getFullYear().toString();
  mes_z = ((this.fechahoy_z.getMonth()+101).toString()).substring(1,3);
  dia_z = ((this.fechahoy_z.getDate()+100).toString()).substring(1,3);
  strfecha_z = this.anu_z + "-" + this.mes_z + "-" + this.dia_z;
  vence_z  = new Date();
  fechaactual_z = new Date();
  strfechavta = "";

  constructor(private servicioclientes: ClientesService,
    public dialog: MatDialog, 
    public datepipe: DatePipe,
     private serviciopolizas: PolizasService,
     private configuracion : ConfiguracionService
    ) { }

  ngOnInit(): void {
    var mistorage_z  = localStorage.getItem('token') || "{}";
    this.usrreg_z =  JSON.parse(mistorage_z);
    this.fechapol_z = this.strfecha_z;
    //console.log("Usuario:" + mistorage_z);
    this.fechaactual_z = new Date();
    this.datospolenabled_z = (this.usrreg_z.nivel == "S");
    
    this.errorespoliza=[];
    this.buscar_codigos_poliza();
    this.cia_z =  this.serviciopolizas.obtendatoscia();
    if(this.cia_z) {
      this.diasbon = Number(this.cia_z.DiasBonificacion);
      this.diascontingencia = Number(this.cia_z.DiasBonificacion);
      this.claveempresa = this.cia_z.Clave;
      this.FechaContingencia = this.cia_z.FechaContingencia;
      this.AplicarContingencia = (this.cia_z.AplicarContingencia == "true");
      this.MesesMinimoCarta = Number (this.cia_z.MesesMinimoCarta);
      this.CartaSaldadosMesesAntes = Number (this.cia_z.CartaSaldadosMesesAntes);
      this.PrecioListaMinimoCarta = Number (this.cia_z.PrecioListaMinimoCarta);
    
    }
    this.serviciopolizas.obten_fecha_servidor ().subscribe(
      respu => {
        let misdatos = respu;
        this.fechasrv_z = misdatos.fechayhora.substring(0,10);
        if (this.fechasrv_z != this.strfecha_z) {
          this.alerta("La fecha actual no coincide con la fecha del Servidor");          
          this.strfecha_z = this.fechasrv_z;
          this.fechahoy_z =  new Date(this.strfecha_z.replace(/-/g, '\/'));
        }
      }
    );
  }

  hayerrorpoliza () {
    return(this.errorespoliza.length);
  }

  buscar_poliza() {

      //this.buscar_codigos_poliza();
      var params = {
        "modo":"acceder_poliza",
        "fecha":this.fechapol_z,
        "crearpoliza":"S",
        "tda":this.tda_z
      }
      if(this.tda_z == "") {
        this.alerta("El Código de la Póliza no puede estar vacío");
        return;
      }
      this.grabando = true;
      this.serviciopolizas.buscapoliza(JSON.stringify(params)).subscribe(
        respu => {
          this.errorespoliza=[];
          this.poliza = respu;
          if (this.poliza.status == "C") {
            this.alerta("Poliza Cerrada");
            //console.log("Debug: ", this.errorespoliza);
          } else {
            this.polizaactiva_z = true;
            this.tda_z = this.poliza.tda;
            this.fechapol_z = this.poliza.fecha;
            this.polizaactiva_z = true;
            this.idpoliza = this.poliza.idpoliza;
            this.buscar_renpol();
          }
          this.grabando = false;
        }
      );
  }

  buscar_codigos_poliza() {
      var params = {
        "modo":"buscar_codigos_polizas",
        "idusuario": this.usrreg_z.idusuario
      };
      //console.log("idusuario:" + this.usrreg_z.idusuario);
      this.cobratario.cvepromo = this.usrreg_z.iniciales;

      this.serviciopolizas.busca_codigos_poliza(JSON.stringify(params)).subscribe(
        respu => {
          this.tda_z = respu[0].clave;
          this.nomtda_z = respu[0].nombre;
          //console.log("Codigos:" + JSON.stringify(respu));
          this.tdaspol_z = respu;
          this.fechapol_z =  this.strfecha_z;
        }
      )
      this.buscar_cobratario();
 
  }

    buscar_cobratario() {
    var params = {
      "modo":"buscar_cobratario",
      "codprom": this.cobratario.cvepromo
    };
    //console.log("idusuario:" + this.usrreg_z.idusuario);

    this.serviciopolizas.busca_cobratarios(JSON.stringify(params)).subscribe(
      respu => {
        this.cobratario = respu[0];
        this.cobratarioactivo_z = true;
        // console.log("Debug:" + this.cobratarioactivo_z);

      }
    )

}


  aceptarpoliza() {
     this.buscar_poliza();
  }

  buscarcliente() {
    var params_z = {
      modo : "buscar_un_cliente",
      codigo: this.codcli_z,
      idcli : -1
    }
    this.fechaactual_z = new Date();

    this.servicioclientes.buscacliente(JSON.stringify(params_z)).subscribe(
      respu => {
        if(respu) {
          this.cliente = respu;
          this.esstatus1 = (this.cliente.status == "*");

          this.clienteactivo_z = true;
          this.calcular_datos_cliente();
        } else {
          this.alerta("Cliente Inexistente");
        }
      }
    )

  }

  cobrar() {
    let params_z = {
        codigo: this.codcli_z
    }
    const dialogref = this.dialog.open(AgregarenpolComponent, {
      width:'800px',
      data: JSON.stringify(params_z)
    });
    dialogref.afterClosed().subscribe(res => {
      //console.log("Debug", res);
    });
    dialogref.afterClosed().subscribe(res => {
      if(!res) { this.cancelarpago(); }
      else {
        this.datospago = JSON.parse(res);
        this.si_aceptarpago();
        this.clienteactivo_z = false;
      }


    });

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
  

  calcular_datos_cliente() {
     if(this.cliente) {
       this.abonos_z  = this.cliente.abonos;
       this.cargos_z = this.cliente.cargos;
       this.let1_z = this.cliente.letra1;
       this.prlet_z = this.cliente.canle;
       this.engan_z = this.cliente.enganche;
       this.serv_z = this.cliente.servicio;
       this.bonifi_z  = this.cliente.bonificacion;
       this.nulets_z = this.cliente.nulet;
       this.recobon_z = this.cliente.bonificacion;
       this.tiporecobon_z = "BONIFICACION";
       this.datospago.idcli  = this.cliente.idcli;
       this.datospago.numcli  = this.cliente.numcli;
       this.qom_z = this.cliente.qom;
       this.prlista_z = this.cliente.preciolista;
       this.pivacli_z = this.cliente.piva;
       this.sdoparacarta_z = this.prlet_z * this.CartaSaldadosMesesAntes;
       if(this.qom_z == "Q") this.sdoparacarta_z / 2;
       this.tasarecargo_z = 10;
       this.strfechavta = this.cliente.numcli.substring(2,6);
       if( this.strfechavta >= "220101" ||
          (this.strfechavta >= "210901" && this.qom_z == "Q" && 
           ( this.cliente.nulet == 4 || this.cliente.nulet == 10  ))
        ) {
           this.tasarecargo_z = 20;
       }
       this.conpromo_z = false;
       if(this.cliente.diasgracia > 0) this.conpromo_z = true;

       this.busca_aval(this.cliente.idcli);
       this.ltpag_z = Math.floor ((this.abonos_z - this.engan_z - this.serv_z  ) / this.prlet_z);
       this.letras = JSON.parse (this.configuracion.generavencimientos(this.cliente.fechavta, this.qom_z, 1, this.nulets_z, this.cliente.diasgracia, this.ltpag_z));
       //console.log('FechaStr:', this.strfechavta, 'Vencimientos:', this.listavencimientos_z);
       
       if(this.abonos_z >= (this.engan_z + this.serv_z) ) {

          this.imp1_z = (this.ltpag_z * this.prlet_z) + this.engan_z + this.serv_z;
          //console.log("Debug LtaPag:" + ltpag_z.toString() + " Imp:" + this.currencyPipe.transform(imp1_z, '$'));
          //console.log("Debug LtaPag:" + this.ltpag_z.toString() + " Imp:" + this.imp1_z.toString());
          if (this.imp1_z == this.abonos_z ) {
            this.impxcob_z = this.prlet_z;
            this.sigletra_z = this.ltpag_z + 1;
            this.msg_z = "Debe pagar la Letra " + this.sigletra_z.toString().padStart(2, " ") + "/" 
              + this.nulets_z.toString() + " por " +  formatCurrency ( Number(this.impxcob_z) , 'en-US', '$');
            this.tipopagosel_z = "C";
            this.datospago.recobon = this.recobon_z;
            this.ultltaoculto_z = false;
            this.datospago.importe = this.impxcob_z;
          } else {
            this.sigletra_z = this.ltpag_z + 1;
            this.impxcob_z = (this.sigletra_z * this.prlet_z ) + this.engan_z + this.serv_z - this.abonos_z;
            this.msg_z = "Debe ser Saldo de la Letra " + this.sigletra_z.toString() + "/" + this.nulets_z.toString() 
              + " Por: " +   formatCurrency ( Number(this.impxcob_z) , 'en-US', '$');
          }
          this.datospago.ltaini = formatNumber( Number(this.sigletra_z) , 'en-US', '1.0-0');
          this.datospago.ltafin = this.sigletra_z.toString().padStart(2, " ");
        } else {
          this.datospago.importe = (this.abonos_z - this.let1_z);
          this.msg_z = "Debe ser Saldo de Enganche  " + " Por: $" +  
            formatNumber( Number(this.impxcob_z) , 'en-US', '1.2-0');

        }
        let nvafvta_z  = new Date(this.cliente.fechavta.replace(/-/g, '\/'));
        nvafvta_z.setDate ( nvafvta_z.getDate() + this.cliente.diasgracia);

        this.vence_z = this.configuracion.calcula_venc(this.configuracion.fecha_a_str(nvafvta_z, "YYYY-mm-dd"), this.cliente.qom, this.sigletra_z);
        this.msg_z += " Vence:" + this.configuracion.fecha_a_str(this.vence_z, "dd-mmm-YYYY");
        this.datospago.dias = Math.floor( ( this.fechahoy_z.getTime() - this.vence_z.getTime()  ) / (86400000));
        //console.log("Debug: dias", this.datospago.dias, " Hoy:", this.fechahoy_z.getTime(), " Vence:", this.vence_z.getTime() );
        if(this.datospago.dias > this.diasbon ) {
          this.recargo_z = Math.round( this.prlet_z * this.tasarecargo_z / 100);
          this.datospago.recobon = this.recargo_z;
          this.msg_z += " Con Recargo";
    } else {
          if(this.datospago.ltaini != "SE") {
            this.datospago.recobon = this.recobon_z;
            this.msg_z += " Con Bonificacion";
          } else {
          }
        }
        //this.tipomovsel_z = this.tiporecobon_z;
        //formatDate(this.vence_z, "dd-mm-YYYY", 'es-MX');
     }
  }

  activartipomov( tipos:string[]) {
  }

  generanumpagos(inicio:number, final:number) {
  }
  
  activar_tipopago(tipospagodisp:string[]) {
  }

  calculaConcepto() {
  }

  calcula_bonif_extra () {
    
  }

  calcula_mub() {
  
  }
  
  calculaNeto () {
  }

  validarpago() {
  }

  errorespago () {
  }

  cancelarpago() {
    this.aceptarpago = false;
    this.clienteactivo_z = false;
    this.datospago.conceptocompl = "";
  }

  
  clickaceptarpago() {
  }

  confirma_aceptar_pago() {
  }

  si_aceptarpago() {
    this.datospago.idpoliza = this.idpoliza;
    this.datospago.idusuario = this.usrreg_z.idusuario;
    this.datospago.cobratario = this.cobratario.cvepromo;
    this.datospago.claveempresa = this.claveempresa;
    //console.log("Debug DatosPago: ", this.datospago);
    this.serviciopolizas.agregar_pago(JSON.stringify(this.datospago)).subscribe(
    //this.serviciopolizas.agregar_pago(JSON.stringify(dummy)).subscribe(
      respu => {
        if(respu) {
          if(respu.error) {
            this.alerta("No se pudo agregar ");
          }
          this.buscar_renpol();
          this.checacarta();
          if(respu.exito) {
            this.idrenpol = respu.idrenpol;
            this.uuid_z = respu.uuid;
            console.log("Debug: uuid", this.uuid_z);
            if( this.uuid_z.length > 3 ) {
              this.descarga_pdf(this.uuid_z);
              //this.imprimir_txt();
            } else {
              if(this.datospago.tipomov == "B" && 
                this.datospago.recobon > 0 && this.claveempresa == "EC") {
                this.obtener_txt_bon_electro(respu);
              }
            }
            // this.alerta(" Tipomov:" + this.datospago.tipomov +
            //   " tipopago:" + this.datospago.tipopago +
            //   " respu Seriefacfon:" + respu.seriefacfon +
            //   " Folio:" + respu.numfacfon +
            //   " idrenpol :" + respu.idrenpol.toString()
            // );
            console.log("Se agrego el movimiento:", respu);
          }
          this.clienteactivo_z = false;
        }
      }
    );

  }

  checacarta() {
    let nvosaldo_z = this.cargos_z - this.abonos_z - this.datospago.importe;

    if(
       nvosaldo_z === this.sdoparacarta_z && 
       this.prlista_z >= this.PrecioListaMinimoCarta && 
       (this.nulets_z /2) >= this.MesesMinimoCarta) {
         console.log("Debug:Con Carta");
         this.genera_carta();
       }
  }

  genera_carta() {
    let params = { "numcli": this.codcli_z};
    this.serviciopolizas.obtencarta(JSON.stringify( params));
  }

  descarga_pdf(uuid: string) {
    let params = { "uuid": this.uuid_z};
    this.serviciopolizas.obten_pdf_cfdi(JSON.stringify( params));
  }

  imprimir_txt() {
    console.log("Debug: Estoy en Imprimir txt ", this.uuid_z );
    this.descarga_pdf(this.uuid_z);
    //let params = { "uuid": this.uuid_z};
    //this.serviciopolizas.obtentxtcfdi(JSON.stringify( params));
  }

  obtener_txt_bon_electro(parametros_z: any) {
    console.log("Debug: Estoy en Imprimir bon txt electro ", parametros_z );
    let params = { 
      "idrenpol": parametros_z.idrenpol,
      "serie": parametros_z.seriefacfon,
      "foliobon": parametros_z.numfacfon
    };
    this.serviciopolizas.obten_bon_electro(JSON.stringify( params));
  }


  buscar_renpol() {
    let params = {
      "modo":"obtener_detalles_poliza",
      "idpoliza": this.idpoliza
    };
    //console.log("idusuario:" + this.usrreg_z.idusuario);
    this.serviciopolizas.buscar_renpol(JSON.stringify(params)).subscribe(
      respu => {
        this.renglonesPoliza = respu;
        if(this.poliza) {
           this.totalbonifcs_z = this.renglonesPoliza.reduce(( acc,
            obj,
          ) => acc + (obj.bonificacion),
          0);
          this.totalrecargs_z = this.renglonesPoliza.reduce(( acc,
            obj,
          ) => acc + (obj.recargo),
          0);
          this.totalimports_z = this.renglonesPoliza.reduce(( acc,
            obj,
          ) => acc + (obj.importe),
          0);

        }

      }
    )
  }

  busqueda_por_nombre() {
      const dialogref = this.dialog.open(DlgbuscliComponent, {
        width:'650px',
        data: ''
      });
      dialogref.afterClosed().subscribe(res => {
        if (res) {
          this.codcli_z = res.numcli;
          this.buscarcliente();
        }
        console.log("Debug: Regrese de busqueda por Nombre", res);
      });
    
  
  }

  define_bonif_abierta() {
  }


  sel_tipopago() {
  }

  busca_aval(idcli_z : number) {
    var params_z = {
      modo : "buscar_aval",
      codigo: this.codcli_z,
      idcli : idcli_z
    }
    console.log("Debug: Estoy en busca Aval ", idcli_z);
  
    this.servicioclientes.buscaaval(JSON.stringify(params_z)).subscribe(
      respu => {
        if(respu) {
          this.aval = respu;
          this.compracli_z = this.aval.compra;
        } 
      }
    );

  }

  calcula_bonif_o_rec(miletra_z:number) {
  }


}
