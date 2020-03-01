import colors, { Colors } from './colors'
import shadow, { Shadow } from './shadow'
import space, { Space } from './space'

export interface MWDesignTheme {
  colors: Colors
  shadow: Shadow
  space: Space

  [componentTheme: string]: any
}

const defaultTheme: MWDesignTheme = {
  colors,
  shadow,
  space,

  buttonTheme: `
    border: none;
    border-radius: 5px;

    &::before {
      display: block;
      box-shadow: ${shadow.active};
      border-radius: 5px;
      content: ' ';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 0;
      transition: opacity 250ms;
    }
  
    &:active::before {
      opacity: 1;
    }

    &:active {
      box-shadow: ${shadow.default};
    }
  
    &:focus {
      box-shadow: ${shadow.focus};
      outline: 0;
    }
  `,
};

export default defaultTheme;
