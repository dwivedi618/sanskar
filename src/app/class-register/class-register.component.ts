import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-class-register',
  templateUrl: './class-register.component.html',
  styleUrls: ['./class-register.component.css']
})


export class ClassRegisterComponent implements OnInit {
  userData: Object;

  constructor(
    private commonService: CommonService,
    public dialog: MatDialog ) { }

  ngOnInit(): void {
    // this.getUserData();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ClassRegisterComponent,{
      width:'50rem',
      minHeight:'50vh',
    
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // getUserData(){
  //   this.commonService.getUser().subscribe((result)=>{
  //     console.log("result userData",result);
  //     this.userData=result;
  //   },(error)=>{
  //     console.log("error userData",error);
  
  //   })
  // }

}

