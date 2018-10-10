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


  //Vinils
  public getVinils() {
   return this.firestore.collection('vinils').snapshotChanges();
  }

  //Add vinil
  public addVinil(data) {
    return this.firestore.collection('vinils').add(data);
  }
  //Delete Vinil
  public deleteVinil(id) {
    return this.firestore.collection('vinils').doc(id).delete();
  }

  public updateVinil(data){
    return this.firestore.collection('vinils').doc(data.id).update(data);
  }




}


