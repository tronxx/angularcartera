import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import { Cliente } from '../../models/clientes';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-dlgimpriletras',
  templateUrl: './dlgimpriletras.component.html',
  styleUrls: ['./dlgimpriletras.component.css']
})

export class DlgimpriletrasComponent implements OnInit {

  ltaini = 0;
  ltafin = 0;
  title ="";
  constructor(
    public dialogRef: MatDialogRef<DlgimpriletrasComponent>,
    @Inject(MAT_DIALOG_DATA) public message : string

  ) { }

  ngOnInit(): void {
    let params_z = JSON.parse(this.message);
    this.ltaini = params_z.ltaini;
    this.ltafin = params_z.ltafin;
    this.title = params_z.title;
  }

  closeyes () {
    let resultado = {
      'ltaini': this.ltaini,
      'ltafin': this.ltafin
    }
    this.dialogRef.close(resultado);

  }

  closeno() {
    this.dialogRef.close(false);
  }

}
