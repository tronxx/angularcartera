import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { PolizasService } from '../services/polizas.service';
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
import { newArray, stringify } from '@angular/compiler/src/util';
import { Compania } from '../models/config';

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
  errores_z = [""];
  sinerrores = true;
  errorespoliza = [""]
  listaletras = [""];
  enespera = false;
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
  listavencimientos_z = [ {
        "letra" : "",
        "vence" : ""
      }
  ]


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
    "cobratario":"",
    "vence":"",
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
     private serviciopolizas: PolizasService
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

    this.enespera = true;
      //this.buscar_codigos_poliza();
      var params = {
        "modo":"acceder_poliza",
        "fecha":this.fechapol_z,
        "crearpoliza":"S",
        "tda":this.tda_z
      }
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
          this.enespera = false;
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
          this.clienteactivo_z = true;
          this.calcular_datos_cliente();
        } else {
          this.alerta("Cliente Inexistente");
        }
      }
    )

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
       this.strfechavta = this.cliente.numcli.substr(2,6);
       if( this.strfechavta >= "210901" && 
           this.qom_z == "Q" && 
           ( this.cliente.nulet == 4 || this.cliente.nulet == 10  )
        ) {
           this.tasarecargo_z = 20;
       }

       this.busca_aval(this.cliente.idcli);
       this.generavencimientos(1, this.nulets_z);


       if(this.abonos_z >= (this.engan_z + this.serv_z) ) {
          this.ltpag_z = Math.floor ((this.abonos_z - this.engan_z - this.serv_z  ) / this.prlet_z);
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
            this.calculaConcepto();
            this.ultltaoculto_z = false;
            this.datospago.importe = this.impxcob_z;
            this.activar_tipopago(["A", "C"]);
            this.generanumpagos(this.sigletra_z, this.nulets_z);
          } else {
            this.ultltaoculto_z = true;
            this.sigletra_z = this.ltpag_z + 1;
            this.impxcob_z = (this.sigletra_z * this.prlet_z ) + this.engan_z + this.serv_z - this.abonos_z;
            this.msg_z = "Debe ser Saldo de la Letra " + this.sigletra_z.toString() + "/" + this.nulets_z.toString() 
              + " Por: " +   formatCurrency ( Number(this.impxcob_z) , 'en-US', '$');
            this.tipopagosel_z = "S";
            this.activar_tipopago(["A", "S"]);
            this.datospago.recobon = this.recobon_z;
            this.datospago.concepto = "SALDO " + 
              formatNumber( Number(this.sigletra_z) , 'en-US', '1.0-0'); + "/" + this.nulets_z.toString();
            this.datospago.importe = this.impxcob_z;
            this.generanumpagos(this.sigletra_z, this.sigletra_z);

          }
          this.datospago.ltaini = formatNumber( Number(this.sigletra_z) , 'en-US', '1.0-0');
          this.datospago.ltafin = this.sigletra_z.toString().padStart(2, " ");
          this.datospago.tipomov = "B";
          this.datospago.recobon = 0;
 
        } else {
          this.tipopagosel_z = "C";
          this.datospago.ltaini = "SE";
          this.datospago.ltafin = "SE";
          this.datospago.tipomov = "B";
          this.ultltaoculto_z = true;
          this.datospago.recobon = 0;
          this.tipopagosel_z = "C";
          this.datospago.importe = (this.abonos_z - this.let1_z);
          this.msg_z = "Debe ser Saldo de Enganche  " + " Por: $" +  
            formatNumber( Number(this.impxcob_z) , 'en-US', '1.2-0');
          this.datospago.concepto = "SALDO ENGANCHE";
          this.tiporecobon_z = "NETO"
          this.tipomovsel_z = "N";
          this.activar_tipopago(["A", "S"]);
          this.generanumpagos(0, 0);


        }
        this.vence_z = this.calcula_venc(this.cliente.fechavta, this.cliente.qom, this.sigletra_z);
        this.msg_z += " Vence:" + this.fecha_a_str(this.vence_z, "dd-mmm-YYYY");
        this.datospago.dias = Math.floor( ( this.fechahoy_z.getTime() - this.vence_z.getTime()  ) / (86400000));
        //console.log("Debug: dias", this.datospago.dias, " Hoy:", this.fechahoy_z.getTime(), " Vence:", this.vence_z.getTime() );
        if(this.datospago.dias > this.diasbon ) {
          this.datospago.recobon = Math.round( this.prlet_z * this.tasarecargo_z / 100);
          this.tiporecobon_z = "RECARGO"
          this.tipomovsel_z = "R";
          this.msg_z += " Con Recargo";
          this.activartipomov(["R", "N"]);
    } else {
          if(this.datospago.ltaini != "SE") {
            this.datospago.recobon = this.recobon_z;
            this.tipomovsel_z = "B";
            this.tiporecobon_z = "BONIFICACION";
            this.msg_z += " Con Bonificacion";
            this.activartipomov(["B"]);
          } else {
            this.tipomovsel_z = "B";
            this.datospago.recobon = 0;
            this.activartipomov(["B"]);
          }
        }
        //this.tipomovsel_z = this.tiporecobon_z;
        //formatDate(this.vence_z, "dd-mm-YYYY", 'es-MX');
     }
     this.calculaConcepto();

  }

  activartipomov( tipos:string[]) {
    this.tiposmov=[];
    tipos.forEach(tipo => {
      if(tipo == "B") {
        this.tiposmov.push({ "tipo":"B", "descri":"BONIFICACION", "activo":"true"  });
      }
      if(tipo == "N") {
        this.tiposmov.push({ "tipo":"N", "descri":"NETO", "activo":"true"  });
      }
      if(tipo == "R") {
        this.tiposmov.push({ "tipo":"R", "descri":"RECARGO", "activo":"true"  });
      }

      
    });

  }

  generanumpagos(inicio:number, final:number) {
    let ii_z = 0;
    let minumlet_z = "";
    this.listaletras=[];
    for (ii_z = inicio; ii_z <= final; ii_z++) {
      if(ii_z) {
        minumlet_z = ii_z.toString().padStart(2, " ");
      } else {
        minumlet_z = "SE";
      }
      this.listaletras.push(minumlet_z);

    }

  }

  generavencimientos(inicio:number, final:number) {
    let ii_z = 0;
    let letra = "";
    let vence = "";
    let fecven = new Date();

    this.listavencimientos_z= [];
    for (ii_z = inicio; ii_z <= final; ii_z++) {
      if(ii_z) {
        letra = ii_z.toString().padStart(2, " ");
      } else {
        letra = "SE";
      }
      if (this.cliente) {
         fecven = this.calcula_venc(this.cliente.fechavta, this.cliente.qom, ii_z);
      }
      vence = this.fecha_a_str(fecven, "dd-mmm-YYYY");
      this.listavencimientos_z.push({letra, vence});

    }

  }


  activar_tipopago(tipospagodisp:string[]) {
    this.tipospagos = [];
    tipospagodisp.forEach(tipo => {
      if(tipo == "C") {
        this.tipospagos.push({ "clave":"C", "descri":"COMPLETO"  });
      }
      if(tipo == "A") {
        this.tipospagos.push({ "clave":"A", "descri":"A CUENTA"  });
      }
      if(tipo == "S") {
        this.tipospagos.push({ "clave":"S", "descri":"SALDO"  });
      }
          
    });

  }

  calculaConcepto() {
    let imp_z = 0;
    let nuletxpag_z = 0;
    let factor_z = 0;

    this.datospago.tipopago = this.tipopagosel_z;
    if(this.datospago.ltaini == "SE") {
      this.datospago.concepto = "SALDO ENGANCHE";
      if(this.datospago.dias > this.diasbon ) {
        this.datospago.recobon = Math.round (this.prlet_z * (this.tasarecargo_z / 100) * (this.let1_z ));
        factor_z = 1;
      } else {
        this.datospago.recobon = 0;
      }
    } else {
      this.datospago.concepto = "";
      if (this.datospago.tipopago == "A") {
        this.datospago.concepto += "ACTA ";
        this.ultltaoculto_z = true;
        this.datospago.ltafin = this.datospago.ltaini;
        factor_z = 0;
        this.datospago.recobon = 0;
      }
      if (this.datospago.tipopago == "C") {
        this.datospago.concepto += "LETRA ";
        this.ultltaoculto_z = false;
      }
      if (this.datospago.tipopago == "S") {
        this.datospago.concepto += "SALDO ";
        this.ultltaoculto_z = true;
        this.datospago.ltafin = this.datospago.ltaini;
        this.datospago.importe = this.impxcob_z;

      }

      nuletxpag_z = Number(this.datospago.ltafin) -  Number(this.datospago.ltaini ) + 1;
      this.datospago.concepto += this.datospago.ltaini.padStart(2, ' ');
      if( Number(this.datospago.ltafin) != Number(this.datospago.ltaini) ) {
        this.datospago.concepto += " - " + this.datospago.ltafin.padStart(2, ' ');
      }
      this.datospago.concepto += "/" + this.nulets_z;
      if (this.datospago.tipopago == "C" || this.datospago.tipopago == "S" ) {
        if (this.datospago.tipopago == "C") {
          this.datospago.importe = this.prlet_z * nuletxpag_z;
        }

        if(this.datospago.dias > 5 ) {
          this.datospago.recobon = Math.round (this.prlet_z * (this.tasarecargo_z / 100) * (nuletxpag_z  ));
          this.datospago.neto = this.datospago.importe + this.datospago.recobon;
          factor_z = 1;
  
        } else {
          this.datospago.recobon = this.recobon_z * nuletxpag_z;
          this.datospago.neto = this.datospago.importe - this.datospago.recobon;
          factor_z = -1;
        }
      } else {
        this.datospago.importe = this.prlet_z * nuletxpag_z;
      }

    }
    this.datospago.neto = this.datospago.importe + this.datospago.recobon * factor_z;
    this.calcula_bonif_extra();
    this.validarpago();

  }

  calcula_bonif_extra () {
    let mesesanticip_z = 0;
    let mub_z = 0;
    let bonifextra_z = 0;
    let message_z = "";
    let miltaini_z = Number( this.datospago.ltaini);
    let miltafin_z = Number(this.datospago.ltafin);
    if(this.datospago.dias > this.diasbon) return;

    if (miltafin_z  != this.nulets_z) return;
    mesesanticip_z = miltafin_z  - miltaini_z - 1;
    if(this.qom_z == "Q") mesesanticip_z = Math.floor( mesesanticip_z / 2);
    mesesanticip_z -= 1;
    if( mesesanticip_z < 2) return;
    mub_z = this.calcula_mub();
    bonifextra_z = ( ( this.prlista_z * ( 1 + this.pivacli_z / 100)  ) - this.engan_z  ) * mesesanticip_z * mub_z / 100;
    bonifextra_z = Math.round( bonifextra_z - 0.50);
    if(bonifextra_z) {
      message_z = "Cliente con Bonificacion Extra " + formatNumber (bonifextra_z, 'en-US', '1.0-0');
      message_z = message_z + " Bonificacion Normal: " + formatNumber((miltafin_z - miltaini_z + 1) * this.bonifi_z , 'en-US', '1.0-0');
      message_z = message_z + " Meses Adelanto " + mesesanticip_z.toString();
      this.alerta(message_z);
      this.datospago.recobon += bonifextra_z;
    }
    
  }

  calcula_mub() {
    let meses_z = this.nulets_z;
    let aua_z = 0;
    let aub_z = 0;
    let porutf_z = 0;
    if(this.qom_z == "Q") meses_z = meses_z / 2;
    aua_z = ( this.prlet_z - this.bonifi_z ) * this.nulets_z;
    aub_z = this.prlista_z * ( 1 + this.pivacli_z / 100 ) - this.engan_z;
    if (aub_z) porutf_z = ((aua_z / aub_z) - 1 ) * 100;
    if (meses_z) porutf_z = porutf_z / meses_z;
    return (porutf_z)
  
  }
  
  calculaNeto () {
    this.validarpago();
    if(this.tipomovsel_z == "B") {
      this.datospago.neto = this.datospago.importe - this.datospago.recobon;
      //console.log("Debug Bonif:", this.datospago.importe, " ", this.datospago.recobon, " Neto", this.datospago.neto);
    } else {
      this.datospago.neto = this.datospago.importe + this.datospago.recobon;
      //console.log("Debug Recargos:", this.datospago.importe, " ", this.datospago.recobon, " Neto", this.datospago.neto);
    }
    //console.log("Debug nETO:", this.datospago.neto);
  }

  validarpago() {
    this.errores_z=[];
    if(Number(this.datospago.ltafin) <  Number(this.datospago.ltaini ) ) {
      this.errores_z.push("La letra Final no puede ser mayor a la inicial");
    }
    if(this.datospago.tipopago == "A" && this.datospago.importe >= this.prlet_z) {
      this.errores_z.push("Si es A cuenta el Importe debe ser menor al valor de la letra");
    }
    this.aceptarpago = !this.errorespago();
    return(!this.errorespago());
  }

  errorespago () {
    if(this.errores_z.length) {
      return (true);
    }
    else {
      return(false);
    }
  }

  cancelarpago() {
    this.aceptarpago = false;
    this.clienteactivo_z = false;
    this.datospago.conceptocompl = "";
  }

  calcula_venc <Date> (fechavta:string, qom_z:string, letra:number) {

    let vencimiento_z = new Date(fechavta.replace(/-/g, '\/'));
    let strfecvta =  this.fecha_a_str  (vencimiento_z, "YYYYmmdd");
    let dias_z = 15;
    let nvafecha_z = 0;
    let meses_z = 0;

    if( this.AplicarContingencia  && strfecvta < this.FechaContingencia) {
      meses_z = Math.floor(this.diascontingencia / 30);
      dias_z = (this.diascontingencia % 30);
      vencimiento_z.setMonth(vencimiento_z.getMonth() + meses_z);
      nvafecha_z = vencimiento_z.getTime() + (dias_z * 24 * 60 * 60 *  1000);
      vencimiento_z = new Date(nvafecha_z);
    }
    if(qom_z == "Q") {
      meses_z = Math.floor(letra / 2);
      dias_z = (letra % 2) * 15;
    } else {
      dias_z = 0;
      meses_z = letra;
    }
    // console.log("Debug Meses:", meses_z, " Dias:", dias_z);
    if(letra == 0) {
      nvafecha_z = vencimiento_z.getTime() + (7 * 24 * 60 * 60 *  1000);
    } else {
      // console.log("Debug 1:" + fechavta, vencimiento_z);
      //vencimiento_z.setMonth(10);
      vencimiento_z.setMonth(vencimiento_z.getMonth() + meses_z);
      // console.log("Debug 2:",vencimiento_z);
      //vencimiento_z = vencimiento_z.setMonth(vencimiento_z.getMonth() + meses_z);
      nvafecha_z =  vencimiento_z.getTime() + (dias_z * 24 * 60 * 60 * 1000);
    }
    vencimiento_z = new Date(nvafecha_z);
    // console.log("Debug 3:",vencimiento_z);
    return (vencimiento_z);

  }

  fecha_a_str  (fecha : Date, formato:string)  {
    let strfecha_z = "";
    let anu_z = "";
    let mes_z = "";
    let dia_z = "";
    let meses_z = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    anu_z = fecha.getFullYear().toString();
    mes_z = ((fecha.getMonth()+101).toString()).substring(1,3);
    dia_z = ((fecha.getDate()+100).toString()).substring(1,3);
    if(formato == "YYYY-mm-dd") {
      strfecha_z = anu_z + "-" + mes_z + "-" + dia_z;
    }
    if(formato == "YYYYmmdd") {
      strfecha_z = anu_z + mes_z +  dia_z;
    }

    if(formato == "dd-mm-YYYY") {
      strfecha_z = dia_z +  "-" + mes_z + "-" + anu_z ;
    }
    if(formato == "dd-mmm-YYYY") {
      strfecha_z = dia_z +  "-" + meses_z[fecha.getMonth()] + "-" + anu_z ;
    }
    return (strfecha_z);
  }

  clickaceptarpago() {
    let estemov_z = this.codcli_z + ":" + this.datospago.concepto + " " + this.datospago.conceptocompl +  ":" + this.datospago.importe.toString;
    if(this.validarpago()) {
        this.confirma_aceptar_pago();
    } else {
      this.alerta("Hay Errores en el pago");
    }
  }

  confirma_aceptar_pago() {
    let estemov_z = this.codcli_z + ":" + this.datospago.concepto + " " + this.datospago.conceptocompl +  ":" + this.datospago.importe.toString();
    const dialogref = this.dialog.open(DialogBodyComponent, {
      width:'350px',
      data: 'Seguro de aceptar este Pago?'
    });
    dialogref.afterClosed().subscribe(res => {
      //console.log("Debug", res);
      if(res) {
        if (this.ultimo_z == estemov_z) {
          this.alerta("Está seguro de cobrar el mismo movimiento dos veces ?");
        } else {
          this.si_aceptarpago();
          this.ultimo_z = estemov_z;
        }
      }
    });
  
  }

  si_aceptarpago() {

    this.enespera = true;
    this.datospago.idpoliza = this.idpoliza;
    this.datospago.idusuario = this.usrreg_z.idusuario;
    this.datospago.cobratario = this.cobratario.cvepromo;
    this.datospago.tipopago = this.tipopagosel_z;
    this.datospago.tipomov = this.tipomovsel_z;
    this.datospago.claveempresa = this.claveempresa;
    this.datospago.vence = this.fecha_a_str(this.vence_z, "YYYY-mm-dd");
    // console.log("Debug DatosPago: ", this.datospago);
    this.serviciopolizas.agregar_pago(JSON.stringify(this.datospago )).subscribe(
      respu => {
        if(respu) {
          if(respu.error) {
            this.alerta("No se pudo agregar ");
            this.enespera = false;
          }
          if(respu.exito) {
            this.idrenpol = respu.idrenpol;
            this.uuid_z = respu.uuid;
            console.log("Debug: uuid", this.uuid_z);
            if( this.uuid_z.length > 3) {
              this.imprimir_txt();
            }
            console.log("Se agrego el movimiento:", respu);
          }
          this.buscar_renpol();
          this.checacarta();
          this.clienteactivo_z = false;
        }
        this.enespera = false;
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


  imprimir_txt() {
    console.log("Debug: Estoy en Imprimir txt ", this.uuid_z );
    let params = { "uuid": this.uuid_z};
    this.serviciopolizas.obtentxtcfdi(JSON.stringify( params));
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


}
