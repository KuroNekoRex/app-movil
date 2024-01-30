import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { TimeApiService } from '../services/time-api.service';
import emailjs from 'emailjs-com';
import { SqliteService } from '../services/sqlite.service';
import { Camera } from '@capacitor/camera';


import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

declare var cordova: any;

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
})
export class inicioPage implements OnInit {
  data: any;
  usuario: string = '';
  formattedDateTime: string = '';
  isCordova: boolean = false;
  isWeb: boolean = false;
  public linkqr:string='';


  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private platform: Platform,
    private timeApiService: TimeApiService,
    private sqliteService: SqliteService,
  ) {
    this.activeroute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.data = this.router.getCurrentNavigation()?.extras.state;
        this.usuario = this.data['user'].usuario;
        console.log(this.usuario);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  async ngOnInit() {
    console.log('ngOnInit');
    this.isCordova = this.platform.is('cordova');
    this.isWeb = this.sqliteService.isWeb;
  
    await this.getTimeAndDate('America/Santiago');
  }
  
  getTimeAndDate(timezone: string) {
    console.log('getTimeAndDate');
    this.timeApiService.getTimeAndDate(timezone).subscribe(
      (response) => {
        console.log('API Response:', response);
        const rawDateTime = new Date(response.utc_datetime);
        this.formattedDateTime = this.formatDateTime(rawDateTime);
      },
      (error) => {
        console.error('Error al obtener la hora y la fecha:', error);
      }
    );
  }
  

  escanearCodigoQR() {
      
    BarcodeScanner.startScan().then(resultado => {
      if (resultado.hasContent) {
        this.linkqr=resultado.content
        console.log(this.linkqr);

        this.enviarCorreo()
      }
    });
    
    
  }
  

  formatDateTime(dateTime: Date): string {
    const hours = this.padZero(dateTime.getHours());
    const minutes = this.padZero(dateTime.getMinutes());
    const day = this.padZero(dateTime.getDate());
    const month = this.padZero(dateTime.getMonth() + 1);
    const year = dateTime.getFullYear();

    return `${hours}:${minutes} ${day}/${month}/${year}`;
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  enviarCorreo() {
    const emailService = 'service_f6gyi9y';
    const templateId = 'template_jwnjg1c';
    const userId = 'bsC-j69C7hTnSQLtN';

    const params = {
      from_name: 'RegistrApp',
      to_email: 'ca.abarzuac@profesor.duoc.cl',
      message: `Usuario: ${this.usuario}\nFecha y Hora: ${this.formattedDateTime}\nDatos del QR: ${this.linkqr}`,
    };

    emailjs.send(emailService, templateId, params, userId)
      .then((response) => {
        console.log('Correo electrónico enviado con éxito:', response);
      })
      .catch((error) => {
        console.error('Error al enviar el correo electrónico:', error);
      });
  }

  enviarCorreoWeb() {
    const emailService = 'service_f6gyi9y';
    const templateId = 'template_jwnjg1c';
    const userId = 'bsC-j69C7hTnSQLtN';
  
    const params = {
      from_name: 'RegistrApp',
      to_email: 'ca.abarzuac@profesor.duoc.cl',
      message: `Usuario: ${this.usuario}\nFecha y Hora: ${this.formattedDateTime}\nMensaje desde la aplicación web`,
    };
  
    emailjs.send(emailService, templateId, params, userId)
      .then((response) => {
        console.log('Correo electrónico enviado con éxito:', response);
      })
      .catch((error) => {
        console.error('Error al enviar el correo electrónico:', error);
      });
  }
  
}
