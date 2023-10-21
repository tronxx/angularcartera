import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ConfiguracionService } from './configuracion.service'
import { Reportescli } from '../models';
import { Renposer } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  url = "";

  constructor(private http: HttpClient, private configuracion: ConfiguracionService) { 
    this.obtenurl();
  }

  obtenurl () {
    this.url = this.configuracion.obtenurl();
    console.log("Debug: Ya hice llamado a configuracion:", this.url);
  }

  obtenreportes_cliente ( parametros: string): Observable<Reportescli[]> {
    
    let respu_z = "";
    let miurl = this.url + "linrep/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const misparams = JSON.parse(parametros)
    const body=parametros;
    const params = {
      modo: misparams.modo,
      codigo: misparams.codigo

    }
    console.log("Estoy en reportes.service", params);
    
    return this.http.post<Reportescli[]>(miurl, JSON.stringify(params), {'headers':headers});
  }

  obten_movtos_reportes_cliente ( parametros: string): Observable<Renposer[]> {
    
    let respu_z = "";
    let miurl = this.url + "linrep/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const misparams = JSON.parse(parametros)
    const body=parametros;
    const params = {
      modo: misparams.modo,
      reporte: misparams.reporte,
      ubica: misparams.ubica,

    }
    
    return this.http.post<Renposer[]>(miurl, JSON.stringify(params), {'headers':headers});
  }


}
