import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { inicioPageRoutingModule } from './inicio-routing.module';
import { inicioPage } from './inicio.page';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    inicioPageRoutingModule
  ],
  declarations: [inicioPage],
  providers: [
    BarcodeScanner,
  ],
})
export class inicioPageModule {}
