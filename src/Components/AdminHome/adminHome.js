import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { Layout, Menu,message } from 'antd';
import { LogoutOutlined, UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';

import cssClasses from './adminhome.module.css';
import * as actions from '../../Store/actions/index';
import Dashboard from './Dashboard/dashBoard';
import Users from './Users/users';
import useStyles from './useStyles.js';

export const AdminHome=(props)=>{
    
    const { Header, Content, Footer, Sider } = Layout
    const classes = useStyles();

    useEffect(()=>{
        //onload
        props.onFindTotalUsers()
        .then((ub)=>{
            console.log("FETCHED ALL USER DATA");
        })
        .catch((err)=>{
            message.error("Please check your internet connection!");
        })
    },[props.refresh]);

    useEffect(()=>{
        return()=>{
            //cleanup 
            //unsubscribeChat.then((fnc)=>fnc()).catch((err)=>console.log(err));
        }
    })
    //utility functions
    const logoutHandler=()=>{
        props.onLogout()
        .then(()=>{
            console.log("Successfully logged out!");
            props.history.push('/');
        })
        .catch((err)=>{
            console.log(err);
            message.error("Logout Failed!");
        })
    }
    const dashboardHandler=()=>{
        props.onsetSelected("db");
    }   
    const usersHandler=()=>{
        props.onsetSelected("us");
    }
    return(
        <Layout className={cssClasses.main_container} id="AdminHomeComponent">
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
        <div className={cssClasses.logo} style={{color:"white",padding:"1em",fontSize:"20px"}}>Chat App</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<AppstoreOutlined  />}>
                <a onClick={dashboardHandler}>Dashboard</a>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
                <a onClick={usersHandler} >Users</a>
            </Menu.Item>
            <Menu.Item key="3" icon={<LogoutOutlined />}>
                <a onClick={logoutHandler} >Logout</a>
            </Menu.Item>
        </Menu>
        </Sider>
        <Layout>
        <Header className={cssClasses.site_layout_sub_header_background} style={{ paddingRight:'30px'  }}
        >
        <div className={cssClasses.flex_header}>
            <Avatar alt="Admin" className={classes.small} >Y</Avatar>
        </div>
        </Header>
        <Content style={{ margin: '24px 16px 0' }} className={cssClasses.content} id="adminHomeContent">
            <div style={{ padding: 24}}>
                {(props.selected ==="us")?<Users/>:null}
                {(props.selected ==="db")?<Dashboard/>:null}
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Admin Panel ©2020 Created by Yashvi chauhan</Footer>
        </Layout>
    </Layout>
    );
}

AdminHome.propTypes={
    selected: PropTypes.string,
}

const mapStateToProps = state => {
    return {
      user: state.admin.currentAdmin,
      selected:state.admin.selected,
      refresh:state.admin.refresh
    };
};

const mapDispatchToProps=dispatch=>{
    return{
        onLogout:()=>dispatch(actions.authLogout()),
        onsetSelected:(value)=>dispatch(actions.setSelected(value)),
        onFindTotalUsers:()=>dispatch(actions.FindTotalUsers()),
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(AdminHome);