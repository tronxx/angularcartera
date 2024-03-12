
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cliente } from '../models/clientes';
import { Aval } from '../models/aval';
import { ConfiguracionService } from './configuracion.service'
import { Movclis } from '../models';
import { Observcli } from '../models';
import { Plazos } from '../models';
import { Solicitud } from '../models';
import { Cartapro } from '../models';
import { Ubivta } from '../models';
import { Promotor } from '../models';
import { Nulets } from '../models';
import { Poblacs } from '../models';
import { Cliagentes } from '../models';
import { Vendedor } from '../models';
import { Tarjetatc } from '../models';
import { Factura } from '../models';
import { Renfacfo } from '../models';
import { Articulo } from '../models';
import { Serie } from '../models';
import { Seriefac } from '../models';
import { Usocfdi } from '../models';
import { Metodopagocfdi } from '../models';
import { Reltrasp } from '../models';
import { Factorvtacred } from '../models';
import { Tabladesctocont  } from '../models';
import { RegimenFiscal } from '../models';
import { SabanaVtas } from '../models';

@Injectable({
  providedIn: 'root'
})
export class 
ClientesService {
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

  obten_sabanas_vtas ( parametros: string): Observable<SabanaVtas[]> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    
    return this.http.post<SabanaVtas[]>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Clientes')),
      catchError(this.handleError<SabanaVtas[]>('Ocurrio un error en Post obten clientes'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  genera_sabanas_vtas ( parametros: string): Observable<SabanaVtas[]> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    
    return this.http.post<any>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Clientes')),
      catchError(this.handleError<any>('Ocurrio un error en Post genera_sabanas_vtas'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  imprimir_sabanas_vtas ( parametros: string)  {
    
    let misparams = JSON.parse(parametros);
    // console.log("Debug: Estoy en obtenpdfcfdi ", params);
    let miurl = this.url + "altas/serviciosaltas.php?modo=imprimir_sabana_ventas"+
      "&idsabanavta="+misparams.idsabanavta +
       "&titulo="+misparams.titulo +
       "&ubicacion="+misparams.ubicacion;
    window.open(miurl, "_blank");
  }

  descargar_sabana_inven ( parametros: string)  {
    
    let misparams = JSON.parse(parametros);
    // console.log("Debug: Estoy en obtenpdfcfdi ", params);
    let miurl = this.url + "altas/serviciosaltas.php?modo=generar_archivo_sabana_vtas_para_inven"+
      "&idsabanavta="+misparams.idsabanavta +
       "&ubicacion="+misparams.ubicacion;
    //console.log("url decargar sabana", miurl);
    window.open(miurl, "_blank");
  }



  imprimir_informe_sabanas_vtas ( parametros: string)  {
    
    let misparams = JSON.parse(parametros);
    // console.log("Debug: Estoy en obtenpdfcfdi ", params);
    let titulo = "Informe de Sabanas de Ventas de " + misparams.ubicaini;
    if(misparams.ubicaini != misparams.ubicafin) {
      titulo += " A " + misparams.ubicaini;
    }
    titulo += " De Tipo Cte " + misparams.tipocteinicial;
    if(misparams.tipocteinicial != misparams.tipoctefinal) {
      titulo += " A " + misparams.tipoctefinal;
    }
    titulo += " Ventas de "
    if(misparams.qominicial != misparams.qomfinal) {
      titulo += " Contado y Credito "
    } else {
      if(misparams.qominicial == "Q") {
        titulo += " Credito "
      } else {
        titulo += " Contado "

      }

    }
    titulo += " Del " + misparams.fechainicial;
    titulo += " Al "  + misparams.fechafinal;

    let miurl = this.url + "altas/serviciosaltas.php?modo=generar_informe_sabana_ventas"+
      `&fechainicial=${misparams.fechainicial}` +
      `&fechafinal=${misparams.fechafinal}` +
      `&ubicacioninicial=${misparams.ubicaini}` +
      `&ubicacionfinal=${misparams.ubicafin}` +
      `&tipocteinicial=${misparams.tipocteinicial}` +
      `&tipoctefinal=${misparams.tipoctefinal}` +
      `&qominicial=${misparams.qominicial}` +
      `&qomfinal=${misparams.qomfinal}` +
      `&acumulado=${misparams.acumulado}` +
      "&titulo="+titulo;
      console.log("url impresion informe:", miurl);
      window.open(miurl, "_blank");
  }


  obtenrelvtas_enganches ( parametros: string): Observable<Cliente[]> {
    
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

  timbrar_enganches ( parametros: string): Observable<any> {
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    
    return this.http.post<any>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched timbrar_enganche')),
      catchError(this.handleError<Cliente[]>('Ocurrio un error en Post timbrar enganche'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  
  descarga_pdf_cfdi(params:string) {
    let misparams = JSON.parse(params);
    console.log("Debug: Estoy en descargar_pdf_cfdi ", params);
    var miurl = this.url + "altas/serviciosaltas.php?modo=descarga_pdf_cfdi" + 
      "&uuid="+misparams.uuid;
      console.log("Debug url: ", miurl);
      window.open(miurl, "_blank");
  }



  buscaclientealta ( parametros: string): Observable<Cliente> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    console.log("Debug: Estoy en buscaclientealta:", parametros );
    
    return this.http.post<Cliente>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Clientes')),
      catchError(this.handleError<Cliente>('Ocurrio un error en Post busca cliente'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  imprimir_tarjeta_altas(params:string) {
    let misparams = JSON.parse(params);
    console.log("Debug: Estoy en Imprimir tarjeta altas ", params);
    var miurl = this.url + "altas/serviciosaltas.php?modo=imprimir_tarjeta" + 
      "&numcli="+misparams.numcli;
      console.log("Debug url: ", miurl);
      window.open(miurl, "_blank");
  }

  imprimir_edocta_altas(params:string) {
    let misparams = JSON.parse(params);
    console.log("Debug: Estoy en Imprimir Estado de Cuenta altas ", params);
    let miurl = this.url + "altas/serviciosaltas.php?modo=imprimir_edocta_altas" + 
      "&numcli="+misparams.numcli;
      console.log("Debug url: ", miurl);
      window.open(miurl, "_blank");
  }

  imprimir_letras_altas(params:string) {
    let misparams = JSON.parse(params);
    console.log("Debug: Estoy en Imprimir letras altas ", params);
    let miurl = this.url;
    if(misparams.modopdf) {
      miurl += "altas/imprimeletras.php?";
    } else {
      miurl += "altas/serviciosaltas.php?";
    }
    miurl += "modo=impresion_letras" + 
      "&codigo=" + misparams.numcli + 
      "&letrainicial="+misparams.letrainicial +
      "&letrafinal=" + misparams.letrafinal +
      "&idcli=" + misparams.idcli;
      console.log("Debug url: ", miurl);
      window.open(miurl, "_blank");
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

  obtener_lista_letras_impresas ( parametros: string): Observable<any> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
   
    return this.http.post<any>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched letras impresas')),
      catchError(this.handleError<any>('Ocurrio un error en Post obtener_lista_letras_impresas'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  obtener_status_imagenes_grabadas ( parametros: string): Observable<any> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
   
    return this.http.post<any>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('obtener_status_imagenes_grabadas')),
      catchError(this.handleError<any>('Ocurrio un error en Post obtener_status_imagenes_grabadas'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  grabar_status_imagenes_grabadas ( parametros: string): Observable<any> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
   
    return this.http.post<any>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('grabar_status_imagenes_grabadas')),
      catchError(this.handleError<any>('Ocurrio un error en Post grabar_status_imagenes_grabadas'))
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
      tap(_ => this.log('fetched Ubivta')),
      catchError(this.handleError<Ubivta[]>('Ocurrio un error en Post obten Ubivta'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  obtenpoblacs ( parametros: string): Observable<Poblacs[]> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    
    return this.http.post<Poblacs[]>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Ciudades')),
      catchError(this.handleError<Poblacs[]>('Ocurrio un error en Post obten Ubivta'))
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
      tap(_ => this.log('agregar cliente ok')),
      catchError(this.handleError<Cliente>('Ocurrio un error en agregar_cliente'))

    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  agrega_nuevo_movimiento( parametros:string): Observable<any> {
    let misparams = parametros;
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(misparams);
    console.log("Debug: misparams", misparams);
    
    return this.http.post<any>(miurl, misparams, {'headers':headers}).
    pipe(
      tap(_ => this.log('agregar movimiento ok')),
      catchError(this.handleError<Cliente>('Ocurrio un error en agregar_movimiento'))

    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});


  }

  modificar_movimiento( parametros:string): Observable<any> {
    let mispar_z = JSON.parse(parametros);
    let misparams = {
        modo:"modificar_movimiento",
        idcli: mispar_z.idcli,
        coa: 'A',
        tipag: mispar_z.tipag,
        recobon: mispar_z.recobon,
        importe: mispar_z.importe,
        ace: 'E',
        iniciales: mispar_z.iniciales,
        fecha: mispar_z.fecha,
        idmvcli: mispar_z.idmvcli,
        numcli: mispar_z.numcli,
        concepto: mispar_z.concepto
    };
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(misparams);
    console.log("Debug: misparams", misparams);
    
    return this.http.post<any>(miurl, JSON.stringify(misparams), {'headers':headers}).
    pipe(
      tap(_ => this.log('modificar movimiento ok')),
      catchError(this.handleError<Cliente>('Ocurrio un error en modifcar_movimiento'))

    );
  }

  eliminar_movimiento( parametros:string): Observable<any> {
    let mispar_z = JSON.parse(parametros);
    let misparams = {
        modo:"eliminar_movimiento",
        idcli: mispar_z.idcli,
        importe: mispar_z.importe,
        fecha: mispar_z.fechamov,
        idmvcli: mispar_z.idmvcli
    };
    let miurl = this.url + "altas/serviciosaltas.php";
    const headers = { 'content-type': 'text/plain'};
    const body=JSON.stringify(misparams);
    console.log("Debug: misparams", misparams);
    
    return this.http.post<any>(miurl, JSON.stringify(misparams), {'headers':headers}).
    pipe(
      tap(_ => this.log('eliminar movimiento ok')),
      catchError(this.handleError<Cliente>('Ocurrio un error en eliminar_movimiento'))

    );
  }


  obtennulets ( parametros: string): Observable<Nulets[]> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    
    return this.http.post<Nulets[]>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Nulets')),
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

  buscaavalaltas( parametros: string): Observable<Aval> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    let misparams = JSON.parse(parametros);
    let misparamnvo = {
      modo: "buscar_aval",
      idcli: misparams.idcli
    }

    console.log("Debug: Estoy en busca Aval Altas", parametros);
  
    return this.http.post<Aval>(miurl, JSON.stringify(misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Aval')),
      catchError(this.handleError<Aval>('Ocurrio un error en Post obten aval altas'))
    );
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

  buscamovtos_altas( parametros: string): Observable<Movclis[]> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    console.log("Debug: Estoy en busca movtos altas", parametros);
  
    return this.http.post<Movclis[]>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Movtos Altas')),
      catchError(this.handleError<Movclis[]>('Ocurrio un error en Post obten movtos_altas'))
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

  busca_vencimientos (fechavta:string, qom:string, inicial:number, final:number, diasgracia:number, letraspagadas: number) {
    return (this.configuracion.generavencimientos(fechavta, qom, inicial, final, diasgracia, letraspagadas));
  }

  busca_cliagentes_altas( parametros: string): Observable<Cliagentes[]> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    let misparams = JSON.parse(parametros);
    let misparamnvo = {
      modo: "buscar_cli_agentes",
      idcli: misparams.idcli
    }

    console.log("Debug: Estoy en busca Agentes_Clientes Altas", parametros);
  
    return this.http.post<Cliagentes[]>(miurl, JSON.stringify(misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Cliagentes')),
      catchError(this.handleError<Cliagentes[]>('Ocurrio un error en Post obten Cliagentes altas'))
    );
  }

  buscar_agentes( parametros: string): Observable<Vendedor[]> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    let misparams = JSON.parse(parametros);
    let misparamnvo = {
      modo: "buscar_agentes",
      idcli: -1
    }

    console.log("Debug: Estoy en busca Agentes", parametros);
  
    return this.http.post<Vendedor[]>(miurl, JSON.stringify(misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Cliagentes')),
      catchError(this.handleError<Vendedor[]>('Ocurrio un error en Post obten Agentes'))
    );
  }

  agregar_cli_agente( parametros: string): Observable<Cliagentes[]> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    let misparams = JSON.parse(parametros);
    let misparamnvo = {
      modo: "agregar_cli_agente",
      idvndcli: -1,
      idcli: misparams.idcli,
      idvnd: misparams.idvnd,
      codvnd: misparams.codvnd,
      comis: misparams.comis
    }

    console.log("Debug: Estoy en agregar_cli_agente", parametros);
  
    return this.http.post<Cliagentes[]>(miurl, JSON.stringify(misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Cliagentes')),
      catchError(this.handleError<Cliagentes[]>('Ocurrio un error en Post obten Agentes'))
    );
  }

  modificar_cli_agente( parametros: string): Observable<Cliagentes[]> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    let misparams = JSON.parse(parametros);
    let misparamnvo = {
      modo: "modificar_cli_agente",
      idvndcli: misparams.idvndcli,
      idcli: misparams.idcli,
      idvnd: misparams.idvnd,
      codvnd: misparams.codvnd,
      comis: misparams.comis
    }

    console.log("Debug: Estoy en modificar_cli_agente", parametros);
  
    return this.http.post<Cliagentes[]>(miurl, JSON.stringify(misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Cliagentes')),
      catchError(this.handleError<Cliagentes[]>('Ocurrio un error en Post modificar cliagentes'))
    );
  }

  enviar_firma(img: string, codigo: string, tipoimagen: string) : Observable<any> {
    const apiUrl = this.configuracion.obtenurl() + '/altas/recibe_firma.php';
    //const headers = { 'content-type': 'multipart/form-data; boundary=something'};
    const base64Image = img;

    const headers = { 'content-type': 'text/plain'};
    const imageData = {
      image: base64Image,
      tipoimagen: tipoimagen,
      additionalContent: codigo // Contenido adicional

    };
    return this.http.post<any>(apiUrl, imageData, {'headers':headers});

  }

  eliminar_cli_agente( parametros: string): Observable<Cliagentes[]> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    let misparams = JSON.parse(parametros);
    let misparamnvo = {
      modo: "eliminar_cli_agente",
      idvndcli: misparams.idvndcli,
      idcli: misparams.idcli,
      idvnd: misparams.idvnd,
      codvnd: misparams.codvnd,
      comis: misparams.comis
    }

    console.log("Debug: Estoy en eliminar_cli_agente", parametros);
  
    return this.http.post<Cliagentes[]>(miurl, JSON.stringify(misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Cliagentes')),
      catchError(this.handleError<Cliagentes[]>('Ocurrio un error en Post eliminar cliagentes'))
    );
  }

  buscar_tarjetas_tc( parametros: string): Observable<Tarjetatc[]> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    let misparams = JSON.parse(parametros);
    let misparamnvo = {
      modo: "buscar_tarjetas_tc",
      ticte: misparams.ticte,
      ubiage: misparams.ubiage,
      idcli: -1
    }

    console.log("Debug: Estoy en busca Tarjetas TC Disponibles", parametros);
  
    return this.http.post<Tarjetatc[]>(miurl, JSON.stringify(misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Tarjetas TC')),
      catchError(this.handleError<Tarjetatc[]>('Ocurrio un error en Post obten Agentes'))
    );
  }

  buscar_cli_tarjetas_tc( parametros: string): Observable<Tarjetatc> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    let misparams = JSON.parse(parametros);
    let misparamnvo = {
      modo: "buscar_cli_tarjetas_tc",
      ticte: misparams.ticte,
      ubiage: misparams.ubiage,
      idcli: misparams.idcli
    }

    console.log("Debug: Estoy en busca Tarjetas TC de Cliente", parametros);
  
    return this.http.post<Tarjetatc>(miurl, JSON.stringify(misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched tarjetas Tc cliente')),
      catchError(this.handleError<Tarjetatc>('Ocurrio un error en Post obten Agentes'))
    );
  }

  busca_solicitud_altas( parametros: string): Observable<Solicitud> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    let misparams = JSON.parse(parametros);
    let misparamnvo = {
      modo: "buscar_solicitud_cliente",
      idcli: misparams.idcli
    }

    console.log("Debug: Estoy en busca solicitud_altas ", parametros);
  
    return this.http.post<Solicitud>(miurl, JSON.stringify( misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Solicitud')),
      catchError(this.handleError<Solicitud>('Ocurrio un error en Post obten busca_solicitud_altas'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  busca_factura_altas( parametros: string): Observable<Factura[]> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    let misparams = JSON.parse(parametros);
    let misparamnvo = {
      modo: "buscar_cli_facturas.",
      idcli: misparams.idcli
    }

    console.log("Debug: Estoy en busca busca_factura_altas ", parametros);
  
    return this.http.post<Factura[]>(miurl, JSON.stringify( misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Facturas')),
      catchError(this.handleError<Factura[]>('Ocurrio un error en Post obten busca_factura_altas'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  busca_renfac_altas( parametros: string): Observable<Renfacfo[]> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    let misparams = JSON.parse(parametros);
    let misparamnvo = {
      modo: "buscar_renfac",
      idfacfon: misparams.idfacfon
    }

    console.log("Debug: Estoy en busca busca_renfac_altas ", parametros);
  
    return this.http.post<Renfacfo[]>(miurl, JSON.stringify( misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Facturas')),
      catchError(this.handleError<Renfacfo[]>('Ocurrio un error en Post obten busca_factura_altas'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  busca_codigo_inven( parametros: string): Observable<Articulo> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    let misparams = JSON.parse(parametros);
    let misparamnvo = {
      modo: "buscar_inven_codigo",
      codigo: misparams.codigo
    }

    console.log("Debug: Estoy en  busca_codigo_inven ", parametros);
  
    return this.http.post<Articulo>(miurl, JSON.stringify( misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Facturas')),
      catchError(this.handleError<Articulo>('Ocurrio un error en Post obten busca_codigo_inven'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  busca_varios_codigos_inven( parametros: string): Observable<Articulo[]> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    let misparams = JSON.parse(parametros);
    let misparamnvo = {
      modo: "buscar_inven_rango_codigos",
      codigo: misparams.codigo
    }

    console.log("Debug: Estoy en busca busca_varios_codigo_inven ", parametros);
  
    return this.http.post<Articulo[]>(miurl, JSON.stringify( misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Facturas')),
      catchError(this.handleError<Articulo[]>('Ocurrio un error en Post busca_varios_codigo_inven'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }
  

  busca_serie_moto( parametros: string): Observable<Serie> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    let misparams = JSON.parse(parametros);
    let misparamnvo = {
      modo: "buscar_inven_serie_moto",
      codigo: misparams.codigo,
      serie: misparams.serie,
      seriemotor: misparams.seriemotor
    }

    console.log("Debug: Estoy en busca_serie_moto ", parametros);
  
    return this.http.post<Serie>(miurl, JSON.stringify( misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Serie Motor')),
      catchError(this.handleError<Serie>('Ocurrio un error en Post obten busca_codigo_inven'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  busca_series_disponibles( parametros: string): Observable<Serie[]> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    let misparams = JSON.parse(parametros);
    let misparamnvo = {
      modo: "buscar_inven_todas_series",
      codigo: misparams.codigo,
      almacen: misparams.almacen
    }

    console.log("Debug: Estoy en busca_series_disponibles ", parametros);
  
    return this.http.post<Serie[]>(miurl, JSON.stringify( misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Serie Motor')),
      catchError(this.handleError<Serie[]>('Ocurrio un error en Post obten busca_codigo_inven'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }


  busca_serie_factura( parametros: string): Observable<Seriefac> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    let misparams = JSON.parse(parametros);
    let misparamnvo = {
      modo: "buscar_facturacion_una_serie",
      ubiage: misparams.ubiage,
      statuscli: misparams.statuscli
    }

    console.log("Debug: Estoy en busca busca_serie_factura ", parametros);
  
    return this.http.post<Seriefac>(miurl, JSON.stringify( misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Serie factura')),
      catchError(this.handleError<Seriefac>('Ocurrio un error en Post busca_serie_factura'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  busca_cfdi_metodo_pago( ): Observable<Metodopagocfdi[]> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    miurl += '?modo=buscar_cat_metodo_pago'
    const headers = { 'content-type': 'text/plain'};
    console.log("Debug: Estoy en busca_cfdi_metodo_pago ");
  
    return this.http.get<Metodopagocfdi[]>(miurl,  {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Metodo de pago cfdi')),
      catchError(this.handleError<Metodopagocfdi[]>('Ocurrio un error en Post obten metodo pago cfdi'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  busca_regimen_fiscal ( ): Observable<RegimenFiscal[]> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    miurl += '?modo=obtener_cat_regimenfiscal.'
    const headers = { 'content-type': 'text/plain'};
    console.log("Debug: Estoy en regimen_fiscal");
  
    return this.http.get<RegimenFiscal[]>(miurl,  {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Metodo de pago cfdi')),
      catchError(this.handleError<RegimenFiscal[]>('Ocurrio un error en Post obten regimen fiscl'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  busca_cat_uso_cfdi( ): Observable<Usocfdi[]> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    miurl += '?modo=buscar_cat_usocfdi'
    const headers = { 'content-type': 'text/plain'};
    console.log("Debug: Estoy en busca_cfdi_metodo_pago ");
  
    return this.http.get<Usocfdi[]>(miurl,  {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Metodo de pago cfdi')),
      catchError(this.handleError<Usocfdi[]>('Ocurrio un error en Post obten busca_codigo_inven'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  crear_factura_altas( parametros: string): Observable<any> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    console.log("Debug: Estoy en crea_factura_altas parametros:", parametros);
    let misparams = JSON.parse(parametros);
    let misparamnvo = {
      modo: "crear_cli_factura",
      factura: misparams.factura,
      idcli: misparams.idcli
    }
    if(misparams.modo == "MODIFICAR") {
      misparamnvo.modo = "modificar_cli_factura";
    }
  

    console.log("Debug: Estoy en crea_factura_altas ", misparamnvo);
  
    return this.http.post<any>(miurl, JSON.stringify( misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Facturas')),
      catchError(this.handleError<any>('Ocurrio un error en Post obten busca_factura_altas'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  crear_factura_capvtas( parametros: string): Observable<any> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    console.log("Debug: Estoy en crea_factura_capvtas parametros:", parametros);
    let misparams = JSON.parse(parametros);

    console.log("Debug: Estoy en crea_factura_capvtas ", misparams);
  
    return this.http.post<any>(miurl, JSON.stringify( misparams), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Facturas')),
      catchError(this.handleError<any>('Ocurrio un error en Post obten busca_factura_altas'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  cambio_codigo_imagenes( parametros: string): Observable<any[]> {
    
    let respu_z = "";
    let miurl = this.url + "altas/renombra.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    console.log("Debug: Estoy en crea_factura_capvtas parametros:", parametros);
    let misparams = JSON.parse(parametros);
    misparams = {
      'modo':'renombrar',
      'codigoanterior': misparams.codigoanterior,
      'codigonuevo': misparams.codigonuevo
    }

    console.log("Debug: Estoy en renombrar imagenes ", misparams);
  
    return this.http.post<any>(miurl, JSON.stringify( misparams), {'headers':headers}).
    pipe(
      tap(_ => this.log('renombrar imagenes')),
      catchError(this.handleError<any>('Ocurrio un error en Post renombrar imagenes'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }


  agregar_renfac_altas( parametros: string): Observable<any> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    console.log("Debug: Estoy en agregar_renfac_altas parametros:", parametros);
    let misparams = JSON.parse(parametros);
    let misparamnvo = misparams;
    console.log("Debug: Estoy en agregar_renfac_altas  ", misparamnvo);
  
    return this.http.post<any>(miurl, JSON.stringify( misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched agregar_renfac_altas ')),
      catchError(this.handleError<any>('Ocurrio un error en Post obten agregar_renfac_altas '))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  subir_renfac_altas( parametros: string): Observable<any> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    console.log("Debug: Estoy en subir_renfac_altas parametros:", parametros);
    let misparams = JSON.parse(parametros);
    let misparamnvo = misparams;
    console.log("Debug: Estoy en subir_renfac_altas  ", misparamnvo);
  
    return this.http.post<any>(miurl, JSON.stringify( misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched subir_renfac_altas ')),
      catchError(this.handleError<any>('Ocurrio un error en Post obten subir_renfac_altas '))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  cerrar_factura_altas( parametros: string): Observable<any> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    console.log("Debug: Estoy en cerrar_factura_altas parametros:", parametros);
    let misparams = JSON.parse(parametros);
    let misparamnvo = {
      modo: "cerrar_factura_altas",
      idfac: misparams.idfac,
      idcli: misparams.idcli,
      fechacierre: misparams.fechacierre
    }

    console.log("Debug: Estoy en cerrar_factura_altas  ", misparamnvo);
  
    return this.http.post<any>(miurl, JSON.stringify( misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched agregar_renfac_altas ')),
      catchError(this.handleError<any>('Ocurrio un error en Post obten agregar_renfac_altas '))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  afectar_cliente_articulos( parametros: string): Observable<any> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    console.log("Debug: Estoy en afectar_cliente_articulos parametros:", parametros);
    let misparams = JSON.parse(parametros);
    let misparamnvo = {
      modo: "afectar_cliente_articulos.",
      idfac: misparams.idfac,
      idcli: misparams.idcli
    }

    console.log("Debug: Estoy en afectar_cliente_articulos   ", misparamnvo);
  
    return this.http.post<any>(miurl, JSON.stringify( misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched agregar_renfac_altas ')),
      catchError(this.handleError<any>('Ocurrio un error en Post obten agregar_renfac_altas '))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  cerrar_cliente_altas( parametros: string): Observable<any> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    console.log("Debug: Estoy en cerrar_cliente_altas parametros:", parametros);
    let misparams = JSON.parse(parametros);
    let misparamnvo = {
      modo: "cerrar_cliente_altas",
      idcli: misparams.idcli,
      numcli: misparams.numcli
    }

    return this.http.post<any>(miurl, JSON.stringify( misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched cerrar_cliente_altas')),
      catchError(this.handleError<any>('Ocurrio un error en Post obten agregar_renfac_altas '))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  cartera_buscar_dias_promocion( parametros: string): Observable<any> {
    
    let respu_z = "";
    let miurl = this.url + "clientes/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    console.log("Debug: Estoy en cartera_buscar_dias_promocion parametros:", parametros);
    let misparams = JSON.parse(parametros);
    return this.http.post<any>(miurl, JSON.stringify( misparams), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched cartera_buscar_dias_promocion')),
      catchError(this.handleError<any>('Ocurrio un error en Post obten cartera_buscar_dias_promocion '))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }



  altas_buscar_dias_promocion( parametros: string): Observable<any> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    console.log("Debug: altas_buscar_dias_promocion parametros:", parametros);
    let misparams = JSON.parse(parametros);
    return this.http.post<any>(miurl, JSON.stringify( misparams), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched altas_buscar_dias_promocion')),
      catchError(this.handleError<any>('Ocurrio un error en Post altas_buscar_dias_promocion '))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  altas_agregar_dias_promocion( parametros: string): Observable<any> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    console.log("Debug: Estoy en altas_agregar_dias_promocion:", parametros);
    let misparams = JSON.parse(parametros);

    return this.http.post<any>(miurl, JSON.stringify( misparams), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched cerrar_cliente_altas')),
      catchError(this.handleError<any>('Ocurrio un error en Post obten agregar_renfac_altas '))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }


  buscar_status_cliente_cerrado( parametros: string): Observable<any> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    console.log("Debug: Estoy en buscar_status_cliente_cerrado parametros:", parametros);
    let misparams = JSON.parse(parametros);
    let misparamnvo = {
      modo: "obtener_status_cierre_cliente_altas",
      numcli: misparams.numcli
    }

    return this.http.post<any>(miurl, JSON.stringify( misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched buscar_status_cliente_cerrado')),
      catchError(this.handleError<any>('Ocurrio un error en Post buscar_status_cliente_cerrado '))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  buscar_status_cliente_modificable( parametros: string): Observable<any> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    let misparams = JSON.parse(parametros);
    let misparamnvo = {
      modo: "obtener_status_vta_facturacion_inmediata",
      codigo: misparams.numcli
    }
    console.log("Debug: Estoy en buscar_status_cliente_modificables parametros:", misparamnvo);

    return this.http.post<any>(miurl, JSON.stringify( misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched buscar_status_cliente_modificable')),
      catchError(this.handleError<any>('Ocurrio un error en Post buscar_status_cliente_modificable '))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  grabar_status_cliente_modificable( parametros: string): Observable<any> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    let misparams = JSON.parse(parametros);
    let misparamnvo = {
      modo: "grabar_status_vta_facturacion_inmediata",
      codigo: misparams.numcli,
      statusfacalmomento: misparams.statusfacalmomento
    }
    console.log("Debug: Estoy en buscar_status_cliente_modificables parametros:", misparamnvo);

    return this.http.post<any>(miurl, JSON.stringify( misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched buscar_status_cliente_modificable')),
      catchError(this.handleError<any>('Ocurrio un error en Post buscar_status_cliente_modificable '))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }



  buscar_cliente_altas_letras_pendientes( parametros: string): Observable<any> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    console.log("Debug: Estoy en buscar_cliente_altas_letras_pendientes:", parametros);
    return this.http.post<any>(miurl, JSON.stringify( parametros), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched buscar_cliente_altas_letras_pendientes')),
      catchError(this.handleError<any>('Ocurrio un error en Post obten buscar_cliente_altas_letras_pendientes '))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  buscar_aofertas_json(): Observable<any> {
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php?modo=buscar_ofertas_json";
    const headers = { 'content-type': 'text/plain'};
    const body="";
    console.log("Debug: Estoy en buscar_ofertas_json:");
    return this.http.get<any>(miurl, {'headers':headers}).
    pipe(
      tap(_ => this.log('buscar_ofertas_json')),
      catchError(this.handleError<any>('Ocurrio un error en Post buscar_ofertas_json '))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }


  grabar_solicitud_altas( parametros: string): Observable<any> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    // console.log("Debug: Estoy en grabar_solicitud_altas parametros:", parametros);
    let misparams = JSON.parse(parametros);

    return this.http.post<any>(miurl, JSON.stringify( misparams), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched grabar_solicitud_altas')),
      catchError(this.handleError<any>('Ocurrio un error en Post obten agregar_renfac_altas '))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }



  obten_pdf_cfdi_factura(params:string) {
    let misparams = JSON.parse(params);
    // console.log("Debug: Estoy en obtenpdfcfdi ", params);
    var miurl = this.url + "altas/serviciosaltas.php?modo=descarga_pdf_cfdi_factura&uuid="+misparams.uuid + "&rotarfac="+misparams.rotar;
    window.open(miurl, "_blank");
  }

  imprime_relvtas(params:string) {
    let misparams = JSON.parse(params);
    let miurl = this.url + "altas/serviciosaltas.php?" +
    'modo=relacion_ventas' + 
    '&fechainicial=' + misparams.fechainicial +
    '&fechafinal=' + misparams.fechafinal +
    '&codigoinicial='+misparams.codigoinicial +
    '&codigofinal='+misparams.codigofinal +
    '&ubicacioninicial=' + misparams.ubicacioninicial +
    '&ubicacionfinal='+ misparams.ubicacionfinal;
    console.log("Debug: imprime_relvtas", miurl);
    window.open(miurl, "_blank");

  }

  imprime_repcomis(params:string) {
    let misparams = JSON.parse(params);
    console.log("Estoy en serviciosaltas:", misparams);
    let miurl = this.url + "altas/serviciosaltas.php?" +
    'modo=reporte_comisiones' + 
    '&fechainicial=' + misparams.fechainicial +
    '&fechafinal=' + misparams.fechafinal +
    '&codigoinicial='+misparams.codigoinicial +
    '&codigofinal='+misparams.codigofinal +
    '&ubicacioninicial=' + misparams.ubicacioninicial  +
    '&ubicacionfinal='+misparams.ubicacionfinal ;
    // console.log("Debug: imprime_repcomis", miurl);
    window.open(miurl, "_blank");

  }

  obtenreltrasp ( parametros: string): Observable<Reltrasp[]> {
    
    let respu_z = "";
    let miurl = this.url + "clientes/servicios.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    
    return this.http.post<Reltrasp[]>(miurl, parametros, {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched Ubivta')),
      catchError(this.handleError<Reltrasp[]>('Ocurrio un error en Post obten Ubivta'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  imprime_reltrasp(params:string) {
    let misparams = JSON.parse(params);
    console.log("Estoy en serviciosaltas imprime_reltrasp:", misparams);
    let miurl = this.url + "clientes/servicios.php?" +
    'modo=reporte_traspasos' + 
    '&fecha=' + misparams.fecha +
    '&numeroreporte=' + misparams.numeroreporte;
    // console.log("Debug: imprime_repcomis", miurl);
    window.open(miurl, "_blank");

  }

  obtenfactorvtacrd ( ): Observable<Factorvtacred[]> {
    const headers = { 'content-type': 'text/plain'};
    let miurl = this.url + "altas/serviciosaltas.php"
    console.log("Debug: Estoy en obtenfactorvtacrd");
    let misparamnvo = {
      modo: "obtener_factorvtacrd."
    }

    return this.http.post<Factorvtacred[]>(miurl, JSON.stringify( misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched obtenfactorvtacrd')),
      catchError(this.handleError<Factorvtacred[]>('Ocurrio un error en Post obtenfactorvtacrd'))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  imprime_repclivi(params:string) {
    let misparams = JSON.parse(params);
    console.log("Estoy en serviciosaltas:", misparams);
    let miurl = this.url + "polizas/servicios.php?" +
    'modo=reporte_clientes_vigentes' + 
    '&fechabase=' + misparams.fechabase +
    '&codigoinicial='+misparams.codigoinicial +
    '&codigofinal='+misparams.codigofinal +
    '&diainicial='+misparams.diainicial +
    '&diafinal='+misparams.diafinal +
    '&poblacioninicial=' + misparams.poblacioninicial  +
    '&poblacionfinal='+misparams.poblacionfinal ;
    // console.log("Debug: imprime_repcomis", miurl);
    window.open(miurl, "_blank");

  }

  imprime_analitico_clientes_saldados(params:string) {
    let misparams = JSON.parse(params);
    console.log("Estoy en serviciosaltas:", misparams);
    let miurl = this.url + "polizas/servicios.php?" +
    'modo=reporte_clientes_saldaron_en_poliza' + 
    '&fechainicial=' + misparams.fechainicial +
    '&fechafinal=' + misparams.fechafinal +
    '&codigoinicial='+misparams.codigoinicial +
    '&codigofinal='+misparams.codigofinal +
    '&poblacioninicial=' + misparams.poblacioninicial  +
    '&poblacionfinal='+misparams.poblacionfinal ;
    // console.log("Debug: imprime_repcomis", miurl);
    window.open(miurl, "_blank");

  }

  obtentabladesctocont ( ): Observable<Tabladesctocont []> {
    const headers = { 'content-type': 'text/plain'};
    let miurl = this.url + "altas/serviciosaltas.php"
    console.log("Debug: Estoy en obtenfactorvtacrd");
    let misparamnvo = {
      modo: "obtener_tabladescocont."
    }

    return this.http.post<Tabladesctocont[]>(miurl, JSON.stringify( misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched obtenfactorvtacrd')),
      catchError(this.handleError<Tabladesctocont[]>('Ocurrio un error en Post obtenfactorvtacrd'))
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
