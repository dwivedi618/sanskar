import { Component, OnInit, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges, Output, EventEmitter, AfterViewInit, AfterViewChecked } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DYNAMIC_METHODS } from 'src/app/admission/dropdown.methods';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { ButtonType, JsonFormService } from 'src/app/services/json-form.service';
import { JsonFormControlOptions, JsonFormControls, JsonFormData, OptionsActions } from '../json-form/json-from.types';

@Component({
  selector: 'app-json-form-array',
  templateUrl: './json-form-array.component.html',
  styleUrls: ['./json-form-array.component.scss']
})

export class JsonFormArrayComponent implements OnChanges, OnInit {
  @Input() public formArrayFields: JsonFormData[];
  @Input() public ngClass: string = 'json-form';

  @Output() onSubmit = new EventEmitter();
  form = this.fb.array([]);
  isFormLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private jsonFormService: JsonFormService,
    private alertService: AlertService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isFormLoading = false;
    }, 1000)
    
    
    this.formArrayFields && this.formArrayFields.forEach(async (formFields: JsonFormData) => {
      let formGroup = formFields && await this.jsonFormService.asyncCreateForm(formFields?.controls);
      formGroup && this.form.push(formGroup);
    });
    
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("formArrayFields::shared",this.formArrayFields)
    
    if (!changes.formArrayFields.firstChange) {
      this.formArrayFields && this.formArrayFields.forEach(async (formFields: JsonFormData) => {
        let formGroup =formFields && await this.jsonFormService.asyncCreateForm(formFields?.controls);
        formGroup && this.form.push(formGroup);

      });

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
  fetchValue(field: JsonFormControls): JsonFormControlOptions[] {
    const { hitHttp, method, dependentControlName } = field;
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
    const { hitHttp, method, ctrlId } = actions && actions?.onSelect || {};
    if (hitHttp && method && ctrlId) {
      const argField: JsonFormControls = {
        ...field,
        hitHttp: hitHttp,
        method: method,
        value: event.value,
        ctrlId: ctrlId
      }
      this.fetchValue(argField);
    }
  }

  onFormSubmit() {
    // if (this.form.invalid) return;
    this.onSubmit.emit(this.form.getRawValue());
  }

  onImageSelect(image, formFieldName) {
    // fix this
    // this.form.patchValue({ [formFieldName]: image });
  }

}