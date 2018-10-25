import { Component, OnInit, DoCheck } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AjustesService } from '../services/ajustes.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent implements OnInit, DoCheck {
  //Firabase Item
  public direct:any;
  public indirect:any;
  public ganancia_vinil: any;
  public ganancia_hour: any;
  public ganancia_avg:any;
  public ganancia_overhead:any;
    //Modal
  public closeResult: string;
  public itemDetail;
  public itemDetail2;
  public addItem: any;  
  public totalOverhead:any;
  public totalOverheadInd:any;
  //Total
  public totalIncome:any;
  public totalExpense:any;
  public percentOverhead:any;
  public percentPerHour:any;



  constructor( 
    private _ajustesService: AjustesService,
    private modalService: NgbModal
  )
  {}

  ngOnInit() {
    this._ajustesService.getGanancia().subscribe((ganancia:any) => {
      this.ganancia_vinil = ganancia.ganancia_vinil;  
      this.ganancia_hour = ganancia.ganancia_hour;
      this.ganancia_avg = ganancia.ganancia_avg;
      this.ganancia_overhead = ganancia.ganancia_overhead;
    
    });
    this._ajustesService.getOverhead().subscribe((data:any)=>{
      this.direct = data.direct;
      this.indirect = data.indirect;
      this.calOverhead(this.direct);
      this.calOverheadInd(this.indirect);
      this.calPerOverhead();
      this.calTotalExpense();

     
      

    });   
  }

  ngDoCheck(){
    this.calTotalIncome();
    this.calPerHour();
  }

  calPerOverhead(){
    this.percentOverhead = ((this.totalOverhead.toFixed(2)/this.totalOverheadInd.toFixed(2))*100).toFixed(2);
    console.log(this.percentOverhead);
  }

  calTotalExpense(){
    this.totalExpense = (this.totalOverheadInd + this.totalOverhead).toFixed(2);
  }
  
  calTotalIncome(){
    this.totalIncome = (this.ganancia_avg -  this.totalExpense).toFixed(2);
  }

  calPerHour(){
    let percent = (this.ganancia_hour/100) + 1;
    this.percentPerHour = ((this.totalOverheadInd  / 200)* percent).toFixed(2);
  }

  onSubmiteGain(){   
    this._ajustesService.updateGanancia({
      ganancia_vinil: this.ganancia_vinil,
      ganancia_hour: this.ganancia_hour,
      ganancia_avg: this.ganancia_avg,
      ganancia_overhead: this.ganancia_overhead,
      work_hour: this.percentPerHour,
      percentOverhead: this.percentOverhead,
    });
  }
 
  calOverhead(items){
    this.totalOverhead = 0;
    for(let i=0; i < items.length; i++){
      this.totalOverhead += parseFloat(items[i].cost);
    
      // console.log(this.totalOverhead);
    }  
  }

  calOverheadInd(items){
    this.totalOverheadInd = 0;
    for(let i=0; i < items.length; i++){
      this.totalOverheadInd += parseFloat(items[i].cost);    
      // console.log(this.totalOverheadInd);
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

  ModalAddOverhead(content){     
    this.addItem = {     
      name: '',
      description: '',
      cost: ''
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

  //Direct

  ModalViewOverhead(content, index){
    console.log(index)
    this.itemDetail = [];
    this.itemDetail = {
      index,
      name: this.direct[index].name,
      description: this.direct[index].description,
      cost: this.direct[index].cost
    }
    // this.itemDetail = item;
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );  
  } 

  updateOverhead(){
   this.direct[this.itemDetail.index] = this.itemDetail;
   this._ajustesService.updateOverhead({
      direct: this.direct,
      indirect: this.indirect
    });
  }

  addOverhead(){ 
    this.direct.push(this.addItem);
    this._ajustesService.addOverhead({
     direct: this.direct,
     indirect: this.indirect
   });
  }  

  deteleOverhead(index){   
    this.direct.splice(index, index+1)
     this._ajustesService.updateOverhead({
      direct: this.direct,
      indirect: this.indirect
    });  
  }

  //Indirect

  ModalViewOverheadIn(contentIn, index){
    console.log(index)
    this.itemDetail2 = [];
    this.itemDetail2 = {
      index,
      name: this.indirect[index].name,
      description: this.indirect[index].description,
      cost: this.indirect[index].cost
    }
    // this.itemDetail = item;
    this.modalService.open(contentIn).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );  
  } 

  updateOverheadIn(){
    this.indirect[this.itemDetail2.index] = this.itemDetail2;
    this._ajustesService.updateOverhead({
      direct: this.direct,
      indirect: this.indirect
    });
   }
 
   addOverheadIn(){ 
     this.indirect.push(this.addItem);
     this._ajustesService.addOverhead({
      direct: this.direct,
      indirect: this.indirect
    });
   }
 
   deteleOverheadIn(index){   
     this.indirect.splice(index, index+1)
     this._ajustesService.updateOverhead({
      direct: this.direct,
      indirect: this.indirect
    });  
   }






}


//4320 = 11.99
//1 = x 
/*

Variables de Ajustes
  --Lista de Productos Vinil
  **Nombre    **Descripcion     **Dimesiones      **Color         **Precio Unitario           **Precio pulˆ2 * 200%
    Vinil         D-Cal            24*180          Blanco             USD$11.99               0.5551 + %15  = 0.63864



    --Lista de Productos Item
    **Nombre   **Descripcion   **Precio  


    -- Facturación de material gastable
    **Papel de trasferencia  (Cal Vinil)             
    **Papel de Sublimación  (Precio Unitario)
    _______________________________________________( Gasto )


    -- Facturación de otros item de forma manual en el formulario.





    0.000345

    38 * 2.18 = 82.84

    52.90usd + gastable 

    0.30406 usd + hora de trabajo(10min)

    2.30406 + overhead

    2.649669 







 


  -- Casilla de Overhead
   Digitar un número

  -- Casilla de Horas Trabajas
  Digitar lo que cuesta en hora

  -- Casilla de Instalación
  Digitar lo que cuesta en hora

  -- Casilla de descuento en el formulario para la facturación
  -- Casilla de los taxes









*/