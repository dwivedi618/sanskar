import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,} from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  payment : FormGroup;
  data = [null];
  constructor(
    private fb:FormBuilder,
    private alertService : AlertService,

  ) { }

  ngOnInit() {
    this.payment = this.fb.group({
      paymentFor:[],
      amount:[],
      paymentDate :[],
    })
  }
 submitPayment(){
   
   console.log("submit clicked");
   console.log("form Data",this.payment.value);
   this.data = this.payment.value;
   this.alertService.alert("payment Submitted","done");

 }
}
