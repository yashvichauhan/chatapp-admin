import React,{useState} from 'react';
import { Form, Input, Button, Row, Col, Spin,Typography,notification } from "antd";
import { connect } from "react-redux";
import "antd/dist/antd.css";

import * as actions from '../../Store/actions/index';

export function Login(props){
    const {Title}=Typography;
    const [ loading, setLoading ] = useState(false);

    const onFinish = (values) => {
        setLoading(true);
        const loginObj={
            email:values.email,
            password:values.password
        }
        props.onAuth(loginObj)
        .then((user)=>{
            setLoading(false);
            props.history.replace('/home');
            console.log("signin success: ",user);
        })
        .catch((err)=>{
            setLoading(false);
            notification.open({
            message: 'Login Failed',
            description: err.message
                // icon: <CloseCircleOutlined style={{ color: 'red' }} />,
            });
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return(
        <div id="loginComponent">
        <Row
            type="flex"
            justify="center"
            align="middle"
            style={{
                minHeight: "100vh"
            }}
        >
            <Col span={6}>
                <Title level={3}>Admin login</Title>
                <br></br>
                <Form
                        class="unitTest"
                        size={"large"}
                        name="admin_login"
                        initialValues={{
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: "email",
                                required: "true",
                            },
                        ]}
                    >
                    <Input placeholder={"Admin Email"} />
                    </Form.Item>
                    <Form.Item
                        name={"password"}
                        rules={[
                            {
                                required: true,
                                message: "enter your password.",
                            },
                        ]}
                    >
                    <Input.Password  placeholder={"Password"} />
                    </Form.Item>
                    <Form.Item>
                    <Row>
                        <Spin spinning={loading}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        </Spin>
                    </Row>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
        </div>
    );
}

const mapStateToProps = state => {
    return{
        user: state.admin.currentAdmin
    }
};

const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(inputObj)=>(dispatch(actions.auth(inputObj))),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Login);