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
   * Description placeholder
   * @date 05/02/2023
   * @author Shivam Dwivedi
   *
   * @param {JsonFormControls} field
   * @param {?Boolean} [shouldClearDependentFieldValue]
   * @returns {JsonFormControlOptions[]}
   */
  fetchValue(field: JsonFormControls,shouldClearDependentFieldValue ? : Boolean): JsonFormControlOptions[] {
    const { hitHttp, method,dependentControlName } = field;
    let shouldCallService: boolean = hitHttp && method ? true : false;
    if (!shouldCallService) return;
    if (!DYNAMIC_METHODS.includes(method)) {
      this.alertService.alertWithAction("METHOD NOT IMPLEMENTED", close);
      return
    }

    /**problem statement :  case 1 : on updating address , changing 'state' of india should clear its 'district' (child) */
    if(typeof shouldClearDependentFieldValue !== "undefined" && shouldClearDependentFieldValue ){
      field.actions.resetChildControls.forEach(controlName  => {
        this.form.get(controlName).setValue("");
      });
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
      const isValueChanged = field.value !== event.value ? true : false;
      const shouldClearDependentFieldValue = isValueChanged && field?.actions?.resetChildControls.length ? true : false;
      this.fetchValue(argField,shouldClearDependentFieldValue);
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