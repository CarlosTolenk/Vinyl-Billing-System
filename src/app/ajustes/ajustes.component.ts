import { Component, OnInit } from '@angular/core';
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
export class AjustesComponent implements OnInit {
  //Firabase Item
  public items:any;
  public ganancia_vinil: any;
    //Modal
  closeResult: string;
  public itemDetail;
  public addItem: any
  public totalOverhead:any;



  constructor( 
    private _ajustesService: AjustesService,
    private modalService: NgbModal
  )
  {}

  ngOnInit() {
    this._ajustesService.getGanancia().subscribe((ganancia:any) => {
      this.ganancia_vinil = ganancia.ganancia_vinil;  
    });
    this._ajustesService.getOverhead().subscribe((data:any)=>{
      this.items = data.overheader;
      this.calOverhead(this.items);

    });   
  }

  onSubmiteGain(){
    console.log(this.ganancia_vinil)
      this._ajustesService.updateGanancia(this.ganancia_vinil);
  }

  calOverhead(items){
    this.totalOverhead = 0;
    for(let i=0; i < items.length; i++){
      this.totalOverhead += parseFloat(items[i].cost);
    
      console.log(this.totalOverhead);
    }  
  }

  ModalViewOverhead(content, index){
    console.log(index)
    this.itemDetail = [];
    this.itemDetail = {
      index,
      name: this.items[index].name,
      description: this.items[index].description,
      cost: this.items[index].cost
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  updateOverhead(){
  //  console.log(this.itemDetail);
   this.items[this.itemDetail.index] = this.itemDetail;
   this._ajustesService.updateOverhead(this.items);
  }

  addOverhead(){
    // console.log(this.addItem);
    this.items.push(this.addItem);
    this._ajustesService.addOverhead(this.items);
  }

  deteleOverhead(index){   
    this.items.splice(index, index+1)
    this._ajustesService.updateOverhead(this.items);   
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