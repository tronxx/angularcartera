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
import { Factura } from '../../models/facturas';
import { Renfacfo } from '../../models/renfacfo';
import { Articulo } from '../../models/articulo';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-dlgrenfac',
  templateUrl: './dlgrenfac.component.html',
  styleUrls: ['./dlgrenfac.component.css']
})
export class DlgrenfacComponent implements OnInit {

  renfac: Renfacfo = <Renfacfo> {}
  articulo? : Articulo;
  esmoto = true;
  nuevorenfac = {
    renfac: this.renfac,
    esmoto: this.esmoto,
    seriemotor: "",
    pedimento: "",
    aduana: "",
    marca: ""
  }

  constructor(
    public dialog: MatDialog, public dialogRef: MatDialogRef<DlgrenfacComponent>,
    @Inject(MAT_DIALOG_DATA) public message : string,
    private configuracion: ConfiguracionService,
    private servicioclientes: ClientesService

  ) { }

  ngOnInit(): void {
  }

  closeyes() {
    this.dialogRef.close(this.renfac);
  }

  closeno() {
    this.dialogRef.close(false);
  }

  busca_articulo() {
      var params_z = {
        modo : "buscar_codigo_inven",
        codigo : this.renfac.codigo
      }
      console.log("Debug: Estoy en busca_articulo ", this.renfac.codigo);
      this.servicioclientes.busca_codigo_inven(JSON.stringify(params_z)).subscribe(
        respu => {
          if(respu) {
            this.articulo = respu;
            this.renfac.concepto = this.articulo.descri;
            if(this.articulo.linea == "MOTO") {
              this.esmoto = true;
            } else {
              this.esmoto = true;
            }
          } 
        }
      );
  }

  formularioEnviado() {}

}
