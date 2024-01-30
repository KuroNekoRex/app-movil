import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { registroPageRoutingModule } from './registro-routing.module';

import { registroPage } from './registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    registroPageRoutingModule
  ],
  declarations: [registroPage]
})
export class registroPageModule {}
