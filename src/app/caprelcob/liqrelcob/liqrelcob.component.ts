 import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; 
import { ClientesService } from '../../services/clientes.service';
import { ConfiguracionService } from '../../services/configuracion.service';
import { PolizasService } from '../../services/polizas.service';
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
import { DatePipe } from '@angular/common';
import { Promotor } from '../../models';
import { CodigoPoliza } from '../../models';
import { Renrelco } from '../../models';
import { RelcobService } from '../../services/relcob.service';
import { DlgdatosrelcobComponent } from './../dlgdatosrelcob/dlgdatosrelcob.component'
import { AgregarenpolComponent } from '../../polizas/agregarenpol/agregarenpol.component';
import { Poliza } from '../../models/polizas';
import { Renpol } from '../../models/renpol';

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

  idrelcob_z = 0;
  estadocerrado_z = 9;
  estadoabierto_z = 0;
  fechapol = this.datePipe.transform(new Date(),"yyyy-MM-dd");
  polizaactiva_z = false;
  polizacerrada_z = false;
  tda_z = ""
  idpoliza = -1;
  totalbonifcs_z = 0;
  totalrecargs_z = 0;
  totalimports_z = 0;
  cia_z?: Compania;
  
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
          if (this.poliza.status == "C") {
            this.alerta("Poliza Cerrada");
            this.polizacerrada_z = true;
            //console.log("Debug: ", this.errorespoliza);
          } else {
            this.polizaactiva_z = true;
            this.tda_z = this.poliza.tda;
            this.fechapol = this.poliza.fecha;
            this.polizaactiva_z = true;
          }
          this.idpoliza = this.poliza.idpoliza;
          this.buscar_renpol();
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

  }

  
  agregar_cliente_a_relcob() {
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
          claveempresa:"",
          idrenrelco:renglon.idcarrenrelco,
      
        }
        this.si_aceptarpago(JSON.stringify(aceptarpago));
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
        this.alerta("Este cliente no tiene una recoja ");
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
        this.si_aceptarpago(JSON.stringify(aceptarpago));
      }

    });

  }


  plazo(renglon: Renrelco) {
    let params_z = {
      esplazo: true,
      codigo: renglon.codigo,
      cobratario: this.relcob?.promot,
      polizamorosos: true,
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

  observaciones(renglon: Renrelco) {
    let params_z = {
      esplazo: false,
      codigo: renglon.codigo,
      cobratario: this.relcob?.promot,
      polizamorosos: true,
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


  agregar_cliente( datos: any) {
    
    const params_z = {
      modo: "agregar_renglon_relacion_relcob",
      idrelacion: this.relcob?.idcarrelcob,
      idpromot: this.relcob?.idpromot,
      codigo: datos.codigo,
      ltaini: datos.ltaini,
      ltafin: datos.ltafin,
      impxlet: datos.impxlet,
      abonos: datos.importe,
      idusuario: this.usrreg_z.idusuario,
      cia: this.relcob?.cia,
      numrel: 1,
    }
    this.relcobservice.agrega_renglones_relacion_cobranza(JSON.stringify(params_z)).subscribe(
      result => {
        this.busca_renglones_relcob();
      }
    );

  }

  eliminar_renglon_relcob(renrelco: Renrelco) {
  }

  generar_relacion() {

  }

  cobrar(renglon: Renrelco) {
    let params_z = {
        codigo: renglon.codigo,
        cobratario: this.relcob?.promot,
        polizamorosos: true,
        idrenrelco: renglon.idcarrenrelco
    }
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
    let datospago = JSON.parse(res);
    datospago.idpoliza = this.idpoliza;
    datospago.idusuario = this.usrreg_z.idusuario;
    datospago.cobratario = this.relcob?.promot;
    datospago.claveempresa = this.cia_z?.Empresa;
    //console.log("Debug DatosPago: ", this.datospago);
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
  


  alerta(mensaje: string) {
    const dialogref = this.dialog.open(DialogBodyComponent, {
      width:'350px',
      data: mensaje
    });
    dialogref.afterClosed().subscribe(res => {
      //console.log("Debug", res);
    });
  
  }
  
}
