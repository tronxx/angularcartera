import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service'
import { FormsModule } from '@angular/forms';
import { formatNumber,  CommonModule,  CurrencyPipe, formatCurrency, formatDate, DatePipe } from '@angular/common';
import { isEmpty } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card'; 
import { MatTabsModule } from '@angular/material/tabs';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { DlgbuscliComponent } from '../common/dlgbuscli/dlgbuscli.component';
import { MatIconModule } from '@angular/material/icon'; 
import { Cliente } from '../models/clientes';
import { Aval } from '../models/aval';
import { Movclis } from '../models/movclis';
import { Observcli } from '../models/observcli';
import { Solicitud } from '../models/solicitud';
import { Cartapro } from '../models/cartapro';
import { Ubivta } from '../models/ubivta';
import { DlgedoctaComponent  } from '../common/dlgedocta/dlgedocta.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DlgdatoscliComponent } from './dlgdatoscli/dlgdatoscli.component';

@Component({
  selector: 'app-altacli',
  templateUrl: './altacli.component.html',
  styleUrls: ['./altacli.component.css']
})
export class AltacliComponent implements OnInit {

  clientes : Cliente[] = [];
  cliente? : Cliente;
  cartaspro : Cartapro[] = [];
  aval? : Aval;
  solicitud?: Solicitud;
  mismovclis : Movclis[] = [];
  mimovcli? : Movclis;
  observs: Observcli[] = [];
  miobserv? : Observcli;
  ubivta : Ubivta[] = [];

  tictes_z = [
    { clave:"PC", descri:"PRIMER CREDITO"},
    { clave:"AR", descri:"AVAL CON REFERENCIAS"},
    { clave:"CR", descri:"CLIENTE CON REFERENCIAS"},
    { clave:"CC", descri:"CLIENTE DE CONTADO"},
    { clave:"TC", descri:"TARJETA CREDITO"}

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

  numcli_z = "";
  nvocli = {
    modo : "agregar_cliente",
    idcli: 0,
    numcli: "",
    appat:"",
    apmat:"",
    nompil1:"",
    nompil2:"",
    calle:"",
    numpred:"",
    codpost:"",
    colonia: "",
    poblac: "",
    status: "",
    fechavta: "",
    qom: "",
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
    mescum: 1
  }

  constructor(public dialog: MatDialog, 
    private route: ActivatedRoute,
    private location: Location,
    private servicioclientes: ClientesService
    ) { }

  ngOnInit(): void {
    this.buscarclienteinicial();
  }

  formularioEnviado() {

  }

  buscarclienteinicial() {
    let parnumcli_z = this.route.snapshot.paramMap.get('numcli');
    this.obtencatalogos();
    this.creadiasmes();
    if(parnumcli_z && parnumcli_z != "nuevocli" ) { 
      this.numcli_z = String(parnumcli_z ); 
      this.nvocli.modo = "agregar_cliente";
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
          this.asignaclienteanuevocli();
          //this.busca_aval(this.cliente.idcli);
          //this.busca_movclis(this.cliente.idcli);
          //this.mostrar_vencimientos();
          //this.yaobscli_z = false;
          //this.plazoscli_z = false;
          //this.solicitudcli_z = false;
        } else {
          const dialogref = this.dialog.open(DialogBodyComponent, {
            width:'350px',
            data: "Cliente Inexistente. Desea dar de alta ?"
          });
          dialogref.afterClosed().subscribe(res => {
            if(res) {

              this.pidedatosnuevocliente();
            }
          });
      
        }
      }
    );

  }

  obtencatalogos() {
    var params_z = {
      modo : "buscar_cartas_promo",
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
    }

  }

  creadiasmes() {
    let ii_z = 1;
    let minumlet_z = "";
    this.diasmes_z=[];
    for (ii_z = 1; ii_z <= 31; ii_z++) {
      this.diasmes_z.push({ dia: ii_z});
    }
  }

  pidedatosnuevocliente () {
    const dialogcli = this.dialog.open(DlgdatoscliComponent, {
      width:'650px',
      data:this.numcli_z
    });
    dialogcli.afterClosed().subscribe(res => {
      if (res) {
        this.nvocli = res;
        this.agrega_nuevo_cliente();
      }
      console.log("Debug: Regrese de Asignar datos", res);
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

  agrega_nuevo_cliente() {

  }
  


}
