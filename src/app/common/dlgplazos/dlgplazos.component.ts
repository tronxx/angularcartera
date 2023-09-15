import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ClientesService } from '../../services/clientes.service'
import { ConfiguracionService } from '../../services/configuracion.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dlgplazos',
  templateUrl: './dlgplazos.component.html',
  styleUrls: ['./dlgplazos.component.css']
})
export class DlgplazosComponent implements OnInit {

  xfechaplazo = "";
  xvenceplazo = "";
  esplazo_z = false;
  hoy_z = new Date();
  vence_z = this.hoy_z;

  form : FormGroup = this.fb.group({
    fechaplazo :[''],
    venceplazo: [''],
    observs:[''],
    

  })

  constructor(
    public dialogRef: MatDialogRef<DlgplazosComponent>,
    public builder : UntypedFormBuilder,
    private fb: FormBuilder,
    private servicioclientes: ClientesService,
    private configuracion: ConfiguracionService,
    private dateAdapter: DateAdapter<Date>,
    @Inject(MAT_DIALOG_DATA) public message : string    
  ) { }


  ngOnInit(): void {
    
    let params_z = JSON.parse(this.message);
    if(params_z.esplazo) this.esplazo_z = true;
    this.hoy_z = new Date(params_z.fecha.replace(/-/g, '\/'));
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    this.form  = this.fb.group({
      fechaplazo :[''],
      venceplazo: [''],
      observs:['']
  
    })
    this.asignadatos();
    
  }

  asignadatos() {
    this.vence_z = this.configuracion.SumaDiasaFecha(this.hoy_z, 20);
    this.xfechaplazo = this.configuracion.fecha_a_str(this.hoy_z, "YYYY-mm-dd");
    this.xvenceplazo = this.configuracion.fecha_a_str(this.vence_z, "YYYY-mm-dd");
    this.fechaplazo?.setValue(this.xfechaplazo);
    this.venceplazo?.setValue(this.xvenceplazo);
  }

  closeyes() {
    this.dialogRef.close(this.form.value);
  }

  get fechaplazo() {
    return this.form.get("fechaplazo");
  }

  get venceplazo() {
    return this.form.get("venceplazo");
  }

  get observs() {
    return this.form.get("observs");
  }

  closeno() {
    this.dialogRef.close(false);
  }
}
