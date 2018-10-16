import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router, Params, ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';

//Services
import { AjustesService } from '../../services/ajustes.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-items-item-products',
  templateUrl: './edit-item-products.component.html',
  styleUrls: ['./edit-item-products.component.css']
})
export class EditItemProductsComponent implements OnInit {

  //Select
  public options_type: any;
  public select_option: string;
  public editItem: any;
  public idItem:string;
  public type:string;

  

  constructor(
    private _ajustesService: AjustesService,
    private _productsServices: ProductsService,
    private router: Router,
    private _location: Location,
    private _route: ActivatedRoute
  ) {
    this.editItem = {
      name: '',
      description: '',
      model: '',
      color: '',
      size: '',
      cost: '',
      price: '',
      available: '',
      inventary: '',    
      type: ''
    }   
   }   

   ngOnInit() {
     this.idItem = this._route.snapshot.params.id;
      this._productsServices.getItem(this.idItem).subscribe((itemsSnapshot) =>{    
      this.editItem = itemsSnapshot.payload.data();  
      // this.editItem.id = itemsSnapshot.payload.id
      this.type = this.editItem.type;
      console.log(this.editItem);
     });
  
 
    }

    saveItemProduct(){
    this.calIncome(this.editItem).then((resolve) => {
      console.log(resolve);
         this.editItem = resolve;         
          this._productsServices.updateItem(this.idItem, this.editItem);     
        //  this._location.back();
     })
     .catch((error) =>{
       console.log(error);
     })
   }
 
   calIncome(data){
     let item = data;
     const promise = new Promise((resolve, reject) => {
       data.type = this.select_option;
       data.price = data.cost * 1.17;       
       data.type = this.type;
       if(data.price >= 0){
         console.log('Solucion de promesa')
         console.log(data)
         resolve(item);
       }else{
         reject(new Error('Hubo un error en el cálculo'))
       }     
     });
     return promise;
   }
   
   goBack(){
    this._location.back();
   }


}