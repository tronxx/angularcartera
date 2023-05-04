import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service'
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBodyComponent } from '../../dialog-body/dialog-body.component';
import { MatIconModule } from '@angular/material/icon'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiguracionService } from '../../services/configuracion.service';
import { Factura } from '../../models';
import { Renfacfo } from '../../models';
import { Cliente } from '../../models/clientes';
import { DlgrenfacComponent } from '../dlgrenfac/dlgrenfac.component';
import { DlgdatosfacturaComponent  } from '../dlgdatosfactura/dlgdatosfactura.component';
import { Ofertas } from '../../models';
import { Factorvtacred } from '../../models';
import { Tabladesctocont } from '../../models';
import { SpinnerComponent } from '../../common/spinner/spinner.component';
import { PidepasswdComponent } from '../../common/pidepasswd/pidepasswd.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-facturacli',
  templateUrl: './facturacli.component.html',
  styleUrls: ['./facturacli.component.css']
})
export class FacturacliComponent implements OnInit {

  factura? : Factura;
  cliente? : Cliente;
  renfacfo : Renfacfo[] = [];
  codcli_z = "";
  idcli = 0;
  idfac = 0;
  cargoscli_z = 0;
  servic_z = 0;
  preciolista_z =  0;
  prodfin_z = 0;
  fechavta = ""
  ubiage = "";
  tarjetatc_z ="";
  tempo_z = "Tempo:";
  escerrada = false;
  fechacierre_z = new Date();
  fechacorrecta_z = false;
  strfeccierre_z = "";
  linkcliente = "";
  msgerror_z = "";
  statuscli_z = "";
  regimen_z = "";
  clientecred = false;
  rotarfac = false;
  sinpassword = true;
  fechaprop_z: string | null  = "";
  dias_z = 0;
  factortvtacrd? : Factorvtacred;
  factoresvtacrd: Factorvtacred[] = [];
  tabladesctocont? : Tabladesctocont;
  tabladesctoscont : Tabladesctocont[] = [];
  ofertas: Ofertas[] = [];


  constructor(
    public dialog: MatDialog, 
    private datePipe: DatePipe,
    private configuracion: ConfiguracionService,
    private servicioclientes: ClientesService,
    private route : ActivatedRoute,
    private miroute: Router
  ) { }

  ngOnInit(): void {
    this.codcli_z = String(this.route.snapshot.paramMap.get('numcli'));
    this.idfac = Number(this.route.snapshot.paramMap.get('idfac'));

    const micli = this.buscar_cliente(this.codcli_z);
    this.linkcliente = "/altacli/" + this.codcli_z;
    this.carga_rotar_factura();
    this.carga_ofertas();
    
  }

  carga_rotar_factura() {
    let mistorage_z  = localStorage.getItem('rotarfac') || "{}";
    let usrreg_z =  JSON.parse(mistorage_z);
    this.rotarfac = usrreg_z.rotarfac

  }

  graba_rotar_factura() {
    let mistorage_z = {
      "rotarfac": this.rotarfac
    }
    console.log("Grabando Rotarfac:", JSON.stringify(mistorage_z) );
    
    localStorage.setItem("rotarfac", JSON.stringify(mistorage_z));
  }

  crear_factura() {
    let params_z = {
      fechavta: this.fechavta,
      factura:  <Factura> { },
      ubiage: this.ubiage,
      statuscli: this.statuscli_z,
      modo: "NUEVO"
    }
    params_z.factura.idcli = this.idcli;
    params_z.factura.idfac = -1;
    const dialogmov = this.dialog.open(DlgdatosfacturaComponent, {
      width:'700px',
      data: JSON.stringify(params_z)
    });
    dialogmov.afterClosed().subscribe(res => {
      if (res) {
        let params_z = {
          modo:"NUEVO",
          idcli:this.idcli,
          factura:res
        }
        this.servicioclientes.crear_factura_altas(JSON.stringify(params_z)).subscribe( resalta=> {

          if(resalta.status == "OK") {
            this.busca_factura();
          } else {
            this.alerta("Error:" + resalta.error);
            console.log("Debug: Error", resalta);
          }
        });

      }
    });
  }

  buscar_cliente (codcli: string) {
    var params_z = {
      modo : "buscar_un_cliente",
      codigo: codcli,
      idcli : -1
    }
    this.servicioclientes.buscaclientealta(JSON.stringify(params_z)).subscribe(
      res => {
      if(res) {
        this.cliente=res;
        this.idcli  = this.cliente.idcli;
        this.cargoscli_z = this.cliente.cargos;
        this.servic_z = this.cliente.servicio;
        this.preciolista_z = this.cliente.preciolista;
        this.ubiage = this.cliente.ubica;
        this.fechavta = this.cliente.fechavta;
        this.statuscli_z = this.cliente.status;
        this.clientecred = (this.cliente.qom != "C");
        this.busca_factura();
        if(this.idfac == -1 ) {
          this.crear_factura();
        }
      } else {
        this.alerta("Cliente Inexistente:" + this.codcli_z + " Codcli:" + codcli);
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

  busca_factura() {
    var params_z = {
      modo : "buscar_cli_facturas",
      idcli : this.idcli
    }
    console.log("Debug: Estoy en busca_factura ", this.idcli);
    this.servicioclientes.busca_factura_altas(JSON.stringify(params_z)).subscribe(
      respu => {
        if(respu) {
          this.factura = respu[0];
          if(this.factura) {
            this.idfac = this.factura.idfac;
            this.busca_renfacfo(this.factura.idfac);
            this.prodfin_z = ( this.preciolista_z * ( 16 / 100 + 1 )) +  this.servic_z;
            this.prodfin_z = Math.round (this.cargoscli_z - this.prodfin_z);
            if(this.prodfin_z < 0) this.prodfin_z = 0;
            this.factura.prodfin = this.prodfin_z;
            this.escerrada = ( this.factura.status == "C");
            this.strfeccierre_z = this.factura.fecha;
            this.regimen_z = this.factura.regimen + " " + this.factura.descriregimen;
            this.validar_fecha_cierre();
          }
        }
      }
    );
  }

  editar_factura() {
    let params_z = {
      fechavta: this.fechavta,
      factura:  this.factura,
      ubiage: this.ubiage,
      modo: "MODIFICAR"
    }
    const dialogmov = this.dialog.open(DlgdatosfacturaComponent, {
      width:'700px',
      data: JSON.stringify(params_z)
    });
    dialogmov.afterClosed().subscribe(res => {
      if (res) {
        let params_z = {
          modo:"MODIFICAR",
          idcli:this.idcli,
          factura:res
        }
        console.log('datos modificados:', res);
        
        this.servicioclientes.crear_factura_altas(JSON.stringify(params_z)).subscribe( resalta=> {

          if(resalta.status == "OK") {
            this.busca_factura();
          } else {
            this.alerta("Error:" + resalta.error);
            console.log("Debug: Error", resalta);
          }
        });

      }
    });
  

  }

  busca_renfacfo(idfacfon_z : number) {
    var params_z = {
      modo : "buscar_renfac",
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

subir_renfac(mirenfac: Renfacfo) {
  console.log("Voy a subir de orden el renglon");
  let idfac_z = -1;
  if(this.factura) {
    idfac_z = this.factura.idfac;
  }
  let params_z = {
    modo: "subir_renfac",
    idcli: this.factura?.idcli,
    idfac: idfac_z,
    idrenfac:mirenfac.idrenfacfo,
    renfac: mirenfac
  }
  this.servicioclientes.subir_renfac_altas(JSON.stringify(params_z)).subscribe( resalta=> 
    {
      if(resalta.status == "OK") {
        this.busca_renfacfo(idfac_z);
      } else {
        this.alerta("Error:" + resalta.error);
        console.log("Debug: Error", resalta);
      }

    }
  );

}

eliminar_renfac(mirenfac: Renfacfo) {
  let idcli_z = this.factura?.idcli;
  let idfac_z = this.factura?.idfac;
  const dialogref = this.dialog.open(DialogBodyComponent, {
    width:'350px',
    data: 'Seguro de Eliminar Renglon: ' + mirenfac.codigo + 
    " " + mirenfac.concepto
  });
  dialogref.afterClosed().subscribe(res => {
    if(res) {
      let params_z = {
        modo: "eliminar_renfac",
        idcli: idcli_z,
        idfac: idfac_z,
        idrenfac:mirenfac.idrenfacfo,
        renfac: mirenfac
      }
      this.servicioclientes.agregar_renfac_altas(JSON.stringify(params_z)).subscribe( resalta=> 
        {
          if(resalta.status == "OK") {
            this.busca_factura();
          } else {
            this.alerta("Error:" + resalta.error);
            console.log("Debug: Error", resalta);
          }

        });

    }
  });

} 

agregar_renfac() {
  let params = {
    idcli: this.idcli,
    modo: "NUEVO",
    ticte: this.cliente?.ticte,
    qom: this.cliente?.qom,
    nulets: this.cliente?.nulet,
    ubica: this.cliente?.ubica,
    tarjeta: this.tarjetatc_z,
    complementodatos: "N"
  }
  const dialogmov = this.dialog.open(DlgrenfacComponent, {
    width:'700px',
    data: JSON.stringify(params)
  });
  dialogmov.afterClosed().subscribe(res => {
    if (res) {
      console.log("Debug: facturacli regreso de dlgrenfaccomponent:", res);
      let params_z = {
        modo:"agregar_ren_factura",
        idcli:this.idcli,
        idfac: this.idfac,
        renfac:res
      }
      this.servicioclientes.agregar_renfac_altas(JSON.stringify(params_z)).subscribe( resalta=> {

        if(resalta.status == "OK") {
          this.busca_factura();
        } else {
          this.alerta("Error:" + resalta.error);
          console.log("Debug: Error", resalta);
        }
      });

    }
  });

}

formularioEnviado() {}

validar_fecha_cierre() {
  let resultado_z = {
    escorrecto_z : true,
    msg1_z : ""
  } 
  
  let msg1_z = "";
  let undia_z = 24 * 60 * 60 * 1000;
  let fechahoy_z = new Date();
  this.fechacierre_z = new Date(this.strfeccierre_z);
  this.dias_z = Math.floor(fechahoy_z.getTime() / (undia_z)) -  Math.floor(this.fechacierre_z.getTime() / (undia_z));
  let fechamin_z = new Date (fechahoy_z.setDate(fechahoy_z.getDate() - 3));
  let strfechamin_z = this.datePipe.transform(fechamin_z, "yyyy-MM-dd");
  this.fechaprop_z = this.datePipe.transform(fechamin_z, "yyyy-MM-dd");

  if(this.dias_z < 0) {
    resultado_z.msg1_z += " No puede facturar con fecha Posterior";
    resultado_z.escorrecto_z = false;
  }
  if(this.dias_z > 3) {
    resultado_z.msg1_z += " No puede facturar con más de 3 días de diferencia";
    resultado_z.escorrecto_z = false;
  }
  let totfac = 0;
  if(this.factura) {
    totfac = Math.round (this.factura.total );
  }
  let cargos = -1;
  if(this.cliente) {
    cargos = Math.round (this.cliente.preciolista * (this.cliente.piva /100 + 1));
  }
  if (totfac != cargos) {
    resultado_z.msg1_z += " El Valor de las Mercancias de la Factura no coincide con el de la venta";
    resultado_z.escorrecto_z = false;

  }
  this.fechacorrecta_z = resultado_z.escorrecto_z;
  this.msgerror_z = resultado_z.msg1_z;
  return resultado_z;
}

cerrar_factura() {
  let validar_z = this.validar_fecha_cierre();
  if(!validar_z.escorrecto_z) {
    this.alerta(validar_z.msg1_z);
    return;
  }
 
  const dialogref = this.dialog.open(DialogBodyComponent, {
    width:'350px',
    data: 'Seguro de Cerrar esta Factura'
  });
  dialogref.afterClosed().subscribe(res => {
    if (res) {
      let params_z = {
        idcli: this.idcli,
        idfac: this.idfac,
        fechacierre: this.fechacierre_z
      }
      this.servicioclientes.cerrar_factura_altas(JSON.stringify(params_z)).subscribe( resalta=> {

        if(resalta.status == "OK") {
          this.descarga_pdf_fac(resalta.uuid);
          this.busca_factura();
        } else {
          this.alerta("Error:" + resalta.error);
          console.log("Debug: Error", resalta);
        }
      });
    }
  });

}

imprimir_factura() {
  if(this.factura) {
    let uuid_z = this.factura.uuid;
    const dialogref = this.dialog.open(DialogBodyComponent, {
      width:'350px',
      data: 'Seguro de Imprimir esta Factura ?'
    });
    dialogref.afterClosed().subscribe(res => {
      if (res) {
        this.descarga_pdf_fac(uuid_z);
      }
    });

  }

}

descarga_pdf_fac(uuid: string) {
  let strrotarfac_z = "NO";
  if (this.rotarfac) {
    strrotarfac_z = "ROTAR";
  }
  let params_z = {
    uuid: uuid,
    rotar: strrotarfac_z
  }
  this.servicioclientes.obten_pdf_cfdi_factura(JSON.stringify(params_z));

}

regresar() {
  if(this.factura) {
    if(this.factura.status != "C") {
      let params_z = {
        idcli: this.idcli,
        idfac: this.idfac,
        fechacierre: this.fechacierre_z
      }
      this.servicioclientes.afectar_cliente_articulos(JSON.stringify(params_z)).subscribe( resalta=> {
        const msgok = "OK";
      })
    }
  }
  this.miroute.navigateByUrl('altacli/' + this.codcli_z);
}

carga_ofertas(){
  this.servicioclientes.buscar_aofertas_json().subscribe(
    respu => {
      this.ofertas = respu;
    }
  );
  
}

busca_mi_tc(idcli_z : number) {
  var params_z = {
    modo : "buscar_cli_tarjeta_tc",
    codigo: this.codcli_z,
    idcli : idcli_z
  }
  console.log("Debug: Estoy en busca tarjeta tc cliente ", idcli_z);
  this.servicioclientes.buscar_cli_tarjetas_tc(JSON.stringify(params_z)).subscribe(
    respu => {
      if(respu) {
        this.tarjetatc_z = respu.clave;
      } 
    }
  );
}

pide_password () {
  this.sinpassword = true;
  let cod_z = this.codcli_z.substring(0,2);
   let params_z = {
    "ubicacion": cod_z
   }
   const dlgdatosrenfac= this.dialog.open(PidepasswdComponent, {
    width: '400px',
    data: JSON.stringify(params_z)
   });
   dlgdatosrenfac.afterClosed().subscribe(res => {
      //console.log("Regresando de Pide Password", res);
       
       if(res) {
         this.sinpassword = false;
       }
       
      }
   );

}


}
