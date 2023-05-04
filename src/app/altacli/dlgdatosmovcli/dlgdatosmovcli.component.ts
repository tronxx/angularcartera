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

@Component({
  selector: 'app-dlgdatosmovcli',
  templateUrl: './dlgdatosmovcli.component.html',
  styleUrls: ['./dlgdatosmovcli.component.css']
})

export class DlgdatosmovcliComponent implements OnInit {
  minvomov = <Movclis> {};
  tipagos_z = [
    {clave:"AB", descri:"Bonificacion"},
    {clave:"AR", descri:"Recargo"},
    {clave:"NE", descri:"Neto"}
  ];

  pedirrecobon = true;

  textorecobon_z = "Bonificacion";
  recobon_z = 0;
  
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DlgdatosmovcliComponent>,
    @Inject(MAT_DIALOG_DATA) public message : string,
    private configuracion: ConfiguracionService,
    private servicioclientes: ClientesService) { }

  ngOnInit(): void {
    if (this.message == "NUEVO")  { 
      this.inicializa_novmov(); 
    } else { 
      this.minvomov= JSON.parse(this.message)
    }
  }

  inicializa_novmov() {
    let fecha_z = new Date;
    this.minvomov.fechamov = this.configuracion.fecha_a_str(fecha_z, "YYYY-mm-dd");
    this.minvomov.importe = 0;
    this.minvomov.tipag = "AB";
    this.minvomov.ace = "E";

  }

  selecciona_bonrec() {
    if (this.minvomov.tipag == "AB") {
      this.pedirrecobon = true; this.textorecobon_z="Bonificacion";
    }
    if (this.minvomov.tipag == "AR") {
      this.pedirrecobon = true; this.textorecobon_z="Recargo";
    }
    if (this.minvomov.tipag == "NE") {
      this.pedirrecobon = false;
    }
  }

  closeyes() {
    this.minvomov.recargo = 0;
    this.minvomov.bonificacion = 0;
    if(this.minvomov.tipag == "AB" ) this.minvomov.bonificacion = this.recobon_z;
    if(this.minvomov.tipag == "AR" ) this.minvomov.recargo      = this.recobon_z;
    this.dialogRef.close(this.minvomov);
  }

  closeno() {
    this.dialogRef.close(false);
  }

  formularioEnviado() {}


}
