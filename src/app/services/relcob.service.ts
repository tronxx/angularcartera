import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Relcob } from '../models';
import { Renrelco } from '../models/renrelco';
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
