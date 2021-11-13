import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cliente } from '../models/clientes';
import { Aval } from '../models/aval';
import { ConfiguracionService } from './configuracion.service'
import { Movclis } from '../models/movclis';
import { Observcli } from '../models/observcli';
import { Plazos } from '../models/plazos';
import { Solicitud } from '../models/solicitud';
import { Cartapro } from '../models/cartapro';
import { Ubivta } from '../models/ubivta';
import { Promotor } from '../models/promotor';
import { Nulets } from '../models/nulets';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  url = "";

  constructor(private http: HttpClient, private configuracion: ConfiguracionService) { 
    this.obtenurl();
  }

  obtenurl () {
    this.url = this.configuracion.obtenurl();
    console.log("Debug: Ya hice llamado a configuracion:", this.url);
  }

  obtenclientes ( parametros: string): Observable<Cliente[]> {
    
    let respu_z = "";
    let miurl = this.url + "clientes/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    
    return this.http.post<Cliente[]>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Clientes')),
      catchError(this.handleError<Cliente[]>('Ocurrio un error en Post obten clientes'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  obtenrelvtas ( parametros: string): Observable<Cliente[]> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    
    return this.http.post<Cliente[]>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Clientes')),
      catchError(this.handleError<Cliente[]>('Ocurrio un error en Post obten clientes'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  buscaclientealta ( parametros: string): Observable<Cliente> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    
    return this.http.post<Cliente>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Clientes')),
      catchError(this.handleError<Cliente>('Ocurrio un error en Post busca cliente'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  obtencartaprom ( parametros: string): Observable<Cartapro[]> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    
    return this.http.post<Cartapro[]>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched CartasProm')),
      catchError(this.handleError<Cartapro[]>('Ocurrio un error en Post obten cartaprom'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  obtenubivta ( parametros: string): Observable<Ubivta[]> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    
    return this.http.post<Ubivta[]>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched CartasProm')),
      catchError(this.handleError<Ubivta[]>('Ocurrio un error en Post obten Ubivta'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  agrega_nuevo_cliente( parametros:string): Observable<any> {
    let misparams = parametros;
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(misparams);
    console.log("Debug: misparams", misparams);
    
    return this.http.post<any>(miurl, misparams, {'headers':headers}).
    pipe(
      tap(_ => this.log('agregar pago ok')),
      catchError(this.handleError<Cliente>('Ocurrio un error en agregar_cliente'))

    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});


  }

  obtennulets ( parametros: string): Observable<Nulets[]> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    
    return this.http.post<Nulets[]>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched CartasProm')),
      catchError(this.handleError<Nulets[]>('Ocurrio un error en Post obten Ubivta'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }


  buscacliente ( parametros: string): Observable<Cliente> {
    
    let respu_z = "";
    let miurl = this.url + "clientes/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    
    return this.http.post<Cliente>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Clientes')),
      catchError(this.handleError<Cliente>('Ocurrio un error en Post busca cliente'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }


  buscaaval( parametros: string): Observable<Aval> {
    
    let respu_z = "";
    let miurl = this.url + "clientes/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    console.log("Debug: Estoy en busca Aval ", parametros);
  
    return this.http.post<Aval>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Aval')),
      catchError(this.handleError<Aval>('Ocurrio un error en Post obten aval'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  buscamovtos( parametros: string): Observable<Movclis[]> {
    
    let respu_z = "";
    let miurl = this.url + "clientes/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    console.log("Debug: Estoy en busca movtos ", parametros);
  
    return this.http.post<Movclis[]>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Aval')),
      catchError(this.handleError<Movclis[]>('Ocurrio un error en Post obten aval'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  buscaobservs( parametros: string): Observable<Observcli[]> {
    
    let respu_z = "";
    let miurl = this.url + "clientes/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    console.log("Debug: Estoy en busca movtos ", parametros);
  
    return this.http.post<Observcli[]>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Observcli')),
      catchError(this.handleError<Observcli[]>('Ocurrio un error en Post obten buscaobservs'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  buscaplazos( parametros: string): Observable<Plazos[]> {
    
    let respu_z = "";
    let miurl = this.url + "clientes/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    console.log("Debug: Estoy en busca plazos ", parametros);
  
    return this.http.post<Plazos[]>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Observcli')),
      catchError(this.handleError<Plazos[]>('Ocurrio un error en Post obten buscaobservs'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  busca_promotores ( params: string): Observable<Promotor[]> {
    
    var miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(params);
    
    return this.http.post<Promotor[]>(miurl, params, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched codigos cobratario')),
      catchError(this.handleError<Promotor[]>('Ocurrio un error en Post obtener codigos polizas'))

    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});

  }


  buscasolicitud( parametros: string): Observable<Solicitud> {
    
    let respu_z = "";
    let miurl = this.url + "clientes/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    console.log("Debug: Estoy en busca solicitud ", parametros);
  
    return this.http.post<Solicitud>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Solicitud')),
      catchError(this.handleError<Solicitud>('Ocurrio un error en Post obten buscaobservs'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  obtenedocta(params:string) {
    let misparams = JSON.parse(params);
    console.log("Debug: Estoy en obtenedocta ", params);
    var miurl = this.url + "clientes/servicios.php?modo=obtener_estado_cuenta_cliente" + 
      "&codigo="+misparams.numcli+
      "&modopdf="+misparams.modopdf+"&consolicitud="+misparams.consolicitud+
      "&conobservaciones="+misparams.conobservaciones+"&nummaximoobservaciones="+misparams.nummaximoobservaciones+
      "&estadocuentaespecial="+misparams.edoctaespecial;

      console.log("Debug url: ", miurl);
      window.open(miurl, "_blank");
  }

  busca_vencimientos (fechavta:string, qom:string, inicial:number, final:number) {
    return (this.configuracion.generavencimientos(fechavta, qom, inicial, final));
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
    console.log(`Clientes Service: ${message}`);
  }

}
