import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IllnessPage } from './illness.page';

const routes: Routes = [
  {
    path: '',
    component: IllnessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IllnessPageRoutingModule {}
