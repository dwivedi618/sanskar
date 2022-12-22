import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'feeFrequency'
})
export class FeeFrequencyPipe implements PipeTransform {
   feeFrequencyObj = {
    1: "MONTHLY",
    2: "BIMESTERLY",
    3: "QUARTERLY",
    4: "QUADRIMESTERLY",
    6: "HALF-YEARLY",
    12: "YEARLY"
  }

  transform(value: number , ...args: unknown[]): unknown {
    return value ? this.feeFrequencyObj[value] : value;
  }

}
