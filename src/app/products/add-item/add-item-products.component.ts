import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from "@angular/router";
import {Location} from '@angular/common';

//Services
import { AjustesService } from '../../services/ajustes.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-items-item-products',
  templateUrl: './add-item-products.component.html',
  styleUrls: ['./add-item-products.component.css']
})
export class AddItemProductsComponent implements OnInit {

  //Select
  public options_type: any;
  public select_option: string;
  public addItem: any;

  

  constructor(
    private _ajustesService: AjustesService,
    private _productsServices: ProductsService,
    private router: Router,
    private _location: Location
  ) {
    this.addItem = {
      name: '',
      description: '',
      model: '',
      color: '',
      size: '',
      cost: '',
      price: '',
      available: '',
      inventary: ''
    }
    this.options_type = [
      'T-shirt', 'Hats', 'Cover', 'Decal', 'Cups', 'Keychains', 'Metal-Plate', 'MousePad', 'Signboard', 'TinCan'
    ]
   }   

   ngOnInit() { }

   addItemProduct(){
    this.calIncome(this.addItem).then((resolve) => {
         this.addItem = resolve;    
         this._productsServices.addItem(this.addItem);
         this._location.back();
     })
     .catch((error) =>{
       console.log(error);
     })
   }
 
   calIncome(data){
     let item = data;
     const promise = new Promise((resolve, reject) => {
//select_option != 'T-shirt'  && select_option != 'Hats'  && select_option != 'Decal' && select_option != 'Keychains' && select_option != 'Metal-Plate'  && select_option != 'Signboard' && select_option != 'TinCan' 
      if(this.select_option != 'Cover'  && this.select_option != 'Cups' && this.select_option != 'MousePad') data.model = 'N.A';
      if(this.select_option == 'Cover' || this.select_option == 'Cups' || this.select_option == 'MousePad' ) data.size =  'N.A';
       data.type = this.select_option;
       data.price = data.cost * 1.17;       
       if(data.price != 0){
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