// _DATA.test.js

var _DATA = require("../utils/_DATA");

describe("_DATA", () => {
  it("_saveQuestion will return formatted data if params correct", async () => {
    const question = {
      author: "tylermcginnis",
      optionOneText: "aaa",
      optionTwoText: "bbb",
    };
    var result = await _DATA._saveQuestion(question);
    expect(result.author).toEqual("tylermcginnis");
  });

  it("_saveQuestion will return error if params incorrect", async () => {
    const question = {
      optionOneText: "aaa",
      optionTwoText: "bbb",
    };
    await expect(_DATA._saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  it("_saveQuestionAnswer will return true if params correct", async () => {
    const question = {
      authedUser: "tylermcginnis",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionOne",
    };
    var result = await _DATA._saveQuestionAnswer(question);
    expect(result).toBeTruthy();
  });

  it("_saveQuestionAnswer will return error if params incorrect", async () => {
    const question = {
      qid: "aaa",
      answer: "bbb",
    };
    await expect(_DATA._saveQuestionAnswer(question)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
