import { Col, Row } from "antd";
import Content from "./components/Content/content";
import Header from "./components/Header/header";
import SearchedTalent from "./components/SearchedTalent/SearchedTalent";
import "./App.css";
import { useState } from "react";

function App() {
  const [isShowSearchTalent, setIsShowSearchTalent] = useState(false);

  const searchTalentHandler = () => {
    setIsShowSearchTalent(!isShowSearchTalent);
  };

  (function () {
    var cors_api_host = "cors-anywhere.herokuapp.com";
    var cors_api_url = "https://" + cors_api_host + "/";
    var slice = [].slice;
    var origin = window.location.protocol + "//" + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function () {
      var args = slice.call(arguments);
      var targetOrigin = /^https?:\/\/([^/]+)/i.exec(args[1]);
      if (
        targetOrigin &&
        targetOrigin[0].toLowerCase() !== origin &&
        targetOrigin[1] !== cors_api_host
      ) {
        args[1] = cors_api_url + args[1];
      }
      return open.apply(this, args);
    };
  })();

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
