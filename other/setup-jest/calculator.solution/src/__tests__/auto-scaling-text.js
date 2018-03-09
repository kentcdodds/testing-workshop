import React from 'react'
import {mount} from 'enzyme'
import AutoScalingText from '../auto-scaling-text'

test('mounts', () => {
  mount(<AutoScalingText />)
})

/*
Adapter code example below




























































































import Enzyme, {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()})

 */
