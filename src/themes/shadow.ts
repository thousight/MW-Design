import { BoxShadowProperty } from 'csstype'
import colors from './colors'

export interface Shadow {
  default: BoxShadowProperty
  active?: BoxShadowProperty
  focus?: BoxShadowProperty
  'focus-within'?: BoxShadowProperty
  visited?: BoxShadowProperty
  hover?: BoxShadowProperty
}

const shadow: Shadow = {
  default: `2px 2px 4px ${colors.shadow}, -2px -2px 4px ${colors.shadowInvert}`,
  active: `inset 2px 2px 4px ${colors.shadow}, inset -2px -2px 4px ${colors.shadowInvert}`,
};

export default shadow