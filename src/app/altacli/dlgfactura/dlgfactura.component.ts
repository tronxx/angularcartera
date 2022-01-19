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
import { Movclis } from '../../models/movclis';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConfiguracionService } from '../../services/configuracion.service';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Cliagentes } from '../../models/cliagentes';
import { Vendedor } from '../../models/vendedor';
import { Factura } from '../../models/facturas';
import { Renfacfo } from '../../models/renfacfo';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { DlgrenfacComponent } from '../dlgrenfac/dlgrenfac.component';
import { DlgdatosfacturaComponent  } from '../dlgdatosfactura/dlgdatosfactura.component';

@Component({
  selector: 'app-dlgfactura',
  templateUrl: './dlgfactura.component.html',
  styleUrls: ['./dlgfactura.component.css']
})
export class DlgfacturaComponent implements OnInit {

  factura? : Factura;
  renfacfo : Renfacfo[] = [];
  idcli = 0;
  cargoscli_z = 0;
  servic_z = 0;
  preciolista_z =  0;
  prodfin_z = 0;
  fechavta = ""
  ubiage = "";
  tempo_z = "Tempo:";
  
  constructor(
    public dialog: MatDialog, 
    public dialogRef: MatDialogRef<DlgrenfacComponent>,
    public dialogfactura : MatDialogRef<DlgdatosfacturaComponent>,
    @Inject(MAT_DIALOG_DATA) public message : string,
    private configuracion: ConfiguracionService,
    private servicioclientes: ClientesService

  ) { }

  ngOnInit(): void {
    let params_z = JSON.parse(this.message);
    console.log("Debug: dlgfactura params:", params_z);
    this.idcli  = params_z.idcli;
    this.cargoscli_z = params_z.cargos;
    this.servic_z = params_z.servic;
    this.preciolista_z = params_z.preciolista;
    this.ubiage = params_z.ubiage,
    this.fechavta = params_z.fechavta;
    if(params_z.modo == "NUEVO") {
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
            this.busca_renfacfo(this.factura.idfac);
            this.prodfin_z = ( this.preciolista_z * ( 16 / 100 + 1 )) -  this.servic_z;
            this.prodfin_z = this.cargoscli_z - this.prodfin_z;
            if(this.prodfin_z < 0) this.prodfin_z = 0;
            this.factura.prodfin = this.prodfin_z;
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
        let params_z = {
          modo:"agregar_ren_factura",
          idcli:this.idcli,
          renfac:res
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

  closeyes() {
    this.dialogRef.close(this.factura);
  }

  closeno() {
    this.dialogRef.close(false);
  }

  formularioEnviado() {}

  cerrar_factura() {

  }

  imprimir_factura() {

  }


}
