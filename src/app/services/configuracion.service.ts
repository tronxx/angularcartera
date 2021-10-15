import { Injectable } from '@angular/core';
import { catchError, map, mapTo, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Compania } from '../models/config'


@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  config = {
    "estado":"-1",
    "cia": 0
  }

  cias : Compania[] = [];
  cia ?: Compania;

  xzcias = [
    {
      "Urldatos":"http://mds1/www/cgi/cartera/",
      "Empresa": "Diaz y Solis SA de CV",
      "Rfc": "MDS870209190",
      "Direc": "Calle 67 x 60 y 62 Centro",
      "CP": "97000",
      "Logo":"",
      "AplicarContingencia":"true",
      "DiasContingencia":"90",
      "FechaContingencia":"20200401",
      "Clave":"MDS",
      "PrecioListaMinimoCarta":"2300.00",
      "MesesMinimoCarta": "9",
      "CartaSaldadosMesesAntes": "2",
      "DiasBonificacion":"5"
    },
    {
      "Urldatos":"http://mds1/www/cgi/cartera/",
      "Empresa": "ElectroClub del Sureste S de RL de CV",
      "Rfc": "ESU160109EX9",
      "Direc": "Calle 67 x 60 y 62 Centro",
      "CP": "97000",
      "Logo":"",
      "AplicarContingencia":"true",
      "DiasContingencia":"90",
      "FechaContingencia":"20200401",
      "Clave":"EC",
      "PrecioListaMinimoCarta":"2300.00",
      "MesesMinimoCarta": "8",
      "CartaSaldadosMesesAntes": "1",
      "DiasBonificacion":"5"
    }
]



  constructor(private http: HttpClient) {
    this.obtenconfig();
  }

  obtenconfig () {
    this.http.get<any>("../assets/config/config.json").subscribe( datos => {
      this.cias = datos;
      this.config.estado = "OK";
      this.config.cia = 0;
      //console.log("Debug: Cias " + this.cias[0]);
      console.log("Debug: Datos " + datos);
      console.log("Debug: Ya hice llamado a configuracion:", this.config.estado);
    });

  }

  obtenurl () {
    if(this.config.estado != "OK") {
      console.log("Debug: aun no he llamado a configuracion:", this.config.estado);
      this.obtenconfig();
    }
    //console.log("Debug: Ya hice llamado a configuracion:", this.config.estado);
    return(this.cias[this.config.cia].Urldatos);
  }

  obtendatoscia () {
    if(this.config.estado != "OK") {
      console.log("Debug: aun no he llamado a configuracion:", this.config.estado);
      this.obtenconfig();
    }
    //console.log("Debug: Ya hice llamado a configuracion:", this.config.estado);
    return(this.cias[this.config.cia]);
  }

}
