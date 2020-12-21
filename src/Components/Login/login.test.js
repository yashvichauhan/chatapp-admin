import React from 'react';
import {shallow} from 'enzyme';
import {Login} from './login';

describe('Login component',()=>{
    test('<Login/> should render without errors.',()=>{
        const component=shallow(<Login />);
        const wrapper=component.find('#loginComponent');
        expect(wrapper.length).toBe(1);
    });
})