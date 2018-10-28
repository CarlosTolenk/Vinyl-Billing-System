import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AjustesService } from '../services/ajustes.service';
import { FormGroup, FormControl } from '@angular/forms';

//Services
import { FormDataBillingService } from '../services/form-data-billing.service';

@Component({
  selector: 'app-invoicing',
  templateUrl: './invoicing-fac.component.html',
  styleUrls: ['./invoicing-fac.component.css']
})
export class InvoicingComponent implements OnInit {
  

  constructor(private formDataService: FormDataBillingService)
  {}

  ngOnInit() {
    // this.formData = this.formDataService.getFormData();
   }






}

