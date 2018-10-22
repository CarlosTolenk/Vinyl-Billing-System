import { Component, OnInit, DoCheck } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import {Router, Params, ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';

//Services
import { FormDataBillingService } from '../../services/form-data-billing.service';

@Component({
  selector: 'app-navbar-status',
  templateUrl: './navbar-status.component.html',
  styleUrls: ['./navbar-status.component.css']
})
export class NavbarStatusComponent implements OnInit, DoCheck {

  public progress: any;
  public statusStep: string = '';
  public progressStatus: string = ''

  constructor(
    private _location: Location,
    private _route: ActivatedRoute,
    private formDataService: FormDataBillingService
  ){
    this.progressStatus = 'step-zero'
  }

  ngOnInit() { }

  ngDoCheck(){
    this.progress = this.formDataService.isProgress();
    // console.log(this.progress);
    if(!this.progress.first){
      this.statusStep = "inactive"
    }
     if(this.progress.first){
      this.statusStep = "complete",
      this.progressStatus = 'step-first'
    }

     if(this.progress.first && this.progress.second){
      console.log("Segundo paso listo");
      this.statusStep = "complete",
      this.progressStatus = 'step-second'
    }

    if(this.progress.first && this.progress.second && this.progress.third){
      console.log("Tercer paso listo");
      this.statusStep = "complete",
      this.progressStatus = 'step-third'
    }
    

    console.log(`First: ${this.progress.first} Second: ${this.progress.second}`);


    
    
    // else{
    //   this.statusStep = "complete",
    //   this.progressStatus = 'step-first'
    // }
  }

  goPrevStep(){
    this._location.back();
   }






}



