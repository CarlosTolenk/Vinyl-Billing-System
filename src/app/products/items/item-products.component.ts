import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as tableData from './smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import {Router} from "@angular/router";

//Modal
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//Services
import { AjustesService } from '../../services/ajustes.service';
import { ProductsService } from '../../services/products.service';



@Component({
  selector: 'app-items-products',
  templateUrl: './item-products.component.html',
  styleUrls: ['./item-products.component.css'],

})
export class ItemsProductsComponent implements OnInit {

  public services: Observable<any[]>; 
  public data:any[] 
  

  //Modal
  public closeResult: string;
  public deleteId: any;
  public options_type: any;
  public select_option: string;
  // Table
  source: LocalDataSource;
  source2: LocalDataSource;
  public filterQuery = "";
  public searchText = "";
  public userFilter: any = { data: '' };
  public rowsOnPage = 10;
  //Sort Pipe
  public path: string[] = ['company'];
  public order: number = 1; // 1 asc, -1 desc;

  //Sort
  public name:string;
  public description: string;
  public model:string;
  public color:string;
  public size:string;
  public type:string;
  public cost:string;
  public price:string;
  public available:string;
  public inventary:string;
  
  characters = [
    'Finn the human',
    'Jake the dog',
    'Princess bubblegum',
    'Lumpy Space Princess',
    'Beemo1',
    'Beemo2'
  ]

  constructor(
    private _ajustesService: AjustesService,
    private _productsServices: ProductsService,
    private modalService: NgbModal,
    private router: Router,
 
    
  ) {
    // this.source = new LocalDataSource(tableData.data); // create the source
    // this.source2 = new LocalDataSource(tableData.data); // create the source
    this.name = '';
    this.description = '';
    this.model = '';
    this.color = '';
    this.size = '';
    this.type = '';
    this.cost = '';
    this.price = '';
    this.available = '';
    this.inventary = ''; 
    this.select_option = '';
    this.options_type = [
      'T-shirt', 'Cover', 'Decal'
    ]
   }


   /*
   -T-shirt
   -Tazas
    -Cover de celulares
    -Llaveros
    -Fotos en placa de metal
    -Mouse pad
    -Decal
    -Letreros de vinil
    -Porta lata  
   
   */
   
   settings= tableData.settings;

  ngOnInit() {
   this.services = this._productsServices.getItems().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;      
        const id = a.payload.doc;     

        return {id, ...data};
    
      }))
    );  

    this._productsServices.getItems().subscribe((itemsSnapshot) =>{
      this.data = [];
      itemsSnapshot.forEach((itemData: any) => {
        this.data.push({
          id: itemData.payload.doc.id,
          data:itemData.payload.doc.data()
        });
      })
      console.log(this.data);  
    });  

  }
  addItemProduct(){
    this.router.navigate(['products/add-item']); 
  }

  editItemProduct(id){
    console.log(id);
    this.router.navigate(['products/edit-item',id]); 
  }

  deteleItem(){
    console.log(this.deleteId);
    this._productsServices.deleteItem(this.deleteId);
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

  ModalDeleteItem(content, id){    
    this.deleteId = id
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );  
  }

  sortTable(prop: string) {
    this.path = prop.split('.')
    this.order = this.order * (-1); // change order
    return false; // do not reload
  }

  

  sortItem(concept){
    switch(concept){
      //Name
     case 'name': {
       if(this.name == '' || this.name == 'false'){
         this.data.sort((a, b): any => {          
           if(a.data.name < b.data.name) return -1;
           if(a.data.name > b.data.name) return 1;
           return 0;
         }); 
         this.name = 'true';
       }else{
         this.data.sort((a, b): any => {    
           if(a.data.name < b.data.name) return 1;
           if(a.data.name > b.data.name) return -1;
           return 0;
         }); 
         this.name = 'false';
       }
       break;
      }
 
      //Description
 
      case 'description': {
       if(this.description == '' || this.description == 'false'){
         this.data.sort((a, b): any => {          
           if(a.data.description < b.data.description) return -1;
           if(a.data.description > b.data.description) return 1;
           return 0;
         }); 
         this.description = 'true';
       }else{
         this.data.sort((a, b): any => {    
           if(a.data.description < b.data.description) return 1;
           if(a.data.description > b.data.description) return -1;
           return 0;
         }); 
         this.description = 'false';
       }
       break;
      }
 
      //Model
      case 'model': {
       if(this.model == '' || this.model == 'false' ){
         this.data.sort((a, b): any => {          
           if(a.data.model < b.data.model) return -1;
           if(a.data.model > b.data.model) return 1;
           return 0;
         }); 
         this.model = 'true';
       }else{
         this.data.sort((a, b): any => {    
           if(a.data.model < b.data.model) return 1;
           if(a.data.model > b.data.model) return -1;
           return 0;
         }); 
         this.model = 'false';
       }
       break;
      }
    
 
 
      //Color
      case 'color': {
       if(this.color == '' || this.color == 'false' ){
         this.data.sort((a, b): any => {          
           if(a.data.color < b.data.color) return -1;
           if(a.data.color > b.data.color) return 1;
           return 0;
         }); 
         this.color = 'true';
       }else{
         this.data.sort((a, b): any => {    
           if(a.data.color < b.data.color) return 1;
           if(a.data.color > b.data.color) return -1;
           return 0;
         }); 
         this.color = 'false';
       }
       break;
      }
 
       //Size
       case 'size': {
       if(this.size == '' || this.size == 'false' ){
         this.data.sort((a, b): any => {          
           if(a.data.size < b.data.size) return -1;
           if(a.data.size > b.data.size) return 1;
           return 0;
         }); 
         this.size = 'true';
       }else{
         this.data.sort((a, b): any => {    
           if(a.data.size < b.data.size) return 1;
           if(a.data.size > b.data.size) return -1;
           return 0;
         }); 
         this.size = 'false';
       }
       break;
     }
 
       //type
       case 'type': {
         if(this.type == '' || this.type == 'false' ){
           this.data.sort((a, b): any => {          
             if(a.data.type < b.data.type) return -1;
             if(a.data.type > b.data.type) return 1;
             return 0;
           }); 
           this.type = 'true';
         }else{
           this.data.sort((a, b): any => {    
             if(a.data.type < b.data.type) return 1;
             if(a.data.type > b.data.type) return -1;
             return 0;
           }); 
           this.type = 'false';
         }
         break;
       }
 
        //cost
        case 'cost': {
         if(this.cost == '' || this.cost == 'false' ){
           this.data.sort((a, b): any => {          
             if(a.data.cost < b.data.cost) return -1;
             if(a.data.cost > b.data.cost) return 1;
             return 0;
           }); 
           this.cost = 'true';
         }else{
           this.data.sort((a, b): any => {    
             if(a.data.cost < b.data.cost) return 1;
             if(a.data.cost > b.data.cost) return -1;
             return 0;
           }); 
           this.cost = 'false';
         }
         break;
       }
 
       //price
       case 'price': {
         if(this.price == '' || this.price == 'false' ){
           this.data.sort((a, b): any => {          
             if(a.data.price < b.data.price) return -1;
             if(a.data.price > b.data.price) return 1;
             return 0;
           }); 
           this.price = 'true';
         }else{
           this.data.sort((a, b): any => {    
             if(a.data.price < b.data.price) return 1;
             if(a.data.price > b.data.price) return -1;
             return 0;
           }); 
           this.price = 'false';
         }
         break;
       }
       //available
       case 'available': {
       if(this.available == '' || this.available == 'false' ){
         this.data.sort((a, b): any => {          
           if(a.data.available < b.data.available) return -1;
           if(a.data.available > b.data.available) return 1;
           return 0;
         }); 
         this.available = 'true';
       }else{
         this.data.sort((a, b): any => {    
           if(a.data.available < b.data.available) return 1;
           if(a.data.available > b.data.available) return -1;
           return 0;
         }); 
         this.available = 'false';
       }
       break;
     }
 
       //available
       case 'inventary': {
       if(this.inventary == '' || this.inventary == 'false' ){
         this.data.sort((a, b): any => {          
           if(a.data.inventary < b.data.inventary) return -1;
           if(a.data.inventary > b.data.inventary) return 1;
           return 0;
         }); 
         this.inventary = 'true';
       }else{
         this.data.sort((a, b): any => {    
           if(a.data.inventary < b.data.inventary) return 1;
           if(a.data.inventary > b.data.inventary) return -1;
           return 0;
         }); 
         this.inventary = 'false';
       }
       break;
     }
 
 
    }    
   
   }



}
