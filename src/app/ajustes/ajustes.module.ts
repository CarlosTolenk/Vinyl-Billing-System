import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask'

import { AjustesComponent } from './ajustes.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Billing Settings',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Billing Settings' }
      ]
    },
    component: AjustesComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes),   NgxMaskModule.forRoot()],
  declarations: [AjustesComponent]
})
export class AjustesModule {}
