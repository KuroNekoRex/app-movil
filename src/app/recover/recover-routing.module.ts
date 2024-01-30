import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { recoverPage } from './recover.page';

const routes: Routes = [
  {
    path: '',
    component: recoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class recoverPageRoutingModule {}
