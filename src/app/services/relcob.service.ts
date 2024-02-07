import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Relcob } from '../models';
import { Renrelco } from '../models';
import { Rutasmor } from '../models';
import { Desrutasmor } from '../models';
import { ConfiguracionService } from './configuracion.service'
import { Compania } from '../models'

@Injectable({
  providedIn: 'root'
})
export class RelcobService {
  url = 'http://mds1/www/cgi/carterax/';
  //url = 'http://mds1/www/cgi/cartera/';
  cia ?:Compania;
  claveemp = "";

  constructor(private http: HttpClient ,private configuracion: ConfiguracionService ) { 
    this.obtenurl();

    //console.log("Polizas Service:" + this.url);
  }

  obtenurl () {
    this.url = this.configuracion.obtenurl();
    this.cia = this.configuracion.obtendatoscia();
  }

  busca_relacion_cobranza ( params: string): Observable<Relcob> {
    
    var miurl = this.url + "relcob/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(params);
    
    return this.http.post<any>(miurl, params, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Relaciones Cobranza')),
      catchError(this.handleError<Relcob>('Ocurrio un error en Post obtener codigos polizas'))

    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  busca_relaciones_cobranza ( params: string): Observable<Relcob[]> {
    
    var miurl = this.url + "relcob/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(params);
    
    return this.http.post<any>(miurl, params, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Relaciones Cobranza')),
      catchError(this.handleError<Relcob[]>('Ocurrio un error en Post obtener codigos polizas'))

    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  busca_siguiente_folio_reltrasp ( params: string): Observable<any> {
    
    var miurl = this.url + "relcob/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(params);
    
    return this.http.post<any>(miurl, params, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Relaciones Cobranza')),
      catchError(this.handleError<Relcob[]>('Ocurrio un error en Post obtener codigos polizas'))

    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }


  agrega_nueva_relcob ( params: string): Observable<any> {
    let miurl = this.url + "relcob/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    let misparams = JSON.parse(params);
    return this.http.post<any>(miurl, misparams, {'headers':headers}).
    pipe(
      tap(_ => this.log('agregar pago ok')),
      catchError(this.handleError<Relcob>('Ocurrio un error en agregar_pago'))

    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});

  }

  busca_renglones_relacion_cobranza ( params: string): Observable<Renrelco[]> {
    
    var miurl = this.url + "relcob/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(params);
    
    return this.http.post<any>(miurl, params, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Renglones Relaciones Cobranza')),
      catchError(this.handleError<Renrelco[]>('Ocurrio un error en Post obtener codigos polizas'))

    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  agrega_renglones_relacion_cobranza ( params: string): Observable<any> {
    
    var miurl = this.url + "relcob/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(params);
    
    return this.http.post<any>(miurl, params, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched agrega_renglones_relacion_cobranza')),
      catchError(this.handleError<any>('Ocurrio un error en Post agrega_renglones_relacion_cobranza'))

    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  agregar_plazo ( params: string): Observable<any> {
    
    var miurl = this.url + "relcob/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(params);
    
    return this.http.post<any>(miurl, params, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched agrega_renglones_relacion_cobranza')),
      catchError(this.handleError<any>('Ocurrio un error en Post agrega_renglones_relacion_cobranza'))

    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  eliminar_renglon_relacion_cobranza ( params: string): Observable<any> {
    
    var miurl = this.url + "relcob/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(params);
    
    return this.http.post<any>(miurl, params, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched agrega_renglones_relacion_cobranza')),
      catchError(this.handleError<any>('Ocurrio un error en Post agrega_renglones_relacion_cobranza'))

    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  obtener_rutas_morosos ( params: string): Observable<Rutasmor[]> {
    
    var miurl = this.url + "relcob/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(params);
    
    return this.http.post<Rutasmor[]>(miurl, params, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Relaciones Cobranza')),
      catchError(this.handleError<Rutasmor[]>('Ocurrio un error en Post obtener codigos polizas'))

    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  imprimir_relcob (params:string) {
    let misparams = JSON.parse(params);
    //console.log("Debug: Estoy en obtentxtcomplmentopol ", params);
    var miurl = this.url + "relcob/servicios.php?modo=imprimir_relacion_relcob"+
    "&idrelacion="+misparams.idrelacion +
    "&rotarpdf="+misparams.rotarpdf +
    "&titulo="+misparams.titulo;
    window.open(miurl, "_blank");
  }

  imprimir_req_caja  (params:string) {
    let misparams = JSON.parse(params);
    //console.log("Debug: Estoy en obtentxtcomplmentopol ", params);
    const modo = "imprimir_relacion_reqcaja"
    var miurl = this.url + "relcob/servicios.php?"+
    "modo=" + modo +
    "&idrelacion="+misparams.idrelacion +
    "&rotarpdf="+misparams.rotarpdf 
    window.open(miurl, "_blank");
  }

  imprimir_acumulado_comisiones_morosos  (params:string) {
    let misparams = JSON.parse(params);
    //console.log("Debug: Estoy en obtentxtcomplmentopol ", params);
    const modo = "imprimir_relacion_reqcaja"
    var miurl = this.url + "relcob/concomis.php?"+
    `modo=${misparams.modo}`+
    `&fechainicial=${misparams.fechainicial}`+
    `&fechafinal=${misparams.fechafinal}`+
    `&polizainicial=${misparams.polizaini}`+
    `&polizafinal=${misparams.polizafin}`;
    window.open(miurl, "_blank");
  }


  obtener_poblciones_rutas_morosos ( params: string): Observable<Desrutasmor[]> {
    
    var miurl = this.url + "relcob/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(params);
    
    return this.http.post<Desrutasmor[]>(miurl, params, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Relaciones Cobranza')),
      catchError(this.handleError<Desrutasmor[]>('Ocurrio un error en Post obtener codigos polizas'))

    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  generar_relacion_cobranza ( params: string): Observable<any[]> {
    
    var miurl = this.url + "relcob/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(params);
    
    return this.http.post<any[]>(miurl, params, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Creando relacion de cobranza')),
      catchError(this.handleError<any[]>('Ocurrio un error en Post obtener codigos polizas'))

    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`PolcobService: ${message}`);
  }

}
