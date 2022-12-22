import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { JsonFormData } from './json-from.types';

@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonFormComponent implements OnInit {
  @Input() jsonFormData: JsonFormData;
  constructor() { }
  ngOnInit() {}
}