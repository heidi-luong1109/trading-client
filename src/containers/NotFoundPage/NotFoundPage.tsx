import * as React from "react";
import { Helmet } from "react-helmet";
import { Sidebar } from "../../components/Sidebar";
import { Layout } from "../../components/Layout";
import s from "./NotFoundPage.module.scss";

const NotFoundPage = () => (
  <Layout>
    <Helmet>
      <title>Bitmex Client - Page not found</title>
    </Helmet>
    <div className={s["not-found-page"]}>
      <div className={s["not-found-page__sidebar"]}>
        <Sidebar />
      </div>
      <div className={s["not-found-page__content"]}>
        404 - Page not found!
      </div>
    </div>
  </Layout>
);

export default NotFoundPage;
