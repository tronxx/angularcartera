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
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ConfiguracionService } from '../../services/configuracion.service';
import { Factura } from '../../models';
import { Renfacfo } from '../../models';
import { Cliente } from '../../models/clientes';
import { DlgrenfacComponent } from '../dlgrenfac/dlgrenfac.component';
import { DlgdatosfacturaComponent  } from '../dlgdatosfactura/dlgdatosfactura.component';

@Component({
  selector: 'app-dlgfactura',
  templateUrl: './dlgfactura.component.html',
  styleUrls: ['./dlgfactura.component.css']
})
export class DlgfacturaComponent implements OnInit {

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
  tempo_z = "Tempo:";
  escerrada = false;
  fechacierre_z = new Date();
  fechacorrecta_z = false;
  strfeccierre_z = "";
  
  constructor(
    public dialog: MatDialog, 
    public dialogRef: MatDialogRef<DlgrenfacComponent>,
    public dialogfactura : MatDialogRef<DlgdatosfacturaComponent>,
    private configuracion: ConfiguracionService,
    private servicioclientes: ClientesService,
    private route : ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.codcli_z = String(this.route.snapshot.paramMap.get('numcli'));
    this.idfac = Number(this.route.snapshot.paramMap.get('idfac'));
    this.buscar_cliente(this.codcli_z);
    if(this.cliente) {
      this.idcli  = this.cliente.idcli;
      this.cargoscli_z = this.cliente.cargos;
      this.servic_z = this.cliente.servicio;
      this.preciolista_z = this.cliente.preciolista;
      this.ubiage = this.cliente.ubica;
      this.fechavta = this.cliente.fechavta;
  
    }
    if(this.idfac == -1) {
      this.crear_factura()
    } else {
      this.busca_factura();

    }
    
  }

  crear_factura() {
    let params_z = {
      fechavta: this.fechavta,
      factura:  <Factura> { },
      ubiage: this.ubiage,
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
            this.closeyes();
          }
        });

      }
    });
  }

  buscar_cliente(codcli: string) {
    this.servicioclientes.buscaclientealta(codcli).subscribe(res => {
      if(res) {
        this.cliente=res;
      } else {
        this.alerta("Cliente Inexistente");
      }
    });

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
        this.servicioclientes.crear_factura_altas(JSON.stringify(params_z)).subscribe( resalta=> {

          if(resalta.status == "OK") {
            this.busca_factura();
          } else {
            this.alerta("Error:" + resalta.error);
            console.log("Debug: Error", resalta);
            this.closeyes();
          }
        });

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
            this.prodfin_z = ( this.preciolista_z * ( 16 / 100 + 1 )) -  this.servic_z;
            this.prodfin_z = this.cargoscli_z - this.prodfin_z;
            if(this.prodfin_z < 0) this.prodfin_z = 0;
            this.factura.prodfin = this.prodfin_z;
            this.escerrada = ( this.factura.status == "C");
            this.strfeccierre_z = this.factura.fecha;
            this.validar_fecha_cierre();
          }
        }
      }
    );
    this.tempo_z = " prodfin:" + this.prodfin_z.toString() +
    " cargoscli:" + this.cargoscli_z.toString() + 
    " preciolista:" + this.preciolista_z.toString() + 
    " Servicio:" + this.servic_z.toString();

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
              this.closeyes();
            }
  
          });

      }
    });

  } 

  agregar_renfac() {
    let params = {
      idcli: this.idcli,
      modo: "NUEVO"
    }
    const dialogmov = this.dialog.open(DlgrenfacComponent, {
      width:'700px',
      data: JSON.stringify(params)
    });
    dialogmov.afterClosed().subscribe(res => {
      if (res) {
        console.log("Debug: regreso de dlgrenfaccomponent:", res);
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
            this.closeyes();
          }
        });

      }
    });
  
  }

  closeyes() {
    this.dialogRef.close(this.factura);
  }

  closeno() {
    this.dialogRef.close(false);
  }

  formularioEnviado() {}

  validar_fecha_cierre() {
    let resultado_z = {
      escorrecto_z : true,
      msg1_z : ""
    } 
    let fechaprop_z = ";"
    let msg1_z = "";
    let undia_z = 24 * 60 * 60 * 1000;
    let fechahoy_z = new Date();
    this.fechacierre_z = new Date(this.strfeccierre_z);
    let dias_z = Math.floor(fechahoy_z.getTime() / (undia_z)) -  Math.floor(this.fechacierre_z.getTime() / (undia_z));
    let fechamin_z = new Date(Math.floor(fechahoy_z.getTime()/undia_z) - undia_z * 3);
    fechaprop_z = this.configuracion.fecha_a_str(fechamin_z, "dd-mm-YYYY");
    if(dias_z < 0) {
      resultado_z.msg1_z = "No puede facturar con fecha Posterior";
      resultado_z.escorrecto_z = false;
    }
    if(dias_z > 3) {
      resultado_z.msg1_z = "No puede facturar con más de 3 días de diferencia";
      resultado_z.escorrecto_z = false;
    }
    this.fechacorrecta_z = resultado_z.escorrecto_z;
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
            this.closeyes();
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
    let params_z = {
      uuid: uuid,
      rotar: "NO",
    }
    this.servicioclientes.obten_pdf_cfdi_factura(JSON.stringify(params_z));

  }


}
