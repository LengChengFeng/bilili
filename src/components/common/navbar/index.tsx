import React, { useState, useRef, useEffect } from "react";
import { Avatar, Input, Modal, Form, Button } from "antd";
import { Toast } from "antd-mobile";
import {
  SearchOutlined,
  GithubOutlined,
  QqOutlined,
  Html5Outlined,
} from "@ant-design/icons";
import {
  getVerifyCodeByPhone,
  loginByPhone,
  checkVerifyCode,
} from "../../../network/home";
import { useNavigate } from "react-router";

const navBar = (props: any) => {
  const handleLogin = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [show, setShow] = useState(true);
  const [phone, setPhone] = useState(0);
  const navigate = useNavigate();
  let [tips, setTips] = useState(30);
  let [showTime, setShowTime] = useState(false);
  let [userInfo, setUserInfo] = useState<any>();
  const [verifyCode, setVerifyCode] = useState(0);
  //Modal的内容
  useEffect(() => {
    const info =
      JSON.parse(window.localStorage.getItem("userinfo") as any) || [];
    setUserInfo(info);
  }, []);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const formRef = useRef<any>();
  const login = () => {
    formRef.current.validateFields().then(async (values: any) => {
      const res: any = await checkVerifyCode({ phone, captcha: verifyCode });
      if (res.code == "200") {
        loginByPhone({ phone, captcha: verifyCode }).then((res: any) => {
          if (res.code == "200") {
            console.log(res);
            
            window.localStorage.setItem(
              "token",
              JSON.stringify(res.token)
            );
            window.localStorage.setItem(
              "userinfo",
              JSON.stringify(res.profile)
            );
            setIsModalVisible(false);
          } else {
            Toast.show({
              content: res.data.message,
            });
          }
        });
      } else {
        Toast.show({
          content: res.data.message,
        });
      }
    });
  };
  //验证手机号码
  const verifyPhone = (rule: any, value: any, callback: any) => {
    if (
      !/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/.test(value)
    ) {
      callback("请输入正确的电话号码");
      return;
    }
    setShow(false);
    callback();
  };
  const getVerifyCode = () => {
    getVerifyCodeByPhone({ phone }).then((res: any) => {
      let timer: any = "";
      if (res.code == "200") {
        setShowTime(true);
        setShow(true);
        Toast.show({
          content: "验证码已发送",
        });
        timer = setInterval(() => {
          setTips(tips--);
          if (tips == 0) {
            setShowTime(false);
            setShowTime(false);
            clearInterval(timer);
          }
        }, 1000);
      }
    });
  };
  const handleChange = (e: any) => {
    setPhone(e.target.value);
  };
  const handleVerifyCode = (e: any) => {
    setVerifyCode(e.target.value);
  };
  const isLogin = () => {
    if (userInfo.avatarUrl) {
      return (
        <img
          src={userInfo.avatarUrl}
          alt=""
          style={{ height: "10vw", width: "10vw", borderRadius: "50%" }}
        />
      );
    } else {
      return (
        <Avatar
          style={{ backgroundColor: "#f6f6f6", verticalAlign: "middle" }}
          size="large"
        >
          <span style={{ color: "#ee6a96" }} onClick={() => handleLogin()}>
            登陆
          </span>
        </Avatar>
      );
    }
  };
  const handleSearch = () => {
    navigate("/search");
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "2vw 2vw",
      }}
    >
      <Modal
        centered
        title="登录"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          ref={formRef}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          labelAlign="left"
        >
          <Form.Item
            label="手机号"
            name="phone"
            rules={[
              { required: true, message: "手机号不允许为空" },
              { validator: verifyPhone },
            ]}
          >
            <Input onChange={(e) => handleChange(e)} />
          </Form.Item>

          <Form.Item
            label="验证码"
            name="verify"
            rules={[{ required: true, message: "请输入验证码" }]}
          >
            <div className="verify" style={{ display: "flex" }}>
              <Input
                style={{ width: "70%" }}
                onChange={(e) => handleVerifyCode(e)}
              />
              <Button
                disabled={show}
                type="primary"
                onClick={() => getVerifyCode()}
              >
                {showTime}
                {!showTime ? "获取验证码" : `${tips}秒`}
              </Button>
            </div>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "40%", textAlign: "center" }}
              onClick={() => login()}
            >
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="login">{userInfo && isLogin()}</div>
      <div
        className="seach"
        style={{ margin: "0 4vw", flex: "1" }}
        onClick={() => handleSearch()}
      >
        <Input
          size="large"
          placeholder="爱你"
          prefix={<SearchOutlined />}
          disabled
          bordered={false}
          style={{
            borderRadius: "20px",
            backgroundColor: "#f2f3f5",
          }}
        />
      </div>
      <div className="utils" style={{ width: "30%" }}>
        <GithubOutlined style={{ fontSize: "7vw", color: "black" }} />
        <QqOutlined
          style={{ fontSize: "7vw", color: "black", margin: "0 2vw" }}
        />
        <Html5Outlined style={{ fontSize: "7vw", color: "green" }} />
      </div>
    </div>
  );
};
export default navBar;
