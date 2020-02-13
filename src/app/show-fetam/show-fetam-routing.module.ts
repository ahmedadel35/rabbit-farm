import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowFetamPage } from './show-fetam.page';

const routes: Routes = [
  {
    path: '',
    component: ShowFetamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowFetamPageRoutingModule {}
