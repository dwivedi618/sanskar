import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): number {
    if(!value) return
    const dob = new Date(value);  
    //calculate month difference from current date in time  
    const month_diff = Date.now() - dob.getTime();  
      
    //convert the calculated difference in date format  
    const age_dt = new Date(month_diff);   
      
    //extract year from date      
    const year = age_dt.getUTCFullYear();  
      
    //now calculate the age of the user  
    const age = Math.abs(year - 1970);  
      
    //display the calculated age  
    return age;
  }

}
