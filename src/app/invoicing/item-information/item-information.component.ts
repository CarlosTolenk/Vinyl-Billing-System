import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import {Router, Params, ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import { map, max } from 'rxjs/operators';


//Modal
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//Services
import { ProductsService } from '../../services/products.service';
import { FormDataBillingService } from '../../services/form-data-billing.service';

@Component({
  selector: 'app-item-infomation',
  templateUrl: './item-information.component.html',
  styleUrls: ['./item-information.component.css']
})
export class ItemInformationComponent implements OnInit {

  public withDesign:boolean = false;
  public withoutDesign:boolean = false;   
  public selectedValue:any;
  public addItem:Array<any> = [];
  public items: Observable<any[]>; 

   //Modal
   public addItemModal: any = [];
   public closeResult: string;

  constructor(
    private _location: Location,
    private _route: ActivatedRoute,
    private router: Router,
    private _productsServices: ProductsService,
    private modalService: NgbModal,
    private formDataService: FormDataBillingService
    )
  {}

  ngOnInit() {
    this.items = this._productsServices.getItems().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;      
        const id = a.payload.doc.id;        
        return {id, ...data};
      }))
    );  

   }

  public onWithDesignSelectedChanged(value:boolean){
    this.withDesign = value;
    this.withoutDesign = !value;
  }

  public onWithoutDesignSelectedChanged(value:boolean){
    this.withoutDesign = value;
    this.withDesign = !value;
  }
  
   addItems_Table(){
     if(this.selectedValue == 'Other'){
     this.addItemModal.price = this.addItemModal.quantity *  this.addItemModal.cost
     }else{
      this.addItemModal = {   
        name: this.selectedValue.name,
        description: this.selectedValue.description,  
        quantity: this.addItemModal.quantity,
        cost: this.selectedValue.price,
        price: this.selectedValue.price * this.addItemModal.quantity,      
      };
     }
  
     this.addItem.push(this.addItemModal);
     console.log(this.addItemModal);
   
   }

   deteleItem(i){     
    this.addItem.splice(i,i+1); 
   }

   savaData(): boolean {
    this.formDataService.setItemsInformation(this.addItem);
    // console.log(this.basicInformation);
    return true;
  }

  goPrevStep(){
    this.router.navigate(['billing/desing-information']); 
  }

   goNextStep(){
    if(this.savaData()){
      //Navigate to the vinil component
      this.router.navigate(['billing/result-information']); 
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

  ModalAddItem(content){ 
    this.addItemModal = {   
      name: '',
      description: '',  
      color: '',
      quantity: 1,     
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

