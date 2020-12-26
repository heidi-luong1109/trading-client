import * as React from "react";
import * as renderer from "react-test-renderer";
import Layout from "./Layout";

describe("Layout", () => {
  const props = {
    children: "test",
  };

  it("renders correctly", () => {
    const tree = renderer.create(<Layout {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
