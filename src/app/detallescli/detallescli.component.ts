import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { ConfiguracionService } from '../services/configuracion.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { formatNumber,  CommonModule,  CurrencyPipe, formatCurrency, formatDate, DatePipe } from '@angular/common';
import { isEmpty } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { DlgbuscliComponent } from '../common/dlgbuscli/dlgbuscli.component';
import { MatIconModule } from '@angular/material/icon'; 
import { Cliente } from '../models/clientes';
import { Aval } from '../models/aval'
import { Movclis } from '../models/movclis'
import { Observcli } from '../models/observcli';
import { Plazos } from '../models/plazos';
import { Solicitud } from '../models/solicitud'
import { DlgedoctaComponent  } from '../common/dlgedocta/dlgedocta.component';
import { SpinnerComponent } from '../common/spinner/spinner.component';


@Component({
  selector: 'app-detallescli',
  templateUrl: './detallescli.component.html',
  styleUrls: ['./detallescli.component.css']
})
export class DetallescliComponent implements OnInit {

  clientes : Cliente[] = [];
  cliente? : Cliente;
  aval? : Aval;
  solicitud?: Solicitud;
  mismovclis : Movclis[] = [];
  mimovcli? : Movclis;
  observs: Observcli[] = [];
  miobserv? : Observcli;
  plazos: Plazos[] = [];
  miplazo? : Plazos;

  nomaval = ""
  diraval = "";
  codcli_z = "";
  compracli_z = "";
  tipocontado_z = "C";
  yaobscli_z = false;
  plazoscli_z = false;
  solicitudcli_z = false;
  esstatus1 = true;
  conpromocion = false;
  mub = 0;
  contado = "C";

  letras = [{
    letra: "",
    vence: "",
    fecven: new Date,
    pagado: false,
    vencido: false,
  }]


  strfecha_z = "";
  mimodelo = {
    modo : "buscar_un_cliente",
    codigo: this.codcli_z,
    idcli : -1
  }


  constructor(public dialog: MatDialog, 
    private route: ActivatedRoute,
    private config: ConfiguracionService,
    private servicioclientes: ClientesService) { }

  ngOnInit(): void {
    this.buscarclienteinicial();
  }
  
  buscarclienteinicial() {
    let parnumcli_z = this.route.snapshot.paramMap.get('numcli');
    if(parnumcli_z) {
      this.codcli_z = parnumcli_z;
      this.buscarcliente();
    }

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
          this.conpromocion = false;
          if(this.cliente.diasgracia > 0 ) {
            this.conpromocion = true;
          }
          this.busca_aval(this.cliente.idcli);
          this.busca_movclis(this.cliente.idcli);
          this.mostrar_vencimientos();
          this.esstatus1 = (this.cliente.status == "*")
          this.yaobscli_z = false;
          this.plazoscli_z = false;
          this.solicitudcli_z = false;
          this.mub = this.calcula_mub();
          console.log(" Debug: Valor de mub es:", this.mub);
          
        } else {
          this.alerta("Cliente Inexistente");
        }
      }
    );

  }

  calcula_mub () : number {
    let mub = 0;
    if(this.cliente) {
      const vtacred = (this.cliente.canle - this.cliente.bonificacion ) * this.cliente.nulet;
      let meses = this.cliente.nulet;
      if(this.cliente.qom == "Q" ) meses = this.cliente.nulet / 2;
      const plistamenoseng = this.cliente.preciolista * (1 + (this.cliente.piva / 100)) - this.cliente.enganche;
      mub = 100 * ( (vtacred / plistamenoseng) - 1);
      if(meses) mub = mub / meses;
      mub = Math.round(mub * 100) / 100;
      // (porutf_z)=(aua_z)(aub_z)/(1)-(100)*; .

    }
    return (mub)

  }

  busca_aval(idcli_z : number) {
    var params_z = {
      modo : "buscar_aval",
      codigo: this.codcli_z,
      idcli : idcli_z
    }
  
    this.servicioclientes.buscaaval(JSON.stringify(params_z)).subscribe(
      respu => {
        if(respu) {
          this.aval = respu;
          this.compracli_z = this.aval.compra;
          this.diraval = this.aval.dirav1 + " " + this.aval.dirav2;
          this.nomaval =  this.aval.nomav;
        } 
      }
    );

  }

  busca_movclis(idcli_z : number) {
    var params_z = {
      modo : "buscar_movtos_cliente",
      codigo: this.codcli_z,
      idcli : idcli_z
    }
    console.log("Debug: Estoy en busca movclis ", idcli_z);
    this.servicioclientes.buscamovtos(JSON.stringify(params_z)).subscribe(
      respu => {
        if(respu) {
          this.mismovclis = respu;
        } 
      }
    );
  

  }

  busca_observcli(idcli_z : number) {
    if (!this.yaobscli_z) {
      var params_z = {
        modo : "buscar_observ_cliente",
        codigo: this.codcli_z,
        idcli : idcli_z
      }
      console.log("Debug: Estoy en busca observcli ", idcli_z);
      this.servicioclientes.buscaobservs(JSON.stringify(params_z)).subscribe(
        respu => {
          if(respu) {
            this.observs = respu;
          } 
        }
      );
      this.yaobscli_z = true;
    }

  }

  busca_plazos(idcli_z : number) {
    if (!this.plazoscli_z) {
      var params_z = {
        modo : "buscar_plazos_cliente",
        codigo: this.codcli_z,
        idcli : idcli_z
      }
      console.log("Debug: Estoy en busca plazos ", idcli_z);
      this.servicioclientes.buscaplazos(JSON.stringify(params_z)).subscribe(
        respu => {
          if(respu) {
            this.plazos = respu;
          } 
        }
      );
      this.plazoscli_z = true;
    }

  }

  busca_solicitud(idcli_z : number) {
    if (!this.solicitudcli_z) {
      var params_z = {
        modo : "buscar_solicitud_cliente",
        codigo: this.codcli_z,
        idcli : idcli_z
      }
      console.log("Debug: Estoy en busca solicitud ", idcli_z);
      this.servicioclientes.buscasolicitud(JSON.stringify(params_z)).subscribe(
        respu => {
          if(respu) {
            this.solicitud = respu;
          } 
        }
      );
      this.solicitudcli_z = true;
    }

  }


  impresion_edocta() {
    let message = "Opciones de Estado de Cuenta";
    const dialogref = this.dialog.open(DlgedoctaComponent, {
      width:'650px',
      data: message
    });
    dialogref.afterClosed().subscribe(res => {
      if (res) {
        let params = res;
        let paramsedocta = {
          "numcli": this.codcli_z,
          "modopdf": "N",
          "consolicitud":"N",
          "conobservaciones":"N",
          "nummaximoobservaciones":0,
          "edoctaespecial":"N"
        }
        console.log("Debug: Con Solicitud:", params.datosol, " Numero:", params.numobs);
        if(params.tipoimpresion == "pdf")  paramsedocta.modopdf="S";
        if(params.datosol)   paramsedocta.consolicitud="S";
        if(params.edoctaespecial) paramsedocta.edoctaespecial="S";
        if(params.observaciones) {
           paramsedocta.conobservaciones="S";
           paramsedocta.nummaximoobservaciones=params.numobs;
        }
        this.servicioclientes.obtenedocta(JSON.stringify( paramsedocta));
      }
      console.log("Debug: Regrese de Impresion Estado de Cuenta", res);
    });

  }

  mostrar_vencimientos() {
    let inicial = 1;
    let misven_z = "";
    if (this.cliente) {
      const letraspagadas = Math.floor((this.cliente.abonos - this.cliente.enganche) / this.cliente.canle);

      this.letras = JSON.parse( this.servicioclientes.busca_vencimientos(
        this.cliente.fechavta, this.cliente.qom, inicial, 
        this.cliente.nulet, this.cliente.diasgracia, letraspagadas
      ));
    }
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


}
