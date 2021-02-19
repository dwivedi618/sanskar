import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-feestructure',
  templateUrl: './feestructure.component.html',


  styleUrls: ['./feestructure.component.scss']
})
export class FeestructureComponent implements OnInit {

  // feeStructureForm : FormGroup;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
    
  }

}
