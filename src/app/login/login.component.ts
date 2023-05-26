import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';
import { SpinnerComponent } from '../common/spinner/spinner.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarios : User[] = [];
  Usuario :User = {
    idusuario: 0,
    login: "",
    nombre: "",
   numpol: "",
   passwd: "",
   status: "",
   nivel:"",
   iniciales:""

  }
  
  error = {
    activo: false
  }
  
  pwdmd5_z : string = "";
  pwdrecortado_z : string = "";
  fechahoy_z  = new Date();
  anu_z = this.fechahoy_z.getFullYear().toString();
  mes_z = ((this.fechahoy_z.getMonth()+101).toString()).substring(1,3);
  dia_z = ((this.fechahoy_z.getDate()+100).toString()).substring(1,3);
  strfecha_z = this.anu_z + "-" + this.mes_z + "-" + this.dia_z;
  //this.mes_z + ":" + this.dia_z;
  
  registro_z = {
    "idusuario":0,
    "login":"",
    "nombre":"",
    "token":"",
    "acceso": "false",
    "iniciales":"",
    "nivel":""
  }

  constructor(private serviciousuarios: UsuariosService, 
    public router: Router ) { }

  ngOnInit(): void {
    // console.log("Fecha de Hoy:" + this.strfecha_z);
    this.cerrarsesion();

  }

  cerrarsesion() {
    localStorage.removeItem("token");
  }

  onSubmit(){
     this.pwdmd5_z = Md5.hashStr(this.Usuario.passwd).toString().toUpperCase();
     //this.serviciousuarios.obtenusuario(this.Usuario.login).subscribe(
     //   mirespuesta => this.usuarios = mirespuesta
     //);
     this.serviciousuarios.obtenusuario(this.Usuario.login).subscribe(
      mirespuesta => {
        // console.log('Ya regrese y estoy en subscribe');
        if (mirespuesta == null || mirespuesta.length == 0) {
          this.error.activo = true;
          return;
        }
        this.pwdrecortado_z = mirespuesta[0].passwd;
        if(this.pwdrecortado_z == undefined) {
          this.pwdrecortado_z = "-1";
        }
        this.pwdrecortado_z = this.pwdrecortado_z;
        if( this.pwdrecortado_z === this.pwdmd5_z) {
          this.usuarios = mirespuesta;
          this.Usuario = this.usuarios[0];
            console.log("Usuario login exitoso");
            this.registro_z.idusuario = this.Usuario.idusuario;
            this.registro_z.login = this.Usuario.login;
            this.registro_z.nombre = this.Usuario.nombre;
            this.registro_z.nivel = this.Usuario.nivel;
            this.registro_z.iniciales = this.Usuario.iniciales;
            this.registro_z.acceso  = "true";
            
            this.registro_z.token = Md5.hashStr(this.Usuario.login + ":" + this.strfecha_z).toString();
                    
            localStorage.setItem("token", JSON.stringify( this.registro_z));
            this.serviciousuarios.graba_sesion(this.registro_z.token).subscribe(
              midatasesion => {
                // console.log("Sesion:"+ JSON.stringify(midatasesion));
              }

            );
            this.error.activo = false;
            this.router.navigateByUrl('/main');

        } else {
          this.error.activo = true;
        }
      },
      err => {
        this.error.activo = true;
      }


   );

  }

  hide_image() {
    // console.log("Estoy en hide_image()");
    if(this.error.activo) this.error.activo = false;
  }

}
