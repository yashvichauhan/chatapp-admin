import React from 'react';
import {shallow} from 'enzyme';
import EditProfile from './EditProfile';

describe('<EditProfile/> tests: ',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper=shallow(<EditProfile/>);
    }); 

    it('should render properly ',()=>{
        console.log(wrapper.debug());
        expect(wrapper).toHaveLength(1);        
    })
})