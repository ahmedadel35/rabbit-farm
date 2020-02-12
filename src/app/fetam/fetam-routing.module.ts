import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FetamPage } from './fetam.page';

const routes: Routes = [
  {
    path: '',
    component: FetamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FetamPageRoutingModule {}
