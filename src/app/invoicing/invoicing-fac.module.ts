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

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Billing',
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
  declarations: [InvoicingComponent, BasicInformationComponent, VinilInformationComponent]
})
export class InvoicingModule {}
