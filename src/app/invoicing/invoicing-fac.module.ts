import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask'
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//Component
import { InvoicingComponent } from './invoicing-fac.component';
import { BasicInformationComponent } from './basic-information/basic-information.component';
import { VinilInformationComponent } from './vinil-information/vinil-information.component';
import { ResultInformationComponent } from './result-information/result-information.component';
import { ItemInformationComponent } from './item-information/item-information.component';
import { DesignInformationComponent } from './design-information/design-information.component';
import { NavbarStatusComponent } from './navbar-status/navbar-status.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Generate Billing',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Billing' }
      ]
    },    
    component: InvoicingComponent,    
    children: [
      { path: '', redirectTo: 'basic-information', pathMatch: 'full' },
      { path: 'basic-information', component: BasicInformationComponent },
      { path: 'vinil-information', component: VinilInformationComponent },
      { path: 'desing-information', component: DesignInformationComponent },
      { path: 'item-information', component: ItemInformationComponent },
      { path: 'result-information', component: ResultInformationComponent },   
    ]
  },
  // {
  //   path: 'basic-information',
  //   data: {
  //     title: 'Billing',
  //     urls: [
  //       { title: 'Dashboard', url: '/dashboard' },
  //       { title: 'Billing' }
  //     ]
  //   },
  //   component: VinilInformationComponent
  // }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes),  NgxMaskModule.forRoot()],
  declarations: [
    InvoicingComponent,
    BasicInformationComponent,
    VinilInformationComponent,
    ResultInformationComponent,
    ItemInformationComponent,
    DesignInformationComponent,
    NavbarStatusComponent
  ]
})
export class InvoicingModule {}
