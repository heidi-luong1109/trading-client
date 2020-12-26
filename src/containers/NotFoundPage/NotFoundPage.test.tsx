import "jsdom-global/register";
import React from "react";
import * as renderer from "react-test-renderer";
import NotFoundPage from "./NotFoundPage";

describe("NotFoundPage", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<NotFoundPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
