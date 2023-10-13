import { Injectable } from '@angular/core';
import { catchError, map, mapTo, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Compania } from '../models/config'
import { DateAdapter } from '@angular/material/core';


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
  cvecia_z = "";

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
      this.cia= this.cias[0];
      //console.log("Debug: Cias " + this.cias[0]);
      console.log("Debug: Datos " + datos);
      console.log("Debug: Ya hice llamado a configuracion:", this.config.estado);
    });

  }

  getcvecia () {
    let micvecia_z="";
    if(this.cia) {
      micvecia_z = this.cia.Clave;
    }
    return (micvecia_z);
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

  obtenpromocion () {
    let micia = this.cias[this.config.cia];
    let promcion = {
      promodic_inicio: micia.promodic_inicio,
      promodic_fin: micia.promodic_fin,
      promodic_dias:micia.promodic_dias,
      promodic_mesesminimo: micia.mesesminimo
    }
    return (promcion);
  }



  calcula_venc <Date> (fechavta:string, qom_z:string, letra:number) {

    let vencimiento_z = new Date(fechavta.replace(/-/g, '\/'));
    let esfindemes = this.esfindemes(vencimiento_z);
    let strfecvta =  this.fecha_a_str  (vencimiento_z, "YYYYmmdd");
    let dias_z = 15;
    let esimpar_z = 0;
    let nvafecha_z = 0;
    let meses_z = 0;
    let mimes_z = 0;
    let midia_z = 0;
    if (this.cia) {
      if( this.cia.AplicarContingencia  && (strfecvta < this.cia.FechaContingencia)) {
        vencimiento_z = this.SumaDiasaFecha(vencimiento_z, this.cia.DiasContingencia);
      }
  
    }

    let anu = vencimiento_z.getFullYear();
    let mes = vencimiento_z.getMonth() + 1;
    let dia = vencimiento_z.getDate();
    let strfec ="";
    let anusbrinca = 0;
    let diaoriginal = dia;
    let ii_z = 0;
    meses_z = letra;
    esimpar_z = (letra % 2);
    if(qom_z == "Q") {
      meses_z = Math.floor(letra / 2);
    }
    for (ii_z = 1; ii_z <= meses_z; ii_z++) {
        mes +=1;
        if(mes > 12) { anu++; mes = 1}
    }
    if(esimpar_z) {
      dia += 15;
      if ( dia > 30) {
        switch (mes) {
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12: 
          if(dia > 31) {
            mes += 1; if(mes > 12) { anu +=1; mes = 1 }
            dia = dia - 30;
          }
          break;
          case 2:
          case 4:
          case 6:
          case 9:
          case 11:
              mes += 1; dia = dia - 30;
          break;
        }
      }
      strfec = anu.toString() + "/" + mes.toString() + '/' + dia.toString();
      vencimiento_z = new Date(strfec);
      vencimiento_z = new Date (this.corrige_fecha_fin_de_mes(strfec));
      // console.log("letra Impar:", letra, "strfec:", strfec, " Vencimiento:", vencimiento_z.toDateString());
    } else {
      strfec = anu.toString() + "/" + mes.toString() + '/' + dia.toString();
      vencimiento_z = new Date (this.corrige_fecha_fin_de_mes(strfec));
      //vencimiento_z = new Date(strfec);
      if(esfindemes) vencimiento_z = this.damefindemes(vencimiento_z);
      // console.log("letra Par:", letra, "strfec:", strfec, " Vencimiento:", vencimiento_z.toDateString());
    }
    return (vencimiento_z);
  }

  SumaDiasaFecha(fecha: Date, dias: number) {
    let months = Math.floor(dias / 30);
    const remainingDays = dias % 30;
    let year = fecha.getFullYear();
    let month = fecha.getMonth() + months;
    let day = fecha.getDate() + remainingDays;

    // Handle cases where the result day exceeds the number of days in the result month
    if(dias > 0) {
      while (day > new Date(year, month + 1, 0).getDate()) {
        day -= new Date(year, month + 1, 0).getDate();
        month++;
      }
  
    } else {
      while (day < 1) {
        month--;
        if (month < 0) {
          month = 11;
          year--;
        }
        day += new Date(year, month + 1, 0).getDate();
      }
    }

    const resultDate = new Date(year, month, day);
    return (resultDate);
  }

  corrige_fecha_fin_de_mes(strfec: string) {
    let anu = 0;
    let mes = 0;
    let dia = 0;
    let fechaxpartes = strfec.split("/")
    let stranu = fechaxpartes[0]
    let strmes = fechaxpartes[1]
    let strdia = fechaxpartes[2]
    anu = Number(stranu);
    mes = Number(strmes);
    dia = Number(strdia);
    //console.log('stranu:', stranu, strmes, strdia);
    
    let vencimiento_z = new Date();
    if(mes == 2 && dia > 28 ) {
      vencimiento_z = this.damefindemes(new Date(anu.toString() + "/" + mes.toString() + "/01"));  
    } else if ((mes == 4 || mes == 6 || mes == 9 || mes == 11 )&& dia > 30 ) {
      vencimiento_z = this.damefindemes(new Date(anu.toString() + "/" + mes.toString() + "/01"));  
    } else {
      vencimiento_z = new Date(anu.toString() + "/" + mes.toString() + "/" + dia.toString());  
    }
    return (vencimiento_z);

  }

  esfindemes <bool> (fecha: Date)  {
    let nvafecha = new Date (fecha.getTime() + (1 * 24 * 60 * 60 *  1000));
    let dia = 0;
    dia = nvafecha.getDate();
    if(dia == 1) {
      return (true);
    } else {
      return (false);
    }

  }

  damefindemes  (mifecha : Date) {
    let anu = 0;
    let mes=0;
    anu = mifecha.getFullYear();
    mes = mifecha.getMonth()+1;

    if(mes == 12) {
      anu =anu+1; mes=1;
    } else {
      mes = mes + 1;
    }
    let strfec = anu.toString() + "/" + mes.toString() + '/' + "01";
    let findemes = new Date( strfec);
    findemes = new Date ( findemes.getTime() + (-1 * 24 * 60 * 60 *  1000));
    //console.log('mes:', mes, 'mifecha:', mifecha.toDateString(), 'strfec:', strfec, 'Fin de Mes:', findemes.toDateString());
    return (new Date(findemes));
    
  }
  
  generavencimientos (fechavta:string, qom:string, inicio:number, final:number, diasgracia_z: number, letraspagadas: number) {
    let ii_z = 0;
    let letra = "";
    let vence = "";
    let diasletra_z = 15;
    let fecven = new Date();
    if(qom == "Q") diasletra_z = 15;
    if(qom == "M") diasletra_z = 30;
    let fecbase_z = new Date(fechavta.replace(/-/g, '\/'));
    fecbase_z.setDate (fecbase_z.getDate() + diasgracia_z);
    fechavta = this.fecha_a_str(fecbase_z, "YYYY-mm-dd");
    console.log('Fecha Vta:', fechavta, 'fecbase:', fecbase_z);
    

    let listavencimientos_z= [];
    let fechamax = this.fecha_a_str(this.SumaDiasaFecha(new Date(), -5), "YYYYmmdd");
    let  vencido = false;

    for (ii_z = inicio; ii_z <= final; ii_z++) {
      if(ii_z) {
        letra = ii_z.toString().padStart(2, "0");
      } else {
        letra = "SE";
      }
      fecven = this.calcula_venc(fechavta, qom, ii_z );
      vence = this.fecha_a_str(fecven, "dd-mmm-YYYY");
      const pagado = Number (letra) <= letraspagadas;
      const fvence = this.fecha_a_str(fecven, "YYYYmmdd"); // this.config.fecha_a_str (fecven, "YYYYmmdd")
      //console.log("Letra", miven.letra, "miven.fecven", fecven, "fechamax", fechamax, "fvence", fvence);
      if(!pagado) {
        vencido = fvence < fechamax;
      }

      listavencimientos_z.push({letra, vence, fecven, pagado, vencido});

    }
    let misven_z = JSON.stringify(listavencimientos_z);
    return (misven_z);

  }


  fecha_a_str  (fecha : Date, formato:string)  {
    let strfecha_z = "";
    let anu_z = "";
    let mes_z = "";
    let dia_z = "";
    let meses_z = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    anu_z = fecha.getFullYear().toString();
    mes_z = ((fecha.getMonth()+101).toString()).substring(1,3);
    dia_z = ((fecha.getDate()+100).toString()).substring(1,3);
    if(formato == "YYYY-mm-dd") {
      strfecha_z = anu_z + "-" + mes_z + "-" + dia_z;
    }
    if(formato == "YYYYmmdd") {
      strfecha_z = anu_z + mes_z +  dia_z;
    }
    if(formato == "yymmdd") {
      strfecha_z = anu_z.substring(2,4) + mes_z +  dia_z;
    }

    if(formato == "dd-mm-YYYY") {
      strfecha_z = dia_z +  "-" + mes_z + "-" + anu_z ;
    }
    if(formato == "dd-mmm-YYYY") {
      strfecha_z = dia_z +  "-" + meses_z[fecha.getMonth()] + "-" + anu_z ;
    }
    return (strfecha_z);
  }
  

}
