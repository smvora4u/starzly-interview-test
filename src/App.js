import { useState } from "react";
import { Col, Row } from "antd";
import Content from "./components/Content/content";
import Header from "./components/Header/header";
import SearchedTalent from "./components/SearchedTalent/SearchedTalent";
import "./App.css";

function App() {
  const [isShowSearchTalent, setIsShowSearchTalent] = useState(false);

  const searchTalentHandler = () => {
    setIsShowSearchTalent(!isShowSearchTalent);
  };

  return (
    <div className="app">
      <Row justify="center">
        <Col xs={24} md={20} xl={16}>
          <Header onClick={searchTalentHandler} />
          <Content />
          <SearchedTalent
            isShow={isShowSearchTalent}
            closeSearchContainer={searchTalentHandler}
          />
        </Col>
      </Row>
    </div>
  );
}

export default App;
