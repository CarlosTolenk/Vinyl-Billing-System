import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {NgxPaginationModule} from 'ngx-pagination'; 
// import { NgbdtabsBasicComponentComponent } from 'tabs/tabs.component';

//Pipes
import { FilterPipe } from '../pipes/filter.pipe';
import { SortingItemPipe } from '../pipes/sortItem.pipe';
// import { FilterPipeModule } from 'ngx-filter-pipe';


import { ProductsComponent } from './products.component';
import { VinilsProductsComponent } from './vinils/vinils-products.component';
import { ItemsProductsComponent } from './items/item-products.component';
import { AddItemProductsComponent }  from './add-item/add-item-products.component'
import { EditItemProductsComponent } from './edit-item/edit-item-products.component';
import { from } from 'rxjs';

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
  },
  {
    path: 'add-item',
    data: {
      title: 'Product Configuration',
      urls: [
        { title: 'Dashboard', url: '/products/add-item' },
        { title: 'Add Item' }
      ]
    },
    component: AddItemProductsComponent
  },
  {
    path: 'edit-item/:id',
    data: {
      title: 'Product Configuration',
      urls: [
        { title: 'Dashboard', url: '/products/edit-item' },
        { title: 'Edit Item' }
      ]
    },
    component: EditItemProductsComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes), NgxMaskModule.forRoot(), NgxPaginationModule, NgbModule, NgxDatatableModule, Ng2SmartTableModule],
  declarations: [ProductsComponent, VinilsProductsComponent, ItemsProductsComponent, AddItemProductsComponent, EditItemProductsComponent, FilterPipe, SortingItemPipe]
})
export class ProductsModule {}
