import { Component, OnInit,  Inject } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { PolizasService } from '../../services/polizas.service';
import { ConfiguracionService } from '../../services/configuracion.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Cliente } from '../../models/clientes';
import { Aval } from '../../models/aval'
import { Poliza } from '../../models/polizas';
import { Renpol } from '../../models/renpol';
import { Promotor } from '../../models/promotor';
import { FormsModule } from '@angular/forms';
import { formatNumber,  CommonModule,  CurrencyPipe, formatCurrency, formatDate, DatePipe } from '@angular/common';
import { isEmpty } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBodyComponent } from '../../dialog-body/dialog-body.component';
import { DlgbuscliComponent } from '../../common/dlgbuscli/dlgbuscli.component';
import { MatIconModule } from '@angular/material/icon'; 
import { Compania } from '../../models/config';
import { MatSelectChange } from '@angular/material/select';
import { DlgplazosComponent } from '../../common/dlgplazos/dlgplazos.component';


// 30-Sep-2022
// Se modifica que la bonificación adelantada
// Se calcule a partir de 1 mes

@Component({
  selector: 'app-agregarenpol',
  templateUrl: './agregarenpol.component.html',
  styleUrls: ['./agregarenpol.component.css']
})
export class AgregarenpolComponent implements OnInit {

  clientes : Cliente [] = [];
  cliente?: Cliente;
  aval? : Aval;
  poliza?: Poliza;
  renpol?: Renpol;
  renglonesPoliza : Renpol[] = [];
  
  codcli_z = "";
  uuid_z = "";
  cia_z?: Compania;
  conpromo_z = false;
  
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
  esstatus1 = true;
  conplazo = "NO";
  sitengoplazo = false;
  datosplazo = {
    fechaplazo: "",
    venceplazo: "",
    observs: ""
  }
  cobratario ?: Promotor;
  
  esmoroso = false;
  tda_z = "";
  tdaspol_z? = {};
  promotor? : Promotor;
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
  recargoscobrados_z = 0;
  diasbon = 5;
  claveempresa = "";
  AplicarContingencia = true;
  FechaContingencia = "20200401";
  MesesMinimoCarta = 0;
  CartaSaldadosMesesAntes = 0;
  PrecioListaMinimoCarta = 0;
  sdoparacarta_z = 0;
  compracli_z = "";
  recibido=0;
  cambio=0;
  importecobrado = 0;


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
    "vence":"",
    "comision": 0,
    "cobratario":"",
    "moroso":"",
    "claveempresa":"",
    "idrenrelco":0,
  }

  vence_z  = new Date();
  fechaactual_z = new Date();
  strfechavta = "";
  esconrec_z = false;

  constructor(
    private servicioclientes: ClientesService,
    public dialog: MatDialog, 
    public dialogRef: MatDialogRef<AgregarenpolComponent>,
    public datepipe: DatePipe,
     private serviciopolizas: PolizasService,
     private configuracion : ConfiguracionService,
     private dateAdapter: DateAdapter<Date>,
     @Inject(MAT_DIALOG_DATA) public message : string
  ) { }

  ngOnInit(): void {
    let params_z = JSON.parse(this.message);
    this.codcli_z = params_z.codigo;
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    if(params_z.polizamorosos) {
      this.esmoroso = true;
      this.datospago.cobratario = params_z.cobratario;
      this.datospago.idrenrelco = params_z.idrenrelco;
      this.buscar_promotor(params_z.cobratario);
    }

    this.buscarcliente();

  }

  buscar_promotor(cobratario: string) {
    const params_z = {
      modo:"buscar_cobratario",
      codprom: cobratario

    }
    this.serviciopolizas.busca_cobratarios(JSON.stringify(params_z)).subscribe( res => {
        this.cobratario = res[0];
    });

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
          this.esstatus1 = (this.cliente.status == "*");
          //this.buscadiasgracia();
          this.calcular_datos_cliente();
        } else {
          this.alerta("Cliente Inexistente");
          this.closeno();
        }
      }
    )

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
      this.strfechavta = this.cliente.numcli.substring(2,8);
      //this.alerta("strfechavta = " + this.strfechavta);
      if( this.strfechavta >= "220101" ||
         (this.strfechavta >= "210901" && this.qom_z == "Q" && 
          ( this.cliente.nulet == 4 || this.cliente.nulet == 10  ))
       ) {
          this.tasarecargo_z = 20;
      }
      this.conpromo_z = false;
      if(this.cliente.diasgracia > 0) {
        this.conpromo_z = true;
      }
      this.ltpag_z = Math.floor ((this.abonos_z - this.engan_z - this.serv_z  ) / this.prlet_z);

      this.busca_aval(this.cliente.idcli);
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
           this.activar_tipopago(["A", "C"]);
           this.generanumpagos(this.sigletra_z, this.nulets_z);
           this.calculaConcepto();
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
         if(this.bonifi_z > 0 )  this.bonif_cerrada = false; else this.bonif_cerrada = true;
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
       let fecbase_z = new Date(this.cliente.fechavta.replace(/-/g, '\/'));
       fecbase_z.setDate (fecbase_z.getDate() + this.cliente.diasgracia);       
       let fechavta = this.configuracion.fecha_a_str(fecbase_z, "YYYY-mm-dd");
   
       this.vence_z = this.configuracion.calcula_venc(fechavta, this.cliente.qom, this.sigletra_z);
       this.msg_z += " Vence:" + this.configuracion.fecha_a_str(this.vence_z, "dd-mmm-YYYY");
       this.datospago.dias = Math.floor( ( this.fechaactual_z.getTime() - this.vence_z.getTime()  ) / (86400000));
       //console.log("Debug: dias", this.datospago.dias, " Hoy:", this.fechahoy_z.getTime(), " Vence:", this.vence_z.getTime() );
       if(this.datospago.dias > this.diasbon ) {
         this.recargo_z = Math.round( this.prlet_z * this.tasarecargo_z / 100);
         this.datospago.recobon = this.recargo_z;
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
           this.activartipomov(["B", "N"]);
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
    this.recibido = this.datospago.neto;
    
    this.calcula_cambio();
    this.calcula_comision();

 }

 calculaImporteAcuentaMoroso() {
  
  this.datospago.importe = this.importecobrado -  this.datospago.recobon;
  this.datospago.neto = this.importecobrado;
  console.log("Estoy en calculaImporteAcuentaMoroso", this.importecobrado, this.datospago.recobon, this.datospago.neto);
 }

 checa_si_es_acuenta_moroso() {
  let esacuentamoroso = false;

  if (this.datospago.tipopago == "A" && this.esmoroso) {
    //this.importecobrado = this.datospago.neto;
    esacuentamoroso = true;
  }
  return (esacuentamoroso);
 }

 tipopagoSelectionChange(event: MatSelectChange) {
   this.calculaConcepto();
 } 

 tipomovSelectionChange(event: MatSelectChange) {
  this.sel_tipopago();
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

  this.calcula_comision();

}

calcula_comision () {
  let comxlet_z = 0;
  let comxrec_z = 0;
  if(this.cobratario) {
    comxlet_z = this.cobratario.comxlet;
    comxrec_z = this.cobratario.comxrec;
  }
  if(this.esmoroso && this.tipomovsel_z == "R") {
      this.datospago.comision = Math.round( this.datospago.importe * comxlet_z ) / 100;
  }
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

  async calculaConcepto() {
  let imp_z = 0;
  let nuletxpag_z = 0;
  let factor_z = 0;
  console.log("Estoy en calculaConcepto");
  

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
    this.bonif_cerrada = false;
    this.tipomovcerrado = false;
    this.importecerrado = false;
    if (this.datospago.tipopago == "A") {
      this.datospago.concepto += "ACTA ";
      this.ultltaoculto_z = true;
      this.datospago.ltafin = this.datospago.ltaini;
      factor_z = 0;
      this.datospago.recobon = 0;
      if(this.bonifi_z < 1) {
        this.bonif_cerrada = true;
      }
      if(this.datospago.dias > 5) {
        this.activartipomov(["R"])
        this.bonif_cerrada = false;
        this.tipomovcerrado = true;
      } else {
        this.activartipomov(["N", "R"])
        this.tipomovcerrado = false;
      }
    }
    if (this.datospago.tipopago == "C") {
      this.datospago.concepto += "LETRA ";
      this.ultltaoculto_z = false;
      this.bonif_cerrada = true;
      this.tipomovcerrado = true;
      this.importecerrado = true;
    }
    if (this.datospago.tipopago == "S") {
      this.datospago.concepto += "SALDO ";
      this.tipomovcerrado = true;
      this.ultltaoculto_z = true;
      this.datospago.ltafin = this.datospago.ltaini;
      if(this.bonifi_z > 0 )  this.bonif_cerrada = false; else this.bonif_cerrada = true; 
    }

    nuletxpag_z = Number(this.datospago.ltafin) -  Number(this.datospago.ltaini ) + 1;
    this.datospago.concepto += this.datospago.ltaini.padStart(2, ' ');
    if( Number(this.datospago.ltafin) != Number(this.datospago.ltaini) ) {
      this.datospago.concepto += " - " + this.datospago.ltafin.padStart(2, ' ');
      let prletconrec_z = this.calcula_bonif_o_rec(Number(this.datospago.ltaini));
      let ulletconrec_z = this.calcula_bonif_o_rec(Number(this.datospago.ltafin));
      if(prletconrec_z != ulletconrec_z) {
         this.alerta("No puede mezclar letras atrasadas y al día");
         //this.closeno();
      }

    }
    this.recargoscobrados_z = 0;
    this.esconrec_z = false;
    if(this.datospago.dias > 5 ) {
      this.esconrec_z = true;
      this.recargoscobrados_z = await this.busca_recargos_letra(this.datospago.idcli, this.datospago.ltaini);

      this.datospago.recobon = Math.round (this.recargo_z * nuletxpag_z  ) - this.recargoscobrados_z;
      this.datospago.neto = this.datospago.importe + this.datospago.recobon;
      this.bonif_cerrada = true;
      factor_z = 1;
    }

    this.datospago.concepto += "/" + this.nulets_z;
    if (this.datospago.tipopago == "C" || this.datospago.tipopago == "S" ) {
      if (this.datospago.tipopago == "C") {
        this.datospago.importe = this.prlet_z * nuletxpag_z;
      }

      if(this.datospago.dias > 5 ) {
        this.esconrec_z = true;
        this.recargoscobrados_z = await this.busca_recargos_letra(this.datospago.idcli, this.datospago.ltaini);
  
        this.datospago.recobon = Math.round (this.recargo_z * nuletxpag_z  ) - this.recargoscobrados_z;
        this.datospago.neto = this.datospago.importe + this.datospago.recobon;
        this.bonif_cerrada = true;
        factor_z = 1;

      } else {
        this.datospago.recobon = this.recobon_z * nuletxpag_z;
        this.datospago.neto = this.datospago.importe - this.datospago.recobon;
        factor_z = -1;
      }
    } else {
      this.datospago.importe = this.prlet_z * nuletxpag_z;
    }
    this.importecobrado = this.datospago.neto;

  }
  this.datospago.neto = this.datospago.importe + this.datospago.recobon * factor_z;
  this.calcula_bonif_extra();
  this.validarpago();
  this.recibido = this.datospago.neto;
  console.log("Saliendo de calculaConcepto", this.datospago.neto);

}

calcula_bonif_extra () {
  let mesesanticip_z = 0;
  let mub_z = 0;
  let bonifextra_z = 0;
  let message_z = "";
  let miltaini_z = Number( this.datospago.ltaini);
  let miltafin_z = Number(this.datospago.ltafin);
  let saldoactual = 0;
  if(this.cliente) {
     saldoactual = this.cliente.cargos - this.cliente.abonos;
  }

  if(this.datospago.dias > this.diasbon) return;

  if (miltafin_z  != this.nulets_z) return;
  mesesanticip_z = miltafin_z  - miltaini_z - 1;
  if(this.qom_z == "Q") mesesanticip_z = Math.floor( mesesanticip_z / 2);
  mesesanticip_z -= 1;
  if( mesesanticip_z < 1) return;
  mub_z = this.calcula_mub();
  bonifextra_z = ( ( this.prlista_z * ( 1 + this.pivacli_z / 100)  ) - this.engan_z  ) * mesesanticip_z * mub_z / 100;
  bonifextra_z = Math.round( bonifextra_z - 0.50);
  if(bonifextra_z < 0.5) bonifextra_z = 0; 
  if(bonifextra_z) {
    let saldacon = saldoactual - this.datospago.recobon - bonifextra_z;
    message_z = "Cliente con Bonificacion Extra \n" ;
    message_z += " Saldo Actual " + formatNumber (saldoactual, 'en-US', '1.0-0') + " \n"; 
    message_z += " Bonificacion Extra " + formatNumber (bonifextra_z, 'en-US', '1.0-0') + " \n"; 
    message_z += " Bonificacion Normal: " + formatNumber((miltafin_z - miltaini_z + 1) * this.bonifi_z , 'en-US', '1.0-0')  + " \n"; 
    message_z += " Meses Adelanto " + mesesanticip_z.toString() + " \n"; 
    message_z += " Salda Con: " +  formatNumber (saldacon, 'en-US', '1.0-0') + " \n"; 
    this.alerta(message_z);
    this.datospago.recobon += bonifextra_z;
    this.calculaNeto();
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
  
  this.recibido = this.datospago.neto;
  console.log("Voy a Calcular cambio: recibido:", this.recibido);
  this.calcula_comision();
  this.calcula_cambio();
  //console.log("Debug nETO:", this.datospago.neto);
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

async busca_recargos_letra(idcli_z : number, numletra_z: string): Promise<number> {
  var params_z = {
    modo : "obtener_recargo_letra",
    idcli : idcli_z,
    letra: Number( numletra_z)
  }
  let misrecargoscobrados_z = 0;
  const misrec = await this.serviciopolizas.BuscaRecargosDeLetra(JSON.stringify(params_z));
  misrecargoscobrados_z = misrec.recargos;
  return (misrecargoscobrados_z);
}


alerta(mensaje: string) {
  const dialogref = this.dialog.open(DialogBodyComponent, {
    width:'50%',
    data: mensaje
  });
  dialogref.afterClosed().subscribe(res => {
    //console.log("Debug", res);
  });

}

validarpago() {
  this.errores_z=[];
  if(Number(this.datospago.ltafin) <  Number(this.datospago.ltaini ) ) {
    this.errores_z.push("La letra Final no puede ser mayor a la inicial");
  }
  if(this.datospago.tipopago == "A" && this.datospago.importe >= this.impxcob_z) {
    this.errores_z.push("Si es A cuenta el Importe debe ser menor al valor de la letra");
  }
  if(this.datospago.conceptocompl.includes('/')) {
    this.errores_z.push("El complemento del concepto no puede contener el caracter / ");
  }
  let prletconrec_z = this.calcula_bonif_o_rec(Number(this.datospago.ltaini));
  let ulletconrec_z = this.calcula_bonif_o_rec(Number(this.datospago.ltafin));
  if(prletconrec_z != ulletconrec_z) {
    this.errores_z.push("No puede mezclar letras atrasadas y al día");
  }
  if(this.datospago.importe < this.datospago.recobon && this.datospago.tipopago == "B" ) {
    this.errores_z.push("Bonificación Excesiva ");

  }

  this.aceptarpago = !this.errorespago();
  return(!this.errorespago());
  if(this.tda_z == "") {
    this.errores_z.push("El Codigo de la Poliza no puede estar vacío");
  }
}

errorespago () {
  if(this.errores_z.length) {
    return (true);
  }
  else {
    return(false);
  }
}

calcula_bonif_o_rec(miletra_z:number) {
  let esrecobon_z = "B";
  let dias_z = 0;
  let mivenc_z = new Date();
  if(this.cliente) {
    mivenc_z = this.configuracion.calcula_venc(this.cliente.fechavta, this.cliente.qom, miletra_z);
    dias_z = Math.floor( ( this.fechaactual_z.getTime() - mivenc_z.getTime()  ) / (86400000));
    //console.log("Debug: dias", this.datospago.dias, " Hoy:", this.fechahoy_z.getTime(), " Vence:", this.vence_z.getTime() );
    if(dias_z > this.diasbon ) {
      esrecobon_z = "R";
    } else {
      esrecobon_z = "B";
    }

  }
  return esrecobon_z;
}

define_bonif_abierta() {
  this.validarpago();
  let bonifcliente = 0;
  if(this.cliente) bonifcliente = this.cliente.bonificacion;
  let miltafin_z = Number(this.datospago.ltafin);
  //this.alerta("Tipo pago sel:" + this.tipopagosel_z + bonifcliente.toString());
  this.bonif_cerrada = true;
  if(this.tipopagosel_z == "A" || (this.tipopagosel_z == "S" && bonifcliente < 1 ) ) {
    this.bonif_cerrada = true;
  } else {
    if(this.datospago.conceptocompl == "CARTA" && (this.nulets_z == miltafin_z)) {
      this.bonif_cerrada = false;
    }
  }
}

sel_tipopago() {
  let numerodeletras_z = Number(this.datospago.ltafin) - Number (this.datospago.ltaini) + 1;
  if(this.tipomovsel_z == "N") {
    this.datospago.recobon = 0;
    this.bonif_cerrada = true;
  } else if (this.tipomovsel_z == "R") {
    this.recargo_z = Math.round( this.prlet_z * this.tasarecargo_z / 100);
    this.datospago.recobon = this.recargo_z * numerodeletras_z;
    //this.bonif_cerrada = false;
  } else {
    let conrec_z = this.calcula_bonif_o_rec(Number(this.datospago.ltaini));
    if(conrec_z == "R") {
      this.datospago.recobon = this.recargo_z * numerodeletras_z;
      //this.bonif_cerrada = false;
      this.tipomovsel_z = "R";
    } else {
      this.datospago.recobon = this.recobon_z * numerodeletras_z;
    }
    
  }
  if(this.bonifi_z > 0 )  this.bonif_cerrada = false; else this.bonif_cerrada = true; 
  // this.alerta("Bonificacion del Cliente:" + this.bonifi_z.toString() + " Bonif Cerrada:" + this.bonif_cerrada);
  //this.sigletra_z = Number (this.datospago.ltaini);
  this.calculaNeto();
}

calcula_cambio() {
  this.cambio = this.recibido -  this.datospago.neto;
}

onChangeObj(recbido: any) {
  this.calcula_cambio();

}

siaceptarpago() {
    let estemov_z = this.codcli_z + ":" + this.datospago.concepto + " " + this.datospago.conceptocompl +  ":" + this.datospago.importe.toString;
    if(this.validarpago()) {
        this.confirma_aceptar_pago();
    } else {
      this.alerta("Hay Errores en el pago:" + this.errores_z.toString());
    }

}

click_plazo() {
  if(this.sitengoplazo) {
    this.conplazo = "SI";
    this.datosplazo.fechaplazo = this.configuracion.fecha_a_str(this.fechaactual_z, "YYYY-mm-dd");
    this.datosplazo.venceplazo = this.configuracion.fecha_a_str(
      this.configuracion.SumaDiasaFecha(this.fechaactual_z, 20), "YYYY-mm-dd");
      // this.alerta("Fecha:" + this.datosplazo.fechaplazo + 
      // " Vence" + this.datosplazo.venceplazo
      // );
  } else {
    this.conplazo = "NO";
  }

}

plazo() {
  let params_z = {
    esplazo: true,
    codigo: this.codcli_z,
    cobratario: this.datospago.cobratario,
    polizamorosos: true,
    idrenrelco: -1,
    fecha: this.configuracion.fecha_a_str(this.fechaactual_z, "YYYY-mm-dd") 
}
const dialogref = this.dialog.open(DlgplazosComponent, {
  width:'800px',
  data: JSON.stringify(params_z)
});
dialogref.afterClosed().subscribe(res => {
  if(res) {
    this.datosplazo = res;
    this.conplazo = "SI";
    this.sitengoplazo = true;
    console.log("Datos Plazo:", this.datosplazo);
  }

});


}


confirma_aceptar_pago() {
  let estemov_z = this.codcli_z + ":" + this.datospago.concepto + " " + this.datospago.conceptocompl +  ":" + this.datospago.importe.toString();
  const dialogref = this.dialog.open(DialogBodyComponent, {
    width:'350px',
    data: 'Seguro de aceptar este Pago?'
  });
  let result = {}
  dialogref.afterClosed().subscribe(res => {
    //console.log("Debug", res);
    if(res) {
      this.datospago.tipopago = this.tipopagosel_z;
      this.datospago.tipomov = this.tipomovsel_z;
      this.datospago.vence = this.configuracion.fecha_a_str(this.vence_z, "YYYY-mm-dd");
      if(this.esmoroso) { 
        this.datospago.moroso = "SI";
        result = {
          datospago: this.datospago,
          conplazo: this.conplazo,
          datosplazo: this.datosplazo
        }
      } else {
        result = this.datospago;
        this.datospago.moroso = "NO";
      }
      this.dialogRef.close(JSON.stringify( result));    
    } else {
      this.closeno();
    }
  });

}


closeno() {
  this.dialogRef.close(false);
}

}
