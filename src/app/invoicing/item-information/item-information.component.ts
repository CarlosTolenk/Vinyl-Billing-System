import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import {Router, Params, ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-item-infomation',
  templateUrl: './item-information.component.html',
  styleUrls: ['./item-information.component.css']
})
export class ItemInformationComponent implements OnInit {

  constructor(
    private _location: Location,
    private _route: ActivatedRoute )
  {}

  ngOnInit() { }

  goPrevStep(){
    this._location.back();
   }






}

