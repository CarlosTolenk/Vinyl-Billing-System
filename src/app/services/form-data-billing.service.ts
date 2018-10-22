import { Injectable } from '@angular/core';
import { FormData, BasicInformation, VinilInformation, TapeInformation } from '../models/formData.model';


@Injectable({
  providedIn: 'root'
})
export class FormDataBillingService {

  private formData: FormData =  new FormData();
  private isBasicFormValid: boolean = false;
  private isVinilFormValid: boolean = false;
  private isDesignFormValid: boolean = false;
  private isItemFormValid: boolean = false;

  // constructor() { }

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
  }

  getFormData(): FormData{
     // Return the entire Form Data
    return this.formData;
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
      four: this.isItemFormValid,
    }
    return progress;
  }









}
