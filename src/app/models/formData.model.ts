export class FormData {
    ref:string = '';
    fullName: string = '';
    date: any;
    address: string = '';
    phone: string = '';
    mobile: string = '';
    email: string = '';
    companyName: string = '';
    positionCompany: string = '';
    vinil:Array<any> = [];
    tape:Array<any> = [];
    design:Array<any> = [];
    items:Array<any> = [];
    subtotal:number = 0;
    overhead:number = 0;
    total:number = 0;

    clear(){
        this.ref = '';
        this.fullName = '';
        this.date = '';
        this.address = '';
        this.phone = '';
        this.mobile = '';
        this.email = '';
        this.companyName = '';
        this.positionCompany = '';
        this.vinil = [];
        this.tape = [];
        this.items = [];
        this.subtotal = 0;
        this.overhead = 0;
        this.total = 0;
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
    width:number;
    height:number;
}

export class DesingInformation{
    name: string = '';
    description: string = '';
    hour:number;
    minute:number;
    price:number;
}

export class ItemsInformation{
    name: string = '';
    description: string = '';
    cost:number;
    quality:number;
    price:number;
}