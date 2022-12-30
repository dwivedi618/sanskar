export const PATTERNS = {
  tel: /^[0-9]/,
  email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  alphanumeric: /^[A-Za-z\d\s]+$/,
  alphabet: /^[A-Za-z\s]+$/,
  number: /^[0-9]+(\.[0-9]{0,2})?$/,
  text: /^[ A-Za-z\d\s_@|.,:()&$#+-]*$/,
  name: /^[ A-Za-z\d\s_@|.,:()-\/]*$/,
}                     