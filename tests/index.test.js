const singleFileObjectTest = require("./setup/singleFileObjectTest");
const singleFileFunctionTest = require("./setup/singleFileTest");
const multipleFilesTest = require("./setup/multipleFilesTest");
const mixTest = require("./setup/mixTest");
const nestedTests = require("./setup/nestedTest");

const config = { some: { config: "foo" } };

describe("objectifiler tests", () => {
  test("(basic usage) Exports a singe file object", () => {
    expect(singleFileObjectTest).toEqual({ singleFile: { some: "object" } });
  });

  test("(basic usage) Exports a singe file function with config", () => {
    expect(singleFileFunctionTest).toEqual({
      singleFile: expect.any(Function),
    });
    expect(singleFileFunctionTest.singleFile(config)).toEqual({
      some: { config: "foo" },
    });
  });
  test("(basic usage) Exports multiple function files ", () => {
    expect(multipleFilesTest).toEqual({
      fileOne: expect.any(Function),
      fileTwo: expect.any(Function),
    });
    expect(multipleFilesTest.fileOne(config)).toEqual({
      some: { config: "foo" },
    });
    expect(multipleFilesTest.fileTwo(config)).toEqual({
      some: { config: "foo" },
    });
  });
  test("(basic usage) Exports mix of objects and functions ", () => {
    expect(mixTest).toEqual({
      function: expect.any(Function),
      object: { some: "object" },
    });
    expect(mixTest.function(config)).toEqual({ some: { config: "foo" } });
  });
  test("(basic usage) Exports nested directory structure ", () => {
    expect(nestedTests).toEqual({
      testOne: expect.any(Function),
      nested: {
        nestedOne: {
          testFour: expect.any(Function),
        },
        testTwo: expect.any(Function),
        testThree: expect.any(Function),
      },
    });
  });
  test("(Edge case) Handles situation where file is empty", () => {
    expect(nestedTests.emptyFile).toBeUndefined();
  });
});
