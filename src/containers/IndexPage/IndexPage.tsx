import React, { useState } from "react";
import { config } from "../../constants";
import { Helmet } from "react-helmet";
import { Position } from "../../components/Position";
import { CreateOrder } from "../../components/CreateOrder";
import { Sidebar } from "../../components/Sidebar";
import { Layout } from "../../components/Layout";
import s from "./IndexPage.module.scss";

const IndexPage: React.FunctionComponent = () => {
  return (
    <Layout>
      <Helmet>
        <title>Bitmex Client - Index Page</title>
      </Helmet>
      <div className={s["index-page"]}>
        <div className={s["index-page__sidebar"]}>
          <Sidebar />
        </div>
        <div className={s["index-page__content"]}>
          <CreateOrder />
          <Position />
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
