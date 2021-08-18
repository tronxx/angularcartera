import { Component, Inject } from "@angular/core";
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfiguracionService } from './services/configuracion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cartera';
  menus_z = [
    { link: "/conscli", titulo: "Clientes", active:"active" },
    { link: "/login", titulo: "Acceso", active:""  },
    { link: "/polizas", titulo: "Poliza de Cobranza", active:"active"  }
  ];

  constructor(private matDialog: MatDialog, private configuracion: ConfiguracionService) {
    configuracion.obtenconfig();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    //this.matDialog.open(DialogBodyComponent, dialogConfig);
  }

}
