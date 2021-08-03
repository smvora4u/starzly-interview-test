import React from "react";
import { Button, Col, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import './header.css';
import logo from "../../assets/logo.svg";

const Header = (props) => {
  return (
    <React.Fragment>
      <Row justify="space-between">
        <Col xs={8}>
          <img src={logo} className="app-logo" alt="logo" />
        </Col>
        <Col xs={14} className="text-right">
          <Button className="search-icon icon-btn" icon={<SearchOutlined />} onClick={props.onClick}></Button>
          <Button className="sign-up-btn" type="link" danger>Sign Up</Button>
          <Button className="login-btn" type="link">Login</Button>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Header;
