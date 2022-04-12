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
import { Seriefac } from '../../models/seriesfac';
import { Usocfdi } from '../../models/usocfdi';
import { Metodopagocfdi } from '../../models/metodopagocfdi';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';


@Component({
  selector: 'app-dlgdatosfactura',
  templateUrl: './dlgdatosfactura.component.html',
  styleUrls: ['./dlgdatosfactura.component.css']
})
export class DlgdatosfacturaComponent implements OnInit {

  factura? : Factura;
  seriefac? : Seriefac;
  fechavta = ""
  ubiage = "";
  metodospago : Metodopagocfdi [] = [];
  usoscfdi : Usocfdi[] = [];

  constructor(
    public dialog: MatDialog, public dialogRef: MatDialogRef<DlgdatosfacturaComponent>,
    @Inject(MAT_DIALOG_DATA) public message : string,
    private configuracion: ConfiguracionService,
    private servicioclientes: ClientesService

  ) { }

  ngOnInit(): void {
    let params_z = JSON.parse(this.message);
    this.ubiage = params_z.ubiage;
    this.fechavta =params_z.fechavta;
    this.factura = params_z.factura;
    this.busca_catalogos();
    // console.log("Debug: dlgdatosfactura modo", params_z);
    if(params_z.modo == "NUEVO") {
      this.busca_serie_y_folio();
    }
  }

  busca_serie_y_folio() {
    var params_z = {
      modo : "buscar_facturacion_una_serie",
      ubiage : this.ubiage
    }
    console.log("Debug: Estoy en busca_seri_y_folio ", this.ubiage);
    this.servicioclientes.busca_serie_factura(JSON.stringify(params_z)).subscribe(
      respu => {
        this.seriefac = respu;
        if(this.factura) {
          this.factura.serie = this.seriefac.seriefac;
          this.factura.numero = this.seriefac.ultimofolio;
          this.factura.fecha =  this.fechavta;
          this.factura.rfc = 'XAXX010101000';
          this.factura.email = this.seriefac.emailctegeneral;
          this.factura.cveusocfdi = 'G03';
          this.factura.cvemetodopago = '01';
        }
      }
    );
 
  }

  busca_catalogos() {
    this.servicioclientes.busca_cat_uso_cfdi().subscribe(
      respu => {
        this.usoscfdi = respu;
      }
    );
    this.servicioclientes.busca_cfdi_metodo_pago ().subscribe(
      respu => {
        this.metodospago = respu;
      }
    );
   }

  
  formularioEnviado() {

  }

  closeyes() {
    console.log("Debug: Cerrando dlgdatosfac ", this.factura);
    this.dialogRef.close(this.factura);
  }

  closeno() {
    this.dialogRef.close(false);
  }


}
