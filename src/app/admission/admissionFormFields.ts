export const admissionFormFields = {
    staticFields: {
        studentInfo: [
            {
                "value": "Shivam",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "text",
                "fieldName": "firstName",
                "show": false,
                "label": "First Name",
                "fieldMaxLenth": 50,
                "hint": "",
                "showHint": false
            },
            {
                "fieldName": "lastName",
                "value": "Dwivedi",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "text",
                "show": false,
                "label": "Last Name",
                "fieldMaxLenth": 50,
                "hint": "",
                "showHint": false
            },
            {
                "fieldName": "middleName",
                "value": "Kumar",
                "isEditable": true,
                "isMandatory": false,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "text",
                "show": false,
                "label": "Middle Name",
                "fieldMaxLenth": 50,
                "hint": "",
                "showHint": false
            },
            {
                "fieldName": "gender",
                "value": "MALE",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "radio",
                "show": false,
                "label": "Gender",
                "hint": "",
                "showHint": false,
                "options": [
                    {
                        "value": "MALE",
                        "label": "Male",
                        "icon": "male"
                    },
                    {
                        "value": "FEMALE",
                        "label": "Female",
                        "icon": "female"
                    },
                    {
                        "value": "OTHER",
                        "label": "Other",
                        "icon": "transgender"
                    }
                ]
            },
            {
                "fieldName": "dateOfBirth",
                "value": "03/10/1998",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "date",
                "show": false,
                "label": "Date of Birth",
                "hint": "",
                "showHint": false
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
                "hint": "",
                "showHint": false
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
                "hint": "",
                "showHint": false,
                "options": [
                    {
                        value: "India",
                        label: "India"
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
                "hint": "",
                "showHint": false
            },
            {
                "fieldName": "bloodGroup",
                "value": "O+",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "dropdown",
                "show": false,
                "label": "Blood Group",
                "hint": "",
                "showHint": false,
                "options": [
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
                    id: "",
                    value: ""
                },
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "dropdown",
                "show": false,
                "label": "Admission In",
                "hint": "",
                "showHint": false
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
                "hint": "",
                "showHint": false,
                "options": [
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
                "hint": "",
                "showHint": false
            }
        ],
        parentsInfo: [
            {
                "value": "Manoj",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "text",
                "fieldName": "father",
                "show": false,
                "label": "Father",
                "fieldMaxLenth": 50,
                "hint": "",
                "showHint": false
            },
            {
                "fieldName": "mother",
                "value": "Alka Dwivedi",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "text",
                "show": false,
                "label": "Mother",
                "fieldMaxLenth": 50,
                "hint": "",
                "showHint": false
            },
            {
                "fieldName": "fatherOccupation",
                "value": "Farmer",
                "isEditable": true,
                "isMandatory": false,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "text",
                "show": false,
                "label": "Father's occupation",
                "fieldMaxLenth": 50,
                "hint": "",
                "showHint": false
            },
            {
                "fieldName": "motherOccupation",
                "value": "Housewife",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "text",
                "show": false,
                "label": "Mother's Occupation",
                "hint": "",
                "showHint": false,
            },
            {
                "fieldName": "gaurdian",
                "value": "Manoj Dwivedi",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "text",
                "show": false,
                "label": "Guardian",
                "hint": "",
                "showHint": false
            },

            {
                "fieldName": "contact",
                "value": "",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "number",
                "show": false,
                "label": "Contact",
                "hint": "",
                "showHint": false,
                "pattern" : "mobile",
                "maxLength": 10
            }
        ],
        permanentAddress: [
            {
                "value": "address 1",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "text",
                "fieldName": "village",
                "show": false,
                "label": "Village",
                "fieldMaxLenth": 50,
                "hint": "",
                "showHint": false
            },
            {
                "value": "274704",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "number",
                "fieldName": "pin",
                "show": false,
                "label": "Area pin code",
                "fieldMaxLenth": 6,
                "hint": "",
                "showHint": false
            },
            {
                "fieldName": "district",
                "value": "Alka Dwivedi",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "autoSuggest",
                "method": "getStateList",
                "show": false,
                "label": "District",
                "fieldMaxLenth": 50,
                "hint": "",
                "showHint": false
            },
            {
                "fieldName": "post",
                "value": "Inguri Bazar",
                "isEditable": true,
                "isMandatory": false,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "text",
                "show": false,
                "label": "Post",
                "fieldMaxLenth": 50,
                "hint": "",
                "showHint": false
            },
            {
                "fieldName": "isCurrentAddressSame",
                "value": true,
                "isEditable": true,
                "isMandatory": false,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "checkbox",
                "show": false,
                "label": "Current Address is same as permanent",
                "hint": "Check if current address is same",
                "showHint": true
            }

        ],
        currentAddress: [
            {
                "value": "address 1",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "text",
                "fieldName": "village",
                "show": false,
                "label": "Village",
                "fieldMaxLenth": 50,
                "hint": "",
                "showHint": false
            },
            {
                "value": "274704",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "number",
                "fieldName": "pin",
                "show": false,
                "label": "Area pin code",
                "fieldMaxLenth": 6,
                "hint": "",
                "showHint": false
            },
            {
                "fieldName": "district",
                "value": "Alka Dwivedi",
                "isEditable": true,
                "isMandatory": true,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "autoSuggest",
                "method": "getStateList",
                "show": false,
                "label": "District",
                "fieldMaxLenth": 50,
                "hint": "",
                "showHint": false
            },
            {
                "fieldName": "post",
                "value": "Inguri Bazar",
                "isEditable": true,
                "isMandatory": false,
                "isEnabled": true,
                "isDisplayedDefault": true,
                "fieldType": "text",
                "show": false,
                "label": "Post",
                "fieldMaxLenth": 50,
                "hint": "",
                "showHint": false
            },

        ]
    }
}
