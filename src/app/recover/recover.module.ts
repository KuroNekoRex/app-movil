import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { recoverPageRoutingModule } from './recover-routing.module';

import { recoverPage } from './recover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    recoverPageRoutingModule
  ],
  declarations: [recoverPage]
})
export class recoverPageModule {}
