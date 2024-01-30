import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'app-recover',
  templateUrl: 'recover.page.html',
  styleUrls: ['recover.page.scss'],
})
export class recoverPage implements OnInit {
  
  public Usuario_alumno: any[] = [];

  user = {
    usuario: "",
    correo: ""
  };

  constructor(private router: Router, private sqlite: SqliteService) { 
    this.Usuario_alumno = [];
  } 

  ionViewWillEnter() {
    this.read();
  }

  ngOnInit() {
  }

  ingresar() {
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user 
      }
    };

    this.read().then((usuarios: any[]) => {
      const usuarioEncontrado = usuarios.find(usuario => usuario.nom_ua === this.user.usuario);

      if (usuarioEncontrado) {
        if (usuarioEncontrado.cor_ua === this.user.correo) {
          this.router.navigate(['/recover-r'], navigationExtras);
        } else {
          console.log('Correo incorrecto');
        }
      } else {
        console.log('Usuario incorrecto');
      }
    }).catch(err => {
      console.error('Error al leer datos:', err);
    });
  }

  read() {
    return this.sqlite.read().then((Usuario_alumno: any[]) => {
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

      return Usuario_alumno;
    }).catch(err => {
      console.error("Error al leer datos:", err);
      return Promise.reject(err);
    });
  }
}
