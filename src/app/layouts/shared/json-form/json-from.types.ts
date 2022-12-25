interface JsonFormValidators {
    min?: Number;
    max?: Number;
    required?: Boolean;
    requiredTrue?: Boolean;
    email?: String;
    minLength?: Number;
    maxLength?: Number;
    pattern?: String;
    nullValidator?: Boolean;
  }
  export type JsonFormControlOptions = JsonFormControlOptions1 | JsonFormControlOptions2 
  interface JsonFormControlOptions1 {
    min?: string;
    max?: string;
    step?: string;
    icon?: string;
  }
  interface JsonFormControlOptions2{
    value : String | Boolean | Number,
    label : String | Number | Boolean,
    icon ?: String
  }
  export interface JsonFormControls {
    name: string;
    label: string;
    value: string;
    type: string;
    hitHttp? : boolean;
    method ? : string;
    options?: JsonFormControlOptions;
    required?: boolean;
    disabled?:boolean;
    validators: JsonFormValidators;
    [x:string] : any;
  }
  export interface JsonFormData {
    controls: JsonFormControls[];
  }
  export type JsonFormArray = JsonFormControls[][]
