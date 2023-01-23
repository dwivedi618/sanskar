import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'label'
})
export class LabelPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if(!value) return
    // camelcase
    let label = value.replace(/([A-Z])/g, " $1");

    //unserscode
    // value.replace(/ /g,"_");
    //dash

    return label;
  }

}
