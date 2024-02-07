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
import { Cliagentes } from '../models/cliagentes';
import { Factura } from '../models/facturas';
import { Renfacfo } from '../models/renfacfo';
import { Tarjetatc } from '../models/tipostarjetastc';
import { DlgedoctaComponent  } from '../common/dlgedocta/dlgedocta.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DlgdatoscliComponent } from './dlgdatoscli/dlgdatoscli.component';
import { DlgdatosmovcliComponent } from './dlgdatosmovcli/dlgdatosmovcli.component';
import { DlgDatosVndComponent } from './dlg-datos-vnd/dlg-datos-vnd.component';
import { DlgfacturaComponent } from './dlgfactura/dlgfactura.component';
import { DlgimpriletrasComponent } from '../common/dlgimpriletras/dlgimpriletras.component';
import { ConfiguracionService } from '../services/configuracion.service'
import { SpinnerComponent } from '../common/spinner/spinner.component';
import { PidepasswdComponent } from '../common/pidepasswd/pidepasswd.component';
import { PidefirmaComponent } from './pidefirma/pidefirma.component';

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
  factura? : Factura;
  renfacfo : Renfacfo[] = [];
  observs: Observcli[] = [];
  miobserv? : Observcli;
  ubivta : Ubivta[] = [];
  cliagentes : Cliagentes[]=[];
  solicitudcli_z = false;
  facturacli_z = false;
  conaval = true;
  contarjetatc = false;
  yaagentes_z = false;
  factura_al_momento = false;
  regimen_z = "";
  sinpassword = true;
  modoqom_z = [ { clave:"C", descri:"CONTADO"}];
  linkfactura = "";
  linksolicitud = "";
  conpromocion_z = false;
  diasgra_z = 0;

  inefrentecliente = "";
  inereversocliente = "";
  inefrenteaval = "";
  inereversoaval = "";


  promocion_z = {
    promodic_inicio: "2022-12-01",
    promodic_fin: "2022-12-31",
    promodic_dias:"15",
    promodic_mesesminimo:5
  }

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
  ];

  edoscivil = [
    {clave:"C", descri:"Casado"},
    {clave:"S", descri:"Soltero"}
  ];

  sexos = [
    {clave:"F", descri:"Femenino"},
    {clave:"M", descri:"Masculino"}
  ];

  letrasyaimpresas_z : number[] = [];  
  diasmes_z = [ {dia: 1}];
  mescum = "";
  firmacliente = "";
  firmaaval = "";

  numcli_z = "";
  nvocli = {
    modo : "agregar_cliente",
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
    mescum: 1,
    tarjetatc:""
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

  clienteabierto = false;
  fechacierre_z = "";
  letraspend = false;
  clientecred = false;
  esstatus1 = false;

  constructor(public dialog: MatDialog, 
    private route: ActivatedRoute,
    private location: Location,
    private servicioclientes: ClientesService,
    private config: ConfiguracionService,
    private router: Router
    ) { }

  ngOnInit(): void {
    var mistorage_z  = localStorage.getItem('token') || "{}";
    this.usrreg_z =  JSON.parse(mistorage_z);
    this.buscarclienteinicial();
  }

  formularioEnviado() {

  }

  buscarclienteinicial() {
    let parnumcli_z = this.route.snapshot.paramMap.get('numcli');
    this.obtencatalogos();
    if(parnumcli_z && parnumcli_z != "nuevocli" ) { 
      this.numcli_z = String(parnumcli_z ); 
      this.nvocli.modo = "agregar_cliente";
      this.buscarcliente();
    } else {
      let misdatosrelvta = {
        cvecia:this.config.getcvecia(),
        codigoini:"",
        codigofin:""
      } 
      let cverelvta_z = "relvtas_" + misdatosrelvta.cvecia;
      let registro_z = localStorage.getItem(cverelvta_z) || "{}";
      let misdatosiniciales_z = JSON.parse(registro_z);
      this.numcli_z = misdatosiniciales_z.codigoini + this.config.fecha_a_str(new Date(), "yymmdd") + "99";
      this.nvocli.modo = "modificar_cliente";
    }
    

  }

  buscarcliente() {
    var params_z = {
      modo : "buscar_un_cliente",
      codigo: this.numcli_z,
      idcli : -1
    }
    let estado_z = this.checa_nuevo_codigo(this.numcli_z);
    if(estado_z.resultado == "ERROR") {
      this.alerta(estado_z.error);
      return;
    }

    this.servicioclientes.buscaclientealta(JSON.stringify(params_z)).subscribe(
      respu => {
        if(respu) {
          this.cliente = respu;
          this.asignaclienteanuevocli();
          this.yaagentes_z = false;
          this.solicitudcli_z = false;
          this.facturacli_z = false;
          this.buscastatuscerrado();
          this.buscastatusmodificable();
          this.buscadiasgracia();
          this.actualizar_imagenes();

          //this.busca_aval(this.cliente.idcli);
          //this.busca_movclis(this.cliente.idcli);
          //this.mostrar_vencimientos();
          //this.yaobscli_z = false;
          //this.plazoscli_z = false;
          //this.solicitudcli_z = false;
        } else {
          const dialogref = this.dialog.open(DialogBodyComponent, {
            width:'350px',
            data: "Cliente Inexistente"
          });
          dialogref.afterClosed().subscribe(res => {
            //if(res) {
            //  this.pidedatosnuevocliente();
            //}
          });
     
        }
      }
    );

  }

  getImagenURLfirmaCliente(clioaval: string) {
    
    this.firmacliente = `${this.servicioclientes.url}uploads/firmas/${this.numcli_z}_${clioaval}_firma.jpg` +  '?timestamp=' + new Date().getTime();
      return(this.firmacliente);
  
  }

  getImagenURLfirmaAval(clioaval: string) {
    
    this.firmaaval = `${this.servicioclientes.url}uploads/firmas/${this.numcli_z}_aval_firma.jpg` +  '?timestamp=' + new Date().getTime();
      return(this.firmaaval);
  
  }


  checa_nuevo_codigo(numcli_z: String ) {
    let result ={
      resultado: "OK",
      error: ""
    }
    let fechahoy = new Date();
    let conse_z = numcli_z.substring(8,10);
    this.nvocli.promotor = conse_z;
    let codcartera_z = numcli_z.substring(0,2);
    let diasdif = 0;
    let fechavta = "20" + numcli_z.substring(2,4) + "-" + 
    numcli_z.substring(4,6) + "-" + 
    numcli_z.substring(6,8);

    let fecvta =  new Date(fechavta.replace(/-/g, '\/'));
    let strfecvta = this.config.fecha_a_str(fecvta, "YYYY-mm-dd");
    let dias = Math.floor( ( fechahoy.getTime() - fecvta.getTime()  ) / (86400000));
    console.log("Fecha Vta:", strfecvta, " Fecha:", fechavta, "Dias:", dias);
    if(strfecvta != fechavta ) {
      result.resultado = "ERROR";
      result.error = " Fecha Inválida:" + fechavta ;
    } else {
      dias = Math.abs(dias);
      if(dias > 60 ) {
        result.resultado = "ERROR";
        result.error += " Fecha Fuera de Rango:" + fechavta + " " + dias.toString() + " Dias";
      }
  
    }
    if ( codcartera_z != Number(codcartera_z).toString().padStart(2, "0")) {
      result.resultado = "ERROR";
      result.error += " Codigo de Cartera es incorrecto:" + codcartera_z;
    }
    if ( conse_z != Number(conse_z).toString().padStart(2, "0")) {
      result.resultado = "ERROR";
      result.error += " Consecutivo es Incorrecto:" + conse_z;
    }
    return (result);
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

  buscadiasgracia() {
    var params_z = {
      modo : "obtener_dias_promocion",
      codigo: this.numcli_z
    }
    console.log("buscasdiasgracia", params_z);
    
    this.conpromocion_z = false;
    this.diasgra_z = 0;
    this.servicioclientes.altas_buscar_dias_promocion(JSON.stringify(params_z)).subscribe(
      respu => {
        if(respu) {
          if(respu.diasgracia > 0) {
            this.conpromocion_z = true;
            this.diasgra_z = respu.diasgracia;
          }
         }
      }
    );

  }



  buscastatuscerrado() {
    var params_z = {
      modo : "obtener_status_cierre_cliente_altas",
      numcli: this.numcli_z
    }
    this.clienteabierto = false;
    this.servicioclientes.buscar_status_cliente_cerrado(JSON.stringify(params_z)).subscribe(
      respu => {
        if(respu) {
          this.clienteabierto = (respu.status == "VENTA_ABIERTA");
          this.fechacierre_z = respu.fecha;
         }
      }
    );

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
          console.log("Debug:", this.aval);
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
    this.promocion_z = this.config.obtenpromocion();
  }
  

  asignaclienteanuevocli() {
    if(this.cliente) {
      this.nvocli.idcli = this.cliente.idcli;
      this.nvocli.numcli = this.cliente.numcli;
      this.nvocli.status = this.cliente.status;
      this.esstatus1 = (this.cliente.status == "*")
      this.nvocli.nombre = this.cliente.nombre;
      this.nvocli.direc = this.cliente.direc;
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
      this.nvocli.letra1 = this.cliente.letra1;
      this.nvocli.qom = this.cliente.qom;
      this.nvocli.nulet = this.cliente.nulet;
      this.nvocli.canle = this.cliente.canle;
      this.nvocli.cargos = this.cliente.cargos;
      this.nvocli.abonos = this.cliente.abonos;
      this.nvocli.bonificacion = this.cliente.bonificacion;
      this.nvocli.compra = this.cliente.compra;
      this.nvocli.calle = this.cliente.calle;
      this.nvocli.numpred = this.cliente.numpred;
      this.nvocli.codpost = this.cliente.codpost;
      this.nvocli.colonia = this.cliente.colonia;
      this.nvocli.email = this.cliente.email;
      this.nvocli.fechavta = this.cliente.fechavta;
      this.mescum = this.meses_z[this.nvocli.mescum -1 ].descri;
      this.modoqom_z = [];
      if(this.nvocli.qom == "C") this.modoqom_z .push({clave:"C", descri:"CONTADO"})
      if(this.nvocli.qom == "Q") this.modoqom_z .push({clave:"Q", descri:"QUINCENAL"})
      if(this.nvocli.qom == "M") this.modoqom_z .push({clave:"M", descri:"MENSUAL"})
      this.busca_movclis(this.nvocli.idcli);
      this.buscastatuscerrado();
      if(this.nvocli.qom != "C") {
        this.busca_letras_pendientes();
      } else {
        this.letraspend = false;
      }
      //this.busca_cliagentes(this.nvocli.idcli);
      if(this.nvocli.qom != "C") {
        this.conaval = true;
        this.clientecred = true;
        this.busca_aval(this.nvocli.idcli);
      } else {
        this.conaval = false;
        this.clientecred = true;
        this.aval = <Aval> {};
        if(this.nvocli.ticte == "TC") {
          this.busca_mi_tc(this.nvocli.idcli);
          this.contarjetatc = true;
        } else {
          this.contarjetatc = false;
        }
        console.log("Debug: contarjetatc:", this.contarjetatc);
      }
    }

  }

  busca_letras_pendientes() {
    var params_z = {
      modo : "obtener_status_letras_impresas",
      numcli: this.numcli_z
    }
    this.letraspend = true;
    this.servicioclientes.buscar_cliente_altas_letras_pendientes(JSON.stringify(params_z)).subscribe(
      respu => {
        if(respu) {
          this.letraspend = (respu.seimprimierontodaslasletras == "false");
          this.alerta("Letras Pendientes:" + this.letraspend + ":" + respu.seimprimierontodaslasletras);
         }
      }
    );

  }

  busca_movclis(idcli_z : number) {
    var params_z = {
      modo : "buscar_movtos_cliente",
      codigo: this.numcli_z,
      idcli : idcli_z
    }
    console.log("Debug: Estoy en busca movclis ", idcli_z);
    this.servicioclientes.buscamovtos_altas(JSON.stringify(params_z)).subscribe(
      respu => {
        if(respu) {
          this.mismovclis = respu;
        } 
      }
    );
  }

  busca_mi_tc(idcli_z : number) {
    var params_z = {
      modo : "buscar_cli_tarjeta_tc",
      codigo: this.numcli_z,
      idcli : idcli_z
    }
    console.log("Debug: Estoy en busca tarjeta tc cliente ", idcli_z);
    this.servicioclientes.buscar_cli_tarjetas_tc(JSON.stringify(params_z)).subscribe(
      respu => {
        if(respu) {
          this.nvocli.tarjetatc = respu.clave;
        } 
      }
    );
  }

  
  pidedatosnuevocliente () {
    const dialogcli = this.dialog.open(DlgdatoscliComponent, {
      width:'650px',
      data:this.numcli_z
    });
    dialogcli.afterClosed().subscribe(res => {
      if (res) {
        res.modo = "agregar_cliente";
        res.clienterespu.modo="agregar_cliente";
        this.nvocli.numcli = res.clienterespu.numcli;
        this.nvocli.fechavta = res.clienterespu.fechavta;
        this.nvocli.qom = res.clienterespu.qom;
        this.nvocli.nulet = res.clienterespu.nulet;
        this.servicioclientes.agrega_nuevo_cliente(JSON.stringify(res)).subscribe(
          respu => {
            if(respu) {
              if(respu.status == "Error") {
                this.alerta(respu.error);
              } else {
                this.buscarcliente();
                this.grabar_promocion_cliente();
              }
            } else {
              this.alerta("Ocurrió un error en alta");
            }
          }
        );
      }
      console.log("Debug: Regrese de Asignar datos", res);
    });
  }

  
  grabar_promocion_cliente() {
    let mesesvta = this.nvocli.nulet;
    if(this.nvocli.qom == "Q") mesesvta = mesesvta * 2;
    let fvta_z = "20" + this.numcli_z.substring(2,4) + "-" + 
      this.numcli_z.substring(4,6) + "-" + 
      this.numcli_z.substring(6,8);
    
    //console.log("Grabando promocion cliente Fechavta:", fvta_z, " Meses", mesesvta);
    
    if(fvta_z < this.promocion_z.promodic_inicio ||
      fvta_z  > this.promocion_z.promodic_fin)
    return;
    if(this.nvocli.qom == 'C') return;
    if(mesesvta < this.promocion_z.promodic_mesesminimo) return;
    //this.alerta("Se va a grabar la promocion");

      var params_z = {
          modo : "grabar_dias_promocion",
          diasgracia: this.promocion_z.promodic_dias,
          codigo: this.numcli_z
      }
      console.log("Grabar promocion", params_z);
        
      this.conpromocion_z = false;
      this.diasgra_z = 0;
      this.servicioclientes.altas_agregar_dias_promocion(JSON.stringify(params_z)).subscribe(
        respu => {
          console.log("Se agrego los dias de promicion");
        }
      );
    
  }

  modificarcliente () {
    const dialogcli = this.dialog.open(DlgdatoscliComponent, {
      width:'650px',
      data:this.numcli_z
    });
    dialogcli.afterClosed().subscribe(res => {
      if (res) {
        res.modo = "modificar_cliente";
        res.clienterespu.modo="modificar_cliente";
        this.servicioclientes.agrega_nuevo_cliente(JSON.stringify(res)).subscribe(
          respu => {
            if(respu) {
              this.buscarcliente();
            } else {
              this.alerta("Ocurrió un error en alta");
            }
          }
        );

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
    
    this.servicioclientes.agrega_nuevo_cliente(JSON.stringify(this.nvocli)).subscribe(
      respu => {
        if(respu) {
          this.buscarcliente();

        } else {
          this.alerta("Ocurrió un error en alta");
        }
      }
    );
  }

  agregar_movto() {
    this.pidedatos_movcli();
  }

  pidedatos_movcli () {
    const dialogmov = this.dialog.open(DlgdatosmovcliComponent, {
      width:'650px',
      data:"NUEVO"
    });
    dialogmov.afterClosed().subscribe(res => {
      if (res) {
        this.mimovcli = res;
        this.si_agregar_movto();
      }
      console.log("Debug: Regrese de Asignar datos", res);
    });
  }

  si_agregar_movto() {
    let params_z = {
      modo:"agregar_movimiento",
      idcli:0,
      numcli:"",
      fecha:"",
      concepto:"",
      tipag:"",
      recobon:0,
      importe:0,
      iniciales:""
    }
    let nvoabono_z = 0;
    if(this.cliente) {
      params_z.idcli = this.cliente.idcli;
      params_z.numcli = this.cliente.numcli;
    }
    if(this.mimovcli) {
      params_z.fecha = this.mimovcli.fechamov;
      params_z.concepto = this.mimovcli.concep;
      params_z.tipag = this.mimovcli.tipag;
      if(params_z.tipag == "AB") {
        params_z.recobon = this.mimovcli.bonificacion;
      } else {
        params_z.recobon = this.mimovcli.recargo;
      }
      params_z.importe = this.mimovcli.importe;
      nvoabono_z = this.mimovcli.importe;

      params_z.iniciales = this.usrreg_z.iniciales;
    }
    this.servicioclientes.agrega_nuevo_movimiento(JSON.stringify(params_z)).subscribe(
      respu => {
        console.log("Debug:" , respu);
        if(respu) {
          this.busca_movclis(params_z.idcli);
          this.actualizacliente(nvoabono_z);
        } else {
          this.alerta("Ocurrió un error en agregar Movimientos");
        }
      }
    );


  }

  actualizacliente (abono: number) {
    if(this.cliente) {
      this.cliente.abonos += abono;
    }
    if(this.nvocli) {
      this.nvocli.abonos += abono;
    }
  }

  modificar_movto(movcli: Movclis) {
    let idcli_z = movcli.idcli;
    let miabono_z = movcli.importe;
    const dialogmov = this.dialog.open(DlgdatosmovcliComponent, {
      width:'650px',
      data:JSON.stringify(movcli)
    });
    dialogmov.afterClosed().subscribe(res => {
      if (res) {
        this.mimovcli = res;
        let params_z = {
          idcli:idcli_z,
          numcli:this.numcli_z,
          idmvcli:res.idmvcli,
          fecha:res.fechamov,
          concepto:res.concep,
          tipag:res.tipag,
          recobon:0,
          importe:res.importe,
          iniciales:this.usrreg_z.iniciales
        }
        miabono_z = res.importe - miabono_z;
        if(params_z.tipag == "AB") {
          params_z.recobon = res.bonificacion;
        } else {
          params_z.recobon = res.recargo;
        }
    
        this.servicioclientes.modificar_movimiento(JSON.stringify(params_z)).subscribe(
          respu => {
            respu.iniciales = this.usrreg_z.iniciales;
            console.log("Debug:" , respu);
            if(respu) {
              this.busca_movclis(idcli_z);
              this.actualizacliente(miabono_z);

            } else {
              this.alerta("Ocurrió un error en agregar Movimientos");
            }
          }
        );
      }
    });
  }

  eliminar_movto(movcli: Movclis) {
    let idcli_z = movcli.idcli;
    let miabono_z = movcli.importe * -1;
    const dialogref = this.dialog.open(DialogBodyComponent, {
      width:'350px',
      data: 'Seguro de Eliminar Movimiento: ' + movcli.fechamov + 
      " " + movcli.concep 
    });
    dialogref.afterClosed().subscribe(res => {
      if(res) {
        this.servicioclientes.eliminar_movimiento(JSON.stringify(movcli)).subscribe(
          respu => {
            respu.iniciales = this.usrreg_z.iniciales;
            console.log("Debug:" , respu);
            if(respu) {
              this.busca_movclis(idcli_z);
              this.actualizacliente(miabono_z);
            } else {
              this.alerta("Ocurrió un error en agregar Movimientos");
            }
          }
        );

      }
      //console.log("Debug", res);
    });

  }

  busca_cliagentes(idcli_z : number) {
    if(!this.yaagentes_z) {
      var params_z = {
        modo : "buscar_cli_agentes",
        codigo: this.numcli_z,
        idcli : idcli_z
      }
      console.log("Debug: Estoy en busca cliagentes ", idcli_z);
      this.servicioclientes.busca_cliagentes_altas(JSON.stringify(params_z)).subscribe(
        respu => {
          if(respu) {
            this.cliagentes = respu;
          } 
        }
      );
      this.yaagentes_z = true;
  
    }
  }

  agregar_agente() {
      let cliagente = <Cliagentes> {};
      let idcli_z = this.nvocli.idcli;
      const dialogmov = this.dialog.open(DlgDatosVndComponent, {
        width:'650px',
        data:"NUEVO"
      });
      dialogmov.afterClosed().subscribe(res => {
        if (res) {
          cliagente = res;
          cliagente.idcli = idcli_z;
          this.servicioclientes.agregar_cli_agente(JSON.stringify(cliagente)).subscribe(
            respu => {
              if(respu) {
                this.yaagentes_z = false;
                this.busca_cliagentes(this.nvocli.idcli);
  
              } else {
                this.alerta("Ocurrió un error en agregar cli_agente");
              }
            }
          );
        }

      });
 
  }

  modificar_agente(miagente : Cliagentes ) {
    let idcli_z = this.nvocli.idcli;
    const dialogmov = this.dialog.open(DlgDatosVndComponent, {
      width:'650px',
      data:JSON.stringify(miagente)
    });
    dialogmov.afterClosed().subscribe(res => {
      if (res) {
        miagente = res;
        miagente.idcli = idcli_z;
        this.servicioclientes.modificar_cli_agente(JSON.stringify(miagente)).subscribe(
          respu => {
            if(respu) {
              this.yaagentes_z = false;
              this.busca_cliagentes(this.nvocli.idcli);

            } else {
              this.alerta("Ocurrió un error en modificar cli_agente");
            }
          }
        );
      }

    });

}

eliminar_agente(miagente: Cliagentes) {
  let idcli_z = miagente.idcli;
  const dialogref = this.dialog.open(DialogBodyComponent, {
    width:'350px',
    data: 'Seguro de Eliminar Comision de : ' + miagente.codvnd 
  });
  dialogref.afterClosed().subscribe(res => {
    if(res) {
      this.servicioclientes.eliminar_cli_agente(JSON.stringify(miagente)).subscribe(
        respu => {
          if(respu) {
            this.yaagentes_z = false;
            this.busca_cliagentes(this.nvocli.idcli);
          } else {
            this.alerta("Ocurrió un error en eliminar cli_agente");
          }
        }
      );
    }
    //console.log("Debug", res);
  });

}

busca_solicitud(idcli_z : number) {
  this.linksolicitud = "/solicitud/" +  this.numcli_z;
  if(!this.solicitudcli_z) {
    var params_z = {
      modo : "buscar_solicitud",
      codigo: this.numcli_z,
      idcli : idcli_z
    }
    console.log("Debug: Estoy en busca_solicit ", idcli_z);
    this.servicioclientes.busca_solicitud_altas(JSON.stringify(params_z)).subscribe(
      respu => {
        if(respu) {
          this.solicitud = respu;
        } 
      }
    );
    this.solicitudcli_z = true;

  }
}

busca_factura(idcli_z : number) {
  let idfac_z = -1;
  if(!this.facturacli_z) {
    var params_z = {
      modo : "buscar_cli_facturas",
      codigo: this.numcli_z,
      idcli : idcli_z
    }
    this.linkfactura = "/facturacli/" + idfac_z.toString() + "/" + this.numcli_z;
    this.servicioclientes.busca_factura_altas(JSON.stringify(params_z)).subscribe(
      respu => {
        if(respu) {
          this.factura = respu[0];
          if(this.factura) {
            let precon = ( this.nvocli.preciolista * ( this.nvocli.piva / 100 + 1 )) +  this.nvocli.servicio;
            precon = this.nvocli.cargos - precon 
            this.regimen_z = this.factura.regimen + " " + this.factura.descriregimen;
            if(precon < 0) precon = 0;
            this.factura.prodfin = Math.round(precon);
            idfac_z = this.factura.idfac;
            this.busca_renfacfo(this.factura.idfac);
            this.linkfactura = "/facturacli/" + idfac_z.toString() + "/" + this.numcli_z;
          }

        } 
      }
    );
    this.facturacli_z = true;

  }
}

busca_renfacfo(idfacfon_z : number) {
    var params_z = {
      modo : "buscar_renfac",
      codigo: this.numcli_z,
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

factura_cli(idcli: number) {

  let numcli_z = this.numcli_z
  let modo_z = "";
  let idfac_z = -1;
  if (this.factura) {
    idfac_z = this.factura.idfac;
  } 
  let url_z = "/facturacli/`${idfac}/${numcli_z}`";
  this.router.navigateByUrl(url_z).then( (e) => {
    if (e) {
      console.log("Navigation is successful!");
    } else {
      console.log("Navigation has failed!");
    }
  });
}

imprimir_tarjeta() {
  var params_z = {
    modo : "imprimir_tarjeta",
    numcli: this.numcli_z
  }
  console.log("Debug: Estoy en imprmir_tarjeta ", this.numcli_z);
  this.servicioclientes.imprimir_tarjeta_altas(JSON.stringify(params_z));
}

imprimir_edocta() {
  var params_z = {
    modo : "imprimir_edocta_altas",
    numcli: this.numcli_z
  }
  console.log("Debug: Estoy en imprmir_tarjeta ", this.numcli_z);
  this.servicioclientes.imprimir_edocta_altas(JSON.stringify(params_z));
}

cerrarcliente() {
  var params_z = {
    modo : "cerrar_cliente_altas",
    numcli: this.numcli_z
  }
  console.log("Debug: Estoy en Cerrar Cliente");
  this.servicioclientes.cerrar_cliente_altas(JSON.stringify(params_z)).subscribe(
    respu => {
      if(respu) {
        this.alerta("Cliente Cerrado");
        this.clienteabierto = false;
  
      } 
    }
  );
}

async imprimir_letras() {
  let nulets = 0;
  
  if(!this.cliente) {
    this.alerta("Aun no ha accesado ningun cliente");
    return;
  }
  nulets = this.cliente.nulet;
  let idcli = this.cliente.idcli;
  this.letrasyaimpresas_z = [];
  if(this.sinpassword) {
    await this.buscar_letras_impresas();
  }
  let nletrasimpresas = this.letrasyaimpresas_z.length;
  
  console.log("Letras Ya Impresas:", nletrasimpresas, nulets);
  
  if(nletrasimpresas >= nulets) {
     this.alerta("Ya se han impreso todas las letras");
     return;
  }
  let ltaini_z = nulets;
  let ltafin_z = 0;
  for (let mii_z = 1; mii_z <= nulets; mii_z++) {
     if (!this.letrasyaimpresas_z.includes(mii_z) ) {
       if(mii_z < ltaini_z) ltaini_z = mii_z;
       if(mii_z > ltafin_z) ltafin_z = mii_z;
     } 
  }

  let params_z = {
    "ltaini": ltaini_z,
    "ltafin": ltafin_z,
    "letrasimpresas": this.letrasyaimpresas_z,
    "title": "Seleccione Las letras a Imprimir"
  }
  const dialogref = this.dialog.open(DlgimpriletrasComponent, {
    width:'350px',
    data: JSON.stringify( params_z)
  });
  let yaimprimi_z = 0;
  dialogref.afterClosed().subscribe(res => {
    if(res) {
      let valido = true;
      for (let mii_z = res.ltaini; mii_z <= res.ltafin; mii_z++) {
         
         if(valido) {
          console.log("Checando Letra:", mii_z, "Valido:", valido);
          if (this.letrasyaimpresas_z.includes(mii_z) ) {
            valido = false; yaimprimi_z = mii_z;
          } 
         }
      }
      if(!valido) {
        this.alerta("La letra " + yaimprimi_z.toString() + " Ya fue impresa previamente");
        return;
      }
      let params_z = {
        numcli: this.numcli_z,
        idcli: idcli,
        letrainicial: res.ltaini,
        letrafinal: res.ltafin,
        modopdf: res.formapdf
      };
      this.servicioclientes.imprimir_letras_altas(JSON.stringify(params_z));
    }
  });
}

async buscar_letras_impresas() {
  let numcli_z = "";
  if(!this.cliente) {
    this.alerta("Aun no ha accesado ningun cliente");
  } else {
    numcli_z = this.cliente.numcli;
    let params_z = {
      modo: "obtener_lista_letras_impresas",
      codigo: numcli_z
    }
    let parms_z = JSON.stringify(params_z);
    this.letrasyaimpresas_z = [];
    try {
        let res = await this.servicioclientes.obtener_lista_letras_impresas(parms_z).toPromise();
        for(let mii_z of res) {
          this.letrasyaimpresas_z.push(mii_z.letra);
        }
        
    } catch(err) {
        console.log(err); // you might not actually want to eat this exception.
    }        

  }
 
}

modificar_status_facalmomento() {
  this.sinpassword = true;
  let cod_z = this.numcli_z.substring(0,2);
   let params_z = {
    "ubicacion": cod_z
   }
   const dlgdatosrenfac= this.dialog.open(PidepasswdComponent, {
    width: '400px',
    data: JSON.stringify(params_z)
   });
   dlgdatosrenfac.afterClosed().subscribe(res => {
      console.log("Regresando de Pide Password", res, params_z);
       
       if(res) {
        this.sinpassword = false;
        this.factura_al_momento = false;
        let paramsmodif_z = {
          numcli: this.numcli_z,
          statusfacalmomento: "NO"
        }
        this.servicioclientes.grabar_status_cliente_modificable(JSON.stringify(paramsmodif_z)).subscribe( resalta=> {
          console.log("Se ha agregado status no modificable");
          
        });
   
       }
       
      }
   );

}

pedir_firma( modo: string) {
  this.sinpassword = true;
  let cod_z = this.numcli_z.substring(0,2);
   let params_z = {
    "modo": modo, 
    "codigo":this.numcli_z,
    "tipoimagen": "firmas"
   }
   const dlgdatosrenfac= this.dialog.open(PidefirmaComponent, {
    width: '500px',
    height: '300px',
    data: JSON.stringify(params_z)
   });
   dlgdatosrenfac.afterClosed().subscribe(res => {
       
       if(res) {
        this.getImagenURLfirmaCliente("cliente");
        this.getImagenURLfirmaAval("aval");
   
       }
       
      }
   );
}

pedir_imagen( modo: string) {
  this.sinpassword = true;
  let cod_z = this.numcli_z.substring(0,2);
   let params_z = {
    "modo": modo, 
    "codigo":this.numcli_z,
    "tipoimagen": "ine"
   }
   const dlgdatosrenfac= this.dialog.open(PidefirmaComponent, {
    width: '500px',
    height: '300px',
    data: JSON.stringify(params_z)
   });
   dlgdatosrenfac.afterClosed().subscribe(res => {
       
       if(res) {
        this.getImagenURLfirmaCliente("cliente");
        this.getImagenURLfirmaAval("aval");

   
       }
       
      }
   );
}

actualizar_imagenes() {
  this.getImagenURLIneFrenteCliente('ine_frente_cliente')
  this.getImagenURLIneReversoCliente('ine_reverso_cliente')
  this.getImagenURLIneFrenteAval('ine_frente_aval')
  this.getImagenURLIneReversoAval('ine_reverso_aval')
}


getImagenURLIneFrenteCliente(modo: string) {
  this.inefrentecliente = this.getImagenURLIne(modo)
}

getImagenURLIneReversoCliente(modo: string) {
  this.inereversocliente = this.getImagenURLIne(modo)
}

getImagenURLIneFrenteAval(modo: string) {
  this.inefrenteaval = this.getImagenURLIne(modo)
}

getImagenURLIneReversoAval(modo: string) {
  this.inereversoaval = this.getImagenURLIne(modo)
}


getImagenURLIne(modo: string) {
  let id = Math.round( Math.random() * 1000);
  let imagin =  `${this.servicioclientes.url}uploads/ine/${this.numcli_z}_${modo}.jpg?id=${id}`;
  return(imagin);

}



}
