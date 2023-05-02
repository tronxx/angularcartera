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

@Component({
  selector: 'app-dlgdatosrelcob',
  templateUrl: './dlgdatosrelcob.component.html',
  styleUrls: ['./dlgdatosrelcob.component.css']
})
export class DlgdatosrelcobComponent implements OnInit {

  tienda? : CodigoPoliza;
  promotor? : Promotor;
  promotores : Promotor[] = [];
  fecha = this.datePipe.transform(new Date(),"yyyy-MM-dd");


  constructor(
    public dialog: MatDialog, public dialogRef: MatDialogRef<DlgdatosrelcobComponent>,
    @Inject(MAT_DIALOG_DATA) public message : string,
    private datePipe: DatePipe,
    private servicioclientes: ClientesService

  ) { }

  ngOnInit(): void {
    let params_z = JSON.parse(this.message);
    this.tienda = params_z;
    this.busca_catalogos();

  }

  busca_catalogos() {
    this.buscar_cobratarios();

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

  closeyes() {
    console.log("Debug: Cerrando dlgdatosfac ");
    let datosok = {
      fecha: this.fecha,
      promotor: this.promotor
    }
    this.dialogRef.close(datosok);
  }

  closeno() {
    this.dialogRef.close(false);
  }

}
