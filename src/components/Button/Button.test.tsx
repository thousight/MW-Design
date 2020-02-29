import React from 'react';
import { render } from 'enzyme';

import Button from './Button';
import theme from '../../themes/defaultTheme'

it('Button should be rendered', () => {
	const rendered = render(<Button theme={theme}>Button</Button>);

	expect(rendered).toMatchSnapshot();
});