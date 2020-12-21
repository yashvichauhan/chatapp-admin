import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import CanvasJSReact from '../../../lib/js/canvasjs.react';
import { Card, Col, Row} from 'antd';

import cssClasses from './dashboard.module.css'; 
import * as actions from '../../../Store/actions/index';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const Dashboard=(props)=>{
    const [onlineUser, setonlineUser] = useState(0);
    const {CanvasJS} = CanvasJSReact.CanvasJS;
    const {totalUserCount,userData,countryDataPoints} = props;
    
    useEffect(()=>{
        getOnlineUsers();
        props.onfindCountryDataPonts(userData);
    },[userData]);

    //utility functions
    const getOnlineUsers=()=>{
        let count=0;
        if(userData){
            userData.forEach(element => {
                if(element.isOnline){
                    count+=1;
                }
            });
            setonlineUser(count);
        }
    }
    
    const options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Users by Country"
        },
        data: [{
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: countryDataPoints
        }]
    }

    return (
        <div className={cssClasses.site_card_wrapper}>
        <Row gutter={12}>
            <Col span={7}>
                <Card style={{ width: 200}} className={cssClasses.card_style}>
                    <p style={{fontSize:'1.2em' ,color:"gray",marginBottom:0}}>Total Users</p>
                    <p style={{fontSize:'2em',marginBottom:0}}>{totalUserCount}</p>
                </Card>
            </Col>
            <Col span={7}>
                <Card style={{ width: 200}} className={cssClasses.card_style}>
                    <p style={{fontSize:'1.2em' ,color:"gray",marginBottom:0}}>Active Users</p>
                    <p style={{fontSize:'2em',marginBottom:0}}>{onlineUser}</p>
                </Card>
            </Col>
        </Row>
        <br/>
        <CanvasJSChart options = {options}></CanvasJSChart>
        </div>
    );
}

const mapStateToProps=(state)=>{
    return{
        totalUserCount:state.analysis.totalUserCount,
        userData:state.analysis.userData,
        countryDataPoints:state.analysis.countryDataPoints
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        onfindCountryDataPonts:(users)=>dispatch(actions.findCountryDataPonts(users))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);