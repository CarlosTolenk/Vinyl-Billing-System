import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import {Router, Params, ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-result-information',
  templateUrl: './result-information.component.html',
  styleUrls: ['./result-information.component.css']
})
export class ResultInformationComponent implements OnInit {

  constructor(
    private _location: Location,
    private _route: ActivatedRoute )
  {}

  ngOnInit() { }

  goPrevStep(){
    this._location.back();
   }






}

