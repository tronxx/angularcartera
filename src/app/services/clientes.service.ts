import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cliente } from '../models/clientes';
import { ConfiguracionService } from './configuracion.service'

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
    
    var respu_z = "";
    var miurl = this.url + "clientes/busca_clientes.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    
    return this.http.post<Cliente[]>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Clientes')),
      catchError(this.handleError<Cliente[]>('Ocurrio un error en Post obten clientes'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  buscacliente ( parametros: string): Observable<Cliente> {
    
    var respu_z = "";
    var miurl = this.url + "clientes/busca_clientes.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    
    return this.http.post<Cliente>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Clientes')),
      catchError(this.handleError<Cliente>('Ocurrio un error en Post obten clientes'))
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
    console.log(`Clientes Service: ${message}`);
  }

}
