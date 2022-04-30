import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormsModule } from '@angular/forms';
import { formatNumber,  CommonModule,  CurrencyPipe, formatCurrency, formatDate, DatePipe } from '@angular/common';
import { isEmpty } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button'; 
import {MatCardModule} from '@angular/material/card'; 


@Component({
  selector: 'app-reportecomis',
  templateUrl: './reportecomis.component.html',
  styleUrls: ['./reportecomis.component.css']
})
export class ReportecomisComponent implements OnInit {

  datos = {
  fechainicial : "",
  fechafinal : "",
  codigoinicial : 0,
  codigofinal : 0,
  ubicacioninicial : "",
  ubicacionfinal : "",
  title : ""
  }

  constructor(
    public dialogRef: MatDialogRef<ReportecomisComponent>,
    @Inject(MAT_DIALOG_DATA) public message : string

  ) { }

  ngOnInit(): void {
    this.datos = JSON.parse(this.message);
  }

  closeyes() {
    this.dialogRef.close(this.datos);
  }

  closeno() {
    this.dialogRef.close(false);
  }

}
