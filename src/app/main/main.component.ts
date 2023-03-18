import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfiguracionService } from '../services/configuracion.service';
import { SpinnerComponent } from '../common/spinner/spinner.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  menus_z = [
    { link: "/conscli", titulo: "Clientes", active:"active" },
    { link: "/login", titulo: "Acceso", active:""  },
    { link: "/polizas", titulo: "Poliza de Cobranza", active:"active"  },
    { link: "/acumpol", titulo: "Consulta de Polizas", active:"active"  },
    { link: "/detallescli", titulo: "Detalles Cliente", active:"active"  },
    { link: "/listaaltas", titulo: "Lista de Ventas", active:"active"  },
    { link: "/polengan", titulo: "Pólizas Enganche", active:"active"  },
    { link: "/nvavta", titulo: "Facturacion", active:"active"  },
    // { link: "/listarelcob", titulo: "Relacion de Cobranza", active:"active"  },

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
