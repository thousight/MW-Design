import { ColorProperty } from 'csstype'

export interface Colors {
  primary: ColorProperty
  accent: ColorProperty
  link: ColorProperty
  success: ColorProperty
  warning: ColorProperty
  error: ColorProperty
  disabled: ColorProperty
  text: ColorProperty
  background: ColorProperty
  shadow: ColorProperty
  shadowInvert?: ColorProperty
}

const colors: Colors = {
  primary: '#F0F0F3',
  accent: '#1999FF',
  link: '#2EA8FF',
  success: '#3CB700',
  warning: '#FFC744',
  error: '#FF4A5C',
  disabled: '#A0A0A0',
  text: '#333333',
  background: '#F0F0F3',
  shadow: '#CCCCCF',
  shadowInvert: '#FFFFFF',
}

export default colors
