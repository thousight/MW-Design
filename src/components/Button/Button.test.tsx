import React from 'react'
import { render } from 'enzyme'

import Button from './'
import theme from '../../themes/theme'

it('should be rendered', () => {
  const rendered = render(<Button theme={theme}>Button</Button>)

  expect(rendered).toBeDefined()
})
