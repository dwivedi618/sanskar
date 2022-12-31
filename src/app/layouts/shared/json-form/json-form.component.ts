import { Component, OnInit, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DYNAMIC_METHODS } from 'src/app/admission/dropdown.methods';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { JsonFormService } from 'src/app/services/json-form.service';
import { Field, JsonFormControlOptions, JsonFormControls, JsonFormControlsMethod, JsonFormData, OptionsActions } from './json-from.types';

@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonFormComponent implements OnChanges, OnInit {
  @Input() formFields: JsonFormData;
  @Output() onSubmit = new EventEmitter();
  form: FormGroup = this.fb.group({});
  constructor(
    private fb: FormBuilder,
    private jsonFormService: JsonFormService,
    private alertService: AlertService,
    private commonService: CommonService
  ) { }
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!changes.formFields.firstChange) {
      this.form = this.jsonFormService.createForm(this.formFields.controls);
    }
  }


  fetchValue(field: JsonFormControls ): JsonFormControlOptions[] {
    const { name ,hitHttp, method,dependentControlName } = field;
    let shouldCallService: boolean = hitHttp && method ? true : false;
    if (!shouldCallService) return;
    if (!DYNAMIC_METHODS.includes(method)) {
      this.alertService.alertWithAction("METHOD NOT IMPLEMENTED", close);
      return
    }
    field.value = dependentControlName ? this.form.get(field.dependentControlName).value : '';
    console.log("fetching data for",field.method+field.ctrlId);
    return this.commonService[field.method](field);
  }

  onSelectOption(event: { source: any, value: any }, field: JsonFormControls) {
    let actions: OptionsActions = field.actions;
    console.log(actions?.onSelect?.method, event)
    if (actions && actions?.onSelect && actions?.onSelect?.hitHttp && actions?.onSelect?.method) {
      const argField: JsonFormControls = {
        ...field,
        hitHttp: actions.onSelect.hitHttp,
        method: actions.onSelect.method,
        value: event.value,
        ctrlId : actions.onSelect.ctrlId
      }
      this.fetchValue(argField);
    }
  }

  onFormSubmit(){
    this.onSubmit.emit(this.form.getRawValue());
  }

  onImageSelect(image, formFieldName) {
    this.form.patchValue({ [formFieldName]: image });
  }


}