import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Inject, Input,
  Output, EventEmitter,
  ViewChild
  
} from '@angular/core';

import {Subject, Observable} from 'rxjs'
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ClientesService } from '../../services/clientes.service'
import { ConfiguracionService } from '../../services/configuracion.service';

@Component({
  selector: 'app-tomafotos',
  templateUrl: './tomafotos.component.html',
  styleUrls: ['./tomafotos.component.css']
})
export class TomafotosComponent {

  codigo="";
  modo="";
  clave="";
  tipoimagen="";
  resultado = "";

  @Output()
  public pictureTaken = new EventEmitter<WebcamImage>();

  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId = '';
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];


  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  constructor(
    public dialogRef: MatDialogRef<TomafotosComponent>,
    private servicioclientes: ClientesService,
    private configuracion: ConfiguracionService,
    @Inject(MAT_DIALOG_DATA) public message : string    
  ) { }

  public ngOnInit(): void {
    let params_z = JSON.parse(this.message);
    this.modo   = params_z.modo;
    this.codigo = params_z.codigo;
    this.tipoimagen = params_z.tipoimagen
    this.clave  = `${this.codigo}_${this.modo}.jpg`;

    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
    
  }

  public webcamImage: WebcamImage  | undefined;

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }


  public handleImage(webcamImage: WebcamImage): void {
    //console.info('received webcam image', webcamImage);
    this.pictureTaken.emit(webcamImage);
    const base64Data = webcamImage.imageAsBase64;
    this.sendImage(base64Data, this.codigo);
    this.closeyes();
  }

  public cameraWasSwitched(deviceId: string): void {
    //console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  closeyes() {
    this.dialogRef.close(true);
  }

  closeno() {
    this.dialogRef.close(false);
  }


  sendImage(img: string, codigo: string) {
    const base64Image = img;
    let exito = "";
    let error = "";

    this.servicioclientes.enviar_firma(img, this.clave, this.tipoimagen).subscribe(res => {
        exito = res;

    });

  }

}
