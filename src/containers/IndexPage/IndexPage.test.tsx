import "jsdom-global/register";
import React from "react";
import * as renderer from "react-test-renderer";
import IndexPage from "./IndexPage";

describe("IndexPage", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<IndexPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
