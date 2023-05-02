import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; 
import { ClientesService } from '../../services/clientes.service';
import { ConfiguracionService } from '../../services/configuracion.service';
import { PolizasService } from '../../services/polizas.service';
import { Cliente } from '../../models';
import { Poliza } from '../../models';
import { Compania } from '../../models';
import { Relcob } from '../../models';
import { DlgimpripolComponent } from '../../dlgimpripol/dlgimpripol.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBodyComponent } from '../../dialog-body/dialog-body.component';
import { ReplaySubject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Promotor } from '../../models';
import { CodigoPoliza } from '../../models';
import { Renrelco } from '../../models';
import { RelcobService } from '../../services/relcob.service';
import { DlgdatosrelcobComponent } from './../dlgdatosrelcob/dlgdatosrelcob.component'

@Component({
  selector: 'app-detallesrelcob',
  templateUrl: './detallesrelcob.component.html',
  styleUrls: ['./detallesrelcob.component.css']
})
export class DetallesrelcobComponent implements OnInit {

  relcob? : Relcob;

  constructor() { }

  ngOnInit(): void {
  }

  agregar_cliente_a_relcob() {}  
}
