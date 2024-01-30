import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'app-recover-r',
  templateUrl: './recover-r.page.html',
  styleUrls: ['./recover-r.page.scss'],
})
export class RecoverRPage implements OnInit {

  public Usuario_alumno: any[] = [];

  user = {
    usuario: "",
    nuevacontra: ""
  };

  constructor(private router: Router, private sqlite: SqliteService) {
    this.Usuario_alumno = [];
  }

  ionViewWillEnter() {
    this.read();
  }

  ngOnInit() {
  }

  update() {
    this.read().then((usuarios: any[]) => {
      const usuarioEncontrado = usuarios.find(usuario => usuario.nom_ua === this.user.usuario);

      if (usuarioEncontrado) {
        this.sqlite.update(this.user.nuevacontra, usuarioEncontrado.con_ua).then(() => {
          console.log('Contraseña actualizada correctamente');
          this.router.navigate(['/login']);
        }).catch(err => {
          console.error('Error al actualizar la contraseña:', err);
        });
      } else {
        console.log('Usuario no encontrado');
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
