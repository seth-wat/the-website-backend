const setup = mockEmail => {
  process.env.EMAIL = mockEmail;
  return require("./helpers");
};

describe("generateEmail", () => {
  describe("on the generated object", () => {
    const mockEmail = "anyEmailString";
    const { generateEmail } = setup(mockEmail);

    test("that Source is equal to the EMAIL in env", () => {
      const email = generateEmail({
        name: "any",
        email: "any",
        content: "any"
      });
      expect(email.Source).toEqual(mockEmail);
    });

    test("that ToAddresses contains the EMAIL in env as the first index", () => {
      const email = generateEmail({
        name: "any",
        email: "any",
        content: "any"
      });
      expect(email.Destination.ToAddresses).toEqual([mockEmail]);
    });

    test("that the Body charset is UTF-8", () => {
      const email = generateEmail({
        name: "any",
        email: "any",
        content: "any"
      });
      expect(email.Message.Body.Text.Charset).toEqual("UTF-8");
    });

    test("that the Body Data contains the input name, email, and content correctly formatted", () => {
      const mockName = "someName";
      const mockEmail = "someEmail";
      const mockContent = "someContent";
      const email = generateEmail({
        name: mockName,
        email: mockEmail,
        content: mockContent
      });
      const expectedData = `Message sent from email ${mockEmail} by ${mockName} \n ${mockContent}`;
      expect(email.Message.Body.Text.Data).toEqual(expectedData);
    });

    test("that the Subject charset is UTF-8", () => {
      const email = generateEmail({
        name: "any",
        email: "any",
        content: "any"
      });
      expect(email.Message.Subject.Charset).toEqual("UTF-8");
    });

    test("that the Subject Data contains the correct message", () => {
      const email = generateEmail({
        name: "any",
        email: "any",
        content: "any"
      });
      expect(email.Message.Subject.Data).toEqual(
        "You received a message from your personal website!"
      );
    });
  });
});

describe("generateResponse", () => {
  describe("on the generated object", () => {
    const { generateResponse } = setup("any");

    test("that statusCode is equal to the input code", () => {
      const inputCode = 200;
      const response = generateResponse(inputCode, {});
      expect(response.statusCode).toEqual(inputCode);
    });

    test("that Access-Control-Allow-Origin is *", () => {
      const response = generateResponse(0, {});
      expect(response.headers["Access-Control-Allow-Origin"]).toEqual("*");
    });

    test("that Access-Control-Allow-Headers is x-requested-with", () => {
      const response = generateResponse(0, {});
      expect(response.headers["Access-Control-Allow-Headers"]).toEqual(
        "x-requested-with"
      );
    });

    test("that Access-Control-Allow-Credentials is true", () => {
      const response = generateResponse(0, {});
      expect(response.headers["Access-Control-Allow-Credentials"]).toEqual(
        true
      );
    });

    test("that body is the input payload stringified", () => {
      const mockPayload = {
        any: "any"
      };
      const response = generateResponse(0, mockPayload);
      expect(response.body).toEqual(JSON.stringify(mockPayload));
    });
  });
});

describe("generateError", () => {
  describe("on the generated object", () => {
    const { generateError } = setup("any");

    test("that statusCode is equal to the input code", () => {
      const inputCode = 200;
      const response = generateError(inputCode, {});
      expect(response.statusCode).toEqual(inputCode);
    });

    test("that Access-Control-Allow-Origin is *", () => {
      const response = generateError(0, {});
      expect(response.headers["Access-Control-Allow-Origin"]).toEqual("*");
    });

    test("that Access-Control-Allow-Headers is x-requested-with", () => {
      const response = generateError(0, {});
      expect(response.headers["Access-Control-Allow-Headers"]).toEqual(
        "x-requested-with"
      );
    });

    test("that Access-Control-Allow-Credentials is true", () => {
      const response = generateError(0, {});
      expect(response.headers["Access-Control-Allow-Credentials"]).toEqual(
        true
      );
    });

    test("that body is the input error's error msg stringified", () => {
      const mockError = {
        message: "any"
      };
      const response = generateError(0, mockError);
      expect(response.body).toEqual(JSON.stringify(mockError.message));
    });
  });
});
