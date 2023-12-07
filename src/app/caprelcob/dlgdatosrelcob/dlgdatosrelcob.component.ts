import { Component, OnInit, Inject, Input } from '@angular/core';
import { ClientesService } from '../../services/clientes.service'
import { FormsModule } from '@angular/forms';
import { formatNumber,  CommonModule,  CurrencyPipe, formatCurrency, formatDate, DatePipe } from '@angular/common';
import { isEmpty } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card'; 
import { DialogBodyComponent } from '../../dialog-body/dialog-body.component';
import { MatIconModule } from '@angular/material/icon'; 
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CodigoPoliza } from '../../models';
import { Promotor  } from '../../models';
import { PolizasService } from '../../services/polizas.service';
import { RelcobService } from '../../services/relcob.service';

@Component({
  selector: 'app-dlgdatosrelcob',
  templateUrl: './dlgdatosrelcob.component.html',
  styleUrls: ['./dlgdatosrelcob.component.css']
})
export class DlgdatosrelcobComponent implements OnInit {

  tienda? : CodigoPoliza;
  micodpol? : CodigoPoliza;
  promotor? : Promotor;
  promotores : Promotor[] = [];
  cajas : CodigoPoliza[] = [];
  cajareq = "";
  promotsel = "";
  folio = 0;
  tiporel = 710;
  TIPORELCOB = 710;
  TIPOREQ = 711;
  
  fecha = this.datePipe.transform(new Date(),"yyyy-MM-dd");


  constructor(
    public dialog: MatDialog, public dialogRef: MatDialogRef<DlgdatosrelcobComponent>,
    @Inject(MAT_DIALOG_DATA) public message : string,
    private datePipe: DatePipe,
    private servicioclientes: ClientesService,
    private serviciopolizas: PolizasService,
    private relcobService: RelcobService,
  ) { }

  ngOnInit(): void {
    let params_z = JSON.parse(this.message);
    this.tienda = params_z.poliza;
    this.tiporel = params_z.tiporel;
    this.busca_catalogos();

  }

  busca_catalogos() {
    this.buscar_cobratarios();
    this.buscar_codigos_poliza();
  }

  buscar_cobratarios() {
    let paramspromo_z = {
      modo :"buscar_cobratario",
      codprom : "-1"
    }
    this.servicioclientes.busca_promotores(JSON.stringify(paramspromo_z)).subscribe(
      respu => {
        this.promotores = respu;
      }
    );


  }

  buscar_codigos_poliza() {
    var params = {
      "modo":"buscar_codigos_polizas",
      "idusuario": -1
    };
    //console.log("idusuario:" + this.usrreg_z.idusuario);
    this.serviciopolizas.busca_codigos_poliza(JSON.stringify(params)).subscribe(
      respu => {
        this.cajas = respu;
        this.micodpol = this.cajas[0];
        this.cajareq = this.micodpol.clave;
        //console.log("Codigos Polizas:", respu);
      }
    )
  }

  buscar_siguiente_folio() {
    this.micodpol = this.cajas.filter(mi => mi.clave === this.cajareq)[0];
    var params = {
      modo:"buscar_siguiente_folio_relcob",
      codpol: this.tienda?.clave,
      tiporel: this.tiporel,
      cajareq: this.cajareq,
      idpromot: this.micodpol?.idcodpol
    };
    //console.log("Buscar siguiente folio:", params);
    this.relcobService.busca_siguiente_folio_reltrasp(JSON.stringify(params)).subscribe(
      respu => {
        console.log("Siguiente Folio:", respu);
        
        this.folio  = respu.folio + 1;
        //console.log("Codigos Polizas:", respu);
      }
    )

  }

  closeyes() {
    console.log("Debug: Cerrando dlgdatosfac ");
    let datosok = {
      fecha: this.fecha,
      promotor: this.promotor,
      folio: this.folio,
      caja: this.cajareq
    }
    this.dialogRef.close(datosok);
  }

  closeno() {
    this.dialogRef.close(false);
  }

}
