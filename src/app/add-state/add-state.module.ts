import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddStatePageRoutingModule } from './add-state-routing.module';

import { AddStatePage } from './add-state.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddStatePageRoutingModule
  ],
  declarations: [AddStatePage]
})
export class AddStatePageModule {}
