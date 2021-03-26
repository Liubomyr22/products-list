import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import App from "../../App";
import CardInfo from "../CardInfo";

const WrapperProductCard = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={App} />
      <Route path="/info" component={CardInfo} />
    </BrowserRouter>
  );
};

export default WrapperProductCard;
