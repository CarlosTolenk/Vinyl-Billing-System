import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask'
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ProductsComponent } from './products.component';
import { VinilsProductsComponent } from './vinils/vinils-products.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Product Configuration',
      urls: [
        { title: 'Dashboard', url: '/products' },
        { title: 'Product Configuration' }
      ]
    },
    component: ProductsComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes),   NgxMaskModule.forRoot()],
  declarations: [ProductsComponent, VinilsProductsComponent]
})
export class ProductsModule {}
