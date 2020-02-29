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
  default: `4px 4px 10px ${colors.shadow}, -4px -4px 10px ${colors.shadowInvert}`,
};

export default shadow