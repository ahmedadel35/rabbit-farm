import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FetamPageRoutingModule } from './fetam-routing.module';

import { FetamPage } from './fetam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FetamPageRoutingModule
  ],
  declarations: [FetamPage]
})
export class FetamPageModule {}
