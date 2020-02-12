import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFetamPage } from './add-fetam.page';

const routes: Routes = [
  {
    path: '',
    component: AddFetamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFetamPageRoutingModule {}
