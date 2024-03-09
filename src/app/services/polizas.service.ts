import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Poliza } from '../models/polizas';
import { ConfiguracionService } from './configuracion.service'
import { Renpol } from '../models/renpol';
import { Compania } from '../models/config'
import { CodigoPoliza } from '../models'

@Injectable({
  providedIn: 'root'
})
export class PolizasService {

  url = 'http://mds1/www/cgi/carterax/';
  //url = 'http://mds1/www/cgi/cartera/';
  cia ?:Compania;
  claveemp = "";
  

  constructor( private http: HttpClient ,private configuracion: ConfiguracionService ) { 
    this.obtenurl();

    //console.log("Polizas Service:" + this.url);
  }

  obtenurl () {
    this.url = this.configuracion.obtenurl();
    this.cia = this.configuracion.obtendatoscia();
  }

  busca_codigos_poliza ( params: string): Observable<any> {
    
    var miurl = this.url + "polizas/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(params);
    
    return this.http.post<any>(miurl, params, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched codigos poliza')),
      catchError(this.handleError<Poliza[]>('Ocurrio un error en Post obtener codigos polizas'))

    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});

  }

  BuscaRecargosDeLetra ( params: string): Promise<any> {
    
    var miurl = this.url + "polizas/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(params);
    
    return this.http.post<any>(miurl, params, {'headers':headers}).toPromise();
  }


  busca_cobratarios ( params: string): Observable<any> {
    
    var miurl = this.url + "polizas/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(params);
    
    return this.http.post<any>(miurl, params, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched codigos cobratario')),
      catchError(this.handleError<Poliza[]>('Ocurrio un error en Post obtener codigos polizas'))

    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});

  }


  buscapoliza ( params: string): Observable<Poliza> {
    let misparamold_z = {
      "modo":"",
      "fecha":"",
      "crearpoliza":"S",
      "tda":""
    };
    misparamold_z = JSON.parse(params);
    let misparams = {
      "modo":"acceder_poliza",
      "fechapoliza": misparamold_z.fecha,
      "crearpoliza":misparamold_z.crearpoliza,
      "tdapol":  misparamold_z.tda
    }
    
    
    let miurl = this.url + "polizas/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(misparams);
    
    return this.http.post<Poliza>(miurl, misparams, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched poliza')),
      catchError(this.handleError<Poliza>('Ocurrio un error en Post obtenusuario'))

    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});

  }

  busca_acumulado_polizas ( params: string): Observable<Poliza[]> {
    let miurl = this.url + "polizas/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    //const body=JSON.stringify(misparams);
    console.log("Debug: busca_acumulado_polizas params:", params);
    
    return this.http.post<Poliza[]>(miurl, params, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched poliza')),
      catchError(this.handleError<Poliza[]>('Ocurrio un error en Post obtenusuario'))

    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});

  }

  buscar_recoja ( params: string): Observable<any> {
    let miurl = this.url + "polizas/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    //const body=JSON.stringify(misparams);
    console.log("Debug: buscar_recoja params:", params);
    
    return this.http.post<any>(miurl, params, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched recoja')),
      catchError(this.handleError<any>('Ocurrio un error en Post buscar_recoja'))

    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});

  }


  agregar_pago ( params: string): Observable<any> {
    const misparamold_z = JSON.parse(params);
    
    let misparams = {
      "modo":"agregar_pago",
      "idcli": misparamold_z.idcli,
      "idpoliza" : misparamold_z.idpoliza,
      "tipopago" : misparamold_z.tipopago,
      "ltaini" : misparamold_z.ltaini,
      "ltafin" : misparamold_z.ltafin,
      "concepto":misparamold_z.concepto,
      "conceptocompl":misparamold_z.conceptocompl,
      "tipomov":misparamold_z.tipomov,
      "recobon":misparamold_z.recobon,
      "importe":misparamold_z.importe,
      "neto":misparamold_z.neto,
      "dias":misparamold_z.dias,
      "idusuario":misparamold_z.idusuario,
      "cobratario":misparamold_z.cobratario,
      "vence":misparamold_z.vence,
      "comision":misparamold_z.comision,
      "moroso":misparamold_z.moroso,
      "idrenrelco":misparamold_z.idrenrelco,
    }
    
    
    let miurl = this.url + "polizas/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(misparams);
    console.log("Debug: misparams", misparams);
    
    return this.http.post<any>(miurl, misparams, {'headers':headers}).
    pipe(
      tap(_ => this.log('agregar pago ok')),
      catchError(this.handleError<Poliza>('Ocurrio un error en agregar_pago'))

    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});

  }

  obtentxtcfdi(params:string) {
    let empresa = "";
    if (this.cia) {
       empresa = this.cia.Clave;
    }
    let misparams = JSON.parse(params);
    console.log("Debug: Estoy en obtentxtcfdi ", params);
    var miurl = this.url + "polizas/servicios.php?modo=obtener_txt_cfdi&uuid="+misparams.uuid+"&empresa="+empresa;
    window.open(miurl, "_blank");
  }

  obten_bon_electro (params:string) {
    let misparams = JSON.parse(params);
    console.log("Debug: Estoy en obten_bon_electro ", params);
    let miurl = this.url + "polizas/servicios.php?modo=obtener_txt_bon_electro.&idrenpol="+misparams.idrenpol;
    miurl += "&foliobon=" + misparams.foliobon;
    miurl += "&serie=" + misparams.serie;
    console.log("Debug: Estoy en obten_bon_electro url", miurl);
    window.open(miurl, "_blank");
  }

  imprimir_liq_moroso_cobratario (params:string) {
    let misparams = JSON.parse(params);
    console.log("Debug: Estoy en imprimir_liq_moroso_cobratario ", params);
    let miurl = this.url + "polizas/servicios.php?"+
    "modo="+misparams.modo;
    miurl += "&idpoliza="+misparams.idpoliza;
    miurl += "&primerpromotor=" + misparams.primerpromotor;
    miurl += "&ultimopromotor=" + misparams.ultimopromotor;
    miurl += "&titulo=" + misparams.titulo;
    console.log("Debug: Estoy en imprimir_liq_moroso_cobratario url", miurl);
    window.open(miurl, "_blank");
  }

  imprimir_poliza_morosos (params:string) {
    let misparams = JSON.parse(params);
    console.log("Debug: Estoy en imprimir_poliza_morosos ", params);
    let miurl = this.url + "polizas/impresionpoliza.php?"+
    "modo="+misparams.modo;
    miurl += "&fechapoliza="+misparams.fechapoliza;
    miurl += "&tdapol=" + misparams.tdapol;
    console.log("Debug: Estoy en imprimirpoliza_morosos url", miurl);
    window.open(miurl, "_blank");
  }

  obtencarta(params:string) {
    let empresa = "xx";
    if (this.cia) {
       empresa = this.cia.Clave;
    }
    let misparams = JSON.parse(params);
    console.log("Debug: Estoy en obtencarta ", params);
    var miurl = this.url + "polizas/servicios.php?modo=obtener_carta&numcli="+misparams.numcli+"&empresa="+empresa;
    window.open(miurl, "_blank");
  }

  obtendatoscia() {
    return ( this.configuracion.obtendatoscia());
    //return (this.cia);
  }

  buscar_renpol  ( params: string): Observable<Renpol[]> {
    let misparams = JSON.parse(params);
    
    
    var miurl = this.url + "polizas/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(misparams);
    
    return this.http.post<Renpol[]>(miurl, misparams, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched renpol')),
      catchError(this.handleError<Renpol[]>('Ocurrio un error en Post renpol'))

    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});

  }

  cerrar_comiscob  ( params: string): Observable<any> {
    let misparams = JSON.parse(params);
    
    
    var miurl = this.url + "polizas/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(misparams);
    
    return this.http.post<any>(miurl, misparams, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched renpol')),
      catchError(this.handleError<any>('Ocurrio un error en Post cerrar_comiscob'))

    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});

  }


  obtener_datos_poliza ( params: string): Observable<any> {
    let misparams = JSON.parse(params);
    
    var miurl = this.url + "polizas/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(misparams);
    
    return this.http.post<any>(miurl, misparams, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched datos_poliza')),
      catchError(this.handleError<any>('Ocurrio un error en obtener_datos_poliza'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});

  }

  obten_fecha_servidor ( ): Observable<any> {
    
    var miurl = this.url + "polizas/servicios.php?modo=obtenerFechaServidor";
    const headers = { 'content-type': 'text/plain'};
    return this.http.get<any>(miurl).
    pipe(
      tap(_ => this.log('fetched Fecha Servidor')),
      catchError(this.handleError<any>('Ocurrio un error en obtener_Fecha Servidor'))
    );

  }

  obten_comiscob (params: string ): Observable<any> {
    let miurl = this.url + "polizas/servicios.php"
    let misparams = JSON.parse(params);
    const headers = { 'content-type': 'text/plain'};
    return this.http.post<any>(miurl, misparams, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Comiscob')),
      catchError(this.handleError<any>('Ocurrio un error en obtener_comiscob'))
    );

  }


  cierra_poliza ( params: string): Observable<any> {
    let misparams = JSON.parse(params);
    
    var miurl = this.url + "polizas/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(misparams);
    
    return this.http.post<any>(miurl, misparams, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched cierra_poliza')),
      catchError(this.handleError<any>('Ocurrio un error en obtener_datos_poliza'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});

  }

  obtener_datos_codigo_tienda ( params: string): Observable<CodigoPoliza> {
    let misparams = JSON.parse(params);
    
    var miurl = this.url + "polizas/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(misparams);
    
    return this.http.post<CodigoPoliza>(miurl, misparams, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched cierra_poliza')),
      catchError(this.handleError<any>('Ocurrio un error en obtener datos codigo poliza'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});

  }

  obtentxtcomplmentopol(params:string) {
    let misparams = JSON.parse(params);
    console.log("Debug: Estoy en obtentxtcomplmentopol ", params);
    var miurl = this.url + "polizas/servicios.php?modo=obtener_txt_complemento_pol&uuid="+misparams.uuid;
    window.open(miurl, "_blank");
  }

  obtenpdfcomplmentopol(params:string) {
    let misparams = JSON.parse(params);
    console.log("Debug: Estoy en obtentxtcomplmentopol ", params);
    var miurl = this.url + "polizas/servicios.php?modo=obtener_pdf_complemento_pol&uuid="+misparams.uuid;
    window.open(miurl, "_blank");
  }

  obten_impresion_poliza_caja(params:string) {
    let misparams = JSON.parse(params);
    console.log("Debug: Estoy en obtentxtcomplmentopol ", params);
    var miurl = this.url + "polizas/impresionpoliza.php?modo=impresion_poliza_caja&fechapoliza="+misparams.fechapoliza+"&tdapol="+misparams.tdapol;
    miurl = miurl + "&modopdf="+misparams.modopdf;
    window.open(miurl, "_blank");
  }

  obten_impresion_despacho_caja(params:string) {
    let misparams = JSON.parse(params);
    console.log("Debug: Estoy en obtentxtcomplmentopol ", params);
    var miurl = this.url + "polizas/impresionpoliza.php?modo=obtener_despacho_poliza_caja&fechapoliza="+misparams.fechapoliza+"&tdapol="+misparams.tdapol;
    window.open(miurl, "_blank");
  }

  obten_pdf_cfdi(params:string) {
    let misparams = JSON.parse(params);
    console.log("Debug: Estoy en obtenpdfcfdi ", params);
    const miurl = this.url + "polizas/servicios.php?modo=descarga_pdf_cfdi&uuid="+misparams.uuid;
    window.open(miurl, "_blank");
  }

  reporte_repacupo_pdf ( params: string): Observable<any>  {
    let misparams = JSON.parse(params);
    
    var miurl = this.url + "polizas/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(misparams);
    return this.http.post<any>(miurl, misparams, {'headers':headers});
    
  }

  descargar_archivo (params:string) {
    let misparams = JSON.parse(params);
    console.log("Debug: Estoy en obtenpdfcfdi ", params);
    const miurl = this.url + "polizas/servicios.php?modo=descargar_archivo&filename="+misparams.filename;
    window.open(miurl, "_blank");
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
    console.log(`PolizasService: ${message}`);
  }


}
