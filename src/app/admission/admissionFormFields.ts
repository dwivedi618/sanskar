export const admissionFormFields = {
    staticFields: {
        studentInfo: [
            {
                "value": "",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "text",
                "fieldName": "firstName",
                "show": false,
                "label": "First Name",
                "fieldMaxLenth": 50,
                "hint":"",
                "showHint":false
            },
            {
                "fieldName": "lastName",
                "value": "",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "text",
                "show": false,
                "label": "Last Name",
                "fieldMaxLenth": 50,
                "hint":"",
                "showHint":false
            },
            {
                "fieldName": "middleName",
                "value": "",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "text",
                "show": false,
                "label": "Middle Name",
                "fieldMaxLenth": 50,
                "hint":"",
                "showHint":false
            },
            {
                "fieldName": "gender",
                "value": "",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "radio",
                "show": false,
                "label": "Gender",
                "hint":"",
                "showHint":false,
                "options": [
                    {
                        "value": "MALE",
                        "label": "Male",
                        "icon":"male"
                    },
                    {
                        "value": "FEMALE",
                        "label": "Female",
                        "icon":"female"
                    },
                    {
                        "value": "OTHER",
                        "label": "Other",
                        "icon":"transgender"
                    }
                ]
            },
            {
                "fieldName": "dateOfBirth",
                "value": "",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "date",
                "show": false,
                "label": "Date of Birth",
                "hint":"",
                "showHint":false
            },

            {
                "fieldName": "image",
                "value": "",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "image",
                "show": false,
                "label": "Stundent Photo",
                "hint":"",
                "showHint":false
            },
            {
                "fieldName": "nationality",
                "value": "India",
                "isEditable": false,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "dropdown",
                "show": false,
                "label": "Nationality",
                "hint":"",
                "showHint":false,
                "options":[
                    {
                        value : "India",
                        label : "India"
                    }
                ]
            },
            {
                "fieldName": "healthStatus",
                "value": "",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "text",
                "show": false,
                "label": "Health Status",
                "hint":"",
                "showHint":false
            },
            {
                "fieldName": "bloodGroup",
                "value": "",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "dropdown",
                "show": false,
                "label": "Blood Group",
                "hint":"",
                "showHint":false,
                "options" :[
                    { value: 'A+', label: 'A+' },
                    { value: 'A-', label: 'A-' },
                    { value: 'B+', label: 'B+' },
                    { value: 'B-', label: 'B-' },
                    { value: 'AB+', label: 'AB+' },
                    { value: 'AB-', label: 'AB' },
                    { value: 'O+', label: 'O+' },
                    { value: 'O-', label: 'O-' }
                  ]
            },
            {
                "fieldName": "standardId",
                "value": {
                    id : "",
                    value : ""
                },
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "dropdown",
                "show": false,
                "label": "Admission In",
                "hint":"",
                "showHint":false
            },
            {
                "fieldName": "convenience",
                "value": "",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "dropdown",
                "show": false,
                "label": "Convenience",
                "hint":"",
                "showHint":false,
                "options" :[
                    { value: 'YES', label: 'Yes' },
                    { value: 'NO', label: 'No' },                 
                  ]
            },
            {
                "fieldName": "place",
                "value": "",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "text",
                "show": false,
                "label": "Place",
                "hint":"",
                "showHint":false
            }
        ]
    }
}