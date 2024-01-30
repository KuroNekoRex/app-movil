import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoverRPageRoutingModule } from './recover-r-routing.module';

import { RecoverRPage } from './recover-r.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecoverRPageRoutingModule
  ],
  declarations: [RecoverRPage]
})
export class RecoverRPageModule {}
