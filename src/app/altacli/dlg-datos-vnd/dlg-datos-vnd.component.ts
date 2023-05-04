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
import { Cliagentes } from '../../models/cliagentes';
import { Vendedor } from '../../models/vendedor';


@Component({
  selector: 'app-dlg-datos-vnd',
  templateUrl: './dlg-datos-vnd.component.html',
  styleUrls: ['./dlg-datos-vnd.component.css']
})
export class DlgDatosVndComponent implements OnInit {
  vendedores : Vendedor[] = [];
  cliagente = <Cliagentes> {};

  constructor(
    public dialog: MatDialog, public dialogRef: MatDialogRef<DlgDatosVndComponent>,
    @Inject(MAT_DIALOG_DATA) public message : string,
    private configuracion: ConfiguracionService,
    private servicioclientes: ClientesService
  ) { }

  ngOnInit(): void {
    if (this.message == "NUEVO")  { 
      this.inicializa_agente_cli(); 
    } else { 
      this.cliagente= JSON.parse(this.message)
    }
    this.carga_catlogos();

  }

  inicializa_agente_cli() {
    this.cliagente.idvnd = -1;
  }

  carga_catlogos() {
    let params_z = {
      modo:"buscar_agentes"
    }
    this.servicioclientes.buscar_agentes(JSON.stringify(params_z)).subscribe(
      respu => {
        this.vendedores = respu;
      }

    );

  }

  closeyes() {
    this.dialogRef.close(this.cliagente);
  }

  closeno() {
    this.dialogRef.close(false);
  }

  formularioEnviado() {}

  
}
