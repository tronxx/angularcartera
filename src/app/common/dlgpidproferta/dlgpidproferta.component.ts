import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ClientesService } from '../../services/clientes.service'
import { ConfiguracionService } from '../../services/configuracion.service';
import { Reltrasp } from '../../models/reltrasp';

@Component({
  selector: 'app-dlgpidproferta',
  templateUrl: './dlgpidproferta.component.html',
  styleUrls: ['./dlgpidproferta.component.css']
})
export class DlgpidprofertaComponent implements OnInit {

  proferta = 0;
  esoferta = false;

  constructor(
    public dialogRef: MatDialogRef<DlgpidprofertaComponent>,
    private servicioclientes: ClientesService,
    private configuracion: ConfiguracionService,
    @Inject(MAT_DIALOG_DATA) public message : string    

  ) { }

  ngOnInit(): void {
    let misdatos = JSON.parse(this.message);
    this.proferta = misdatos.proferta;
    this.esoferta = misdatos.tipo;
  }

  closeyes () {
    let resultado = {
      "proferta": this.proferta,
      "esoferta": this.esoferta
    }
    this.dialogRef.close(resultado);
  }

  closeno() {
    this.dialogRef.close(false);
  }




}
