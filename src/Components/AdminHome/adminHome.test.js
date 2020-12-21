import React from 'react';
import {shallow} from 'enzyme';
import {AdminHome} from './adminHome';

describe('<AdminHome/> tests: ',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper=shallow(<AdminHome/>).dive();
    });

    test('<AdminHome/> should render properly.',()=>{
        console.log(wrapper.debug());
        expect(wrapper.find('#AdminHomeComponent').length).toBe(1);
    })

    // test('<AdminHome/> renders <Dashboard/> properly',()=>{
    //     wrapper.setProps({selected:"db"});
    //     console.log(wrapper.debug());
    //     expect(wrapper.find(Dashboard).length).toBe(1);
    // })
})