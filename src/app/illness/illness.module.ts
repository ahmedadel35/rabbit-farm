import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IllnessPageRoutingModule } from './illness-routing.module';

import { IllnessPage } from './illness.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IllnessPageRoutingModule
  ],
  declarations: [IllnessPage]
})
export class IllnessPageModule {}
