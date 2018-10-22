import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import {Router, Params, ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-design-information',
  templateUrl: './design-information.component.html',
  styleUrls: ['./design-information.component.css']
})
export class DesignInformationComponent implements OnInit {

  constructor(
    private _location: Location,
    private _route: ActivatedRoute )
  {}

  ngOnInit() { }

  goPrevStep(){
    this._location.back();
   }






}

