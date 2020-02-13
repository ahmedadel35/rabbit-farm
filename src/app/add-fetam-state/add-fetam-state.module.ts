import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFetamStatePageRoutingModule } from './add-fetam-state-routing.module';

import { AddFetamStatePage } from './add-fetam-state.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFetamStatePageRoutingModule
  ],
  declarations: [AddFetamStatePage]
})
export class AddFetamStatePageModule {}
