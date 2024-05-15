var expect = require("chai").expect;
var request = require("request");

describe("Testing APIs for EmployeeController", function () {
  var baseUrl = "http://localhost:4000"; 

  it("GET method for getting all employees", function (done) {
    request.get(baseUrl + "/employee", function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      var resObj = JSON.parse(body);
      expect(resObj.statusCode).to.equal(200);
      done();
    });
  });

  it("GET method for getting employee by ID", function (done) {
    request.get(baseUrl + "/employee/id?empId=1", function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      var resObj = JSON.parse(body);
      expect(resObj.statusCode).to.equal(200);
      done();
    });
  });

  it("PUT method for adding employee", function (done) {
    var employeeData = {
      empId: "1",
      firstName: "John",
      lastName: "Doe",
    };

    request.post(
      { url: baseUrl + "/employee/add", json: employeeData },
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(body.statusCode).to.equal(200);
        done();
      }
    );
  });

  it("PUT method for updating employee", function (done) {
    var employeeData = {
      empId: "1",
      firstName: "Updated John",
      lastName: "Doe",
    };

    request.put(
      { url: baseUrl + "/employee/update", json: employeeData },
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(body.statusCode).to.equal(200);
        done();
      }
    );
  });
});
