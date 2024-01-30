import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecoverRPage } from './recover-r.page';

const routes: Routes = [
  {
    path: '',
    component: RecoverRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoverRPageRoutingModule {}
