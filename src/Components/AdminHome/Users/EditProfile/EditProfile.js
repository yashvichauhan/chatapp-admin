import React, {useState} from "react";

import {Modal, Button, Row, Col, Form, Input, Avatar, Upload, message,Select} from 'antd';
import {MailOutlined, UploadOutlined, UserOutlined,SmileOutlined } from "@ant-design/icons";
import countryList from "react-select-country-list";

const EditProfile = (props) => {
  const [editProf] = Form.useForm();
  const [ file, setFile ] = useState(null);
  const [ prevURL, setPrevURL ] = useState(null);
  
  const onFinish = (values) => {
    props.handleSubmit(values, file);
    editProf.resetFields();
    setPrevURL(null);
  }

  const onFinishFailed = () => {
    message.error("Editing operation failed try again.");
  }

  const onCancelModal=()=>{
    editProf.resetFields();
    setPrevURL(null);
    props.handleCancel();
  }

  const handleFileChange = ({ fileList }) => {
    if(fileList[fileList.length -1] && fileList[fileList.length -1].originFileObj) {
      const fileType = fileList[fileList.length-1].type;
      const fileSize = fileList[fileList.length-1].size / 1024 / 1024 < 1;
      if((fileType === 'image/jpeg' || fileType === 'image/jpg' || fileType === 'image/png') && fileSize) {
        const file = fileList[fileList.length-1].originFileObj;
        let reader = new FileReader();
        let url = reader.readAsDataURL(file);
        reader.onloadend = (e) => {
          setPrevURL(reader.result);
        };
        setFile(fileList[fileList.length-1].originFileObj);
      }
    }else {
      setFile(null);
    }
  };

  const beforeUpload = (file) => {
    if(file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
      message.error(`${file.name} file type is not supported.`);
    }
    const isLimit1MB = file.size / 1024 / 1024 < 1;
    if (!isLimit1MB) {
      message.error('Image must smaller than 1MB');
    }
    return false;
  };

  return (
    <>
      <Modal
        title="Edit User Data"
        visible={props.visible}
        okButtonProps={{
          form: "basic",
          key: 'submit',
          htmlType: 'submit'
        }}
        confirmLoading={props.editLoading}
        onCancel={onCancelModal}
      >
        <Row type={"flex"} justify={"center"} align={"center"}>
          <Col span={16}>
            <Form 
                  form={editProf}
                  name={"basic"}
                  id={"basic"}
                  preserve={false}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
            >
              <Row type={"flex"} justify={"center"} align={"center"}>
                <Col>
                  <Form.Item>
                    <Avatar src={prevURL} size={85}></Avatar>
                  </Form.Item>
                </Col>
              </Row>
              <Row type={"flex"} justify={"center"} align={"center"}>
                <Col>
                  <Form.Item>
                    <Upload
                      showUploadList={false}
                      name={"avatar"}
                      accept={'.jpg, .jpeg, .png'}
                      beforeUpload={beforeUpload}
                      onChange={handleFileChange}
                    >
                      <Button type={"primary"} size={"middle"} shape={"round"} icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label={"Name"}
                initialValue=""
                name={"name"}
              >
                <Input placeholder={'Name'} />
              </Form.Item>
              <Form.Item
                label={"About Me"}
                initialValue=""
                name={"aboutme"}
              >
                <Input maxLength={100} placeholder={'About Me'} />
              </Form.Item>
              <Form.Item
                label={"Country"}
                name={"country"}
                >
                <Select
                  showSearch
                  placeholder="Select your country"
                  options={countryList().getData()}>
                </Select>
              </Form.Item>
              <Form.Item
                initialValue=""
                label={"Email"}
                name={"email"}
                hasFeedback
                rules={[{
                  type: 'email',
                }]}
              >
                <Input placeholder={"Email"} />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default EditProfile;