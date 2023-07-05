const emptyFileTest = require("./setup/emptyFile");

describe("objectifiler edge case tests", () => {
  test("(Edge case) Handles situation where file is empty", () => {
    expect(emptyFileTest.emptyFile).toEqual({});
  });
});
