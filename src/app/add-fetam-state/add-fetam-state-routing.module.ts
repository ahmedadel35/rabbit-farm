import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFetamStatePage } from './add-fetam-state.page';

const routes: Routes = [
  {
    path: '',
    component: AddFetamStatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFetamStatePageRoutingModule {}
