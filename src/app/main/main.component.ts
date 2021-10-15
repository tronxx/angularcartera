import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfiguracionService } from '../services/configuracion.service';

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
    { link: "/consupol", titulo: "Consulta de Polizas", active:"active"  },
    { link: "/detallescli", titulo: "Detalles Cliente", active:"active"  }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
