import React from 'react';
import {shallow} from 'enzyme';
import Temp from './Temp';

describe('Temp Component',()=>{
    it('should check selector in jest enzyme',()=>{
        const component=shallow(<Temp/>);
        expect(component.find('#testing').length).toBe(1);
    })
})
