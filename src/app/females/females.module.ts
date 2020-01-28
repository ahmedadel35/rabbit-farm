import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FemalesPageRoutingModule } from './females-routing.module';

import { FemalesPage } from './females.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FemalesPageRoutingModule
  ],
  declarations: [FemalesPage]
})
export class FemalesPageModule {}
