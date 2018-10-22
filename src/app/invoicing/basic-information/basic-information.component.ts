import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from "@angular/router";

//Services
import { FormDataBillingService } from '../../services/form-data-billing.service';
//Models
import { BasicInformation } from  '../../models/formData.model';

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.css']
})
export class BasicInformationComponent implements OnInit {
  basicInformation: BasicInformation;
  form: any;

  constructor(private router: Router, private formDataService: FormDataBillingService)
  {}

  ngOnInit() { 
    this.basicInformation = this.formDataService.getBasicInformation();
    console.log("Basic Information feature loaded! ")
  }

  savaData(form: any): boolean {
    if(!form.valid){
      return false;
    }

    this.formDataService.setBasicInformation(this.basicInformation);
    console.log(this.basicInformation);
    return true;
  }

  GoNextStep(form: any){
    if(this.savaData(form)){
      //Navigate to the vinil component
      this.router.navigate(['billing/vinil-information']); 
     }
  }
   






}

