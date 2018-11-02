import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//Modal
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//Services
import { AjustesService } from '../../services/ajustes.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-vinils-products',
  templateUrl: './vinils-products.component.html',
  styleUrls: ['./vinils-products.component.css']
})
export class VinilsProductsComponent implements OnInit {

  public vinils: Observable<any[]>; 
  public ganancia_vinil:any;

  //Modal
  public addItem: any;
  public closeResult: string;
  public editItem: any;

  constructor(
    private _ajustesService: AjustesService,
    private _productsServices: ProductsService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {  
    this._ajustesService.getGanancia().subscribe((ganancia:any) => {
      this.ganancia_vinil = ganancia.ganancia_vinil;      
    });

   this.vinils = this._productsServices.getVinils().
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;      
        const id = a.payload.doc;        
        return {id, ...data};
      })
    );  

  }

  addVinils(){
   this.calIncome(this.addItem).then((resolve) => {
        this.addItem = resolve;    
        this._productsServices.addVinil(this.addItem);
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  calIncome(data){
    let item = data;
    const promise = new Promise((resolve, reject) => {
      let area = item.dimension.width * item.dimension.heigth
      console.log('AreaTotalVinil: ' + area);
      console.log('------------------------------');
      let cost_per_in = (item.cost / area);
      console.log('Costo x Inch ' +  cost_per_in);
      console.log('------------------------------');
      item.gain_per_inch =  (cost_per_in * (1+(this.ganancia_vinil/100))).toFixed(4);
      console.log('% Income x Inch ' + this.ganancia_vinil);
      console.log('Costo x Inch With Gain ' +  item.gain_per_inch);      

      if(item.gain_per_inch != 0){
        resolve(item);
      }else{
        reject(new Error('Hubo un error en el cálculo'))
      }     
    });
    return promise;
  }

  deteleOverhead(id){
    console.log(id);
    this._productsServices.deleteVinil(id);
  }

  editVinils(){
    this.calIncome(this.editItem).then((resolve) => {
     this.editItem = resolve;    
     this._productsServices.updateVinil(this.editItem);
  })
  .catch((error) =>{
    console.log(error);
  })
   
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
    console.log(this.vinils);
    this.addItem = {     
      name: '',
      description: '',
      cost: '',
      color: '',
      dimension: {
        width:'',
        heigth:''
      },
      gain_per_inch: 0
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

  ModalEditVinil(content, item){
    this.editItem = item;
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
