import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MalesPage } from './males.page';

const routes: Routes = [
  {
    path: '',
    component: MalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MalesPageRoutingModule {}
