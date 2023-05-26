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
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 

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
import { Location } from '@angular/common';


@Component({
  selector: 'app-dlgdatoscli',
  templateUrl: './dlgdatoscli.component.html',
  styleUrls: ['./dlgdatoscli.component.css']
})
export class DlgdatoscliComponent implements OnInit {


  clientes : Cliente[] = [];
  cliente? : Cliente;
  cartaspro : Cartapro[] = [];
  solicitud?: Solicitud;
  mismovclis : Movclis[] = [];
  mimovcli? : Movclis;
  observs: Observcli[] = [];
  miobserv? : Observcli;
  ubivta : Ubivta[] = [];
  promotor : Promotor[] = [];
  nulets : Nulets[] = [];
  poblaciones : Poblacs[] = [];
  tarjetastc : Tarjetatc[] = [];
  aval? : Aval;


  conaval = false;
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

  meses_z = [
    { clave:1, descri:"ENERO"},
    { clave:2, descri:"FEBRERO"},
    { clave:3, descri:"MARZO"},
    { clave:4, descri:"ABRIL"},
    { clave:5, descri:"MAYO"},
    { clave:6, descri:"JUNIO"},
    { clave:7, descri:"JULIO"},
    { clave:8, descri:"AGOSTO"},
    { clave:9, descri:"SEPTIEMBRE"},
    { clave:10, descri:"OCTUBRE"},
    { clave:11, descri:"NOVIEMBRE"},
    { clave:12, descri:"DICIEMBRE"}
  ]
  
  diasmes_z = [ {dia: 1}];
  codigodisabled = true;
  canledisabled = false;
  bonifdisabled = false;
  letra1disabled = false;
  nuletsel = 0;

  numcli_z = "";
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

  factura_al_momento = false;

  constructor(public dialog: MatDialog, 
    public dialogRef: MatDialogRef<DlgdatoscliComponent>,
    @Inject(MAT_DIALOG_DATA) public message : string,


    private servicioclientes: ClientesService) { }

    ngOnInit(): void {
      this.buscarclienteinicial();
    }
  
    formularioEnviado() {
  
    }
  
    buscarclienteinicial() {
      let parnumcli_z = this.message;
      this.obtencatalogos();
      this.creadiasmes();
      if(parnumcli_z && parnumcli_z != "nuevocli" ) { 
        this.numcli_z = String(parnumcli_z ); 
        this.nvocli.modo = "agregar_cliente";
        this.nvocli.numcli = this.numcli_z;
        this.buscarcliente();
      } else {
        this.nvocli.modo = "modificar_cliente";
      }
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
            this.nvocli.qom = this.cliente.qom;
            //this.selecciona_letras_cliente();
            this.asignaclienteanuevocli();
            this.buscastatusmodificable();
            //this.busca_aval(this.cliente.idcli);
            //this.busca_movclis(this.cliente.idcli);
            //this.mostrar_vencimientos();
            //this.yaobscli_z = false;
            //this.plazoscli_z = false;
            //this.solicitudcli_z = false;
          }
        }
      );
  
    }

    buscastatusmodificable() {
      var params_z = {
        modo : "obtener_status_vta_facturacion_inmediata",
        numcli: this.numcli_z
      }
      console.log("buscastatusmodificable", params_z);
      
      this.factura_al_momento = false;
      this.servicioclientes.buscar_status_cliente_modificable(JSON.stringify(params_z)).subscribe(
        respu => {
          if(respu) {
            console.log("Respuesta buscar status cliente modificable", respu);
            
            this.factura_al_momento = (respu.facturalmomento == "SI");
           }
        }
      );
  
    }
  
      

    obtencatalogos() {
      let params_z = {
        modo : "buscar_cartas_promo"
      }
    
      this.servicioclientes.obtencartaprom(JSON.stringify(params_z)).subscribe(
        respu => {
          this.cartaspro = respu;
        }
      );
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
    
  
    asignaclienteanuevocli() {
      if(this.cliente) {
        this.nvocli.idcli = this.cliente.idcli;
        this.nvocli.numcli = this.cliente.numcli;
        this.nvocli.appat = this.cliente.appat;
        this.nvocli.apmat = this.cliente.apmat;
        this.nvocli.nompil1 = this.cliente.nompil1;
        this.nvocli.nompil2 = this.cliente.nompil2;
        this.nvocli.calle = this.cliente.direc;
        this.nvocli.numpred = this.cliente.direc;
        this.nvocli.colonia = this.cliente.direc;
        this.nvocli.codpost = this.cliente.direc;
        this.nvocli.poblac = this.cliente.poblac;
        this.nvocli.opcion = this.cliente.opcion;
        this.nvocli.pdsc = this.cliente.pdsc;
        this.nvocli.ubica = this.cliente.ubica;
        this.nvocli.ticte = this.cliente.ticte;
        this.nvocli.pdsc = this.cliente.pdsc;
        this.nvocli.diacum = this.cliente.diacum;
        this.nvocli.mescum = this.cliente.mescum;
        this.nvocli.promotor = this.cliente.promotor;
        this.nvocli.comisionprom = this.cliente.comisionprom;
        this.nvocli.pgocom = this.cliente.pgocom;
        this.nvocli.piva = this.cliente.piva;
        this.nvocli.servicio = this.cliente.servicio;
        this.nvocli.enganche = this.cliente.enganche;
        this.nvocli.preciolista = this.cliente.preciolista;
        this.nvocli.qom = this.cliente.qom;
        this.nvocli.nulet = this.cliente.nulet;
        this.nvocli.canle = this.cliente.canle;
        this.nvocli.bonificacion = this.cliente.bonificacion;
        this.nvocli.compra = this.cliente.compra;
        this.nvocli.calle = this.cliente.calle;
        this.nvocli.numpred = this.cliente.numpred;
        this.nvocli.codpost = this.cliente.codpost;
        this.nvocli.colonia = this.cliente.colonia;
        this.nvocli.status = this.cliente.status;
        this.nuletsel = this.cliente.nulet;

        if(this.nvocli.ticte == "TC") {
          this.contarjetatc = true;
          this.busca_tipos_tarjetas();
          this.busca_mi_tc(this.nvocli.idcli);
        } else {
          this.contarjetatc = false;
        }
        this.busca_aval(this.nvocli.idcli);
        this.selecciona_letras_cliente()
      }
  
    }

   
    busca_aval(idcli: number) {
      var params_z = {
        modo : "buscar_aval",
        codigo: this.numcli_z,
        idcli : idcli
      }
      this.servicioclientes.buscaavalaltas(JSON.stringify(params_z)).subscribe(
        respu => {
          if(respu) {
            this.aval = respu;
            this.nvoaval = this.aval;
          } else {
            this.aval = <Aval> {}
            this.aval.idcli = -1;
          }
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
        this.conaval=false;
      } else {
        this.canledisabled = false;
        this.bonifdisabled = false;
        this.letra1disabled = false;
        this.conaval=true;
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
  

    
    creadiasmes() {
      let ii_z = 1;
      let minumlet_z = "";
      this.diasmes_z=[];
      for (ii_z = 1; ii_z <= 31; ii_z++) {
        this.diasmes_z.push({ dia: ii_z});
      }
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
    

}
