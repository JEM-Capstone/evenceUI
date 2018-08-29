import React from 'react'
import { shallow } from 'enzyme'
import CheckboxWithLabel from './Profile.js'



test('renders a profile', () => {
  const profile = shallow(<CheckboxWithLabel />)
  console.log('profile', profile)
})
