import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddStatePage } from './add-state.page';

const routes: Routes = [
  {
    path: '',
    component: AddStatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddStatePageRoutingModule {}
