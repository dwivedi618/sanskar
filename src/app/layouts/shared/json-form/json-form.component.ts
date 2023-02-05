import { Component, OnInit, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges, Output, EventEmitter, AfterViewInit, AfterViewChecked } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DYNAMIC_METHODS } from 'src/app/admission/dropdown.methods';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { ButtonType, JsonFormService } from 'src/app/services/json-form.service';
import { Field, JsonFormControlOptions, JsonFormControls, JsonFormControlsMethod, JsonFormData, OptionsActions } from './json-from.types';

@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.scss'],
})
export class JsonFormComponent implements OnChanges, OnInit {
  @Input() public formFields: JsonFormData;
  @Input() public ngClass: string = 'json-form';

  @Output() onSubmit = new EventEmitter();
  form: FormGroup = this.fb.group({});
  isFormLoading :boolean = true;
  constructor(
    private fb: FormBuilder,
    private jsonFormService: JsonFormService,
    private alertService: AlertService,
    public commonService: CommonService
  ) { }

  ngOnInit(): void {
    // this.jsonFormService.formButton.subscribe(buttonState => { 
    //   console.log("buttonState",buttonState);
    //   if(!buttonState.isClicked) return;
    //   if(buttonState.type === 'reset'){
    //     this.form.reset();
    //     this.jsonFormService.clickFormButton({type : 'reset',isClicked :false})

    //   }
    //   if(buttonState.type === 'submit'){
    //     this.onFormSubmit();
    //     this.jsonFormService.clickFormButton({type : 'submit',isClicked :false})
    //   }
    //  })
    setTimeout(()=>{
      this.isFormLoading =false;
    },1000)
    this.form = this.formFields && this.jsonFormService.createForm(this.formFields?.controls);
    console.log(" this.form", this.form)

  }
  ngOnChanges(changes: SimpleChanges) {
    if (!changes.formFields.firstChange) {
      this.form = this.formFields && this.jsonFormService.createForm(this.formFields?.controls);
    console.log(" this.form ngOnChanges", this.formFields)

  
    }
  }


/**
 * It fetches the value of the field from the server if the field has the `hitHttp` property set to
 * true
 * @param {JsonFormControls} field - JsonFormControls - This is the field object that is passed to the
 * function.
 * @returns 1. If the method is not implemented, it returns an alert.
 *   2. If the method is implemented, it returns the value of the field.
 */
  fetchValue(field: JsonFormControls ): JsonFormControlOptions[] {
    const { hitHttp, method,dependentControlName } = field;
    let shouldCallService: boolean = hitHttp && method ? true : false;
    if (!shouldCallService) return;
    if (!DYNAMIC_METHODS.includes(method)) {
      this.alertService.alertWithAction("METHOD NOT IMPLEMENTED", close);
      return
    }
    field.value = dependentControlName ? this.form.get(field.dependentControlName).value : field.value;
    return this.commonService[field.method](field);
  }

  /**
   * It takes the event and field as arguments and then checks if the field has the actions property
   * and if it has the onSelect property and if it has the hitHttp, method and ctrlId properties. If
   * all of these are true, then it creates a new object called argField and assigns the values of the
   * field to it. It then calls the fetchValue function with the argField as the argument
   * @param event - { source: any, value: any }
   * @param {JsonFormControls} field - JsonFormControls - The field object that is being passed to the
   * function.
   */
  onSelectOption(event: { source: any, value: any }, field: JsonFormControls) {
    let actions = field?.actions as OptionsActions;
    const { hitHttp , method , ctrlId } = actions && actions?.onSelect || {};
    if (hitHttp && method && ctrlId) {
      const argField: JsonFormControls = {
        ...field,
        hitHttp: hitHttp,
        method: method,
        value: event.value,
        ctrlId : ctrlId
      }
      this.fetchValue(argField);
    }
  }

  onFormSubmit(){
    if(this.form.invalid) return;
    this.onSubmit.emit(this.form.getRawValue());
  }

  onImageSelect(image, formFieldName) {
    this.form.patchValue({ [formFieldName]: image });
  }

}