import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ClientesService } from '../services/clientes.service'
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { MatIconModule } from '@angular/material/icon'; 
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Reportescli } from '../models';
import { Renposer } from '../models';

import { ConfiguracionService } from '../services/configuracion.service';
import { ReportesService } from '../services/reportes.service';

@Component({
  selector: 'app-reportescli',
  templateUrl: './reportescli.component.html',
  styleUrls: ['./reportescli.component.css']
})
export class ReportescliComponent implements OnInit {

  reportescli : Reportescli[] = [];
  reportecli?: Reportescli;
  renglonesrenposer: Renposer[] = [];
  renposer?:Renposer;
  statuspagado = "S";
  codigo = "";
  numrep = 0;


  constructor(
    public dialog: MatDialog, 
    private configuracion: ConfiguracionService,
    private servicioclientes: ClientesService,
    private reportescliService : ReportesService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private location: Location,


  ) { }

  ngOnInit(  ): void {
    this.inicializa();
    this.codigo = String(this.route.snapshot.paramMap.get('numcli'));
    this.busca_reportes("");

  }

  inicializa() {
    let ayer_z = new Date();
    ayer_z.setDate (ayer_z.getDate() - 1);
    let strfecha =  this.datePipe.transform(ayer_z,"yyMMdd");
    let mistorage_z  = localStorage.getItem('capvtas') || "{}";
    let usrreg_z =  JSON.parse(mistorage_z);
  }

  busca_reportes(codigo: string) {
    const params = {
      modo: "obten_reportes_servicio_cliente",
      codigo: this.codigo
    }
    //console.log("Params", params);
    this.reportescliService.obtenreportes_cliente(JSON.stringify(params)).subscribe( res => {
      this.reportescli = res;
      //console.log("Se hizo la busqueda de reportes de este cliente", this.codigo, res);
      if(this.reportescli) {
        this.busca_movtos(this.reportescli[0]);
      }
      
    });

  }
  
  back(): void {
    this.location.back()
  }

  busca_movtos(reporte: Reportescli) {
    this.numrep = reporte.numero;
    const params = {
      modo: "obten_movimientos_reportes_servicio",
      reporte: reporte.numero,
      ubica: reporte.ubica
    }
    //console.log("Params", params);
    this.reportescliService.obten_movtos_reportes_cliente(JSON.stringify(params)).subscribe( res => {
      this.renglonesrenposer = res;
      //console.log("Se hizo la busqueda de reportes de este cliente", this.codigo, res);
      
    });


  }

}
