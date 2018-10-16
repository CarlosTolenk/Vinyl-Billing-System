import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/ajustes', pathMatch: 'full' },
      {
        path: 'ajustes',
        loadChildren: './ajustes/ajustes.module#AjustesModule'
      },
      {
        path: 'component',
        loadChildren: './component/component.module#ComponentsModule'
      },
      {
        path: 'products',
        loadChildren: './products/products.module#ProductsModule'
      },
      {
        path: 'billing',
        loadChildren: './invoicing/invoicing-fac.module#InvoicingModule'
      },
      {
        path: 'tables',
        loadChildren: './table/tables.module#TablesModule'
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/ajustes'
  }
];
