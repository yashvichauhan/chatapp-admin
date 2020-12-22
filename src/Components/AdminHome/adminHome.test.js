import React from 'react';
import {shallow} from 'enzyme';
import {AdminHome} from './adminHome';

describe('<AdminHome/> tests: ',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper=shallow(<AdminHome/>);
    });

    test('<AdminHome/> should render properly.',()=>{
        expect(wrapper.find('#AdminHomeComponent').length).toBe(1);
    })

    test('<AdminHome/> renders <Dashboard/> properly',()=>{
        wrapper.setProps({selected:"db"});
        expect(wrapper.find('Connect(Dashboard)').length).toBe(1);
    })

})