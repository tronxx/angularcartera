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
    { link: "/polizas", titulo: "Poliza de Cobranza", active:"active"  },
    { link: "/acumpol", titulo: "Consulta de Polizas", active:"active"  },
    { link: "/detallescli", titulo: "Detalles Cliente", active:"active"  },
    { link: "/listaaltas", titulo: "Complementos Altas", active:"active"  },
    { link: "/sabanavtas", titulo: "Sabana de Ventas", active:"active"  },
  ];
  menuder_z= [
    { link: "/login", titulo: "Acceso", active:""  }
  ]
  menushiden_z = [
    { link: "/conscli", titulo: "Clientes", active:"active" },
    { link: "/polizas", titulo: "Poliza de Cobranza", active:"active"  },
    { link: "/consupol", titulo: "Consulta de Polizas", active:"active"  },
    { link: "/detallescli", titulo: "Detalles Cliente", active:"active"  },
    { link: "/listaaltas", titulo: "Alta Clientes", active:"active"  }
  ];

  constructor(private matDialog: MatDialog, private configuracion: ConfiguracionService) {
    configuracion.obtenconfig();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    //this.matDialog.open(DialogBodyComponent, dialogConfig);
  }

}
