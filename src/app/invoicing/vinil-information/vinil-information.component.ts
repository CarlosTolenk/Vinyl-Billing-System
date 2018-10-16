import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import {Router, Params, ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-invoicing',
  templateUrl: './vinil-information.component.html',
  styleUrls: ['./vinil-information.component.css']
})
export class VinilInformationComponent implements OnInit {

  constructor(
    private _location: Location,
    private _route: ActivatedRoute )
  {}

  ngOnInit() { }

  goPrevStep(){
    this._location.back();
   }






}

