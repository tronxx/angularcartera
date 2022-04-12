
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
import { Poblacs } from '../models/poblacs';
import { Cliagentes } from '../models/cliagentes';
import { Vendedor } from '../models/vendedor';
import { Tarjetatc } from '../models/tipostarjetastc';
import { Factura } from '../models/facturas';
import { Renfacfo } from '../models/renfacfo';
import { Articulo } from '../models/articulo';
import { Serie } from '../models/serie';
import { Seriefac } from '../models/seriesfac';
import { Usocfdi } from '../models/usocfdi';
import { Metodopagocfdi } from '../models/metodopagocfdi';

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
    var miurl = this.url + "altas/serviciosaltas.php?modo=imprimir_edocta_altas" + 
      "&numcli="+misparams.numcli;
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

  busca_vencimientos (fechavta:string, qom:string, inicial:number, final:number) {
    return (this.configuracion.generavencimientos(fechavta, qom, inicial, final));
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
      modo: "buscar_cli_facturas",
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

    console.log("Debug: Estoy en busca busca_articulo ", parametros);
  
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

    console.log("Debug: Estoy en busca busca_articulo ", parametros);
  
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

    console.log("Debug: Estoy en busca busca_articulo ", parametros);
  
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
      ubiage: misparams.ubiage
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
      catchError(this.handleError<Metodopagocfdi[]>('Ocurrio un error en Post obten busca_codigo_inven'))
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

  buscar_status_cliente_cerrado( parametros: string): Observable<any> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    console.log("Debug: Estoy en cerrar_cliente_altas parametros:", parametros);
    let misparams = JSON.parse(parametros);
    let misparamnvo = {
      modo: "obtener_status_cierre_cliente_altas",
      numcli: misparams.numcli
    }

    return this.http.post<any>(miurl, JSON.stringify( misparamnvo), {'headers':headers}).
    pipe(
      tap(_ => this.log('fetched cerrar_cliente_altas')),
      catchError(this.handleError<any>('Ocurrio un error en Post obten agregar_renfac_altas '))
    );
    // return this.http.post(this.url + 'usuarios/busca_usuarios.php', body,{'headers':headers});
  }

  grabar_solicitud_altas( parametros: string): Observable<any> {
    
    let respu_z = "";
    let miurl = this.url + "altas/serviciosaltas.php"
    const headers = { 'content-type': 'text/plain'};
    const body=parametros;
    console.log("Debug: Estoy en grabar_solicitud_altas parametros:", parametros);
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
    console.log("Debug: Estoy en obtenpdfcfdi ", params);
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
    '&ubicacioninicial=' + '.' +
    '&ubicacionfinal='+'zz';
    console.log("Debug: imprime_relvtas", miurl);
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
    console.log(`Clientes Service: ${message}`);
  }

}
