import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  public Usuario_alumno: any[] = [];

  user = {
    usuario: "",
    password: ""
  };

  constructor(private router: Router, private sqlite: SqliteService) {
    this.Usuario_alumno = [];
  }

  ionViewWillEnter() {
    this.read();
  }

  ngOnInit() {}

  ingresar() {
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };

    const usuarioEncontrado = this.Usuario_alumno.find(usuario => usuario.nom_ua === this.user.usuario);

    if (usuarioEncontrado && usuarioEncontrado.con_ua === this.user.password) {
      this.router.navigate(['/inicio'], navigationExtras);
    } else {
      console.log('Nombre o contraseña incorrecta');
    }
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

