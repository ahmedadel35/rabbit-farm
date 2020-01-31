import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MalesPageRoutingModule } from './males-routing.module';

import { MalesPage } from './males.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MalesPageRoutingModule
  ],
  declarations: [MalesPage]
})
export class MalesPageModule {}
