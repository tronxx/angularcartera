import { Component, Input, ElementRef, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';

import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-signaturepad',
  templateUrl: './signaturepad.component.html',
  styleUrls: ['./signaturepad.component.css']
})
export class SignaturePadComponent implements OnInit {
  signatureNeeded!: boolean;
  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureImg!: string;
  @Input() clave = "";

  exito = "";
  error = "";
  

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
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

  savePad() {
    console.log("Estoy en savepad");
    
    const base64Data = this.signaturePad.toDataURL('image/jpg');
    this.signatureImg = base64Data;
    this.signatureNeeded = this.signaturePad.isEmpty();
    if (!this.signatureNeeded) {
      this.signatureNeeded = false;
      this.sendImage(this.signatureImg, this.clave);

    }
  }

  sendImage(img: string, codigo: string) {
    const base64Image = img;
    this.exito = "";
    this.error = "";


    // Enviar la imagen al servidor a través de una solicitud HTTP
    //const apiUrl = 'http://mds1/www/cgi/cartera/altas/recibe_firma.php';
    const apiUrl = 'https://mdscartera.ddns.net/www/cgi/diazysol/cartera/altas/recibe_firma.php';
    //const headers = { 'content-type': 'multipart/form-data; boundary=something'};
    const headers = { 'content-type': 'text/plain'};
    const imageData = {
      image: base64Image,
      additionalContent: codigo // Contenido adicional

    };
    console.log(base64Image);
    

    this.http.post(apiUrl, imageData, {'headers':headers})
      .subscribe(
        (response) => {
          console.log('Imagen enviada con éxito', response);
          this.exito = 'Imagen enviada con éxito';
          // Realizar acciones adicionales si es necesario
        },
        (error) => {
          console.error('Error al enviar la imagen', error);
          this.error = 'Imagen enviada con éxito';
          // Manejar el error apropiadamente
        }
      );
  }

}