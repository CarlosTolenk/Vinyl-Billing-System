import { Injectable } from '@angular/core';
import { FormData, BasicInformation, VinilInformation, TapeInformation } from '../models/formData.model';

//Services
import { AjustesService } from './ajustes.service';


@Injectable({
  providedIn: 'root'
})
export class FormDataBillingService {

  private formData: FormData =  new FormData();
  private isBasicFormValid: boolean = false;
  private isVinilFormValid: boolean = false;
  private isDesignFormValid: boolean = false;
  private isItemFormValid: boolean = false;
  private subTotal:number = 0;
  private overhead:number;

  constructor(private _ajustesService: AjustesService) 
  {
    this._ajustesService.getGanancia().subscribe((ganancia:any) => {
      this.overhead = ganancia.percentOverhead/100;      
    });
  }

  getBasicInformation(): BasicInformation{
    //Return the Basic Information
 
    let basicInformation = {
      fullName: this.formData.fullName,      
      address: this.formData.address,
      phone: this.formData.phone,
      mobile: this.formData.mobile,
      email: this.formData.email,
      companyName: this.formData.companyName,
      positionCompany: this.formData.positionCompany
    };
    return basicInformation;
  }

  setBasicInformation(data: BasicInformation){
    // Update the Personal data only when the Personal Form had been validated successfully  
    this.isBasicFormValid = true;
    this.formData.fullName = data.fullName;
    this.formData.address = data.address; 
    this.formData.phone = data.phone;
    this.formData.mobile = data.mobile;
    this.formData.email = data.email;
    this.formData.companyName = data.companyName;
    this.formData.positionCompany = data.positionCompany;
  }

  getVinilInformation(){
    //Return the Vinil Information
    let vinilInformation = this.formData.vinil;
    return vinilInformation;
  }

  setVinilInformation(vinil, tape){
   // Update the Personal data only when the Vinil Form had been validated successfully
   this.isVinilFormValid = true;
   this.formData.vinil = vinil;
   this.formData.tape = tape;
   this.CalSubTotal(vinil);
   this.CalSubTotal(tape);
  }

  getDesignInformation(){
    //Return the Vinil Information
    let designInformation = this.formData.design;
    return designInformation;
  }

  setDesignInformation(design){
   // Update the Personal data only when the Vinil Form had been validated successfully
   this.isDesignFormValid = true;
   this.formData.design = design;
   this.CalSubTotal(design);
  }

  getItemsInformation(){
    //Return the Vinil Information 
    let itemsInformation = this.formData.items;   
    return itemsInformation;
  }

  setItemsInformation(items){
    //Return the Vinil Information
    this.generateRef();
    this.isItemFormValid = true;
    this.formData.items = items;
    this.CalSubTotal(items);
  }

  generateRef(){
    let fulldate = new Date();
    let date =  `${fulldate.getMonth()+1}-${fulldate.getDate()}-${fulldate.getFullYear()}`;
    var type = '00';  
    let random = (Math.random() * (99 - 10) + 5).toFixed(0);

    if(this.formData.vinil.length > 0) type = '01';
    if(this.formData.design.length > 0) type = '02';
    if(this.formData.vinil.length > 0 && this.formData.design.length > 0) type = '03';

    this.formData.date = date;
    this.formData.ref = `${type}-${fulldate.getMonth()+1}${fulldate.getDate()}${fulldate.getUTCFullYear() -2000}${random}`;
    
    
  }

  getFormData(): FormData{
     // Return the entire Form Data
    return this.formData;
  }

  CalSubTotal(total_item){    
    this.subTotal = 0;
    if(total_item.length > 0){
     for(let i=0; i<total_item.length; i++){
        this.subTotal += (total_item[i].price * (1+this.overhead));
     }
    }
    this.formData.subtotal += this.subTotal;
    // this.formData.overhead =  this.formData.subtotal * this.overhead;
    // this.formData.total =  this.formData.subtotal + this.formData.overhead;
    this.formData.total =  this.formData.subtotal 
  }

  resetFormData(): FormData {
    // Return the form data after all this.* members had been reset
    this.formData.clear();
    this.isBasicFormValid = this.isVinilFormValid = this.isDesignFormValid = this.isItemFormValid = false;
    return this.formData;
  }

  isFormValid(){
    return this.isBasicFormValid && this.isVinilFormValid && this.isDesignFormValid && this.isItemFormValid;
  }

  isProgress(){
    let progress  = {
      first: this.isBasicFormValid,
      second: this.isVinilFormValid,
      third: this.isDesignFormValid,
      fourth: this.isItemFormValid,
    }
    return progress;
  }









}
