import { Component, OnInit, Inject, Input } from '@angular/core';
import { ClientesService } from '../../services/clientes.service'
import { FormsModule } from '@angular/forms';
import { formatNumber,  CommonModule,  CurrencyPipe, formatCurrency, formatDate, DatePipe } from '@angular/common';
import { isEmpty } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card'; 
import { MatTabsModule } from '@angular/material/tabs';
import { DialogBodyComponent } from '../../dialog-body/dialog-body.component';
import { DlgbuscliComponent } from '../../common/dlgbuscli/dlgbuscli.component';
import { MatIconModule } from '@angular/material/icon'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
import { SpinnerComponent } from '../../common/spinner/spinner.component';

import { Cliente } from '../../models/clientes';
import { Aval } from '../../models/aval';
import { Movclis } from '../../models/movclis';
import { Observcli } from '../../models/observcli';
import { Solicitud } from '../../models/solicitud';
import { Cartapro } from '../../models/cartapro';
import { Ubivta } from '../../models/ubivta';
import { Promotor } from '../../models/promotor';
import { Nulets } from '../../models/nulets';
import { Poblacs } from '../../models/poblacs';
import { Tarjetatc } from '../../models/tipostarjetastc'
import { DlgedoctaComponent  } from '../../common/dlgedocta/dlgedocta.component';
import { ActivatedRoute } from '@angular/router';
import {ConfiguracionService } from '../../services/configuracion.service';


@Component({
  selector: 'app-dlg-datosvta',
  templateUrl: './dlg-datosvta.component.html',
  styleUrls: ['./dlg-datosvta.component.css']
})
export class DlgDatosvtaComponent implements OnInit {

  clientes : Cliente[] = [];
  cliente? : Cliente;
    
  ubivta : Ubivta[] = [];
  promotor : Promotor[] = [];
  nulets : Nulets[] = [];
  poblaciones : Poblacs[] = [];
  tarjetastc : Tarjetatc[] = [];
  contarjetatc = false;
    
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

  statuscli = [
    { clave:"*", descri:"Status1"},
    { clave:"", descri:"Status2" }

  ]

  codigodisabled = true;
  canledisabled = false;
  bonifdisabled = false;
  letra1disabled = false;

  numcli_z = "";
  fechavta_z = "";

  nvocli = {
    modo: "agregar_cliente",
    idcli: 0,
    numcli: "",
    nombre:"",
    direc:"",
    appat:"",
    apmat:"",
    nompil1:"",
    nompil2:"",
    calle:"",
    numpred:"",
    codpost:"",
    colonia: "",
    poblac: "",
    status: "*",
    fechavta: "",
    qom: "Q",
    ticte: "",
    ubica: "",
    promotor: "",
    opcion: "",
    comisionprom: 0,
    enganche: 0,
    servicio: 0,
    letra1: 0,
    nulet: 0,
    canle: 0,
    bonificacion: 0,
    cargos: 0,
    abonos: 0,
    preciolista: 0,
    compra: "",
    piva: 16,
    factura: 0,
    comisagente: 0,
    pgocom: "",
    pdsc: 0,
    fechalta: "",
    ultmod: "",
    fecsal: "",
    email: "",
    diacum: 1,
    mescum: 1,
    tarjetatc:""
  }

  seriefac_z = "";
  numfac_z = -1;

  conaval = true;
  
  nvoaval = {
    idcli : -1,
    direc2: "",
    nomav: "",
    dirav1: "",
    dirav2: "",
    compra: "",
    linea: "",
    appat: "",
    apmat: "",
    nompil1: "",
    nompil2: ""
  }



  constructor(
    public dialog: MatDialog, 
    public dialogRef: MatDialogRef<DlgDatosvtaComponent>,
    @Inject(MAT_DIALOG_DATA) public message : string,
    private servicioclientes: ClientesService,
    private configservice : ConfiguracionService
  ) { }

  ngOnInit(): void {
    let params_z = JSON.parse(this.message);
    this.fechavta_z = this.configservice.fecha_a_str(new Date(), 'YYYY-mm-dd');
    if(params_z.modo="NUEVO") {
      this.codigodisabled = false;
    } else {
      this.codigodisabled = false;
    }
    this.ubivta = params_z.ubica;
    this.nvocli.ticte = params_z.ticte;
    this.nvocli.enganche = params_z.enganche;
    this.conaval = true;
    this.numcli_z = params_z.codigo;
    this.nvocli.status = "*";
    console.log("Params Status ", params_z.status);
    
    if(params_z.status != undefined) {
      this.nvocli.status = params_z.status;
    }
    if(params_z.ticte == "CC" || params_z.ticte == "TC") {
      this.conaval = false;
      this.nvocli.qom = "C";
    }

    //this.busca_serie_y_folio();

    this.obtencatalogos();
  }

  formularioEnviado() {
  
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
    let paramspromo_z = {
      modo :"buscar_cobratario",
      codprom : "-1"
    }
    this.servicioclientes.busca_promotores(JSON.stringify(paramspromo_z)).subscribe(
      respu => {
        this.promotor = respu;
      }
    );
   
    let parampoblac_z = {
      modo :"buscar_poblacs",
      codprom : "-1"
    }
    this.servicioclientes.obtenpoblacs(JSON.stringify(parampoblac_z)).subscribe(
      respu => {
        this.poblaciones = respu;
      }
    );
    this.buscanulets();
  }

  buscanulets() {
    let paramsnulet_z = {
      modo :"buscar_nulets_activo",
      qom : this.nvocli.qom
    }
    this.servicioclientes.obtennulets(JSON.stringify(paramsnulet_z)).subscribe(
      respu => {
        this.nulets = respu;        
      }
    );
  }

  calcu_precio_lista() {
    if(this.nvocli.qom == "C") {
      this.nvocli.preciolista = (.01) * Math.round( this.nvocli.enganche /  ( this.nvocli.piva / 100 + 1) * 100);
    }
 }

 selecciona_letras_cliente() {
   if(this.nvocli.qom == "C") {
     this.nvocli.nulet = 0;
     this.nvocli.canle = 0;
     this.nvocli.bonificacion = 0;
     this.nvocli.letra1 = 0;
     this.canledisabled = true;
     this.bonifdisabled = true;
     this.letra1disabled = true;
   } else {
     this.canledisabled = false;
     this.bonifdisabled = false;
     this.letra1disabled = false;
   }
   this.buscanulets();
 }

 selecciona_tarjetas_tc() {
   if(this.nvocli.ticte == "TC") {
     this.contarjetatc = true;
     this.busca_tipos_tarjetas();
   } else {
     this.contarjetatc = false;
   }
 }
 
 busca_mi_tc(idcli: number) {
   var params_z = {
     modo : "buscar_mi_tc_cliente",
     codigo: this.numcli_z,
     idcli : idcli
   }
   this.servicioclientes.buscar_cli_tarjetas_tc(JSON.stringify(params_z)).subscribe(
     respu => {
       if(respu) {
         this.nvocli.tarjetatc = respu.clave;
       }
     }
   );

 }

 busca_tipos_tarjetas() {
   var params_z = {
     modo : "buscar_tarjetas_tc",
     ubiage : this.nvocli.ubica,
     ticte: this.nvocli.ticte
   }
   //console.log('Ticte:', this.nvocli.ticte);
   
   this.servicioclientes.buscar_tarjetas_tc(JSON.stringify(params_z)).subscribe(
     respu => {
       if(respu) {
         this.tarjetastc = respu;
       } else {
         this.tarjetastc = [];
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

closeyes() {
  this.nvocli.numcli = this.numcli_z;
  this.nvocli.factura = this.numfac_z;
  let respuesta = {
    modo:"",
    clienterespu: this.nvocli,
    avalrespu: this.nvoaval
  }
  this.dialogRef.close(respuesta);
}

closeno() {
  this.dialogRef.close(false);
}

busca_serie_y_folio() {
  var params_z = {
    modo : "buscar_facturacion_una_serie",
    ubiage : this.ubivta,
    statuscli : this.nvocli.status
  }
  console.log("Debug: Estoy en busca_seri_y_folio ", this.ubivta);
  this.servicioclientes.busca_serie_factura(JSON.stringify(params_z)).subscribe(
    respu => {
      this.seriefac_z = respu.seriefac;
      this.numfac_z = respu.ultimofolio;
    }
  );
}

buscarcliente() {
  var params_z = {
    modo : "buscar_un_cliente",
    codigo: this.numcli_z,
    idcli : -1
  }

  this.servicioclientes.buscaclientealta(JSON.stringify(params_z)).subscribe(
    respu => {
      if(respu) {
        this.cliente = respu;
        this.alerta("Este codigo ya Existe:" + this.cliente.nombre);
      }
    }
  );

}



}
