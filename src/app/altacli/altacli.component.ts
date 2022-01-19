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
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DlgdatoscliComponent } from './dlgdatoscli/dlgdatoscli.component';
import { DlgdatosmovcliComponent } from './dlgdatosmovcli/dlgdatosmovcli.component';
import { DlgDatosVndComponent } from './dlg-datos-vnd/dlg-datos-vnd.component';
import { DlgfacturaComponent } from './dlgfactura/dlgfactura.component';

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
  modoqom_z = [ { clave:"C", descri:"CONTADO"}];

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

  
  diasmes_z = [ {dia: 1}];
  mescum = "";

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


  constructor(public dialog: MatDialog, 
    private route: ActivatedRoute,
    private location: Location,
    private servicioclientes: ClientesService
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
          this.yaagentes_z = false;
          this.solicitudcli_z = false;
          this.facturacli_z = false;

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
  }
  

  asignaclienteanuevocli() {
    if(this.cliente) {
      this.nvocli.idcli = this.cliente.idcli;
      this.nvocli.numcli = this.cliente.numcli;
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
      this.mescum = this.meses_z[this.nvocli.mescum].descri;
      this.modoqom_z = [];
      if(this.nvocli.qom == "C") this.modoqom_z .push({clave:"C", descri:"CONTADO"})
      if(this.nvocli.qom == "Q") this.modoqom_z .push({clave:"Q", descri:"QUINCENAL"})
      if(this.nvocli.qom == "M") this.modoqom_z .push({clave:"M", descri:"MENSUAL"})
      this.busca_movclis(this.nvocli.idcli);
      //this.busca_cliagentes(this.nvocli.idcli);
      if(this.nvocli.qom != "C") {
        this.conaval = true;
        this.busca_aval(this.nvocli.idcli);
      } else {
        this.conaval = false;
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
  if(!this.facturacli_z) {
    var params_z = {
      modo : "buscar_cli_facturas",
      codigo: this.numcli_z,
      idcli : idcli_z
    }
    console.log("Debug: Estoy en busca_factura ", idcli_z);
    this.servicioclientes.busca_factura_altas(JSON.stringify(params_z)).subscribe(
      respu => {
        if(respu) {
          this.factura = respu[0];
          if(this.factura) {
            let precon = ( this.nvocli.preciolista * ( this.nvocli.piva / 100 + 1 )) -  this.nvocli.servicio;
            precon = this.nvocli.cargos - precon 
            if(precon < 0) precon = 0;
            this.factura.prodfin = precon;
            this.busca_renfacfo(this.factura.idfac);
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
  let idcli_z = idcli;
  let modo_z = "";
  let factmp =  <Factura> {};
  if (this.factura) {
    modo_z = "MODIFICAR";
    factmp = this.factura;
  } else {
    modo_z = "NUEVO";
    factmp.idfac = -1;
  }
  let params = {
    idcli: idcli,
    preciolista: this.nvocli.preciolista,
    servic: this.nvocli.servicio,
    cargos: this.nvocli.cargos,
    fechavta: this.nvocli.fechavta,
    ubiage: this.nvocli.ubica,
    factura: factmp,
    modo: modo_z,
  }
  console.log("Debug: crear factura params:", params);
  const dialogmov = this.dialog.open(DlgfacturaComponent, {
    width:'700px',
    data: JSON.stringify( params)
  });
  dialogmov.afterClosed().subscribe(res => {
    if (res) {
      let params_z = {
        idcli:idcli_z,
        iniciales:this.usrreg_z.iniciales
      }
    }
    this.busca_factura(idcli);
  });
}

}
