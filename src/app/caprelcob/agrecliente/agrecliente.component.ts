import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; 
import { ClientesService } from '../../services/clientes.service';
import { ConfiguracionService } from '../../services/configuracion.service';
import { PolizasService } from '../../services/polizas.service';
import { Cliente } from '../../models';
import { Compania } from '../../models';
import { Relcob } from '../../models';
import { DlgimpripolComponent } from '../../dlgimpripol/dlgimpripol.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBodyComponent } from '../../dialog-body/dialog-body.component';
import { ReplaySubject } from 'rxjs';
import { Promotor } from '../../models';
import { CodigoPoliza } from '../../models';
import { Renrelco } from '../../models';
import { RelcobService } from '../../services/relcob.service';
import { DlgdatosrelcobComponent } from './../dlgdatosrelcob/dlgdatosrelcob.component'
import { DlgbuscliComponent } from '../../common/dlgbuscli/dlgbuscli.component';
import { formatNumber,  CommonModule,  CurrencyPipe, formatCurrency, formatDate, DatePipe } from '@angular/common';

@Component({
  selector: 'app-agrecliente',
  templateUrl: './agrecliente.component.html',
  styleUrls: ['./agrecliente.component.css']
})
export class AgreclienteComponent implements OnInit {

  cliente?: Cliente;
  codcli_z = ""
  idcli_z = -1;
  promo_z = "";
  cia_z?: Compania;
  observs_z = "";
  ltaini_z = 0;
  ltafin_z = 0;
  importe_z = 0;
  impxlet_z = 0;

  listavencimientos_z = [ {
    letra: "",
    vence: "",
    fecven: new Date,
    pagado: false,
    vencido: false,
  }
]

  constructor(
    public dialog: MatDialog, public dialogRef: MatDialogRef<AgreclienteComponent>,
    @Inject(MAT_DIALOG_DATA) public message : string,
    private datePipe: DatePipe,
    private configuracion : ConfiguracionService,
    private servicioclientes: ClientesService

  ) { }

  ngOnInit(): void {
  }

  busqueda_por_nombre() {
    const dialogref = this.dialog.open(DlgbuscliComponent, {
      width:'650px',
      data: ''
    });
    dialogref.afterClosed().subscribe(res => {
      if (res) {
        this.codcli_z = res.numcli;
        this.buscarcliente();
      }
      console.log("Debug: Regrese de busqueda por Nombre", res);
    });
  

}

buscarcliente() {
  var params_z = {
    modo : "buscar_un_cliente",
    codigo: this.codcli_z,
    idcli : -1
  }

  this.servicioclientes.buscacliente(JSON.stringify(params_z)).subscribe(
    respu => {
      if(respu) {
        this.cliente = respu;
        //this.buscadiasgracia();
        this.calcular_datos_cliente();
      } else {
        this.alerta("Cliente Inexistente");
        this.closeno();
      }
    }
  )

}

calcular_datos_cliente() {
 
  let impxcob_z = 0;
  let ltpag_z = 0;
  let prlet_z = 0;
  let sigletra_z = 0;
  let nulets_z = 0;
  let ultimaletravencida_z = 0;
  let impletven_z = 0;
  let ii_z = 1;
  let maxlet_z = 3;
  let fvence_z = "";
  let fechahoy_z = new Date();
  let fecmax_z = this.configuracion.SumaDiasaFecha(fechahoy_z, -5);
  let strfecmax_z = this.configuracion.fecha_a_str(fecmax_z, "YYYY-mm-dd");
  
  if(this.cliente) {
    prlet_z = this.cliente.canle;
    nulets_z = this.cliente.nulet;
    ltpag_z = Math.floor ((this.cliente.abonos - this.cliente.enganche - this.cliente.servicio  ) / this.cliente.canle);
    this.listavencimientos_z = JSON.parse (this.configuracion.generavencimientos(this.cliente.fechavta, this.cliente.qom, 1, this.cliente.nulet, this.cliente.diasgracia, ltpag_z));
    
    ii_z = 0;
    for(let mivence_z of this.listavencimientos_z) {
      if(mivence_z.vencido && ii_z < maxlet_z) {
        ultimaletravencida_z = Number( mivence_z.letra);
        ii_z++;
      }
    }

    maxlet_z = ltpag_z + 3;
    this.impxlet_z = prlet_z;
    if(ultimaletravencida_z < ltpag_z) ultimaletravencida_z = ltpag_z;
    if(this.cliente.abonos >= (this.cliente.enganche  + this.cliente.servicio) ) {
      let imp1_z = ( ltpag_z * prlet_z) + this.cliente.enganche + this.cliente.servicio;
      //console.log("Debug LtaPag:" + ltpag_z.toString() + " Imp:" + this.currencyPipe.transform(imp1_z, '$'));
      //console.log("Debug LtaPag:" + this.ltpag_z.toString() + " Imp:" + this.imp1_z.toString());
      if (imp1_z == this.cliente.abonos ) {
        impxcob_z = prlet_z;
        sigletra_z = ltpag_z + 1;
        this.observs_z = "Debe pagar la Letra " + sigletra_z.toString().padStart(2, " ");
      } else {
        sigletra_z = ltpag_z + 1;
        impxcob_z = (sigletra_z * prlet_z ) + this.cliente.enganche + this.cliente.servicio - this.cliente.abonos;
        this.observs_z = "Debe Pagar Saldo de Letra " + sigletra_z.toString();
      }
      
    } else {
    
      impxcob_z =  this.cliente.enganche + this.cliente.servicio - this.cliente.abonos;
      this.observs_z = "Debe ser Saldo Enganche" + 
        + " Por: " +   formatCurrency ( Number(impxcob_z) , 'en-US', '$');
    
    }
    if(ultimaletravencida_z > sigletra_z) {
      impletven_z = (ultimaletravencida_z - sigletra_z) * prlet_z;
      this.observs_z += "-" + ultimaletravencida_z.toString();
      impxcob_z += impletven_z;
    }
    this.observs_z += "/"  + nulets_z.toString() + " por " +  formatCurrency ( Number(impxcob_z) , 'en-US', '$');
    this.importe_z = impxcob_z;
    this.ltaini_z = sigletra_z;
    this.ltafin_z = ultimaletravencida_z;
    if(this.ltafin_z < this.ltaini_z) this.ltafin_z = this.ltaini_z;

  }
}

calcula_importe() {
  if(this.cliente) {
    this.importe_z = Math.round(this.impxlet_z * this.ltafin_z + this.cliente?.servicio + this.cliente?.enganche - this.cliente?.abonos);

  }
}

closeno() {
  this.dialogRef.close(false);
}

alerta(mensaje: string) {
  const dialogref = this.dialog.open(DialogBodyComponent, {
    width:'350px',
    data: mensaje
  });
  dialogref.afterClosed().subscribe(res => {
    //console.log("Debug", res);
  });

}

siaceptarcliente() {
  const resultado = {
    codigo: this.cliente?.numcli,
    ltaini: this.ltaini_z,
    ltafin: this.ltafin_z,
    impxlet: this.impxlet_z,
    importe: this.importe_z
  }
  this.dialogRef.close(resultado);
}

}
