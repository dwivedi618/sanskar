import { Component, OnInit, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';
import { JsonFormData } from './json-from.types';

@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonFormComponent implements OnChanges {
  @Input() jsonFormFields: JsonFormData;
  constructor() { }
  ngOnChanges(changes: SimpleChanges) {
    if (!changes.jsonFormFields.firstChange) {
      console.log(this.jsonFormFields);
    }
  }

}