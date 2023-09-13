import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ConfiguracionService } from '../../../services/configuracion.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dlgcomiscob',
  templateUrl: './dlgcomiscob.component.html',
  styleUrls: ['./dlgcomiscob.component.css']
})
export class DlgcomiscobComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<DlgcomiscobComponent>,
    public builder : UntypedFormBuilder,
    private fb: FormBuilder,
    private configuracion: ConfiguracionService,
    private dateAdapter: DateAdapter<Date>,
    @Inject(MAT_DIALOG_DATA) public message : string    

  ) { }

  comiscob : any;
  ngOnInit(): void {
    this.comiscob = JSON.parse(this.message);

  }

  close() {
    this.dialogRef.close(true);
  }

  closeno() {
    this.dialogRef.close(false);
  }


}
