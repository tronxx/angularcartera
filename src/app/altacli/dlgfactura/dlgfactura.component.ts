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
  
  constructor(
    public dialog: MatDialog, public dialogRef: MatDialogRef<DlgrenfacComponent>,
    @Inject(MAT_DIALOG_DATA) public message : string,
    private configuracion: ConfiguracionService,
    private servicioclientes: ClientesService

  ) { }

  ngOnInit(): void {
    let params_z = JSON.parse(this.message);
    console.log("Debug:", params_z);
    this.idcli  = params_z.idcli;
    this.busca_factura();

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
          }
        }  else {
          this.factura = <Factura> { idfac: -1, idcli: -1};
          //this.factura.idfac = -1;
          //this.factura.idcli = this.idcli;
        }
      }
    );

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
