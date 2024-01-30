import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'app-registro',
  templateUrl: 'registro.page.html',
  styleUrls: ['registro.page.scss'],
})
export class registroPage implements OnInit {

  public Usuario_alumno: any[] = [];
  public Nombre: string;
  public Correo: string;
  public Contra: string;

  user={
    usuario:"",
    correo:"",
    password:""
  }
  constructor(private router: Router, private sqlite: SqliteService) {

    this.Usuario_alumno = [];
    this.Nombre = '';
    this.Correo = '';
    this.Contra = '';

   }

   ionViewWillEnter() {
    this.read();
  }

  ngOnInit() {
  }
  ingresar(){
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    if(this.user.usuario == ""){

    }
    else{
      if(this.user.password == ""){

      }
      else{
        if(this.user.correo == ""){

        }
        else{
          this.create();
          this.router.navigate(['/home'],navigationExtras);
        }

      }
    }
  }

  create(){
    
    this.sqlite.create(this.Nombre,this.Correo,this.Contra).then( (changes) =>{
      console.log(changes);
      console.log("Creado");
      this.Nombre = '';
      this.Correo = '';
      this.Contra = '';
      this.read();
    }).catch(err => {
      console.error(err);
      console.error("Error al crear");
    })
  }

  read() {
    this.sqlite.read().then((Usuario_alumno: any[]) => {
      console.log("Respuesta de la consulta:", Usuario_alumno);
  
      this.Usuario_alumno = Usuario_alumno;
      console.log("Datos leídos correctamente:");
  
      for (const usuario of this.Usuario_alumno) {
        if (usuario.nom_ua !== undefined && usuario.cor_ua !== undefined && usuario.con_ua !== undefined) {
          console.log("Nombre:", usuario.nom_ua);
          console.log("Correo:", usuario.cor_ua);
          console.log("Contraseña:", usuario.con_ua);
        } else {
          console.error("Datos de usuario incorrectos:", usuario);
        }
      }
    }).catch(err => {
      console.error("Error al leer datos:", err);
    });
  }

}

