import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Inject, Input,
  ViewChild
  
} from '@angular/core';
import SignaturePad from 'signature_pad';

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ClientesService } from '../../services/clientes.service'
import { ConfiguracionService } from '../../services/configuracion.service';
import { SignaturePadComponent } from '../../common/signaturepad/signaturepad.component';


@Component({
  selector: 'app-pidefirma',
  templateUrl: './pidefirma.component.html',
  styleUrls: ['./pidefirma.component.css']
})
export class PidefirmaComponent implements OnInit {

  signatureNeeded!: boolean;
  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureImg!: string;

  codigo="";
  modo="";
  clave="";
  tipoimagen="";

  constructor(
    public dialogRef: MatDialogRef<PidefirmaComponent>,
    private servicioclientes: ClientesService,
    private configuracion: ConfiguracionService,
    @Inject(MAT_DIALOG_DATA) public message : string    
  ) { }


  ngOnInit(): void {
    let params_z = JSON.parse(this.message);
    this.modo   = params_z.modo;
    this.codigo = params_z.codigo;
    this.tipoimagen = params_z.tipoimagen
    this.clave  = `${this.codigo}_${this.modo}_firma.jpg`;
    
  }

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  startDrawing(event: Event) {
    // works in device not in browser
  }

  moved(event: Event) {
    // works in device not in browser
  }

  clearPad() {
    this.signaturePad.clear();
  }

  closeyes() {
    const base64Data = this.signaturePad.toDataURL('image/jpg');
    this.signatureImg = base64Data;
    this.signatureNeeded = this.signaturePad.isEmpty();
    if (!this.signatureNeeded) {
      this.signatureNeeded = false;
      this.sendImage(this.signatureImg, this.clave);

    }
    this.dialogRef.close(true);
  }

  closeno() {
    this.dialogRef.close(false);
  }

  sendImage(img: string, codigo: string) {
    const base64Image = img;
    let exito = "";
    let error = "";

    this.servicioclientes.enviar_firma(img, codigo, this.tipoimagen).subscribe(res => {
        exito = res;

    });

  }


}
