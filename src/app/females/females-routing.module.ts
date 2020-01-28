import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FemalesPage } from './females.page';

const routes: Routes = [
  {
    path: '',
    component: FemalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FemalesPageRoutingModule {}
