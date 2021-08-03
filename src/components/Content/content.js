import React from 'react';
import { Button, Col, Row } from 'antd';
import { LeftOutlined, UploadOutlined } from "@ant-design/icons";
import './content.css';

const Content = (props) => {
    return(
        <React.Fragment>
            <Row justify="space-between" className="content-container">
                <Col xs={2}>
                    <Button className="icon-btn" icon={<LeftOutlined />}></Button>
                </Col>
                <Col xs={14} className="text-right action-container">
                    <Button className="icon-btn" icon={<UploadOutlined />}></Button>
                    <Button className="follow-btn" type="primary">Follow</Button>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default Content;