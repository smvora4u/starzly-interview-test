import React, { useEffect, useState } from "react";
import { Button, Col, Input, Row, List, Avatar } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import "./SearchedTalent.css";

const SearchedTalent = (props) => {
  const [enteredTalent, setEnteredTalent] = useState("");
  const [data, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [dataReceived, setDataReceived] = useState(false);

  // debounce function to prevent multiple request on every keypress
  useEffect(() => {
    const identifier = setTimeout(() => {
      const strLength = enteredTalent.length;
      if (strLength > 2) {
        const url = "https://starzly.io/api/talents/?name=" + enteredTalent;
        fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((res) => res.json())
          .then(
            (result) => {
              console.log(result);
              setData(result.data);
              setDataReceived(true);
            },
            (error) => {
              setData([]);
              setErrorMsg("Failed to fetch!");
            }
          );
      } else {
        setDataReceived(false);
        return;
      }
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [enteredTalent]);

  // reset value of search input
  const reset = () => {
    setEnteredTalent("");
    setDataReceived(false);
  };

  // sets the value of input
  const searchTalentHandler = (e) => {
    setEnteredTalent(e.target.value);
  };

  return (
    <React.Fragment>
      <div className={"searched-talent " + (props.isShow ? "show" : "")}>
        <Row wrap={false}>
          <Col flex="auto">
            <Input
              prefix={<SearchOutlined />}
              onChange={searchTalentHandler}
              value={enteredTalent}
            />
            {enteredTalent && (
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
            {errorMsg.trim().length !== 0 ? (
              <p className="err-msg">{errorMsg}</p>
            ) : (
              <List
                className={`talent-list ${dataReceived ? "show" : ""}`}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.user.avatar_url} />}
                      title={item.name_en}
                      description={item.tags
                        .map((talent) => {
                          return talent.name_en;
                        })
                        .join(", ")}
                    />
                  </List.Item>
                )}
              />
            )}
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default SearchedTalent;
