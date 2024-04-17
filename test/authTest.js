var expect = require("chai").expect;
var request = require("request");

describe("Testing APIs on http://localhost:3000/auth/", function () {
  var url = "http://localhost:3000/auth/";

  var registerData = {
    username: "username",
    email: "email@example.com",
    password: "password",
  };

  var loginData = {
    username: "username",
    email: "email@example.com",
    password: "password",
  };

  it("POST method for Register Employee", function (done) {
    request.post(
      { url: url + "register", form: registerData },
      function (error, response, body) {
        let resObj = JSON.parse(body);
        expect(resObj.message).to.equal("Registration successful");
        done();
      }
    );
  });
  it("POST method for Login Employee", function (done) {
    request.post(
      { url: url + "login", form: loginData },
      function (error, response, body) {
        let resObj = JSON.parse(body);
        expect(resObj).to.have.property("token").to.be.a("string");
        done();
      }
    );
  });
});
