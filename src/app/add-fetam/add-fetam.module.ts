import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFetamPageRoutingModule } from './add-fetam-routing.module';

import { AddFetamPage } from './add-fetam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFetamPageRoutingModule
  ],
  declarations: [AddFetamPage]
})
export class AddFetamPageModule {}
