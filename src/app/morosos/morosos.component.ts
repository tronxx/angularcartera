import { Component } from '@angular/core';

@Component({
  selector: 'app-morosos',
  templateUrl: './morosos.component.html',
  styleUrls: ['./morosos.component.css']
})
export class MorososComponent {

  menus = [
    { link: "/listarelcob", titulo: "Relacion de Cobranza", active:"active"  },
    { link: "/reqcajas", titulo: "Relación de Requerimiento de Cajas ", active:"active"  },
  ]

}
