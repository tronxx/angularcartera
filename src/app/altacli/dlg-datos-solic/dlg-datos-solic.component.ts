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
import { Solicitud } from '../../models/solicitud';

@Component({
  selector: 'app-dlg-datos-solic',
  templateUrl: './dlg-datos-solic.component.html',
  styleUrls: ['./dlg-datos-solic.component.css']
})
export class DlgDatosSolicComponent implements OnInit {

  solicitud : Solicitud = <Solicitud> {};  
  telconyuge_z = "";
  telconyugeaval_z = "";
  edoscivil = [
    {clave:"C", descri:"Casado"},
    {clave:"S", descri:"Soltero"}
  ];

  sexos = [
    {clave:"F", descri:"Femenino"},
    {clave:"M", descri:"Masculino"}
  ];

  constructor(
    public dialog: MatDialog, public dialogRef: MatDialogRef<DlgDatosSolicComponent>,
    @Inject(MAT_DIALOG_DATA) public message : string,
    private configuracion: ConfiguracionService,
    private servicioclientes: ClientesService

  ) { }

  ngOnInit(): void {
    this.solicitud.estadocivil = "S";
    this.solicitud.sexo = "M";
  }

  closeyes() {
    this.dialogRef.close(this.solicitud);
  }

  closeno() {
    this.dialogRef.close(false);
  }

  formularioEnviado() {}



}
