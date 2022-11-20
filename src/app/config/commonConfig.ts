export const COMMON_CONFIG = {
    patterns : {
		mobile: /^\d{10}$/,
        email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		alphanumeric: /^[A-Za-z\d\s]+$/,
		alphabet: /^[A-Za-z\s]+$/,
		name :  /^[ A-Za-z\d\s_@|.,:()-\/]*$/,
		numeric : /^[0-9]+(\.[0-9]{0,2})?$/,
		remarksRegEx: /^[ A-Za-z\d\s_@|.,:()&$#+-]*$/
  	}
}