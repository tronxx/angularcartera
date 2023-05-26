import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ConfiguracionService } from './configuracion.service'


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url = 'http://mds1/www/cgi/carterax/';
  //url = 'http://mds1/www/cgi/cartera/';

  constructor( private http: HttpClient, private configuracion: ConfiguracionService  ) {
    this.obtenurl();
  }

    obtenurl () {
      this.url = this.configuracion.obtenurl();
      console.log("Debug: Ya hice llamado a configuracion:", this.url);
    }

    obtenusuario ( username: string): Observable<User[]> {
      var misparams = {
        "modo":"buscar_un_usuario",
        "login": username
      }
      //this.obtenurl();
      var respu_z = "";
      var miurl = this.url + "usuarios/busca_usuarios.php"
      const headers = { 'content-type': 'text/plain'};
      const body=JSON.stringify(misparams);
      
      return this.http.post<User[]>(miurl, misparams, {'headers':headers}).
      pipe(
        tap(_ => this.log('fetched usuarios')),
        catchError(this.handleError<User[]>('Ocurrio un error en Post obtenusuario'))

      );
      // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});

    }

    graba_sesion ( mitoken: string): Observable<any> {
      var respu_z = "";
      var miurl = this.url + "usuarios/busca_usuarios.php"
      const headers = { 'content-type': 'text/plain'};
      var misparams = {
        "modo":"grabar_sesion",
        "token": mitoken
      }
      const body=JSON.stringify(misparams);
      
      return this.http.post<any>(miurl, misparams, {'headers':headers}).
      pipe(
        tap(_ => this.log('fetched usuarios')),
        catchError(this.handleError<any>('Ocurrio un error en Post grabar sesion'))

      );
      // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});

    }

    cerrar_sesion ( mitoken: string): Observable<any> {
      var respu_z = "";
      var miurl = this.url + "usuarios/busca_usuarios.php"
      const headers = { 'content-type': 'text/plain'};
      var misparams = {
        "modo":"cerrar_sesion",
        "token": mitoken
      }

      localStorage.removeItem('token:');  
      const body=JSON.stringify(misparams);
      
      return this.http.post<any>(miurl, misparams, {'headers':headers}).
      pipe(
        tap(_ => this.log('fetched usuarios')),
        catchError(this.handleError<any>('Ocurrio un error en Post cerrar sesion'))

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
      console.log(`UsuariosService: ${message}`);
    }
  }
