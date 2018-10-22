export class FormData {
    fullName: string = '';
    address: string = '';
    phone: string = '';
    mobile: string = '';
    email: string = '';
    companyName: string = '';
    positionCompany: string = '';
    vinil:Array<any> = [];
    tape:Array<any> = [];
    design:Array<any> = [];

    clear(){
        this.fullName = '';
        this.address = '';
        this.phone = '';
        this.mobile = '';
        this.email = '';
        this.companyName = '';
        this.positionCompany = '';
        this.vinil = [];
        this.tape = [];
        this.design = [];
    }

}

export class BasicInformation{
    fullName: string = '';
    address: string = '';
    phone: string = '';
    mobile: string = '';
    email: string = '';
    companyName: string = '';
    positionCompany: string = '';
}

export class VinilInformation{
    name: string = '';
    description: string = '';  
    color: string = '';
    gain_per_inch: number;  
    quantity: number;
    price: number;
    dimension: {
      width: number;
      heigth: number;
    }    
}

export class TapeInformation{
    name: string = '';
    description: string = '';
    area:number;
    price:number;
}

export class DesingInformation{
    name: string = '';
    description: string = '';
    hour:number;
    minute:number;
    price:number;
}