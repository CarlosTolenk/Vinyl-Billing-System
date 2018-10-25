import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, Params, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { map, max } from 'rxjs/operators';


//Modal
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//Services
import { AjustesService } from '../../services/ajustes.service';
import { FormDataBillingService } from '../../services/form-data-billing.service';


@Component({
  selector: 'app-design-information',
  templateUrl: './design-information.component.html',
  styleUrls: ['./design-information.component.css']
})
export class DesignInformationComponent implements OnInit {

  public withDesign:boolean = false;
  public withoutDesign:boolean = false;   
  public addDesing:Array<any> = [];
  public goTo:boolean =  false;

  //Modal
  public addDesignModal: any = [];
  public closeResult: string;

  //Setting
  public workToHour:number = 0;

  constructor(
    private _location: Location,  
    private router: Router,
    private _ajustesService: AjustesService, 
    private modalService: NgbModal,
    private formDataService: FormDataBillingService
    )
  {}

  ngOnInit() {
    this._ajustesService.getGanancia().subscribe((ganancia:any) => {
      this.workToHour = ganancia.work_hour;      
    });
   } 

   public onWithDesignSelectedChanged(value:boolean){
    this.withDesign = value;
    this.withoutDesign = !value;
  }

  public onWithoutDesignSelectedChanged(value:boolean){
    this.withoutDesign = value;
    this.withDesign = !value;
  }

  savaData(): boolean {
    this.formDataService.setDesignInformation(this.addDesing);
    // console.log(this.basicInformation);
    return true;
  }

  goPrevStep(){
    this.router.navigate(['billing/vinil-information']); 
  }

   goNextStep(){
    if(this.savaData()){
      //Navigate to the vinil component
      this.router.navigate(['billing/item-information']); 
     }   
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  addDesignItem(){
    let minute = this.addDesignModal.minute/60;
    let hour = this.addDesignModal.hour + minute;
    this.addDesignModal.price = hour * this.workToHour;
    if(this.addDesignModal.minute < 10){
      this.addDesignModal.minute = '0'+this.addDesignModal.minute
    }
    if(this.addDesignModal.hour < 10){
      this.addDesignModal.hour = '0'+this.addDesignModal.hour
    }
    this.addDesing.push(this.addDesignModal);
  }

  deteleItem(i){     
    this.addDesing.splice(i,i+1); 
   }

  ModalAddDesign(content){ 
    this.addDesignModal = {   
      name: '',
      description: '',    
      hour: 0,
      minute:0,
      price: 0, 
    };
   
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );  
  }






}

