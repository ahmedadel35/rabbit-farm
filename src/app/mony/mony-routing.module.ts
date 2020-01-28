import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonyPage } from './mony.page';

const routes: Routes = [
  {
    path: '',
    component: MonyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonyPageRoutingModule {}
