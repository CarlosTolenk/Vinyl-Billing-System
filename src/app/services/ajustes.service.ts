import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { fromTask } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AjustesService {


  constructor(
     private firestore: AngularFirestore   
    ) { }


    //Crea un nuevo plan
  //  public createPlan(data, id: string) {
  //   return this.firestore.collection('planes').doc(id).set(data);
  // }

  //Obtiene todos los planes
  public getAjustes() {
    return this.firestore.collection('ajustes').snapshotChanges();
  }

  public getGanancia() {
    return this.firestore.collection('ajustes').doc('ganancia').valueChanges();
  }

  public updateGanancia(data: any){
    return this.firestore.collection('ajustes').doc('ganancia').set({
      ganancia_vinil: data
    });
  }

  public getOverhead() {
    return this.firestore.collection('ajustes').doc('overhead').valueChanges();
  }

  public updateOverhead(data: any){
    return this.firestore.collection('ajustes').doc('overhead').set({
      overheader: data
    });
  }

  public addOverhead(data: any){
    return this.firestore.collection('ajustes').doc('overhead').set({
      overheader: data
    });
  }

  // public totalOverhead = async() => {    
  // this.getOverhead().subscribe((data:any)=>{
  //      let total = 0;   
  //       for(let i=0; i<data.overheader.length; i++){
  //         console.log(i);
  //       }
  //       return total;
  //   });    
  // }


  

  // //Obtiene un plan en específico
  // public getPlan(documentId: string) {
  //   return this.firestore.collection('planes').doc(documentId).snapshotChanges();
  // }

  //Actualiza un plan
  // public updatePlan(documentId: string, data: any) {
  //   return this.firestore.collection('planes').doc(documentId).set(data.ganancia_vinil);
  // }

  //Eliminar un Plan
  // public deleteCat(documentId) {
  //   this.firestoreService.deleteCat(documentId).then(() => {
  //     console.log('Documento eliminado!');
  //   }, (error) => {
  //     console.error(error);
  //   });
  // }

  //Eliminar plan existente
  public deletePlan(documentId: string){
    return this.firestore.collection('planes').doc(documentId).delete();
  }
}

