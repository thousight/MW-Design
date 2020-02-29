import colors, { Colors } from './colors'
import shadow, { Shadow } from './shadow'
import space, { Space } from './space'

export interface MWDesignTheme {
  colors: Colors
  shadow: Shadow
  space: Space

  [x: string]: any
}

const theme: MWDesignTheme = {
  colors,
  shadow,
  space,

  borderRadius: '5px',
};

export default theme;
