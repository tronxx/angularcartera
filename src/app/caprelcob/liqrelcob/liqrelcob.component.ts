 import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; 
import { ClientesService } from '../../services/clientes.service';
import { ConfiguracionService } from '../../services/configuracion.service';
import { PolizasService } from '../../services/polizas.service';
import { formatNumber,  CommonModule,  CurrencyPipe, formatCurrency, formatDate, DatePipe } from '@angular/common';
import { Cliente } from '../../models';
import { Compania } from '../../models';
import { Relcob } from '../../models';
import { DlgimpripolComponent } from '../../dlgimpripol/dlgimpripol.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import { DialogBodyComponent } from '../../dialog-body/dialog-body.component';
import { DlgplazosComponent } from '../../common/dlgplazos/dlgplazos.component';
import { Promotor } from '../../models';
import { CodigoPoliza } from '../../models';
import { Renrelco } from '../../models';
import { RelcobService } from '../../services/relcob.service';
import { DlgdatosrelcobComponent } from './../dlgdatosrelcob/dlgdatosrelcob.component'
import { AgregarenpolComponent } from '../../polizas/agregarenpol/agregarenpol.component';
import { Poliza } from '../../models/polizas';
import { Renpol } from '../../models/renpol';
import { DlgcomiscobComponent } from './dlgcomiscob/dlgcomiscob.component';
@Component({
  selector: 'app-liqrelcob',
  templateUrl: './liqrelcob.component.html',
  styleUrls: ['./liqrelcob.component.css']
})
export class LiqrelcobComponent implements OnInit {

  relcob? : Relcob;
  renglonesrelcob: Renrelco[] = [];
  codigopoliza?: CodigoPoliza;
  poliza?: Poliza;
  renpol?: Renpol;
  renglonesPoliza : Renpol[] = [];
  cobratario?: Promotor;

  puedeagregar_z = false;

  idrelcob_z = 0;
  estadocerrado_z = 9;
  estadoabierto_z = 0;
  fechapol = this.datePipe.transform(new Date(),"yyyy-MM-dd");
  polizaactiva_z = false;
  polizacerrada_z = true;
  tda_z = ""
  idpoliza = -1;
  totalbonifcs_z = 0;
  totalrecargs_z = 0;
  totalimports_z = 0;
  cia_z?: Compania;
  codcli_z = "";
  claveempresa = "";
  uuidrec_z = "";
  rotarpdftxt = "Rotar pdf"
  sirotarpdf = false;
  datosalerta = {
    alertapoliza : true
  }
  
  creandoRelacion = false;

  no_master = true;

  usrreg_z = {
    "idusuario":0,
    "login":"",
    "nombre":"",
    "token":"",
    "acceso": "false",
    "iniciales":"",
    "nivel":""
  }

  datosplazo = {
    fechaplazo: "",
    venceplazo: "",
    observs: ""
  }

  constructor(
    public dialog: MatDialog, 
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private relcobservice : RelcobService,
    private serviciospolizas: PolizasService,
    private servicioclientes: ClientesService
  ) { }

  ngOnInit(): void {
    this.idrelcob_z = Number(this.route.snapshot.paramMap.get('idrelcob'));
    console.log("idrelcob", this.idrelcob_z);
    var mistorage_z  = localStorage.getItem('token') || "{}";
    this.usrreg_z =  JSON.parse(mistorage_z);

    if(this.usrreg_z.nivel == "S") this.no_master = false;
    this.cia_z =  this.serviciospolizas.obtendatoscia();
    this.claveempresa = this.cia_z.Clave
    let mialerta   = localStorage.getItem('alertapoliza') || '{ "alertapoliza":"true" }';
    this.datosalerta =  JSON.parse(mialerta);
    this.buscar_relacion();
  }

  buscar_relacion() {
    let params_z = {
      modo: "buscar_relacion_cobranza",
      idrelacion: this.idrelcob_z
    }
    this.relcobservice.busca_relacion_cobranza(JSON.stringify(params_z)).subscribe(
      respu => {
        this.relcob = respu;
        this.idrelcob_z = this.relcob.idcarrelcob;
        this.busca_codigo_poliza(this.relcob.idcodpol);
        this.busca_renglones_relcob();
        this.buscar_promotor(this.relcob.promot);
      }
    )

  }

  busca_codigo_poliza(idcodpol: number) {
    let params_z = {
      modo : "buscar_datos_codigo_tienda",
      idcodpol: idcodpol
    }
    this.serviciospolizas.obtener_datos_codigo_tienda (JSON.stringify(params_z)).subscribe(
      respu => {
        this.codigopoliza = respu;
      }
    )

  }

  aceptar_fecha_pol() {
      //this.buscar_codigos_poliza();
      var params = {
        "modo":"acceder_poliza",
        "fecha":this.fechapol,
        "crearpoliza":"S",
        "tda":this.codigopoliza?.clave
      }
      if(this.codigopoliza?.clave == "") {
        this.alerta("El Código de la Póliza no puede estar vacío");
        return;

      }
      this.serviciospolizas.buscapoliza (JSON.stringify(params)).subscribe(
        respu => {
          this.poliza = respu;
          console.log("Debug: ", this.poliza);
          if (this.poliza.status == "C") {
            this.alerta("Poliza Cerrada");
            this.polizacerrada_z = true;
            this.puedeagregar_z = false;
            this.polizaactiva_z = true;
          } else {
            this.polizaactiva_z = true;
            this.puedeagregar_z = true;
            this.polizacerrada_z = false;
            this.tda_z = this.poliza.tda;
            this.fechapol = this.poliza.fecha;
            this.polizaactiva_z = true;
          }
          this.idpoliza = this.poliza.idpoliza;
          this.buscar_renpol();
        }
      );

  }

  imprimir_poliza() {
    if(this.poliza?.status == "A") {
      this.checa_si_cerrar_poliza();
    } else {
      this.manda_imprimir_poliza();
    }
  }

  manda_imprimir_poliza() {
    const params_z = {
      modo: "impresion_poliza_morosos",
      fechapoliza:this.fechapol,
      tdapol:this.poliza?.tda
    }
    this.serviciospolizas.imprimir_poliza_morosos(JSON.stringify(params_z));

  }

  checa_si_cerrar_poliza() {
    const mensaje_z = "Póliza Abierta se va a Cerrar, seguro de continuar con la impresión?";
    const dialogref = this.dialog.open(DialogBodyComponent, {
      width:'350px',
      data: mensaje_z
    });
    dialogref.afterClosed().subscribe(res => {
      //console.log("Debug", res);
      if(res) {
        this.checa_fecha_timbre("");
      }
    });
  
  }
  
  checa_fecha_timbre(mensaje: string) {

    let fechapol_z = this.poliza?.fecha + "";
    let mifecpol_z = new Date(fechapol_z.replace(/-/g, '\/'));
    let fechahoy_z = new Date();
    let dias = fechahoy_z.getTime()  - mifecpol_z.getTime();
    dias = Math.floor ( dias / (86400 * 1000));
    let fectimbre_z = this.poliza?.fecha;
    let timbrarpolizafechaespecial = "Poliza";
    let fecminima_z = new Date ( new Date().getTime() - ( 86400*1000*3 - 7200*1000 ));
    let params = {
      "modo":"cerrar_poliza",
      "fechapoliza":this.poliza?.fecha,
      "tdapol":this.tda_z,
      "timbrarpolizafechaespecial":timbrarpolizafechaespecial,
      "fechatimbrepol":fectimbre_z
    };
    if(dias > 3) {
      mensaje = "Fecha de Timbrado minimo es " + this.datePipe.transform(fecminima_z,"yyyy-MM-dd"); 
      mensaje += " Desea Timbrar con esta fecha ?: ";
      const dialogref = this.dialog.open(DialogBodyComponent, {
        width:'350px',
        data: mensaje
      });
      dialogref.afterClosed().subscribe(res => {
        //console.log("Debug", res);
        if(res) {
          params.fechatimbrepol = "" + this.datePipe.transform(fecminima_z,"yyyy-MM-dd");
          params.timbrarpolizafechaespecial = "Especial";
          this.cierra_poliza(JSON.stringify(params));
        }
      });
    } else {
      this.cierra_poliza(JSON.stringify(params));
    }
  }
  
  cierra_poliza( params_z: string) {
    let params = JSON.parse (params_z);
    console.log("Debug: Estoy en cerrar poliza:", params_z);
    this.serviciospolizas.cierra_poliza(JSON.stringify(params)).subscribe(
      respu => {
        let mirespu_z = respu;
        let uuidpol_z = mirespu_z.uuidpol;
        let uuidrec_z = mirespu_z.uuidrec;
        let poltimbrado_z = mirespu_z.timbradopoliza;
        let rectimbrado_z = mirespu_z.timbradorecargo;
        let statuspol_z =  mirespu_z.status;
        console.log("Ya se timbró la poliza", uuidpol_z);
        if(this.datosalerta.alertapoliza) {
          this.mensaje_cfdi("Ahora la impresion del CFDI se descarga por separado\n, Desea no volver a mostrar este mensaje ?");
        }
        // 8-Feb-2024 Se bloquea que se descargue el cfdi
        // if(uuidpol_z && uuidpol_z != "-1" ) {
        //     let paramcompl_z = { "uuid": uuidpol_z };
        //     if(this.claveempresa == "EC") {
        //       this.serviciospolizas.obten_pdf_cfdi(JSON.stringify(paramcompl_z));
        //     } else {
        //       this.serviciospolizas.obtentxtcomplmentopol(JSON.stringify(paramcompl_z));  
        //     }
        // }
        // if(this.uuidrec_z && this.uuidrec_z != "-1" ) {
        //   let paramrec_z = { "uuid": this.uuidrec_z };
        //   this.serviciospolizas.obten_pdf_cfdi(JSON.stringify(paramrec_z));  
        // }
        this.manda_imprimir_poliza();
    }
    );
  
  }
  
  buscar_renpol() {
    let params = {
      "modo":"obtener_detalles_poliza",
      "idpoliza": this.idpoliza
    };
    //console.log("idusuario:" + this.usrreg_z.idusuario);
    this.serviciospolizas.buscar_renpol(JSON.stringify(params)).subscribe(
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

  busca_renglones_relcob(){
    let params_z = {
      modo: "obtener_datalles_relcob",
      idrelacion: this.idrelcob_z
    }
    this.relcobservice.busca_renglones_relacion_cobranza(JSON.stringify(params_z)).subscribe(
      respu => {
        this.renglonesrelcob  = respu;
      }
    )

  }

  imprimir_relcob() {
    const dialogref = this.dialog.open(DialogBodyComponent, {
      width:'800px',
      data: "Se cerrará la Cobnanza de este cobratario, seguro de Imprimir la Liquidación ?  "
    });
    dialogref.afterClosed().subscribe(res => {
      let rotacion = "NO";
      if(this.sirotarpdf) rotacion = "SI";

      if(res) {
        const params_z = {
          modo: "imprimir_liq_poliza_morosos_pdf",
          idpoliza: this.idpoliza,
          primerpromotor: this.relcob?.promot,
          ultimopromotor: this.relcob?.promot,
          titulo:"Liq. Morosos Poliza " + this.codigopoliza?.clave + " " +
          this.codigopoliza?.nombre + " Del " + this.fechapol +
          " Cobratario:" + this.relcob?.promot + 
          " " + this.relcob?.nombrepromo

        }
        this.serviciospolizas.imprimir_liq_moroso_cobratario(JSON.stringify(params_z));
        const params2_z = {
          modo:"cerrar_status_comiscob",
          tdapol: this.tda_z,
          fechapol : this.fechapol,
          promotor: this.relcob?.promot,
          rotarpdf: rotacion
        }
        this.serviciospolizas.cerrar_comiscob(JSON.stringify(params2_z)).subscribe( res => {
          this.alerta("Se ha cerrado la relacion");
        })
        
      }
    });

  }

  
  recojas(renglon: Renrelco) {
    let params_z = {
      modo: "buscar_recoja",
      numcli:renglon.codigo
    }
    this.serviciospolizas.buscar_recoja(JSON.stringify(params_z)).subscribe(resul => {
      if(resul.hayrecoja == "S") {
        this.alerta("Este cliente ya tiene una recoja el dia " + resul.fecharecoja);
        return;
      }
      this.sirecojas(renglon);
    })

  }

  sirecojas(renglon: Renrelco) {
    const dialogref = this.dialog.open(DialogBodyComponent, {
      width:'800px',
      data: "Seguro de Proceder Recoja a " + renglon.codigo + " "
         + renglon.nombre
    });
    dialogref.afterClosed().subscribe(res => {
      let porrec_z = 0;
      if(this.cobratario) {
        porrec_z = this.cobratario.comxrec;
      }
      let comision_z = Math.round( renglon.impxlet * porrec_z) /100;
      if(res) {
        
        let aceptarpago = {
          idcli: renglon.idcli,
          numcli: renglon.codigo,
          idpoliza:this.idpoliza,
          tipopago:"R",
          ltaini:"",
          ltafin:"",
          concepto:"RECOJA",
          conceptocompl:"",
          tipomov:"AR",
          recobon:0,
          importe:0,
          neto:0,
          dias:0,
          idusuario:0,
          vence:"",
          comision: comision_z,
          cobratario:"",
          moroso:"SI",
          claveempresa:this.claveempresa,
          idrenrelco:renglon.idcarrenrelco,
      
        }
        const result = {
          datospago: aceptarpago,
          conplazo: 'N',
          datosplazo: this.datosplazo
        }

        this.si_aceptarpago(JSON.stringify(result));
      }

    });

  }

  devolver_recoja(renglon: Renrelco) {
    let params_z = {
      modo: "buscar_recoja",
      numcli:renglon.codigo
    }
    this.serviciospolizas.buscar_recoja(JSON.stringify(params_z)).subscribe(resul => {
      if(resul.hayrecoja != "S") {
        let msg_z = "Este cliente " + renglon.codigo + " "
        + renglon.nombre + " no tiene una recoja ";
        this.alerta(msg_z);
        return;
      }
      this.si_devolver_recoja(renglon);
    })

  }

  si_devolver_recoja(renglon: Renrelco) {
    const dialogref = this.dialog.open(DialogBodyComponent, {
      width:'800px',
      data: "Seguro de Proceder Devolver Recoja a " + renglon.codigo + " "
         + renglon.nombre
    });
    dialogref.afterClosed().subscribe(res => {
      let comision_z = 0;
      if(res) {
        
        let aceptarpago = {
          idcli: renglon.idcli,
          numcli: renglon.codigo,
          idpoliza:this.idpoliza,
          tipopago:"D",
          ltaini:"",
          ltafin:"",
          concepto:"DEVOLUCION RECOJA",
          conceptocompl:"",
          tipomov:"AR",
          recobon:0,
          importe:0,
          neto:0,
          dias:0,
          idusuario:0,
          vence:"",
          comision: comision_z,
          cobratario:"",
          moroso:"SI",
          claveempresa:"",
          idrenrelco:renglon.idcarrenrelco,
      
        }
        const result = {
          datospago: aceptarpago,
          conplazo: 'N',
          datosplazo: this.datosplazo
        }

        this.si_aceptarpago(JSON.stringify(result));
      }

    });

  }


  plazo(renglon: Renrelco) {
    let params_z = {
      esplazo: true,
      codigo: renglon.codigo,
      cobratario: this.relcob?.promot,
      polizamorosos: true,
      fecha: this.poliza?.fecha,
      idrenrelco: renglon.idcarrenrelco
  }
  const dialogref = this.dialog.open(DlgplazosComponent, {
    width:'800px',
    data: JSON.stringify(params_z)
  });
  dialogref.afterClosed().subscribe(res => {
    if(res) {
      let params_z = {
        modo:'agregar_plazo',
        fechaplazo: res.fechaplazo,
        venceplazo: res.venceplazo,
        codpol:this.poliza?.tda,
        idusuario:this.usrreg_z.idusuario,
        idpromot:this.relcob?.idpromot,
        codigo:renglon.codigo,
        observaciones: res.observs,
        idcarrenrelco: renglon.idcarrenrelco
      }
      this.relcobservice.agrega_renglones_relacion_cobranza(JSON.stringify(params_z)).subscribe(
        result => {
          if(result.status == "OK") {
            this.alerta("Plazo Agregado");

          } else {
            this.alerta("No se pudo agregar el plazo");

          }
          this.busca_renglones_relcob();
        }
      );
      
    }

  });

  }

  agregar_plazo(datosplazo: any) {
     let params_z = {
        modo:'agregar_plazo',
        fechaplazo: datosplazo.fechaplazo,
        venceplazo: datosplazo.venceplazo,
        codpol:this.poliza?.tda,
        idusuario:this.usrreg_z.idusuario,
        idpromot:this.relcob?.idpromot,
        codigo:datosplazo.codigo,
        observaciones: datosplazo.observs,
        idcarrenrelco: datosplazo.idcarrenrelco
      }
    let result_z = {}
      this.relcobservice.agrega_renglones_relacion_cobranza(JSON.stringify(params_z)).subscribe( res => {
        result_z = res;
      });

  }

  observaciones(renglon: Renrelco) {
    let params_z = {
      esplazo: false,
      codigo: renglon.codigo,
      cobratario: this.relcob?.promot,
      polizamorosos: true,
      fecha: this.fechapol,
      idrenrelco: renglon.idcarrenrelco
  }
  const dialogref = this.dialog.open(DlgplazosComponent, {
    width:'800px',
    data: JSON.stringify(params_z)
  });
  dialogref.afterClosed().subscribe(res => {
    if(res) {
      let params_z = {
        modo:'agregar_observaciones',
        fechaplazo: res.fechaplazo,
        venceplazo: res.venceplazo,
        codpol:this.poliza?.tda,
        idusuario:this.usrreg_z.idusuario,
        idpromot:this.relcob?.idpromot,
        codigo:renglon.codigo,
        observaciones: res.observs,
        idcarrenrelco: renglon.idcarrenrelco
      }
      this.relcobservice.agrega_renglones_relacion_cobranza(JSON.stringify(params_z)).subscribe(
        result => {
          if(result.status == "OK") {
            this.alerta("Observaciones Agregadas");

          } else {
            this.alerta("No se pudo agregar las Observaciones");

          }
          this.busca_renglones_relcob();
        }
      );
      
    }

  });


  }



  generar_relacion() {

  }

  cobrar_cliente() {
    let params_z = {
      codigo: this.codcli_z,
      cobratario: this.relcob?.promot,
      polizamorosos: true,
      idrenrelco: -1
    }
    this.proceder_cobrar(params_z);

  }

  cobrar (renglon: Renrelco) {
      let params_z = {
        codigo: renglon.codigo,
        cobratario: this.relcob?.promot,
        polizamorosos: true,
        idrenrelco: renglon.idcarrenrelco
    }
    this.proceder_cobrar(params_z);
  }

  proceder_cobrar(params_z: any) {
    const dialogref = this.dialog.open(AgregarenpolComponent, {
      width:'800px',
      data: JSON.stringify(params_z)
    });
    dialogref.afterClosed().subscribe(res => {
      if(res) {
        this.si_aceptarpago(res);
      }

    });

  }

  si_aceptarpago(res: string) {
    let cobranza = JSON.parse(res);
    let datospago = cobranza.datospago;
    datospago.idpoliza = this.idpoliza;
    datospago.idusuario = this.usrreg_z.idusuario;
    datospago.cobratario = this.relcob?.promot;
    datospago.claveempresa = this.cia_z?.Empresa;
    let datosplazo = cobranza.datosplazo;
    datosplazo.idcarrenrelco =datospago.idrenrelco;
    datosplazo.codigo = datospago.numcli;
    if(this.claveempresa == "EC") {
      if(datospago.recobon == 0 ) datospago.tipomov = "AB";
    }
    console.log("Debug Cobranza: ", cobranza);
    this.serviciospolizas.agregar_pago(JSON.stringify(datospago)).subscribe(
    //this.serviciopolizas.agregar_pago(JSON.stringify(dummy)).subscribe(
      respu => {
        if(respu) {
          if(respu.error) {
            this.alerta("No se pudo agregar ");
          }
          this.buscar_renpol();
          if(respu.exito) {
            console.log("Se agrego el movimiento:", respu);
            if(cobranza.conplazo == "SI") {
              this.agregar_plazo(datosplazo);
            }
            this.busca_renglones_relcob();
          }
        }
      }
    );

  }

  buscar_promotor(cobratario: string) {
    const params_z = {
      modo:"buscar_cobratario",
      codprom: cobratario

    }
    this.serviciospolizas.busca_cobratarios(JSON.stringify(params_z)).subscribe( res => {
        this.cobratario = res[0];
    });

  }

  buscar_datos_comiscob(fecha: string) {
    const params_z = {
      modo:"buscar_cobratarioobtener_datos_comiscob",
      fechaini: this.fechapol,
      fechafin: this.fechapol,
      promoini: this.cobratario?.cvepromo,
      promofin: this.cobratario?.cvepromo


    }
    this.serviciospolizas.busca_cobratarios(JSON.stringify(params_z)).subscribe( res => {
        this.cobratario = res[0];
    });

  }

  rotarpdf(){
    if(this.sirotarpdf) {
      this.rotarpdftxt = "PDF de cabeza";
    } else {
      this.rotarpdftxt = "PDF Normal";

    }
    this.sirotarpdf = !this.sirotarpdf
  }

  mostrar_comiscob() {
    let params = {
      modo: "obtener_datos_comiscob",
      fechainicial: this.fechapol,
      fechafinal:this.fechapol,
      codigoinicial: this.codigopoliza?.clave,
      codigofinal: this.codigopoliza?.clave
    }
    this.serviciospolizas.obten_comiscob(JSON.stringify(params)).subscribe( res => {
      const dialogref = this.dialog.open(DlgcomiscobComponent, {
        width:'350px',
        data: JSON.stringify(res)
      });
      dialogref.afterClosed().subscribe(res => {
        //console.log("Debug", res);
      });
  
    })
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

  mensaje_cfdi(mensaje: string) {
    const dialogref = this.dialog.open(DialogBodyComponent, {
      width:'350px',
      data: mensaje
    });
    dialogref.afterClosed().subscribe(res => {
      if(res) {
        this.datosalerta.alertapoliza = false;
        localStorage.setItem("alertapoliza", JSON.stringify( this.datosalerta));
      }
      //console.log("Debug", res);
    });
  
  }

  
}
