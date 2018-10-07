import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { AjustesService } from '../services/ajustes.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent implements OnInit {
  //Firabase Item
  public items:any;
  public ganancia_vinil: any;


  constructor( private _ajustesService: AjustesService) {
    this._ajustesService.getGanancia().subscribe((ganancia:any) => {
      this.ganancia_vinil = ganancia.ganancia_vinil;  
    });
    this._ajustesService.getOverhead().subscribe((data:any)=>{
      this.items  = data.overheader;
      console.log(this.items);    
    })

  }

  ngOnInit() {

   
  }

  onSubmiteGain(){
    console.log(this.ganancia_vinil)
      this._ajustesService.updateGanancia(this.ganancia_vinil);
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