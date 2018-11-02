import { Component, OnInit, DoCheck } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, Params, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { map, max } from 'rxjs/operators';

//Modal
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//Services
import { ProductsService } from '../../services/products.service';
import { FormDataBillingService } from '../../services/form-data-billing.service';



@Component({
  selector: 'app-invoicing',
  templateUrl: './vinil-information.component.html',
  styleUrls: ['./vinil-information.component.css']
})
export class VinilInformationComponent implements OnInit, DoCheck {

  public withVinil:boolean = false;
  public withoutVinil:boolean = false;  
  public VinilAplication:boolean = false;  
  public vinils: Observable<any[]>; 
  public selectedValue:any;
  public addVinil:Array<any> = [];
  public addTape:any;
  public changeIndex:number = 0;
  public changeTapeApp:boolean = false;
  

  //Modal
  public addItem: any = [];
  public closeResult: string;

  constructor(
    private _location: Location,
    private _route: ActivatedRoute,
    private router: Router,
    private _productsServices: ProductsService,
    private modalService: NgbModal,
    private formDataService: FormDataBillingService
   )
  {
    this.withoutVinil = false;
    this.addTape = {
      name: 'Tape',
      description: 'Application Paper for Vinyl',
      area: 0,
      width:0,
      heigth:0,
      gain_per_inch:0,
      quantity:0,
      price:0
    }
  }

  ngOnInit() {
    this.addVinil = this.formDataService.getVinilInformation();
        
    this.vinils = this._productsServices.getVinils().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
   }

  ngDoCheck(){
    let index = this.addVinil.length; 
    if(this.VinilAplication){
      // this.changeApl = this.addVinil.length;
      if(index != this.changeIndex){
        this.changeTapeApp = true;
        if(this.changeTapeApp){
          // console.log('Activado para hacer el papel de vinil');
          this.calAreaPriceTape().then((resolve) => {
            if(resolve){  
              this.addTape.area = this.addTape.width * this.addTape.heigth * this.addTape.quantity;
              if(this.addTape.area < 100){
                this.addTape.price = (this.addTape.area * this.addTape.gain_per_inch * 10).toFixed(2);
              }
              if(this.addTape.area > 100 && this.addTape.area < 1000){
                this.addTape.price = (this.addTape.area * this.addTape.gain_per_inch * 5).toFixed(2);
              }

              if(this.addTape.area >= 1000){
                this.addTape.price = (this.addTape.area * this.addTape.gain_per_inch * 1.5).toFixed(2);
              }
            
              console.log(this.addTape);
            }
          })
          .catch((error) =>{
            console.log(error);
            // console.log("EWrrroo");
          })  
          this.changeIndex = this.addVinil.length;
          this.changeTapeApp = false;     
        }
   
      }   
    }else{
      // console.log("Se fue la lux");
    }
  }

  addVinils(){ 
    let width =  this.addItem.dimension.width;
    let heigth = this.addItem.dimension.heigth;
    let quantity = this.addItem.quantity
 
    this.addItem = {   
      name: this.selectedValue.name,
      description: this.selectedValue.description,  
      color: this.selectedValue.color,
      gain_per_inch: this.selectedValue.gain_per_inch,   
      quantity,
      dimension: {
        width,
        heigth
      }   
    };

    this.calAreaPrice(this.addItem).then((resolve) => {
      this.addItem = resolve;       
      this.addVinil.push(this.addItem);
      console.log(this.addVinil);
      })
    .catch((error) =>{
      console.log(error);
    })    

  }

  calAreaPrice(data){
    let item = data;
    const promise = new Promise((resolve, reject) => {
      let area = item.dimension.width * item.dimension.heigth
      console.log('AreaTotalVinil: ' + area);
      console.log('------------------------------');
      item.price = item.gain_per_inch * area * item.quantity;
      if( item.price != 0){
        resolve(item);
      }else{
        reject(new Error('Hubo un error en el cálculo'))
      }     
    });
    return promise;
  }

  calAreaPriceTape(){     
    const promise =  new Promise((resolve, reject) => { 
      this.addTape = {
        name: 'Tape',
        description: 'Application Paper for Vinyl',
        area: 0,
        width:0,
        heigth:0,
        quantity:0,
        gain_per_inch:0,
        price:0
      }     
      for(let i=0; i<this.addVinil.length; i++){   
        let color_search = this.addVinil[i].color.toLowerCase();     
        if(color_search.includes('htv')){             
          this.addTape.width += this.addVinil[i].dimension.width + 2;    
          this.addTape.heigth += this.addVinil[i].dimension.heigth +1;
          this.addTape.quantity += this.addVinil[i].quantity;      
          // this.addTape.area += this.addTape.width * this.addTape.heigth * this.addTape.quantity;
          this.addTape.gain_per_inch += (this.addVinil[i].gain_per_inch/100);
          // this.addTape.price = this.addTape.gain_per_inch * this.addTape.area;    
        }       
      } 

        if(this.addTape.heigth > 0){
          // console.log(this.addTape);
          resolve(true);
        }else{
          reject(new Error('Hubó un error en los cálculos'));
        }

   
        // this.maxHightVinil().then((maxH) => {
        //   this.addTape.heigth = maxH;
        //   if(this.addTape.heigth > 0){
        //     // console.log(this.addTape);
        //     resolve(true);
        //   }
        // })
        // .catch((error) =>{
        //   console.log(error);
        //   reject(new Error('Hubó un error en los cálculos'));
        // })     

        // this.maxQualityVinil().then((maxQ) => {
        //   this.addTape.quantity = maxQ;
        //   if(this.addTape.quantity > 0){
        //     // console.log(this.addTape);
        //     resolve(true);
        //   }
        // })
        // .catch((error) =>{
        //   console.log(error);
        //   reject(new Error('Hubó un error en los cálculos'));
        // })  

    });
    return promise;

  }

  // maxHightVinil(){
  //   const promise =  new Promise((resolve, reject) => { 
  //    let maxH = this.addVinil[0].dimension.heigth;     
  //     for(let i=1; i<this.addVinil.length; i++){
  //       let color_search = this.addVinil[i].color.toLowerCase();    
  //       if(color_search.includes('htv')){      
  //         if(maxH <= this.addVinil[i].dimension.heigth){
  //           maxH = this.addVinil[i].dimension.heigth;
  //           console.log(maxH);
  //         }
  //       }
  //     }
  //     if(maxH > 0){
  //       resolve(maxH +1)
  //     }else{
  //       reject(new Error('Hubó un error en los cálculos de altura'));
  //     }     
  //   });

  //   return promise;
  // } 

  // maxQualityVinil(){
  //   const promise =  new Promise((resolve, reject) => { 
  //     let maxQ = this.addVinil[0].quantity;     
  //      for(let i=1; i<this.addVinil.length; i++){
  //        let color_search = this.addVinil[i].color.toLowerCase();    
  //        if(color_search.includes('htv')){      
  //          if(maxQ < this.addVinil[i].quantity){
  //           maxQ = this.addVinil[i].quantity;
  //            console.log(maxQ);
  //          }
  //        }
  //      }
  //      if(maxQ > 0){
  //        resolve(maxQ)
  //      }else{
  //        reject(new Error('Hubó un error en los cálculos de altura'));
  //      }     
  //    });
 
  //    return promise;
  // }

  deteleVinil(i){
    if(i == 0){
      this.addVinil.splice(i, i+1);
    }else{
      this.addVinil.splice(i, i);
    }
  }

  savaData(): boolean {
    // if(){
    //   return false;
    // }
    if(this.addTape.length != 0 ){
      this.formDataService.setVinilInformation(this.addVinil, this.addTape);
    }else{
      this.formDataService.setVinilInformation(this.addVinil, []);
    }
   
    // console.log(this.basicInformation);
    return true;
  }

  goPrevStep(){
    this.router.navigate(['billing/basic-information']); 
  }

   goNextStep(){
    if(this.savaData()){
      //Navigate to the vinil component
      this.router.navigate(['billing/desing-information']); 
     }
   
  }

  public onWithVinilSelectedChanged(value:boolean){
    this.withVinil = value;
    this.withoutVinil = !value;
  }

  public onWithoutVinilSelectedChanged(value:boolean){
    this.withoutVinil = value;
    this.withVinil = !value;
  }
  public onVinilAplicationChanged(value:boolean){
    this.VinilAplication = value;
   
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

  ModalAddOverhead(content){ 
    this.addItem = {   
      name: '',
      description: '',  
      color: '',
      quantity: 1,
      dimension: {
        width:'',
        heigth:''
      }   
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

