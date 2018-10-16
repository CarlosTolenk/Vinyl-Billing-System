import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { fromTask } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private firestore: AngularFirestore ) { }


  /************************************
   ************ VINILS*  **************/ 
  
       
  //Get Vinil
  public getVinils() {
   return this.firestore.collection('vinils').snapshotChanges();
  }
  //Add Vinil
  public addVinil(data) {
    return this.firestore.collection('vinils').add(data);
  }
  //Delete Vinil
  public deleteVinil(id) {
    return this.firestore.collection('vinils').doc(id).delete();
  }
  //Update Vinil
  public updateVinil(data){
    return this.firestore.collection('vinils').doc(data.id).update(data);
  }


   /************************************
   ************* ITEMS *****************/ 
  public getItems() {
    return this.firestore.collection('items').snapshotChanges();
  }

  public addItem(data){
   return this.firestore.collection('items').add(data);
  }

  public getItem(id){
    return this.firestore.collection('items').doc(id).snapshotChanges();    
  }

  public updateItem(id, data){
    return this.firestore.collection('items').doc(id).update(data);
  }

  public deleteItem(id){
   return this.firestore.collection('items').doc(id).delete();
  }







}


