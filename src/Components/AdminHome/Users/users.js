import React,{useState} from 'react';
import {connect} from 'react-redux';
import { Table, Space,Row,Col,Input,Menu, Dropdown, message,Select,Button } from 'antd';
import { DownOutlined,SyncOutlined } from '@ant-design/icons';
import countryList from "react-select-country-list";
import moment from 'moment';

import EditProfile from './EditProfile/EditProfile';
import * as actions from '../../../Store/actions/index';
import cssClasses from './users.module.css';

function Dashboard(props){
    const {userData,user,selectedUser,selectedUserMetadata} = props;
    const { Search } = Input;
    const [editProfileLoading, seteditProfileLoading] = useState(false);
    const [editProfileVisible, setEditProfileVisible] = useState(false);
    //utilityy functions
    const onSearch=()=>{
      console.log("Searching");
    }
    const handleCancel = () => {
      setEditProfileVisible(false);
    };
    const handleEditProfileSubmit=(values,file)=>{
      seteditProfileLoading(true);
      const sendData={
        aboutme:(values.aboutme!=="")?values.aboutme:(selectedUser.aboutme),
        country:(values.country!==undefined)?values.country:(selectedUser.country),
        name:(values.name!=="")?values.name:(selectedUser.name),
        email:(values.email!=="")?values.email:(selectedUser.email),
        userID:selectedUser.userID,
        avatarURL:selectedUser.avatar,
      }
      if(sendData.email===selectedUser.email){
        sendData["emailFlag"]=true;
      }
      props.oneditUserPersonalInfo(sendData,file)
      .then((res)=>{
        message.success("Editing operation success.");
        setEditProfileVisible(false);
        seteditProfileLoading(false);
      })
      .catch((err)=>{
        message.error(err);
        seteditProfileLoading(false);
      })
    }
    const setSelectedUser=(e,uid)=>{
      e.preventDefault();
      const value=userData.filter((userOne)=>userOne.userID===uid);
      props.onsetSelectedUser(value[0],value[0].id);
    }
    const handleSuspendUser=()=>{
      props.onsuspendUser(selectedUserMetadata.uid)
      .then(()=>{
        message.success("User suspended.");
      })
      .catch((err)=>{
        console.log(err);
        message.error("Some error occurred.");
      })
    }
    const hanldeActivateUser=()=>{
      props.onactivateUser(selectedUserMetadata.uid)
      .then(()=>{
        message.success("User account activated.");
      })
      .catch((err)=>{
        console.log(err);
        message.error("Some error occurred.");
      })
    }
    const handleDeleteUser=(e)=>{
      e.preventDefault();
      props.ondeleteUser(selectedUser.userID,selectedUserMetadata.uid)
      .then(()=>{
        message.success("User has been Deleted permnently");
      })
      .catch((err)=>{
        message.error("Couldn't perform delete operation due to some error.");
      })
    }
    const handleReset=(clearFilters)=>{
      clearFilters();
    }
    const handleOk=(confirm)=>{
      confirm();
    }
    //menu
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <div onClick={(e)=>handleDeleteUser(e)}>Delete</div>
        </Menu.Item>
        <Menu.Item key="1">
          {(selectedUserMetadata)?(selectedUserMetadata.disabled)?<div onClick={hanldeActivateUser}>Activate User</div>
          :<div onClick={handleSuspendUser}>Suspend User</div>:
          <div onClick={handleSuspendUser}>Suspend User</div>
        }
        </Menu.Item>
        <Menu.Item key="3">
            <div onClick={()=>setEditProfileVisible(true)}>Edit User data</div>
        </Menu.Item>
      </Menu>
    );
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Online status',
          dataIndex: 'isOnline',
          filters:[
            {
              text:'Online',
              value:true
            },
            {
              text:'Offline',
              value:false
            }
          ],
          onFilter:(value,record)=>record.isOnline===value,
          key: 'isOnline',
          render: text => <p>{(text)?"Online":"Offline"}</p>,
        },
        {
          title: 'Last active',
          key: 'lastActive',
          dataIndex: 'lastActive',
          render: text => <p>{(text)?moment(text.toDate()).fromNow():"No data"}</p>,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Country',
          key: 'country',
          dataIndex: 'country',
          onFilter:(value,record)=>record.country===value,
          filterDropdown:({ setSelectedKeys, selectedKeys, confirm, clearFilters })=>(
          <div className={cssClasses.customized_filter}>
            <Space size="middle" direction="vertical">
              Country
            <Select
            showSearch
            style={{ width: 150 }}
            value={selectedKeys[0]}
            onChange={(value) => setSelectedKeys(value ? [value] : [])}
            placeholder="Select country to filter results."
            options={countryList().getData()}>
          </Select>
          <Row>
            <Col span={10} >
            <Button type="primary" size="small" onClick={()=>handleReset(clearFilters)} >Reset</Button>
            </Col>
            <Col span={4} offset={8}>
              <Button type="default" size="small" onClick={()=>handleOk(confirm)}>OK</Button>
            </Col>
          </Row>
          </Space>
          </div>
          ),
        },
        {
          title: 'About Me',
          key: 'aboutme',
          dataIndex: 'aboutme',
        },
        {
          title: 'Action',
          key: 'action',
          dataIndex: 'userID',
          render: (uid) => (
            <Space size="middle">
              <Dropdown overlay={menu} trigger={['click']} key={uid}>
                <a className="ant-dropdown-link" onClick={e => setSelectedUser(e,uid)}>
                    <DownOutlined />
                </a>
               </Dropdown>
            </Space>
          ),
        },
      ];
      
    return (
        <>
        <EditProfile
            visible={editProfileVisible}
            handleSubmit={handleEditProfileSubmit}
            editLoading={editProfileLoading}
            handleCancel={handleCancel}
            userData={selectedUser}
        >
        </EditProfile>
        <div className={cssClasses.row_styles} >
        <Row justify="end" >
            <Col span={8} >
                <Search 
                    placeholder="input search text"
                    allowClear 
                    onSearch={onSearch} 
                    enterButton
                /> 
            </Col>
            <Col span={2} offset={1}>
                <SyncOutlined 
                  className={cssClasses.icon_styles}
                  onClick={props.onchangeRefreshStatus}
                >Sync
                </SyncOutlined> 
            </Col>
        </Row>
        </div>
        <Table columns={columns} dataSource={userData} />
        </>
    );
}

const mapStateToProps=(state)=>{
  return{
    userData:state.analysis.userData,
    user:state.admin.currentAdmin,
    selectedUser:state.analysis.selectedUser,
    selectedUserMetadata:state.analysis.selectedUserMetadata
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    onsetSelectedUser:(userdata,uid)=>dispatch(actions.setSelectedUser(userdata,uid)),
    oneditUserPersonalInfo:(values,file)=>dispatch(actions.editUserPersonalInfo(values,file)),
    onchangeRefreshStatus:()=>dispatch(actions.changeRefreshStatus()),
    onsuspendUser:(uid)=>dispatch(actions.suspendUser(uid)),
    onactivateUser:(uid)=>dispatch(actions.activateUser(uid)),
    ondeleteUser:(uid,id)=>dispatch(actions.deleteUser(uid,id))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);