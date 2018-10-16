import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-invoicing',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.css']
})
export class BasicInformationComponent implements OnInit {

  constructor(private router: Router, )
  {}

  ngOnInit() { }

  GoNextStep(){
    this.router.navigate(['billing/vinil-information']); 
  }






}

