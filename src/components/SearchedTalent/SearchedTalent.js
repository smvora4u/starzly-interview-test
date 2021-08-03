import React, { useState } from "react";
import { Button, Col, Input, Row, List, Avatar } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import "./SearchedTalent.css";

const SearchedTalent = (props) => {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [dataReceived, setDataReceived] = useState(false);

  const reset = () => {
    setValue("");
    setDataReceived(false);
    setFetchError(false);
  };

  const searchTalentHandler = (e) => {
    setValue(e.target.value);
    const strLength = e.target.value.trim().length;
    if (strLength > 2) {
      setFetchError(false);
      const url = "https://starzly.io/api/talents/?name=" + e.target.value;
      fetch(url, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
        .then((res) => res.json())
        .then(
          (result) => {
            console.log(result);
            setData(result.data)
            setDataReceived(true);
          },
          (error) => {
            setFetchError(true);
            setData([]);
            setErrorMsg("Failed to fetch!");  
          }
        );
    } else {
      setDataReceived(false);
      return;
    }
  };

  return (
    <React.Fragment>
      <div className={"searched-talent " + (props.isShow ? "show" : "")}>
        <Row wrap={false}>
          <Col flex="auto">
            <Input
              prefix={<SearchOutlined />}
              onChange={searchTalentHandler}
              value={value}
            />
            {value && (
              <Button
                className="reset-search"
                onClick={reset}
                type="danger"
                icon={<CloseOutlined />}
              />
            )}
          </Col>
          <Col flex="none" className="text-right">
            <Button
              className="cancel-search-talent"
              type="link"
              onClick={props.closeSearchContainer}
            >
              Cancel
            </Button>
          </Col>
        </Row>
        <Row justify="center" className="searched-talent-result">
          <Col span={24} className="searched-talent-list-container">
              <List
                className={`talent-list ${dataReceived ? "show" : ""}`}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src={item.user.avatar_url} />
                      }
                      title={item.name_en}
                      description={item.tags.map(talent => {
                        return talent.name_en;
                      }).join(", ")}
                    />
                  </List.Item>
                )}
              />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default SearchedTalent;
