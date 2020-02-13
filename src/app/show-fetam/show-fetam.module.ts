import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowFetamPageRoutingModule } from './show-fetam-routing.module';

import { ShowFetamPage } from './show-fetam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowFetamPageRoutingModule
  ],
  declarations: [ShowFetamPage]
})
export class ShowFetamPageModule {}
