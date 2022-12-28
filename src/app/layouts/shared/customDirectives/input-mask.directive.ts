import { Directive, HostListener, ElementRef, Input, Renderer2 } from '@angular/core';
import { PATTERNS as PATTERNS } from 'src/app/utils/patterns.validators';

@Directive({
  selector: '[appInputMask]'
})
export class InputMaskDirective {
  @Input('appInputMask') inputType: string;

  showMsg = false;
  pattern: RegExp;
  private regexMap = PATTERNS;

  constructor(public el: ElementRef, public renderer: Renderer2) { };

  @HostListener('keypress', ['$event']) onInput(e) {
    console.log("this.inputType",this.inputType)
    this.pattern = this.regexMap[this.inputType]
    console.log("this.pattern",this.pattern)
    const inputChar = e.key;
    //this.pattern.lastIndex = 0; // dont know why but had to add this

    if (this.pattern.test(inputChar)) {
      // success
      this.renderer.setStyle(this.el.nativeElement, 'color', 'green');
      this.badBoyAlert('black');
    } else {

      this.badBoyAlert('black');
      //do something her to indicate invalid character
      this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
      e.preventDefault();

    }

  }
  badBoyAlert(color: string) {
    setTimeout(() => {
      this.showMsg = true;
      this.renderer.setStyle(this.el.nativeElement, 'color', color);
    }, 2000)
  }

}