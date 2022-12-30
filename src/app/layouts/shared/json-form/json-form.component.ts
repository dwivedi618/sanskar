import { Component, OnInit, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventEmitter } from 'protractor';
import { DYNAMIC_METHODS } from 'src/app/admission/dropdown.methods';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { JsonFormService } from 'src/app/services/json-form.service';
import { JsonFormControlOptions, JsonFormControlsMethod, JsonFormData, OptionsActions } from './json-from.types';

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
    this.form = this.jsonFormService.createForm(this.formFields.controls);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!changes.formFields.firstChange) {
      this.form = this.jsonFormService.createForm(this.formFields.controls);
    }
  }

  fetchValue(field: JsonFormControlsMethod): JsonFormControlOptions[] {
    const { hitHttp, method } = field;
    let shouldCallService: boolean = hitHttp && method ? true : false;
    if (!shouldCallService) return;
    if (!DYNAMIC_METHODS.includes(method)) {
      this.alertService.alertWithAction("METHOD NOT IMPLEMENTED", close);
      return
    }
    return this.commonService[field.method](field);
  }

  onSelectOption(event: { source: any, value: any }, actions: OptionsActions) {
    console.log(actions?.onSelect?.method, event)
    if (actions && actions?.onSelect && actions?.onSelect?.hitHttp && actions?.onSelect?.method) {
      const field: JsonFormControlsMethod = {
        hitHttp: actions.onSelect.hitHttp,
        method: actions.onSelect.method,
        value: event.value
      }
      this.fetchValue(field);
    }
  }

  onFormSubmit(){
    this.onSubmit.emit(this.form.value);
  }


}